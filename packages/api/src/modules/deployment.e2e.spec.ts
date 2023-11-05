import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../../src/app.module";
import { randomUUID } from "crypto";
import {
  testDBBootstrap,
  testDBQuery,
  testDBTeardown,
  generateTestID,
} from "../../test/test.utils";

describe("deployment module (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => await testDBBootstrap());

  afterAll(async () => await testDBTeardown());

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  /** Send 5 user create tests with a 500ms delay between requests */
  it("Handles multiple near-concurrent requests to different dbs", async () => {
    const dbNameBase = `test_e2e_${generateTestID()}`;
    const deploymentDBNames = new Array(5).fill(0).map((_, i) => `${dbNameBase}_${i}`);
    const userIdBase = randomUUID();
    const requests = deploymentDBNames.map(async (deploymentDBName, i) => {
      // Set 500ms delay between requests
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve(true);
        }, 500 * i)
      );
      const app_user_id = `${userIdBase}_${i}`;
      const { status, body } = await requestUserPost(app, deploymentDBName, app_user_id);
      return { status, body, deploymentDBName };
    });
    const responses = await Promise.all(requests);
    console.log(JSON.stringify(responses, null, 2));
    const rowCounts: number[] = [];
    for (const deploymentDBName of deploymentDBNames) {
      const { rowCount, rows } = await testDBQuery("SELECT * from app_users", deploymentDBName);
      console.log({ deploymentDBName, rowCount, rows });
      rowCounts.push(rowCount);
    }
    expect(rowCounts).toEqual([1, 1, 1, 1, 1]);
  });

  /** Send 5 user create requests in parallel to different databases  */
  it("Handles multiple concurrent requests to different dbs", async () => {
    const dbNameBase = `test_e2e_${generateTestID()}`;
    const deploymentDBNames = new Array(5).fill(0).map((_, i) => `${dbNameBase}_${i}`);

    // Initialise databases before sending requests for easier logging (db setup logs mixed with requests)
    const setupRequests = deploymentDBNames.map(async (deploymentDBName) => {
      const { status } = await requestDBSetup(app, deploymentDBName);
      return status;
    });
    const setupResponses = await Promise.all(setupRequests);

    console.log({ setupResponses });
    console.log("\x1b===========================================\x1b[0m");
    // Expect 200 status code for each db name setup
    expect(setupResponses).toEqual(deploymentDBNames.map(() => 200));

    const userIdBase = randomUUID();
    const requests = deploymentDBNames.map(async (deploymentDBName, i) => {
      const app_user_id = `${userIdBase}_${i}`;
      const { status, body } = await requestUserPost(app, deploymentDBName, app_user_id);
      return { status, body, deploymentDBName };
    });
    const responses = await Promise.all(requests);
    console.log(JSON.stringify(responses, null, 2));

    const rowCounts: number[] = [];
    for (const deploymentDBName of deploymentDBNames) {
      const { rowCount, rows } = await testDBQuery("SELECT * from app_users", deploymentDBName);
      console.log({ deploymentDBName, rowCount, rows });
      rowCounts.push(rowCount);
    }
    // Expect 1 db row per endpoint
    expect(rowCounts).toEqual(deploymentDBNames.map(() => 1));
  });
});

async function requestUserPost(app: INestApplication, dbName: string, app_user_id) {
  const endpoint = `/app_users/${app_user_id}`;
  const payload = {
    app_user_id,
    app_deployment_name: "test",
    app_version: "0.0.0",
    contact_fields: {},
    device_info: {},
  };
  return request(app.getHttpServer())
    .post(endpoint)
    .set("x-deployment-db-name", dbName)
    .send(payload);
}

/**
 * Send a GET request to the /status endpoint
 * Include custom db name header which should be intercepted and trigger DB bootstrap for the custom DB
 */
async function requestDBSetup(app: INestApplication, dbName: string) {
  const endpoint = `/status`;
  return request(app.getHttpServer()).get(endpoint).set("x-deployment-db-name", dbName);
}
