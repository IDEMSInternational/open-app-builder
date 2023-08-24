import { create as tsNodeCreate } from "ts-node";

export function generateDeploymentConfig() {}

export function compileDeployment() {
  // TODO
  // hacky method to compile a deployment file by manually converting typescript
  // TODO
  // might be better to change deployment format
}

function compileTsToJs(tsPath: string) {
  const service = tsNodeCreate({ compilerOptions: { sourceMap: false } });
  const js = service.compile(readFileSync(tsPath, "utf-8"), tsPath);
  return js;
}
