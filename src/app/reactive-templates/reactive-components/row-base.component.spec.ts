import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { FlowTypes } from "src/app/shared/model";
import { TemplateMetadataService } from "src/app/shared/components/template/services/template-metadata.service";
import { ActionService } from "../services/action.service";
import { VariableStore } from "../stores/variable-store";
import { defineParameters, Parameter } from "./parameters";
import { ROW_PARAMETERS, RowBaseComponent } from "./row-base.component";

const parameters = () =>
  defineParameters({
    multiple: new Parameter("multiple", false),
    disabled: new Parameter("disabled", false, "script"),
    showCloseButton: new Parameter("show_close_button", true, "script"),
    placeholder: new Parameter("placeholder", "Type here"),
  });

@Component({
  selector: "oab-test-row",
  template: "",
  providers: [{ provide: ROW_PARAMETERS, useFactory: parameters }],
})
class TestRowComponent extends RowBaseComponent<ReturnType<typeof parameters>> {}

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/reactive-templates/reactive-components/row-base.component.spec.ts
 */
describe("RowBaseComponent", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: ActionService, useValue: {} },
        { provide: TemplateMetadataService, useValue: { templateName: () => "" } },
      ],
    });
    TestBed.inject(VariableStore).clear();
  });

  function renderRow(parameter_list: FlowTypes.TemplateRow["parameter_list"]) {
    const fixture = TestBed.createComponent(TestRowComponent);
    fixture.componentRef.setInput("row", { type: "test", name: "test_row", parameter_list });
    fixture.detectChanges();
    return fixture.componentInstance.params;
  }

  it("reads TRUE and FALSE in string and script parameters", () => {
    const params = renderRow({ multiple: "TRUE", disabled: "TRUE", show_close_button: "FALSE" });

    expect(params.multiple.value()).toBeTrue();
    expect(params.disabled.value()).toBeTrue();
    expect(params.showCloseButton.value()).toBeFalse();
  });

  it("uses the default for a parameter set to an unset variable", () => {
    const params = renderRow({ placeholder: "@local.hint", show_close_button: "@local.flag" });

    expect(params.placeholder.value()).toBe("Type here");
    expect(params.showCloseButton.value()).toBeTrue();
  });
});
