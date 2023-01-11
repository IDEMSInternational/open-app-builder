import {
  Component,
  Input,
  QueryList,
  ViewChildren,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnInit,
  Type,
} from "@angular/core";
import { TEMPLATE_COMPONENT_MAPPING } from "../../components";
import { TemplateHostDirective } from "../../directives/templateHost.directive";
import { FlowTypes, ITemplateRowProps } from "../../models";

@Component({
  selector: "plh-template-dynamic",
  templateUrl: "./template-dynamic.component.html",
  styleUrls: ["./template-dynamic.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateDynamicComponent implements OnInit {
  public renderedRows: BaseRow[] = [];

  /** */
  @ViewChildren(TemplateHostDirective, { read: TemplateHostDirective })
  rowHosts: QueryList<TemplateHostDirective>;

  @Input() template: FlowTypes.Template;

  private allRows: BaseRow[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadRows();
    this.render();
  }

  private loadRows() {
    this.allRows = this.template.rows.map((r) => {
      const displayComponent = TEMPLATE_COMPONENT_MAPPING[r.type];
      if (displayComponent) {
        return new DisplayRowBase(r, displayComponent);
      }
      const structuralCommponent = STRUCTURAL_ROW_MAPPING[r.type];
      if (structuralCommponent) {
        return new structuralCommponent(r);
      }
      return new BaseRow(r);
    });
  }

  private render() {
    // evaluate rows to determine number of display components to render
    const renderedRows = [];
    for (const row of this.allRows) {
      const { rendered } = row.evaluate();
      if (rendered) {
        renderedRows.push(row);
      }
    }
    this.renderedRows = renderedRows;
    this.cdr.detectChanges();
    // render components
    this.rowHosts.map((host, index) => {
      this.renderedRows[index].render(host);
    });
    this.cdr.detectChanges();
  }

  trackByFn(index) {
    return index;
  }
}

/***************************************************************
 *            Row Renderers
 **************************************************************/

class BaseRow {
  public rendered: Boolean = false;
  public renderComponents: any[] = [];
  public render(host: TemplateHostDirective) {}
  private listeners() {
    // TODO - find a way to attach dynamic variables (or in parent) and queue re-render as required
  }

  private children?: BaseRow[];

  constructor(public row: FlowTypes.TemplateRow) {}

  public evaluate() {
    this.rendered = true;

    if (this.children) {
      // TODO
    }
    return this;
  }
}

class DisplayRowBase extends BaseRow {
  private renderCount = 0;

  public renderID: string;

  constructor(
    public row: FlowTypes.TemplateRow,
    private displayComponent: Type<ITemplateRowProps>
  ) {
    super(row);
  }

  public override render(host: TemplateHostDirective) {
    this.renderCount++;
    const viewContainerRef = host.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(this.displayComponent);
    componentRef.instance.row = this.row;
    componentRef.instance.parent = null;
  }
}
class TemplateRow extends BaseRow {}

class SetLocalRow extends BaseRow {}

// TODO - better if distinction between display/structural component made at origingal type-def and
// folder levels. Also should move into components/structural folder

const STRUCTURAL_ROW_MAPPING: PartialRecord<FlowTypes.TemplateRowType, typeof BaseRow> = {
  set_local: SetLocalRow,
  template: TemplateRow,
};

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};
