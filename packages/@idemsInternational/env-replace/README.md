# Env Replace

Populate variables hardcoded into files from environment

## Setup Template Files
All file formats are supported, however files containing variables should be named with `.template.` in the filename, e.g. `config.template.ts`. 

Within a file variables for replacement should be wrapped with curly braces, e.g.

_config.template.ts_
```ts
const config = {
    appId: ${APP_ID}
}
```

## Replace Templated Files
```ts
import {replaceFiles} from '@idemsInternational/env-replace'

await replaceFiles()
```

## Configuration
The replace method can be customised with various parameters


## Future TODOs

**Variable Parsing**
Future syntax could include utility helpers, e.g.
```ts
const config = {
    nested_config: JSON(${STRING_JSON})
}
```

**Variable Fallback**
Adding support for default/fallback values like some shell interpolations
```ts
const config = {
    appId: ${APP_ID:-debug_app}
}
```

**Env file**
Pass `envFile` path to load variables from