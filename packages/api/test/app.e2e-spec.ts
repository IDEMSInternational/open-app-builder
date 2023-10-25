import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import { randomUUID } from "crypto";
import { bootstrapTestDB, DBQuery } from "./test.utils";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => await bootstrapTestDB());

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/status (GET)", () => {
    return request(app.getHttpServer()).get("/status").expect(200).expect("[test_e2e] API Up");
  });

  it("Creates new user", async () => {
    const app_user_id = randomUUID();
    const endpoint = `/app_users/${app_user_id}`;
    const { status, body } = await request(app.getHttpServer()).post(endpoint).send({
      app_user_id,
      app_deployment_name: "test",
      app_version: "0.0.0",
      contact_fields: {},
      device_info: {},
    });
    expect(status).toEqual(201);
    expect(body.app_user_id).toEqual(app_user_id);
  });

  it("Creates user on custom DB", async () => {
    const deploymentDBName = `test_e2e_${generateTestID()}`;
    const app_user_id = randomUUID();
    const endpoint = `/app_users/${app_user_id}`;
    const { status, body } = await request(app.getHttpServer())
      .post(endpoint)
      .set("x-deployment-db-name", deploymentDBName)
      .send(mockPostUser(app_user_id));

    expect(status).toEqual(201);
    expect(body.app_user_id).toEqual(app_user_id);
    const { rowCount } = await DBQuery("SELECT * from app_users", deploymentDBName);
    expect(rowCount).toEqual(1);
  });

  it.only("Handles multiple concurrent requests to different dbs", async () => {
    const dbNameBase = `test_e2e_${generateTestID()}`;
    const requests = new Array(5).fill(0).map(async (_, i) => {
      const app_user_id = randomUUID();
      const endpoint = `/app_users/${app_user_id}`;
      const deploymentDBName = `${dbNameBase}_${i}`;
      const { status, body } = await request(app.getHttpServer())
        .post(endpoint)
        .set("x-deployment-db-name", deploymentDBName)
        .send(mockPostUser(app_user_id));

      const { rowCount } = await DBQuery("SELECT * from app_users", deploymentDBName);

      return { status, body, rowCount, deploymentDBName };
    });
    const responses = await Promise.all(requests);
    console.log(JSON.stringify(responses, null, 2));
    for (const reponse of responses) {
      expect(reponse.rowCount).toEqual(1);
    }
  });
});

function mockPostUser(app_user_id: string) {
  return {
    app_user_id,
    app_deployment_name: "test",
    app_version: "0.0.0",
    contact_fields: {},
    device_info: {},
  };
}

/** Generate a random 6-character id for testing */
function generateTestID() {
  return randomUUID().substring(0, 6);
}
