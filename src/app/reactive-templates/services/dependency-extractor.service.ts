import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class DependencyExtractorService {
  private readonly allowedRoots = ["local", "global", "system", "loop"];
  private readonly variablePathPattern = new RegExp(
    `\\b(?:${this.allowedRoots.join("|")})\\.[a-zA-Z_$][\\w$]*(?:\\.[a-zA-Z_$][\\w$]*)*`,
    "g"
  );

  public extractVariablePaths(input: string): string[] {
    return input.match(this.variablePathPattern) ?? [];
  }
}
