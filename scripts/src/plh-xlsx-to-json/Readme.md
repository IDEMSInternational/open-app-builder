# XLSX to JSON

This script takes input xlsx files and converts to a json array of sheet names, using top row to define key-value pairs.

Additionally it merges plh content_list metadata with flow data, and outputs a single 'merged' version for use in the app

## Instructions
Place all xlsx files in `scripts/plh-xlsx-to-json/xlsx` folder

`npm run xlsx-to-json`

This will create individual json outputs as well as a `_merged.json` file containing collated data
with merged metadata
