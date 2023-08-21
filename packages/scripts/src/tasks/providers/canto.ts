const OAUTH_BASE_URL = "https://oauth.canto.com";

const request = require("request");
const options = {
  method: "POST",
  url: `${OAUTH_BASE_URL}/oauth/api/oauth2/compatible/token?app_id=${secrets.appId}&app_secret=${secrets.appSecret}&grant_type=client_credentials`,
  headers: {},
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
