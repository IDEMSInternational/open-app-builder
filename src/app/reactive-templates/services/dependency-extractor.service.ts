import { Injectable } from "@angular/core";
import { VariableReference } from "../stores/store";

@Injectable({ providedIn: "root" })
export class DependencyExtractorService {
  private readonly allowedRoots = ["local", "global", "system", "loop"];
  private readonly variablePathPattern = new RegExp(
    `\\b(?:${this.allowedRoots.join("|")})\\.[a-zA-Z_$][\\w$]*(?:\\.[a-zA-Z_$][\\w$]*)*`,
    "g"
  );
  private readonly shorthandReplacements: Array<{ from: string; to: string }> = [
    { from: "item", to: "loop.item" },
  ];

  public extractVariableReferences(input: string): VariableReference[] {
    const normalizedInput = this.replaceShorthands(input);

    return (normalizedInput.match(this.variablePathPattern) ?? []).map((path) => {
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

  private replaceShorthands(input: string): string {
    return this.shorthandReplacements.reduce((result, { from, to }) => {
      const shorthandPattern = new RegExp(`(^|[^\\w$.])${this.escapeRegExp(from)}\\b`, "g");

      return result.replace(shorthandPattern, `$1${to}`);
    }, input);
  }

  private escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
}
