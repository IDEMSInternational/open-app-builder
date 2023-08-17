## Shared

Common platform data structures and manipulation methods. 
There are particularly a number of utility methods used by both scripts and workflow packages

Note, some methods will only work in node-based environments (non-browser)

### Import
The shared workspace is not designed to be compiled, but instead files can be imported directly
with the use of yarn 

```ts
import {arrayToHashmap} from 'shared'
```

**Limitations**
Whilst most methods are made available from the main `src/index.ts` export, there are some cases where some compilers do not tree-shake accurately resulting in overly large imports (notable danfo-js resources which are 7mb+)

Therefore some shared code is not included in the main export, and must be imported directly, e.g.
```ts
import { DataPipe } from 'shared/src/models/dataPipe'
```