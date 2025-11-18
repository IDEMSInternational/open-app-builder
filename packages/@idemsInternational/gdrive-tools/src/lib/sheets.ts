import { google, sheets_v4 } from 'googleapis';
import { authorizeGoogleSheets } from './authorize';

export interface ICreateSheetOptions {
  credentialsPath: string;
  authTokenPath: string;
  title: string;
  data: { [sheetName: string]: string[][] };
}

export interface IReadSheetOptions {
  credentialsPath: string;
  authTokenPath: string;
  spreadsheetId: string;
  ranges?: string[];
}

export interface ISheetResult {
  sheetId: string;
  sheetUrl: string;
}

/**
 * Create a Google Sheet with multiple tabs and data
 */
export async function createGoogleSheet(options: ICreateSheetOptions): Promise<ISheetResult> {
  const { credentialsPath, authTokenPath, title, data } = options;
  
  // Get authenticated client
  const { drive, auth } = await authorizeGoogleSheets({ credentialsPath, authTokenPath });
  
  // Create sheets client with same auth
  const sheetsClient = google.sheets({ version: 'v4', auth });
  
  // Create the spreadsheet
  const sheetNames = Object.keys(data);
  const spreadsheetResult = await sheetsClient.spreadsheets.create({
    requestBody: {
      properties: {
        title,
      },
      sheets: sheetNames.map(name => ({
        properties: {
          title: name,
        },
      })),
    },
  });
  
  const spreadsheetId = spreadsheetResult.data.spreadsheetId!;
  const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}`;
  
  // Populate each sheet with data
  for (const [sheetName, sheetData] of Object.entries(data)) {
    if (sheetData.length > 0) {
      await sheetsClient.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!A1`,
        valueInputOption: 'RAW',
        requestBody: {
          values: sheetData,
        },
      });
    }
  }
  
  return {
    sheetId: spreadsheetId,
    sheetUrl: spreadsheetUrl,
  };
}

/**
 * Read data from an existing Google Sheet
 */
export async function readGoogleSheet(options: IReadSheetOptions): Promise<{ [sheetName: string]: string[][] }> {
  const { credentialsPath, authTokenPath, spreadsheetId, ranges = [] } = options;
  
  // Get authenticated client
  const { drive, auth } = await authorizeGoogleSheets({ credentialsPath, authTokenPath });
  const sheetsClient = google.sheets({ version: 'v4', auth });
  
  // Get spreadsheet metadata
  const spreadsheetResult = await sheetsClient.spreadsheets.get({
    spreadsheetId,
  });
  
  const sheets = spreadsheetResult.data.sheets || [];
  const result: { [sheetName: string]: string[][] } = {};
  
  // If no ranges specified, read all sheets
  const sheetsToRead = ranges.length > 0 ? ranges : sheets.map(s => s.properties?.title || '');
  
  for (const sheetName of sheetsToRead) {
    if (!sheetName) continue;
    
    const range = `${sheetName}!A:Z`;
    const valuesResult = await sheetsClient.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    
    result[sheetName] = valuesResult.data.values || [];
  }
  
  return result;
}