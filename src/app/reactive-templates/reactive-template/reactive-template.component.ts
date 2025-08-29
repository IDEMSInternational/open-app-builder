import { Component, computed, forwardRef, input, OnInit, signal } from "@angular/core";
import { FlowTypes } from "packages/data-models";
import { TemplateService } from "src/app/shared/components/template/services/template.service";
import { RowListComponent } from "../reactive-components/row-list.component";

@Component({
  selector: "oab-reactive-template",
  templateUrl: "./reactive-template.component.html",
  styleUrls: ["./reactive-template.component.scss"],
  standalone: true,
  imports: [forwardRef(() => RowListComponent)],
})
export class ReactiveTemplateComponent implements OnInit {
  public templateName = input.required<string>();
  public namespace = input("");

  public template = signal<FlowTypes.Template | undefined>(undefined);
  public rows = computed(() => this.template()?.rows || []);

  constructor(private templateService: TemplateService) {}

  async ngOnInit() {
    const template = await this.templateService.getTemplateByName(this.templateName(), false);
    this.template.set(template);
  }
}
