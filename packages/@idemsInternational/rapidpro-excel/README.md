# Rapidpro Excel
This library converts between rapidpro json formats and a custom created excel sheet format

## Quickstart

## Use as library
Install locally via npm or yarn, e.g.
```
yarn add @idemsInternational/rapidpro-excel
```

Convert excel to rapidpro
```
import  {ExcelToRapidproConverter}  from "@idemsInternational/rapidpro-excel";

const parser = new ExcelToRapidproConverter(flow_name, excelRows);
const converted = parser.run();
```

## Run tests locally
```
yarn test
```