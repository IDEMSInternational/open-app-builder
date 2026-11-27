import { signal } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { FlowTypes } from "packages/data-models";
import { RadioButtonGridComponent } from "./radio-button-grid.component";
import { ActionService } from "../../../services/action.service";
import { EvaluationService } from "../../../services/evaluation.service";
import { NamespaceService } from "../../../services/namespace.service";
import { RowRegistry } from "../../../services/row.registry";
import { VariableStore } from "../../../stores/variable-store";
import { TemplateMetadataService } from "src/app/shared/components/template/services/template-metadata.service";
import { ActivatedRoute, Router } from "@angular/router";

describe("RadioButtonGridComponent", () => {
  let component: RadioButtonGridComponent;
  let fixture: ComponentFixture<RadioButtonGridComponent>;
  let mockRow: FlowTypes.TemplateRow;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RadioButtonGridComponent],
      providers: [
        { provide: ActionService, useValue: {} },
        {
          provide: EvaluationService,
          useValue: {
            evaluateExpression: (value: any) => value,
            getDependencies: () => [],
            hasDynamicIndexer: () => false,
          },
        },
        { provide: NamespaceService, useValue: { getFullName: (_: string, name: string) => name } },
        {
          provide: RowRegistry,
          useValue: { has: () => false, register: () => {}, unregister: () => {} },
        },
        { provide: VariableStore, useValue: { asSignal: () => signal(undefined), set: () => {} } },
        { provide: TemplateMetadataService, useValue: { templateName: () => "" } },
        { provide: ActivatedRoute, useValue: {} },
        { provide: Router, useValue: { url: "/", events: of() } },
      ],
    });
    fixture = TestBed.createComponent(RadioButtonGridComponent);
    component = fixture.componentInstance;
    mockRow = {
      _nested_name: "radio_button_grid",
      name: "radio_button_grid",
      type: "radio_button_grid",
      parameter_list: {},
    };
    fixture.componentRef.setInput("row", mockRow);
    fixture.detectChanges();
  });

  it("stores the selected key and triggers changed actions", async () => {
    const setExpression = spyOn(component, "setExpression").and.resolveTo();
    const triggerActions = spyOn(component, "triggerActions");
    await component.handleKeySelection("option_2");
    expect(setExpression).toHaveBeenCalledWith("option_2");
    expect(triggerActions).toHaveBeenCalledWith("changed");
  });

  it("does not trigger changed actions when the selected key is unchanged", async () => {
    component.value = signal("option_2");
    const setExpression = spyOn(component, "setExpression").and.resolveTo();
    const triggerActions = spyOn(component, "triggerActions");

    await component.handleKeySelection("option_2");

    expect(setExpression).not.toHaveBeenCalled();
    expect(triggerActions).not.toHaveBeenCalled();
  });

  it("stores the selected option as an object when value_as_object is true", async () => {
    component.params.answerList.setValue([
      { name: "option_1", text: "First" },
      { name: "option_2", text: "Second" },
    ]);
    component.params.valueAsObject.setValue(true);
    const setExpression = spyOn(component, "setExpression").and.resolveTo();
    spyOn(component, "triggerActions");

    await component.handleKeySelection("option_2");

    expect(setExpression).toHaveBeenCalledWith({ key: "option_2", value: "Second" });
  });

  it("derives the selected key from an object value", () => {
    component.params.valueAsObject.setValue(true);
    component.value = signal({ key: "option_2", value: "Second" });

    expect(component.selectedKey()).toBe("option_2");
  });

  it("applies the initial selected option without triggering changed actions", async () => {
    component.params.answerList.setValue([{ name: "option_2", text: "Second" }]);
    component.params.initialSelectedOptionKey.setValue("option_2");
    const setExpression = spyOn(component, "setExpression").and.resolveTo();
    const triggerActions = spyOn(component, "triggerActions");

    fixture.detectChanges();
    await fixture.whenStable();

    expect(setExpression).toHaveBeenCalledWith("option_2");
    expect(triggerActions).not.toHaveBeenCalled();
  });

  it("does not override a value authored on the row", async () => {
    spyOn(component, "expression").and.returnValue("option_1");
    component.params.answerList.setValue([{ name: "option_2", text: "Second" }]);
    component.params.initialSelectedOptionKey.setValue("option_2");
    const setExpression = spyOn(component, "setExpression").and.resolveTo();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(setExpression).not.toHaveBeenCalled();
  });

  it("warns when the initial selected option key matches no option", async () => {
    const warn = spyOn(console, "warn");
    component.params.answerList.setValue([{ name: "option_2", text: "Second" }]);
    component.params.initialSelectedOptionKey.setValue("option_3");

    fixture.detectChanges();
    await fixture.whenStable();

    expect(warn).toHaveBeenCalledWith(
      jasmine.stringContaining("does not match any answer option"),
      jasmine.anything()
    );
  });

  it("reads options from a `key: value` text list", () => {
    component.params.answerList.setValue("name: a | text: A; name: b | text: B");

    expect(component.radioItems().map((item) => item.name)).toEqual(["a", "b"]);
  });

  it("reads options from a list stored as JSON text", () => {
    component.params.answerList.setValue('[{"name":"a","text":"A"},{"name":"b","text":"B"}]');

    expect(component.radioItems().map((item) => item.name)).toEqual(["a", "b"]);
  });

  it("falls back to the default variant for an unknown variant", () => {
    component.params.variant.setValue("Card" as any);

    expect(component.params.variant.value()).toBe("default");
  });

  it("matches a numeric option key with the stored text key", () => {
    component.params.answerList.setValue([{ name: 1, text: "One" }]);
    component.value = signal("1");

    expect(component.isOptionSelected(component.radioItems()[0])).toBeTrue();
    expect(component.selectedOptionKey()).toBe(1 as any);
  });

  it("does not trigger changed actions when the selected object key is unchanged", async () => {
    component.params.valueAsObject.setValue(true);
    component.value = signal({ key: "option_2", value: "Second" });
    const setExpression = spyOn(component, "setExpression").and.resolveTo();

    await component.handleKeySelection("option_2");

    expect(setExpression).not.toHaveBeenCalled();
  });
});
