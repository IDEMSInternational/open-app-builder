import { Pipe, PipeTransform } from '@angular/core';
/*
 * Replaces any instances of @local.var_name in text with the value of that local variable
 * Example usage
 * {{ 'Hello @local.user_name' | localVarsReplace: localVariables }}
 * if localVariables.user_name = 'Alice'; This example would become 'Hello Alice'
*/
@Pipe({name: 'localVarsReplace'})
export class LocalVarsReplacePipe implements PipeTransform {
  transform(value: any, localVars?: { [name: string]: string}): string {
    if (typeof value === "undefined") {
      return "";
    }
    if (typeof value === "boolean") {
      return "" + value;
    }
    return LocalVarsReplacePipe.parseMessageTemplate("" + value, localVars);
  }

  static parseMessageTemplate = (template: string, localVars: { [name: string]: string}) => {
    console.log("template", template);
    let output: string = "" + template;

    let regexResult: RegExpExecArray;
    // Match Rapid Pro Contact fixed variables
    let atVaraibleRegex = /@([a-z]+)\.([0-9a-zA-Z\_]+)([\.]*[0-9a-zA-Z\_]*)/gm;
    while ((regexResult = atVaraibleRegex.exec(template)) !== null) {
      let fullMatch = regexResult[0];
      let variableType = regexResult[1];
      let fieldName = regexResult[2];
      let subfieldName = regexResult[3] ? regexResult[3].substring(1) : null;
      switch (variableType) {
        case "local": {
          if (localVars) {
            output = output.replace(fullMatch, localVars[fieldName]);
          }
        }
        case "fields": {
          output = output.replace(fullMatch, "contact fields not supported yet");
          break;
        }
      }
    }

    return output;
  };
}