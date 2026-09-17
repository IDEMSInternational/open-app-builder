import { Injectable } from "@angular/core";
import { VariableReference } from "../stores/store";
import { ValueType } from "../reactive-components/row-base.component";

@Injectable({ providedIn: "root" })
export class DependencyExtractorService {
  private readonly allowedRoots = ["local", "global", "system", "loop"];
  private readonly variablePathPattern = new RegExp(
    `\\b(?:${this.allowedRoots.join("|")})(?:\\.[a-zA-Z_$][\\w$]*|\\[(?:"[^"]+"|'[^']+'|[^\\]]+)\\])+`,
    "g"
  );
  private readonly templateExpressionPattern = /\$\{([^}]*)\}/g;
  private readonly rootPattern = /^[a-zA-Z_$][\w$]*/;
  // Dot-prop segments and bracket segments; unquoted bracket content is a dynamic expression (e.g. an index variable), not a literal key.
  private readonly pathSegmentPattern =
    /\.([a-zA-Z_$][\w$]*)|\[(?:"([^"]+)"|'([^']+)'|([^\]]+))\]/g;
  private readonly shorthandReplacements: Array<{ from: string; to: string }> = [
    { from: "item", to: "loop.item" },
  ];

  public extractVariableReferences(input: string, mode: ValueType = "script"): VariableReference[] {
    const source = mode === "string" ? this.extractTemplateExpressions(input) : input;
    const normalizedInput = this.replaceShorthands(source);

    return (normalizedInput.match(this.variablePathPattern) ?? []).flatMap((path) =>
      this.parseVariablePath(path)
    );
  }

  private extractTemplateExpressions(input: string): string {
    return Array.from(
      input.matchAll(this.templateExpressionPattern),
      ([, expression]) => expression
    ).join(" ");
  }

  private replaceShorthands(input: string): string {
    return this.shorthandReplacements.reduce((result, { from, to }) => {
      const shorthandPattern = new RegExp(`(^|[^\\w$.])${this.escapeRegExp(from)}\\b`, "g");

      return result.replace(shorthandPattern, `$1${to}`);
    }, input);
  }

  /**
   * Splits a matched path into its static segments plus any nested references found inside
   * dynamic (unquoted) bracket expressions, e.g. "all_questions_loop[item.id]" depends on both
   * "all_questions_loop" (the collection) and "loop.item.id" (the dynamic index).
   */
  private parseVariablePath(path: string): VariableReference[] {
    const type = this.rootPattern.exec(path)![0] as VariableReference["type"];
    const segmentPattern = new RegExp(this.pathSegmentPattern.source, "g");
    segmentPattern.lastIndex = type.length;

    const segments: string[] = [];
    const nestedReferences: VariableReference[] = [];
    let hasDynamicSegment = false;
    let match: RegExpExecArray | null;

    while ((match = segmentPattern.exec(path))) {
      const [, dotProp, doubleQuoted, singleQuoted, unquoted] = match;

      if (unquoted !== undefined) {
        nestedReferences.push(...this.extractVariableReferences(unquoted));
        hasDynamicSegment = true;
        continue;
      }

      if (!hasDynamicSegment) {
        segments.push((dotProp ?? doubleQuoted ?? singleQuoted)!);
      }
    }

    const references: VariableReference[] =
      segments.length > 0
        ? [
            {
              type,
              name: segments
                .join(".")
                .replace("parameter_list.", "")
                .replace(/[#!&|,]/g, ""),
            },
          ]
        : [];

    return [...references, ...nestedReferences];
  }

  private escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
}
