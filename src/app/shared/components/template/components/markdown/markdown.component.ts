import { Component, ViewEncapsulation } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { TemplatePipesModule } from "../../pipes";

@Component({
  selector: "tmpl-markdown",
  template: `<div [innerHTML]="value() | markdown"></div>`,
  standalone: true,
  styleUrl: "./markdown.component.scss",
  imports: [TemplatePipesModule],
  // Use shadow-dom to apply local styles to dynamically rendered markdown
  // without interfering with other render elements like tables
  encapsulation: ViewEncapsulation.ShadowDom,
})
/** Simple component to render markdown with improved styling */
export class TmplMarkdownComponent extends TemplateBaseComponent {}
