import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TEMPLATE_COMPONENT_MAPPING } from "src/app/shared/components/template/components";
import { AppDataService } from "src/app/shared/services/data/app-data.service";

interface ITemplateComponent {
  name: string;
  /** rendered component import (not currently displayed) */
  component: any;
  /** Component example template name */
  template?: string;
}

@Component({
  selector: "template-component-page",
  templateUrl: "./component.page.html",
  styleUrls: ["./component.page.scss"],
})
export class ComponentPage implements OnInit {
  selectedComponent: ITemplateComponent;
  components: ITemplateComponent[] = [];

  constructor(private route: ActivatedRoute, private appDataService: AppDataService) {}

  ngOnInit() {
    this.selectedComponent = this.route.snapshot.params.componentName;
    const componentTemplates = this.getComponentTemplates();
    this.components = Object.entries(TEMPLATE_COMPONENT_MAPPING)
      .filter(([_, component]) => component !== null)
      .map(([name, component]) => ({ name, component, template: componentTemplates[name] }))
      .sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  setSelectedComponent(name: string) {
    const selectedComponent = this.components.find((c) => c.name === name);
    this.selectedComponent = selectedComponent;
  }

  /** List all local templates defined for components, prefixed `comp_` */
  private getComponentTemplates() {
    const componentTemplates: Record<string, string> = {};
    const allTemplates = this.appDataService.listSheetsByType("template");
    for (const template of allTemplates) {
      if (template.flow_name.startsWith("comp_")) {
        const componentName = template.flow_name.replace("comp_", "");
        componentTemplates[componentName] = `/template/${template.flow_name}`;
      }
    }
    return componentTemplates;
  }
}
