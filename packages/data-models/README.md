## Data Models

### How to import

**Node**
The workspace is designed for direct import as `.ts` files, to be compiled within parent project. Most imports are made available from the top-level `index.ts`
```ts
import { getDefaultAppConfig } from "data-models"
```
If any imports are not available simply update the workspace `index.ts` to include

**Angular**
The angular compiler uses local `tsconfig.app.json` to include external dependencies, therefore if using an entry should be included
```json
{
  "extends": "./tsconfig.json",
  "include": [
    "packages/data-models/**/*.ts",
  ]
}

```
Once included, data-models can be imported in the same way
```ts
import { getDefaultAppConfig } from "data-models"
```

*Legacy Implementation*
If it is not possible to import via tsconfig, it is still possible to include as a workspace dependency (defined in package.json), however the data models package.json requires update to build and import from dist folder. Additionally any angular serve script should concurrently serve the data-models workspace to ensure changes are recompiled, e.g.

```ts
"main": "dist/index.js",
"types": "dist/index.d.ts",
"scripts": {
    "build": "tsc -b",
    "serve": "tsc -w"
},
```


