## Shared

Common platform methods and utility functions.

There are particularly a number of utility methods used by both scripts and workflow packages

Note, some methods will only work in node-based environments (non-browser)

### How to import

**Node**
The workspace is designed for direct import as `.ts` files, to be compiled within parent project. Most imports are made available from the top-level `index.ts`
```ts
import { TemplatedData } from "shared"
```
If any imports are not available simply update the workspace `index.ts` to include

**Angular**
The angular compiler uses local `tsconfig.app.json` to include external dependencies, therefore if using an entry should be included

```json
{
  "extends": "./tsconfig.json",
  "include": [
    "packages/shared/**/*.ts",
  ]
}
```

**NOTE** - the `shared` package workspace name conflicts with local `shared` folder
As such when importing methods a package-based path will be required, i.e

```ts
import { TemplatedData } from "packages/shared"
```

In addition, to avoid compiler errors thrown by non-browser shared methods, explicit paths should be included to import only the supported files as required

```ts
import { AppStringEvaluator } from "packages/shared/src/models/appStringEvaluator/appStringEvaluator";
import { TemplatedData } from "packages/shared/src/models/templatedData/templatedData";
```

In future it may be better to move any non-compatible shared methods to own package, or polyfill missing functions (e.g. `os`)
