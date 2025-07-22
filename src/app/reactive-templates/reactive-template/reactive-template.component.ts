import { Component, computed, input, OnInit, signal } from "@angular/core";
import { FlowTypes } from "packages/data-models";
import { TemplateService } from "src/app/shared/components/template/services/template.service";
import { REACTIVE_COMPONENT_MAP } from "../reactive-components/components";
import { NgComponentOutlet } from "@angular/common";
import { NonDisplayRowProcessor } from "../services/row-processors/non-display.row-processor";
import { FilterDisplayComponentPipe } from "../services/pipes/filter-display-component.pipe";

@Component({
  selector: "oab-reactive-template",
  templateUrl: "./reactive-template.component.html",
  styleUrls: ["./reactive-template.component.scss"],
  standalone: true,
  imports: [NgComponentOutlet, FilterDisplayComponentPipe],
})
export class ReactiveTemplateComponent implements OnInit {
  public templateName = input.required<string>();

  public template = signal<FlowTypes.Template | undefined>(undefined);
  public rows = computed(() => this.template()?.rows || []);

  constructor(
    private templateService: TemplateService,
    private nonDisplayRowProcessor: NonDisplayRowProcessor
  ) {}

  async ngOnInit() {
    const template = await this.templateService.getTemplateByName(this.templateName(), false);
    this.template.set(template);
    this.processNonDisplayRows(template);
  }

  public getComponent(row: FlowTypes.TemplateRow) {
    return REACTIVE_COMPONENT_MAP[row.type];
  }

  private processNonDisplayRows(template: FlowTypes.Template) {
    template.rows
      .filter((row) => !REACTIVE_COMPONENT_MAP[row.type])
      .forEach((row) => this.nonDisplayRowProcessor.processRow(row));
  }
}
