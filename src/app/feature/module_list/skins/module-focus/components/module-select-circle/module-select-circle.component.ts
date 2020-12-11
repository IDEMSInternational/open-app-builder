import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { FlowTypes } from "src/app/shared/model/flowTypes";

type Module = FlowTypes.Module_listRow;

type ModuleCircle = {
  id: string;
  left: string;
  top: string;
  cssClass: string;
  icon_asset: string;
};

@Component({
  selector: "plh-module-select-circle",
  templateUrl: "./module-select-circle.component.html",
  styleUrls: ["./module-select-circle.component.scss"],
})
export class ModuleSelectCircleComponent implements OnChanges {
  @Input() modules: Module[];
  @Input() currentModule: Module;

  @Output() onModuleChange: EventEmitter<Module> = new EventEmitter();
  outerModuleCircles: ModuleCircle[] = [];

  innerCircleDiameter: number = 90; // Number in px
  outerCirclesDiameter: number = 50; // Number in px

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.modules) {
      this.outerModuleCircles = this.modules.map((module, index) => {
        // position points around a circle
        const angleRadians = (Math.PI * 2 * index * -1) / this.modules.length;
        const radius = 28;
        const x = 40 + radius * Math.sin(angleRadians + Math.PI);
        const y = 50 + radius * Math.cos(angleRadians + Math.PI);
        let cssClass = "outer-circle";
        if (module.id === this.currentModule.id) {
          cssClass += " current-module";
        }
        const diameter = this.outerCirclesDiameter;
        return {
          id: module.id,
          icon_asset: module.icon_asset,
          left: `calc(${x}% - ${diameter / 2}px`,
          top: `calc(${y}% - ${diameter / 2}px`,
          cssClass,
        };
      });
    }
  }

  onModuleClicked(e: Event, moduleId: string) {
    // prevent event bubbling that could close the components main container
    e.stopPropagation();
    const matchingModule = this.modules.find((mod) => mod.id === moduleId);
    this.onModuleChange.emit(matchingModule);
  }
}
