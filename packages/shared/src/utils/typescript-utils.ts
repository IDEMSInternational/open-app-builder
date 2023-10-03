import ts, { CompilerOptions, ProjectReference } from "typescript";

/**
 * Prints out particular nodes from a typescript source file
 * https://github.com/Microsoft/TypeScript-wiki/blob/main/Using-the-Compiler-API.md#a-simple-transform-function
 *
 * @param file a path to a file
 * @param identifiers top level identifiers available
 */
export function extractTsNode(file: string, identifiers: string[]) {
  // Create a Program to represent the project, then pull out the
  // source file to parse its AST.
  let program = ts.createProgram([file], { allowJs: true });
  const sourceFile = program.getSourceFile(file);

  // To print the AST, we'll use TypeScript's printer
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  // To give constructive error messages, keep track of found and un-found identifiers
  const unfoundNodes = [],
    foundNodes = [];

  // Loop through the root AST nodes of the file
  ts.forEachChild(sourceFile, (node) => {
    let name = "";

    // This is an incomplete set of AST nodes which could have a top level identifier
    // it's left to you to expand this list, which you can do by using
    // https://ts-ast-viewer.com/ to see the AST of a file then use the same patterns
    // as below
    if (ts.isFunctionDeclaration(node)) {
      name = node.name.text;
      // Hide the method body when printing
      (node as any).body = undefined;
    } else if (ts.isVariableStatement(node)) {
      name = node.declarationList.declarations[0].name.getText(sourceFile);
    } else if (ts.isInterfaceDeclaration(node)) {
      name = node.name.text;
    }
    const container = identifiers.includes(name) ? foundNodes : unfoundNodes;
    container.push([name, node]);
  });

  // Either print the found nodes, or offer a list of what identifiers were found
  if (!foundNodes.length) {
    console.log(
      `Could not find any of ${identifiers.join(", ")} in ${file}, found: ${unfoundNodes
        .filter((f) => f[0])
        .map((f) => f[0])
        .join(", ")}.`
    );
    process.exitCode = 1;
  } else {
    const res = foundNodes.map((f) => {
      const [name, node] = f;
      // console.log("### " + name + "\n");
      // console.log(printer.printNode(ts.EmitHint.Unspecified, node, sourceFile)) + "\n";
      return { name, node: printer.printNode(ts.EmitHint.Unspecified, node, sourceFile) };
    });
    return res;
  }
}

/**
 * Take the path to a .ts file and dynamically import it,
 * resolving any default export object
 * */
export async function readTSDefaultExport(filepath: string) {
  const res = await import(filepath);
  return res.default;
}

/**
 * Use typescript compiler to transpile TS string to JS
 * https://github.com/microsoft/TypeScript-wiki/blob/main/Using-the-Compiler-API.md#a-simple-transform-function
 **/
export async function transpileTsToJS(tsData: Buffer) {
  const js = ts.transpileModule(tsData.toString("utf-8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ESNext },
  });
  return js.outputText;
}

/**
 * Compile TS source files to corresponding JS
 * https://github.com/microsoft/TypeScript-wiki/blob/main/Using-the-Compiler-API.md
 */
export function compileTsToJS(options: {
  fileNames: string[];
  projectReferences?: ProjectReference[];
  compilerOptions?: CompilerOptions;
}) {
  // TODO - ideally refactor to deployment workspace and include tsconfig.json
  // which can be read for defaults, like in strapi `resolveConfigOptions` method
  // https://github.com/strapi/strapi/blob/main/packages/utils/typescript/lib/compilers/basic.js
  const compilerDefaults: CompilerOptions = {
    // TODO - decide if ESNext would be better default target (depends on how will be imported)
    target: ts.ScriptTarget.ES5,
    noEmit: false,
    noEmitOnError: true,
    skipLibCheck: true,
    moduleResolution: ts.ModuleResolutionKind.Node16,
    module: ts.ModuleKind.CommonJS,
    esModuleInterop: true,
    resolveJsonModule: true,
  };
  const program = ts.createProgram({
    rootNames: options.fileNames,
    projectReferences: options.projectReferences || [],
    options: { ...compilerDefaults, ...options.compilerOptions },
  });
  const emitResult = program.emit();
  // Log diagnostic messages
  let allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
  allDiagnostics.forEach((diagnostic) => {
    if (diagnostic.file) {
      let { line, character } = ts.getLineAndCharacterOfPosition(
        diagnostic.file,
        diagnostic.start!
      );
      let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
      console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
    } else {
      console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
    }
  });
}
