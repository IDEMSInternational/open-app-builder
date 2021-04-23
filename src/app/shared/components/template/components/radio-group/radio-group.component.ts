import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { ITemplateRowProps } from "../../models";
import { TemplateContainerComponent } from "../../template-container.component";
import {
  getNumberParamFromTemplateRow,
  getParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "../../../../utils";
import { takeUntil } from "rxjs/operators";
import { ReplaySubject } from "rxjs";
import { TemplateService } from "../../services/template.service";

interface IButton {
  name: string | null;
  image: string | null;
  text: string | null;
  image_checked: string | null;
}

@Component({
  selector: "plh-radio-group",
  templateUrl: "./radio-group.component.html",
  styleUrls: ["./radio-group.component.scss"],
})
export class TmplRadioGroupComponent
  extends TemplateBaseComponent
  implements ITemplateRowProps, OnInit, OnDestroy {
  @Input() changeTheme: EventEmitter<boolean>;
  @Input() parent: TemplateContainerComponent;
  @ViewChild("labelImage", { static: false, read: true }) labelImage: ElementRef;
  radioBtnList: any;
  valuesFromBtnList;
  arrayOfBtn: Array<IButton>;
  groupName: string;
  radioButtonType: string | null;
  options_per_row: number = 2;
  baseSrcAssets = "/assets/plh_assets/";
  windowWidth: number;
  scaleFactor: number = 1;
  value: any;
  style: string;
  destroy$ = new ReplaySubject(1);
  imageCheckedColor = "#0D3F60";
  flexWidth: string;
  checkIfContainsStyleParameter: boolean = false;
  @HostListener("window:resize", ["$event"]) onResize(event) {
    this.windowWidth = event.target.innerWidth;
    this.getScaleFactor();
  }

  @HostBinding("style.--scale-factor") get scale() {
    return this.scaleFactor;
  }

  constructor(private templateService: TemplateService) {
    super();
  }

  ngOnInit() {
    this.getParams();
    this.getScaleFactor();
    this.setAutoBackground();
    this.checkTheme();
  }

  getScaleFactor(): number {
    this.scaleFactor =
      this.windowWidth / (150 * this.options_per_row) > 1
        ? 1
        : this.windowWidth / ((120 + 20) * this.options_per_row);
    return this.scaleFactor;
  }

  getParams() {
    this.radioBtnList = getParamFromTemplateRow(this._row, "answer_list", null);
    this.radioButtonType = getStringParamFromTemplateRow(
      this._row,
      "radio_button_type",
      "btn_text"
    );
    this.options_per_row = getNumberParamFromTemplateRow(this._row, "options_per_row", 3);
    this.style = getStringParamFromTemplateRow(this._row, "style", "");
    this.checkIfContainsStyleParameter =
      this.style.includes("active") ||
      this.style.includes("passive") ||
      this.style.includes("transparent");
    this.imageCheckedColor = this.style === "active" ? "#f89b2d" : "#0D3F60";
    this.windowWidth = window.innerWidth;
    if (this.radioBtnList) {
      this.valuesFromBtnList = this.radioBtnList.split(",").filter((item) => item !== "");
      this.createArrayBtnElement();
    }
    this.getFlexWidth();
    // Temporary fix to give appropriate group names to radiobutton
    // was previously _row.name
    // but this is incorrect because of template nesting meaning these names are
    // not unique on a page
    // not sure what the correct implementation should be. It could be the
    // full name with template stack, a counter on the row name or a unique random id
    this.groupName = Math.random().toString();
  }

  createArrayBtnElement() {
    this.arrayOfBtn = this.valuesFromBtnList.map((item) => {
      const obj: IButton = {
        text: null,
        image: null,
        name: null,
        image_checked: null,
      };
      item.split("|").map((values) => {
        var valChunks = values.split(":");
        if (valChunks.length > 1) {
          obj[valChunks[0].trim()] = valChunks[1].trim();
        }
      });
      obj.image = obj.image ? this.getPathImg(obj.image) : obj.image;
      obj.image_checked = obj.image_checked
        ? this.getPathImg(obj.image_checked)
        : obj.image_checked;
      return obj;
    });
    this.arrayOfBtn.forEach((item) => {
      if (item.image && item.text) {
        this.radioButtonType = "btn_both";
      } else if (!item.image && item.text) {
        this.radioButtonType = "btn_text";
      } else if (item.image && !item.text) {
        this.radioButtonType = "btn_image";
      }
    });
  }

  getPathImg(path): string {
    const src = this.baseSrcAssets + path;
    return src.replace("//", "/");
  }

  getFlexWidth() {
    this.flexWidth = `0 1 ${100 / this.options_per_row - 7}%`;
  }

  setAutoBackground() {
    if (!this.checkIfContainsStyleParameter) {
      const currentBgColor = document.body.style
        .getPropertyValue("--ion-background-color")
        .toLocaleLowerCase();
      this.style = currentBgColor === "#FFF6D6".toLocaleLowerCase() ? "active" : "passive";
    }
  }

  checkTheme() {
    return (
      !this.checkIfContainsStyleParameter &&
      this.templateService.currentTheme
        .pipe(takeUntil(this.destroy$))
        .subscribe((value) => (this.style = value))
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
