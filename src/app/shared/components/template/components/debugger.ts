import { Component } from "@angular/core";
import { TemplateService } from "../services/template.service";
import { TemplateBaseComponent } from "./base";

@Component({
  selector: "plh-template-debugger",
  template: `
    <details #details class="debug-container" [attr.data-hidden]="_row.hidden">
      <summary style="display:flex" (click)="handleSummaryClick($event)">
        <span class="debug-row-type">{{ _row.type }}</span>
        <span class="debug-row-name">{{ _row._debug_name || _row.name || "(no name)" }}</span>
        <span *ngIf="_row.hidden === 'true'" class="debug-row-hidden"
          ><ion-icon name="eye-off"></ion-icon
        ></span>
      </summary>
    </details>
    <ion-popover [isOpen]="details.open" class="debugger-popover">
      <ng-template>
        <div style="padding:8px">
          <table>
            <th></th>
            <th></th>
            <div *ngFor="let key of _row | objectKeys" style="display:contents">
              <tr *ngIf="!debugFieldExclusions.includes(key) && _row[key]">
                <td>{{ key }}</td>
                <td>{{ _row[key] | json }}</td>
              </tr>
            </div>
          </table>
          <ion-button fill="clear" size="small" (click)="logDebugInfo()">
            (log full details)
          </ion-button>
        </div>
      </ng-template>
    </ion-popover>
  `,
  styles: [
    `
      .debug-container {
        padding: 5px;
        background: rgba(255, 255, 255, 0.95);
        font-size: small;
        overflow: auto;
      }
      .debug-container > p {
        text-align: left;
        display: flex;
        align-items: center;
        width: 100%;
        text-align: center;
      }
      .debug-container[data-hidden="true"] > summary {
        background: #e2dcf0;
        padding: 5px;
        margin: -5px;
      }
      .debug-row-type {
      }
      .debug-row-name {
        margin-left: auto;
      }
      .debug-row-hidden {
        margin-left: 8px;
      }
      table {
        padding: 2px;
        border-collapse: collapse;
        margin-top: 8px;
      }
      td {
        padding: 2px;
        border: 1px solid rgba(0, 0, 0, 0.5);
      }
    `,
  ],
})
export class TemplateDebuggerComponent extends TemplateBaseComponent {
  constructor(private templateService: TemplateService) {
    super();
  }
  public debugFieldExclusions = ["comments", "rows", "_dynamicFields", "action_list"];
  public logDebugInfo() {
    // retrieve local storage keys in the same way they would be populated in a template
    const fields = {};
    Object.keys(localStorage).forEach(
      (key) => (fields[key] = this.templateService.getField(key.replace("rp-contact-field.", "")))
    );
    console.group(this._row.type, this._row.name);
    console.log("row", this._row);
    console.log("parent rows", this.parent.templateRowMap);
    console.log("fields", fields);
    console.log("globals", this.templateService.globals);
    console.log("parent", this.parent);
    console.log("children", this._row.rows);
    console.groupEnd();
  }
  public handleSummaryClick(e: Event) {
    e.stopPropagation();
  }
}
