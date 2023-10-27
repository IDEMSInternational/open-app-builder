import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "src/app.module";
import { generateTestID, testDBBootstrap, testDBQuery, testDBTeardown } from "test/test.utils";
import { randomUUID } from "crypto";

const ENDPOINT_BASE = "/contact_fields";

/**
 * @Deprecated(?) To confirm and likely remove
 **/
describe.skip("contact_field (e2e)", () => {
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

  it("[Post] create or update", async () => {
    const app_user_id = randomUUID();
    const payload = mockPayload(app_user_id);
    // Create
    const { status, body } = await request(app.getHttpServer())
      .post(`${ENDPOINT_BASE}/${app_user_id}`)
      .send(payload);
    console.log({ status, body });
    expect(status).toEqual(201);
    expect(body.app_user_id).toEqual(app_user_id);
    // Update
    const updateRes = await request(app.getHttpServer())
      .post(`${ENDPOINT_BASE}/${app_user_id}`)
      .send({ ...payload, raw: { field2: "updated2" } });
    expect(updateRes.status).toEqual(201);
    expect(updateRes.body.id).toEqual(1);
  });

  it("[Get] list all", async () => {
    const { status, body } = await request(app.getHttpServer()).get(`${ENDPOINT_BASE}`);
    expect(status).toEqual(200);
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toEqual(1);
    const [record] = body;
    expect(record.app_user_id).toBeTruthy();
  });

  it("[Post] create on deployment DB", async () => {
    const app_user_id = randomUUID();
    const dbName = `test_e2e_${generateTestID()}`;
    const payload = mockPayload(app_user_id);
    const { status } = await request(app.getHttpServer())
      .post(`${ENDPOINT_BASE}`)
      .set("x-deployment-db-name", dbName)
      .send(payload);
    expect(status).toEqual(201);
    const { rows, rowCount } = await testDBQuery(
      `select * from app_notification_interaction`,
      dbName
    );
    expect(rowCount).toEqual(1);
    expect(rows[0].app_user_id).toEqual(app_user_id);
  });
});

/**
 * TODO - link to DTO type defs (currently hardcoded from swagger output)
 **/
const mockPayload = (app_user_id: string) => {
  const payload = {
    app_user_id,
    app_deployment_name: "test",
    app_version: "0.0.0",
    contact_fields: {},
    device_info: {},
  };
  return payload;
};
