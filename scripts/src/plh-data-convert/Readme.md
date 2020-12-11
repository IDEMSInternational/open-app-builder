# PLH Data Convert

These scripts take data that has been downloaded via the `gdrive-download` script,
and prepare for use in the app by merging metadata and refactoring where required

## Specific Content Parsers

### Conversations

The script inside this folder is for converting the app content spreadsheet into JSON files that are interpreted by the app.

An example of the input spreadsheet can be found here: https://drive.google.com/file/d/1m_XxVqVmHDZ_TL7KOrl9OIlfPVpJM9wO/view?usp=sharing

This input spreadsheet has a content_list sheet which acts as an index / table of contents which is used to describe the other sheets.

The other sheets are of two types

- Conversation: For character / guide conversations
- Toolbox: For toolbox content

Conversation sheets are converted into a Rapid Pro Flow Export JSON file by the **ConversastionParser** class.

Toolbox sheets are converted into a single JSON file by the **ToolboxParser** class

### Running the script

To run the conversion script:

1. Make sure you have the necessary packages installed by running `yarn install`
2. Run `npm run process-content-spreadsheet`

### Running the unit tests

To run unit tests for the conversion scripts

1. Make sure you have the necessary packages installed by running `yarn install`
2. Run `npm run test-scripts`

### Debugging the script

To debug the script add the launch configuration in example_vscode to the launch configuration to your .vscode/launch.json file.
If you don't have this file already simply copy in the launch.json file from example_vscode to a new folder called .vscode
