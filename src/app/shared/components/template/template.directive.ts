import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: "[plhTemplateComponentHost]",
})
export class TemplateComponentHostDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}