import fs from "fs";
import path from "path";
import readline from "readline";
import { drive_v3, google } from "googleapis";
import chalk from "chalk";
require("dotenv").config();
const CREDENTIALS_PATH = "config/credentials.json";

// If modifying these scopes, delete token.json.
const SCOPES = [
  "https://www.googleapis.com/auth/drive.readonly",
  "https://www.googleapis.com/auth/drive.metadata.readonly",
];

// if the file is run direct as opposed to imported function, run the main auth
async function main() {
  if (require.main === module) {
    await authorizeGDrive();
  }
}
main();

export function authorizeGDrive(options?: drive_v3.Options): Promise<drive_v3.Drive> {
  return new Promise((resolve, reject) => {
    try {
      // The file token.json stores the user's access and refresh tokens, and is
      // created automatically when the authorization flow completes for the first
      // time.
      const TOKEN_PATH = path.join(__dirname, "token.json");

      // Load client secrets from a local file or env variable
      if (!fs.existsSync(CREDENTIALS_PATH)) {
        console.log(chalk.red(`No credentials provided in ${CREDENTIALS_PATH}`));
        process.exit(1);
      }
      const creds = getJSONFromEnvOrFile("GDRIVE_CREDENTIALS", CREDENTIALS_PATH);

      // Authorize a client with credentials, then call the Google Drive API.
      authorize(creds, TOKEN_PATH, SCOPES, (auth) => {
        const drive = google.drive({ version: "v3", auth, ...options });
        resolve(drive);
      });
    } catch (ex) {
      console.warn("Error authorizing google drive access", ex);
      reject(ex);
    }
  });
}

function getJSONFromEnvOrFile(envVar: string, filepath: string) {
  if (process.env[envVar]) {
    try {
      return JSON.parse(process.env[envVar]);
    } catch (ex) {
      console.log("Failed to parse JSON for env-var ", envVar);
      return;
    }
  } else {
    try {
      const jsonString = fs.readFileSync(filepath).toString();
      return JSON.parse(jsonString);
    } catch (ex) {
      console.log("Failed to parse JSON for file ", filepath);
      return;
    }
  }
}

function authorize(credentials: any, tokenPath: string, scopes: string[], callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  const token = getJSONFromEnvOrFile("GDRIVE_OAUTH_TOKEN", tokenPath);
  if (!token) {
    return getAccessToken(oAuth2Client, scopes, tokenPath, callback);
  }
  oAuth2Client.setCredentials(token);
  callback(oAuth2Client);
}

function getAccessToken(oAuth2Client, scopes, tokenPath, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(tokenPath, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", tokenPath);
      });
      callback(oAuth2Client);
    });
  });
}
