import { Directive, ViewContainerRef } from "@angular/core";

/**
 * Provides reference for injecting template
 * @example component.html
 * ```ts
 * <div templateHost></div>
 * ```
 *
 * @example component.ts
 * ```ts
 * @ViewChild(TemplateHostDirective, { static: true }) templateHost!: TemplateHostDirective;
 *
 * ngOnInit(){
 *  this.templateService.injectTemplate(name,this.templateHost)
 * }
 * ```
 */
@Directive({ selector: "[templateHost]" })
export class TemplateHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
