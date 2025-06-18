import { Component, computed, effect } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { getStringParamFromTemplateRow } from "../../../../utils";
import { FlowTypes } from "packages/data-models";
import { TemplateTranslateService } from "../../services/template-translate.service";

interface ITextParams {
  style?: string | null;
  textAlign?: string | null;
  type?: string;
  /**
   * TEMPLATE PARAMETER: "language_code". The target language code to translate the value to.
   * Used for displaying text in a different language to the global app language.
   * */
  languageCode?: string;
}

@Component({
  selector: "plh-tmpl-text",
  templateUrl: "./text.component.html",
  styleUrls: ["../tmpl-components-common.scss", "./text.component.scss"],
})
export class TmplTextComponent extends TemplateBaseComponent {
  params = computed(() => this.getParams(this.parameterList()));
  hasTextValue: boolean;
  currentLanguageCode: string = this.templateTranslateService.app_language;

  constructor(public templateTranslateService: TemplateTranslateService) {
    super();
    effect(async () => {
      const targetLanguageCode = this.params().languageCode;
      if (targetLanguageCode) {
        const translatedValue = await this.templateTranslateService.translateValueToLanguage(
          this.value(),
          targetLanguageCode,
          this.currentLanguageCode
        );
        if (translatedValue) {
          this.setValue(translatedValue);
        }
        this.currentLanguageCode = targetLanguageCode;
      }
    });
  }

  private getParams(authorParams?: FlowTypes.TemplateRow["parameter_list"]): ITextParams {
    this.hasTextValue = !["undefined", "NaN", "null", '""'].includes(this._row.value as string);
    return {
      textAlign: getStringParamFromTemplateRow(this._row, "text_align", null),
      type: this._row.parameter_list?.style?.includes("numbered") ? "numbered" : "marked",
      style: getStringParamFromTemplateRow(this._row, "style", null),
      languageCode: getStringParamFromTemplateRow(this._row, "language_code", null),
    };
  }
}
