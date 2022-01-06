import * as http from "http";
import { environment } from "./environment";

const options: http.RequestOptions = {
  hostname: "localhost",
  port: environment.API_PORT,
  path: "/api/status",
  method: "GET",
  timeout: 2000,
};

/**
 * Simple function to query local status api to return api healthcheck
 * TODO - could be modified to use https://docs.nestjs.com/recipes/terminus
 * */
function healthCheck() {
  const request = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    if (res.statusCode == 200) {
      process.exit(0);
    } else {
      process.exit(1);
    }
  });

  request.on("error", function (err) {
    console.log("ERROR", err);
    process.exit(1);
  });

  request.end();
}
healthCheck();
