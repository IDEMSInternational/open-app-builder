import { Component, Input } from "@angular/core";
import { TemplateBaseComponent } from "../../base";
import { FlowTypes, ITemplateRowProps } from "../../../models";

interface IDisplayGridParams {
  /**
   * Minimum item width, will increase to fit grid.
   * Default '200px'
   **/
  item_width: string;
  /**
   * Maximum grid width, if specified will center items in available space.
   * Default '100%'
   **/
  grid_width: string;
  /**
   * Spacing between grid items.
   * Default '16px'
   **/
  grid_gap: string;
}

@Component({
  selector: "plh-display-grid",
  templateUrl: "./display-grid.component.html",
  styleUrls: ["./display-grid.component.scss"],
})
export class TmplDisplayGridComponent extends TemplateBaseComponent implements ITemplateRowProps {
  /**
   * Computed item array from input parameters
   * @ignore
   */
  public gridItems: Array<FlowTypes.TemplateRow>;

  /**
   * Computed grid style from input parameters
   * @ignore
   */
  public gridStyle: Partial<CSSStyleDeclaration>;

  /**
   * Authoring parameters
   */
  public parameter_list: IDisplayGridParams;

  @Input() set row(row: FlowTypes.TemplateRow) {
    this._row = row;
    this.setParams();
  }

  private setParams() {
    this.parameter_list = this._row.parameter_list as any;
    this.gridItems = this._row.rows || [];
    this.gridStyle = this.generateGridStyle();
  }

  /**
   * Create a list of styles to be passed into ngStyle
   * https://thesoftwayfarecoder.com/dynamically-creating-css-classes-in-angular/
   */
  private generateGridStyle() {
    const minItemWidth = this.parameter_list.item_width || "200px";
    const maxGridWidth = this.parameter_list.grid_width || "100%";
    const gridGap = this.parameter_list.grid_gap || "16px";

    const style: Partial<CSSStyleDeclaration> = {
      // center grid with maximum width
      maxWidth: maxGridWidth,
      margin: "auto",
      // apply fixed gap between grid items
      gap: gridGap,
      // fit columns with target item width
      gridTemplateColumns: `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`,
      // make all rows same height
      gridAutoRows: "1fr",
    };
    return style;
  }
}
