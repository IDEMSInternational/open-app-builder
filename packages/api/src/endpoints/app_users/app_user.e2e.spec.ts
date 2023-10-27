import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "src/app.module";
import { generateTestID, testDBBootstrap, testDBQuery, testDBTeardown } from "test/test.utils";
import { Attributes } from "sequelize";
import { randomUUID } from "crypto";
import { AppUser } from "./app_user.model";

const ENDPOINT_BASE = "/app_users";

describe("app_user (e2e)", () => {
  let app: INestApplication;

  // single app user used between some tests
  let app_user_id: string;

  beforeAll(async () => await testDBBootstrap());

  afterAll(async () => await testDBTeardown());

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("[Post] create", async () => {
    app_user_id = randomUUID();
    const payload = mockUser(app_user_id);
    const { status, body } = await request(app.getHttpServer())
      .post(`${ENDPOINT_BASE}/${app_user_id}`)
      .send(payload);
    expect(status).toEqual(201);
    expect(body.app_user_id).toEqual(app_user_id);
  });

  it("[Post] update", async () => {
    const { status, body } = await request(app.getHttpServer())
      .post(`${ENDPOINT_BASE}/${app_user_id}`)
      .send({ contact_fields: { myField: "updated" } });
    expect(status).toEqual(201);
    expect(body.app_user_id).toEqual(app_user_id);
    expect(body.contact_fields).toEqual({ myField: "updated" });
  });

  it("[Get] list one", async () => {
    const { status, body } = await request(app.getHttpServer()).get(
      `${ENDPOINT_BASE}/${app_user_id}`
    );
    expect(status).toEqual(200);
    expect(body.app_user_id).toEqual(app_user_id);
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
    const deploymentDBName = `test_e2e_${generateTestID()}`;
    const app_user_id = randomUUID();
    const endpoint = `/app_users/${app_user_id}`;
    const { status, body } = await request(app.getHttpServer())
      .post(endpoint)
      .set("x-deployment-db-name", deploymentDBName)
      .send(mockUser(app_user_id));

    expect(status).toEqual(201);
    expect(body.app_user_id).toEqual(app_user_id);
    const { rowCount } = await testDBQuery("SELECT * from app_users", deploymentDBName);
    expect(rowCount).toEqual(1);
  });
});

const mockUser = (app_user_id: string): Attributes<AppUser> => ({
  app_deployment_name: "test",
  app_user_id,
  app_version: "0.0.0",
  contact_fields: {},
  device_info: {},
});
