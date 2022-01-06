import { Pipe, PipeTransform } from "@angular/core";
import { TemplateTranslateService } from "../services/template-translate.service";

/**
 * For cases when values cannot be translated during template rendering such
 * as array or object parsing, the `translate` pipe can be used to provide text translations on render.
 * Currently this is only required for combo_box and radio_group types
 * TODO - would be better not to rely on this as could be used inconsistently (better all handled by parsers)
 * @example
 * ```
 * <div>{{parameters.option1 | translate}}</div>
 * ```
 */
@Pipe({ name: "translate" })
export class TranslatePipe implements PipeTransform {
  constructor(private templateTranslate: TemplateTranslateService) {}
  transform(value: string) {
    return this.templateTranslate.translateValue(value);
  }
}
