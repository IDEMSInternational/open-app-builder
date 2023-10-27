import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "src/app.module";
import { generateTestID, testDBBootstrap, testDBQuery, testDBTeardown } from "test/test.utils";
import { AppNotificationInteraction } from "./app_notification_interaction.model";
import { Attributes } from "sequelize";
import { randomUUID } from "crypto";
import { AppCommonModel } from "../common";

const ENDPOINT_BASE = "/app_notification_interaction";

describe("app_notification_interaction (e2e)", () => {
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
      .post(`${ENDPOINT_BASE}`)
      .send(payload);
    expect(status).toEqual(201);
    expect(body.app_user_id).toEqual(app_user_id);
    // Update
    const updateRes = await request(app.getHttpServer())
      .post(`${ENDPOINT_BASE}`)
      .send({ ...payload, data: { field: "updated" } });
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

  it("[Post] create or updated to deployment DB", async () => {
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
 * Payload splits common metadata fields from a data property containing notification meta
 * TODO - would be better to link to dto objects instead
 **/
const mockPayload = (app_user_id: string) => {
  const commonMeta: Attributes<AppCommonModel> = {
    app_deployment_name: "test",
    app_user_id,
    app_user_record_id: "1",
  };
  const payloadData: Omit<
    Attributes<AppNotificationInteraction>,
    "app_deployment_name" | "app_user_record_id" | "app_user_id"
  > = {
    action_id: "",
    action_meta: {},
    action_recorded_timestamp: "",
    notification_meta: {},
    schedule_timestamp: "",
    sent_recorded_timestamp: "",
  };

  return {
    ...commonMeta,
    data: payloadData,
  };
};
