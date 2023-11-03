import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "src/app.module";
import { generateTestID, testDBBootstrap, testDBQuery, testDBTeardown } from "test/test.utils";
import { AppFeedback } from "./app_feedback.model";
import { Attributes } from "sequelize";
import { randomUUID } from "crypto";

const ENDPOINT_BASE = "/app_feedback";

describe("app_feedback (e2e)", () => {
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

  it("Creates feedback", async () => {
    const app_user_id = randomUUID();
    const payload = mockFeedback(app_user_id);
    const { status, body } = await request(app.getHttpServer())
      .post(`${ENDPOINT_BASE}`)
      .send(payload);
    expect(status).toEqual(201);
    expect(body.app_user_id).toEqual(app_user_id);
  });

  it("Lists feedback", async () => {
    const { status, body } = await request(app.getHttpServer()).get(`${ENDPOINT_BASE}`);
    expect(status).toEqual(200);
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toEqual(1);
    const [record] = body;
    expect(record.app_user_id).toBeTruthy();
  });

  it("Creates feedback to deployment DB", async () => {
    const app_user_id = randomUUID();
    const dbName = `test_e2e_${generateTestID()}`;
    const payload = mockFeedback(app_user_id);
    const { status } = await request(app.getHttpServer())
      .post(`${ENDPOINT_BASE}`)
      .set("x-deployment-db-name", dbName)
      .send(payload);
    expect(status).toEqual(201);
    const { rows, rowCount } = await testDBQuery(`select * from app_feedback`, dbName);
    expect(rowCount).toEqual(1);
    expect(rows[0].app_user_id).toEqual(app_user_id);
  });
});

const mockFeedback = (app_user_id: string): Attributes<AppFeedback> => ({
  app_user_record_id: 1,
  app_deployment_name: "test",
  app_user_id,
  data: {},
});
