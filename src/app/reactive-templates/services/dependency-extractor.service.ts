import { Injectable } from "@angular/core";
import { VariableReference } from "../stores/store";

@Injectable({ providedIn: "root" })
export class DependencyExtractorService {
  private readonly allowedRoots = ["local", "global", "system", "loop"];
  private readonly variablePathPattern = new RegExp(
    `\\b(?:${this.allowedRoots.join("|")})\\.[a-zA-Z_$][\\w$]*(?:\\.[a-zA-Z_$][\\w$]*)*`,
    "g"
  );

  public extractVariablePaths(input: string): VariableReference[] {
    return this.extractVariableReferences(input);
  }

  public extractVariableReferences(input: string): VariableReference[] {
    return (input.match(this.variablePathPattern) ?? []).map((path) => {
      const [type, ...pathSegments] = path.split(".");

      return {
        type: type as VariableReference["type"],
        name: pathSegments
          .join(".")
          .replace("parameter_list.", "")
          .replace(/[#!&|,]/g, ""),
      };
    });
  }
}
