import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { FlowTypes } from "packages/data-models";

import { TmplRadioListComponent } from "./radio-list.component";
import { DataItemsService } from "../data-items/data-items.service";

/** Authored answer list, in the string format used within a sheet parameter_list */
const ANSWER_LIST = "name: option_1 | text: First;\nname: option_2 | text: Second;";

const MOCK_ROW = (overrides: Partial<FlowTypes.TemplateRow> = {}): FlowTypes.TemplateRow => ({
  _nested_name: "radio_list_1",
  name: "radio_list_1",
  type: "radio_list",
  ...overrides,
});

describe("RadioListComponent", () => {
  let component: TmplRadioListComponent;
  let fixture: ComponentFixture<TmplRadioListComponent>;
  let handleActions: jasmine.Spy;

  /** Render the component with the given row, returning once effects have settled */
  async function renderRow(row: FlowTypes.TemplateRow) {
    fixture = TestBed.createComponent(TmplRadioListComponent);
    fixture.componentRef.setInput("row", row);
    fixture.componentRef.setInput("parent", { handleActions });
    component = fixture.componentInstance;
    // Flush the initial selection effect and the async setValue it schedules
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  beforeEach(waitForAsync(async () => {
    handleActions = jasmine.createSpy("handleActions").and.resolveTo(undefined);
    await TestBed.configureTestingModule({
      declarations: [TmplRadioListComponent],
      providers: [{ provide: DataItemsService, useValue: {} }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  it("should create", async () => {
    await renderRow(MOCK_ROW());
    expect(component).toBeTruthy();
  });

  describe("initial_selected_option_key", () => {
    it("selects the named option as a plain key value", async () => {
      await renderRow(
        MOCK_ROW({
          parameter_list: { answer_list: ANSWER_LIST, initial_selected_option_key: "option_2" },
        })
      );
      expect(component.value()).toEqual("option_2");
      expect(component.selectedKey()).toEqual("option_2");
    });

    it("selects the named option as an object value when value_as_object is true", async () => {
      await renderRow(
        MOCK_ROW({
          parameter_list: {
            answer_list: ANSWER_LIST,
            initial_selected_option_key: "option_2",
            value_as_object: "true",
          },
        })
      );
      expect(component.value()).toEqual({ key: "option_2", value: "Second" });
      expect(component.selectedKey()).toEqual("option_2");
    });

    it("sets the value via set_self without triggering changed actions", async () => {
      await renderRow(
        MOCK_ROW({
          action_list: [{ trigger: "changed", action_id: "set_field", args: ["a", "b"] }],
          parameter_list: { answer_list: ANSWER_LIST, initial_selected_option_key: "option_2" },
        })
      );
      expect(handleActions).toHaveBeenCalledTimes(1);
      const [actions] = handleActions.calls.mostRecent().args;
      expect(actions).toEqual([
        jasmine.objectContaining({ action_id: "set_self", args: ["radio_list_1", "option_2"] }),
      ]);
    });

    it("does not override a value authored on the row", async () => {
      await renderRow(
        MOCK_ROW({
          value: "option_1",
          parameter_list: { answer_list: ANSWER_LIST, initial_selected_option_key: "option_2" },
        })
      );
      expect(component.value()).toEqual("option_1");
      expect(handleActions).not.toHaveBeenCalled();
    });

    it("leaves the value unset when no option matches", async () => {
      await renderRow(
        MOCK_ROW({
          parameter_list: { answer_list: ANSWER_LIST, initial_selected_option_key: "option_3" },
        })
      );
      expect(component.value()).toBeUndefined();
      expect(handleActions).not.toHaveBeenCalled();
    });
  });
});
