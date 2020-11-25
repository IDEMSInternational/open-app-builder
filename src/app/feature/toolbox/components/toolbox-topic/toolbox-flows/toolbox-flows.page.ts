import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToolboxElement, ToolboxTip } from "src/app/feature/toolbox/models/toolbox.model";
import { ToolboxService } from "src/app/feature/toolbox/services/toolbox.service";
import { OpenClose } from "src/app/feature/goals/animations";

@Component({
  selector: "plh-toolbox-flows",
  templateUrl: "./toolbox-flows.page.html",
  styleUrls: ["../toolbox-topic.page.scss", "./toolbox-flows.page.scss"],
  animations: [OpenClose],
})
export class ToolboxFlowsPage implements OnInit {
  Flow_Name: string;
  flow: ToolboxTip;
  elements: ToolboxElement[];

  constructor(private activatedRoute: ActivatedRoute, private toolboxService: ToolboxService) {
    this.activatedRoute.params.subscribe((params) => {
      this.Flow_Name = params.flow_name;
      this.toolboxService.getFlows(this.Flow_Name).subscribe((module) => {
        this.flow = module;
        console.log("flow", this.flow);
        const { elements, title } = this.processFlow(this.flow.data);
        this.flow.Title = title;
        this.elements = elements;
        console.log("elements", this.elements);
      });
    });
  }

  ngOnInit() {}

  /**
   * Adapted from scripts/plh-spreadsheet/toolbox.translator.ts
   */
  private processFlow(data: any[]) {
    let elements: ToolboxElement[] = [];
    let listElement: ToolboxElement;
    let title = "";
    for (let row of data) {
      switch (row.Type) {
        case "Title": {
          title = row.MessageText;
          break;
        }
        case "Core_tip": {
          elements.push({
            type: "CORE_TIP",
            text: row.MessageText,
          });
          break;
        }
        case "List_intro": {
          listElement = this.createEmptyList();
          listElement.intro = row.MessageText;
          break;
        }
        case "End_list": {
          if (listElement) {
            listElement.items = listElement.items.filter(
              (item) => item.body.length > 0 || item.heading.length > 0
            );
            elements.push(listElement);
          }
          listElement = null;
          break;
        }
        case "List_item": {
          if (!listElement) {
            listElement = this.createEmptyList();
          }
          listElement.items.push({
            heading: row.MessageText,
            body: "",
          });
          break;
        }
        case "Text":
        default: {
          if (listElement) {
            const lastItem = listElement.items[listElement.items.length - 1];
            if (lastItem.body.length > 0) {
              lastItem.body += "\n";
            }
            lastItem.body += row.MessageText;
          } else {
            elements.push({
              type: "TEXT",
              text: row.MessageText,
            });
          }
        }
      }
    }
    return { elements, title };
  }

  private createEmptyList(): ToolboxElement {
    return {
      type: "LIST",
      intro: "",
      items: [],
    };
  }
}
