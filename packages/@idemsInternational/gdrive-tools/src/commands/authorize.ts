import fs from "fs";
import chalk from "chalk";
import { driveactivity_v2, drive_v3, google } from "googleapis";
import http from "http";
import opn from "open";
import url from "url";
require("dotenv").config();

/***************************************************************************************
 * CLI
 * @example gdrive-tools download -id 1bNvUKN47YZAbMnRA1ThzSLGxLTd0mfDb
 *************************************************************************************/
interface IProgramOptions {
  credentialsPath: string;
  authTokenPath: string;
}

import { Command } from "commander";
import { PATHS } from "../paths";
import { logError, logProgramHelp } from "../utils";
import { OAuth2Client } from "google-auth-library";
const program = new Command("authorize");
export default program
  .description("Authorize Google Drive API")
  .requiredOption(
    "-c --credentials-path <string>",
    "Path to credentials JSON",
    PATHS.DEFAULT_CREDENTIALS
  )
  .requiredOption("-a --auth-token-path <string>", "Path to token JSON", PATHS.DEFAULT_TOKEN)
  .action(async (opts: IProgramOptions) => {
    authorizeGDrive(opts);
  });

// Run if called directly from Node
if (require.main === module) {
  if (!process.argv.slice(2).length) {
    logProgramHelp(program);
  }
  program.parse(process.argv);
}

/***************************************************************************************
 * Main Methods
 *************************************************************************************/

/** Authorize access to the Gdrive api and return client */
export function authorizeGDrive(
  options: IProgramOptions,
  driveOptions?: drive_v3.Options
): Promise<{ drive: drive_v3.Drive }> {
  const { authTokenPath, credentialsPath } = options;
  const authScopes = [
    "https://www.googleapis.com/auth/drive.readonly",
    "https://www.googleapis.com/auth/drive.metadata.readonly",
  ];
  return new Promise((resolve, reject) => {
    try {
      const credentials = getAuthCredentials(credentialsPath);
      authorize(credentials, authTokenPath, authScopes, (auth) => {
        const drive = google.drive({ version: "v3", auth, ...driveOptions });
        resolve({ drive });
      });
    } catch (ex) {
      console.warn("Error authorizing google drive access", ex);
      reject(ex);
    }
  });
}

/** Authorize access to the GdriveActivity api and return client */
export function authorizeGDriveActivity(
  options: IProgramOptions,
  activityOptions?: driveactivity_v2.Options
): Promise<{ driveactivity: driveactivity_v2.Driveactivity }> {
  const { authTokenPath, credentialsPath } = options;
  const authScopes = ["https://www.googleapis.com/auth/drive.activity.readonly"];
  return new Promise((resolve, reject) => {
    try {
      const credentials = getAuthCredentials(credentialsPath);
      authorize(credentials, authTokenPath, authScopes, (auth) => {
        const driveactivity = google.driveactivity({ version: "v2", auth, ...activityOptions });
        resolve({ driveactivity });
      });
    } catch (ex) {
      console.warn("Error authorizing google drive access", ex);
      reject(ex);
    }
  });
}

/** Verify application auth credentials exist and return */
function getAuthCredentials(credentialsPath: string) {
  if (!fs.existsSync(credentialsPath)) {
    logError({
      msg1: `No application credentials found in : ${credentialsPath}`,
      msg2: "Application must be registered as per https://developers.google.com/identity/protocols/oauth2",
    });
  }
  const credentials = getJSONFromEnvOrFile("GDRIVE_CREDENTIALS", credentialsPath);
  return credentials;
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

function authorize(
  credentials: any,
  tokenPath: string,
  scopes: string[],
  callback: (authClient: OAuth2Client) => void
) {
  const { client_secret, client_id, redirect_uris } = credentials.web || credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  // Check if we have previously stored a token.
  const token = getJSONFromEnvOrFile("GDRIVE_OAUTH_TOKEN", tokenPath);
  if (!token) {
    return getAccessToken(oAuth2Client, scopes, tokenPath, callback);
  }
  if (doesTokenHaveRequiredScopes(token.scope, scopes) === false) {
    return getAccessToken(oAuth2Client, scopes, tokenPath, callback);
  }
  oAuth2Client.setCredentials(token);
  callback(oAuth2Client);
}

/**
 * Retrieve an access token from the google drive api
 * The file token.json stores the user's access and refresh tokens, and is
 * created automatically when the authorization flow completes for the first time.
 * */
function getAccessToken(
  oAuth2Client: OAuth2Client,
  scopes: string[],
  tokenPath: string,
  callback: (client: OAuth2Client) => void
) {
  // Generate the url that will be used for the consent dialog.
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: scopes,
  });
  console.log(
    chalk.yellow(
      "Authorize this app in your browser. If not automatically redirected, please manually visit:\n"
    )
  );
  console.log(chalk.blue(authUrl + "\n"));

  // Open an http server to accept the oauth callback.
  const server = http
    .createServer(async (req, res) => {
      try {
        // The request endpoint of "/oauth2callback" is configured
        // within Google Cloud's API Console Credentials page
        if (req.url.indexOf("/oauth2callback") > -1) {
          const qs = new url.URL(req.url, "http://localhost:3003").searchParams;
          res.end(
            "Authentication successful! Please close this browser window and return to the console."
          );
          server.close();
          const { tokens } = await oAuth2Client.getToken(qs.get("code"));
          oAuth2Client.setCredentials(tokens);
          console.log(chalk.yellow("Authentication successful, saving token in local storage."));
          // Store the token to disk for later program executions
          fs.writeFileSync(tokenPath, JSON.stringify(tokens));
          console.log(chalk.yellow("Token stored to", tokenPath));
          console.log(chalk.green("Authentication Complete."));
          callback(oAuth2Client);
          process.exit();
        }
      } catch (e) {
        server.close();
        logError({
          msg1: "Error authenticating with Google",
          msg2: e,
        });
        return res.end(e);
      }
    })
    .listen(3003, () => {
      // open the browser to the authorize url to start the workflow
      opn(authUrl, { wait: false }).then((cp) => cp.unref());
    });
}

/** Check if generated token scope has access to all required scopes */
function doesTokenHaveRequiredScopes(tokenScope: string, requiredScopes: string[]): boolean {
  const tokenScopeArray = tokenScope.split(" ");
  return requiredScopes.every((scope) => tokenScopeArray.includes(scope));
}
