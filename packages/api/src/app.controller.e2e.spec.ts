import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./app.module";
import { testDBBootstrap, testDBTeardown } from "../test/test.utils";

/**
 * Simple check for /status endpoint that checks app up status
 * The boilerplate may be useful when writing endpoint-specific test within folders
 *
 * Tests leverage SuperTest for http requests, and expose multiple
 * syntaxes for executing and evaluating requests. See more info at:
 * https://github.com/ladjs/supertest
 */
describe("AppController (e2e)", () => {
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

  it("/status (GET)", async () => {
    const { status, text } = await request(app.getHttpServer())
      .get("/status")
      .set("x-deployment-db-name", "test_e2e");
    expect(status).toEqual(200);
    expect(text).toEqual("[test_e2e] API Up");
  });
});
