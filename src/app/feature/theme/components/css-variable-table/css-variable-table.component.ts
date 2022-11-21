import { AfterViewInit, Component, ElementRef } from "@angular/core";
import { ThemeService } from "../../services/theme.service";

interface ICustomVariableMeta {
  name: string;
  value: string;
  /** Additional styles to pass to rendered table cell, e.g. setting background colour */
  tableDisplayStyles: Partial<CSSStyleDeclaration>;
  /** Group custom variables in groups for display purposes */
  tableDisplayGroup: "border" | "color" | "gradient" | "size" | "unknown";
}

@Component({
  selector: "plh-css-variable-table",
  templateUrl: "./css-variable-table.component.html",
  styleUrls: ["./css-variable-table.component.scss"],
})
export class CssVariableTableComponent implements AfterViewInit {
  customStyleVariables: ICustomVariableMeta[] = [];

  constructor(private themeService: ThemeService, private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.loadElementCustomVariables();
    this.themeService.currentTheme$.subscribe(() => this.loadElementCustomVariables());
  }

  /** Generate a list of all custom style variables applied to the table element */
  private loadElementCustomVariables() {
    const currentEl = this.elementRef.nativeElement as HTMLElement;
    const contentEl = currentEl.closest("ion-content");
    const customVariables = this.themeService.calculateElCustomProperties(contentEl);
    console.log("custom variables", customVariables, contentEl);
    this.customStyleVariables = Object.entries<string>(customVariables)
      .map(([name, value]) => ({
        name,
        value,
        tableDisplayGroup: this.getTableDisplayGroup(name, value),
        tableDisplayStyles: {},
      }))
      .map((meta) => ({ ...meta, tableDisplayStyles: this.getTableDisplayStyle(meta) }))
      .filter((meta) => meta.value !== "")
      .sort((a, b) => (b.name > a.name ? 1 : -1))
      .sort((a, b) => (a.tableDisplayGroup > b.tableDisplayGroup ? 1 : -1));
  }

  private getTableDisplayGroup(
    name: string,
    value: string
  ): ICustomVariableMeta["tableDisplayGroup"] {
    if (name.includes("border") && value.includes("#")) return "border";
    if (value.includes("linear-gradient")) return "gradient";
    if (value.includes("#")) return "color";
    if (value.includes("rgba")) return "color";
    if (value.endsWith("px")) return "size";
    return "unknown";
  }

  private getTableDisplayStyle(meta: ICustomVariableMeta) {
    const { value, tableDisplayGroup } = meta;
    const style: Partial<CSSStyleDeclaration> = {};
    if (tableDisplayGroup === "border") {
      style.border = value;
      return style;
    }
    if (value.includes("#")) style.backgroundColor = value;
    if (value.includes("rgba")) style.backgroundColor = value;
    if (value.includes("linear-gradient")) {
      style.background = value;
      style.padding = "2em";
    }
    return style;
  }
}
