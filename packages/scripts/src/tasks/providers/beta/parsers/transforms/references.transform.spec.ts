import { FlowDebugLog } from "../flowDebugLog";
import { recordTemplateReferences } from "./references.transform";

/** yarn workspace scripts test -t references.transform.spec.ts */
describe("recordTemplateReferences", () => {
  it("records nested templates and navigation once each, in order", () => {
    const log = new FlowDebugLog();
    recordTemplateReferences(
      [
        { type: "template", value: "header" },
        { type: "begin_template", value: "card" },
        { type: "end_template" },
        { type: "begin_nav", value: "nav_tabs" },
        { type: "text", value: "not a template" },
        { type: "template", value: "header" },
        { type: "template", value: "" },
        { type: "display_group", rows: [{ type: "template", value: " footer " }] },
      ],
      log
    );
    expect(log.references).toEqual({
      nested_templates: ["header", "card", "footer"],
      navigation: ["nav_tabs"],
    });
  });

  it("records nav rows and go_to actions with any trigger as navigation", () => {
    const log = new FlowDebugLog();
    recordTemplateReferences(
      [
        { type: "nav", value: "nav_a" },
        {
          type: "button",
          action_list: [
            { trigger: "click", action_id: "go_to", args: ["plh_parent_menu"] },
            { trigger: "click", action_id: "set_local", args: ["x", "1"] },
          ],
        },
        { type: "button", action_list: ["completed | go_to : home_screen"] },
        { type: "button", action_list: "@item.action_list" },
      ],
      log
    );
    expect(log.references.navigation).toEqual(["nav_a", "plh_parent_menu", "home_screen"]);
  });
});
