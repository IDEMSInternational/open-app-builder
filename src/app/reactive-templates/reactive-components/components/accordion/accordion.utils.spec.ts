import { getAccordionMultiple } from "./accordion.utils";

describe("getAccordionMultiple", () => {
  it("uses the legacy open_multiple parameter when supplied", () => {
    expect(getAccordionMultiple({ multiple: "true", open_multiple: "false" }, true, false)).toBe(
      false
    );
  });

  it("uses multiple when open_multiple is not supplied", () => {
    expect(getAccordionMultiple({ multiple: "false" }, false, true)).toBe(false);
    expect(getAccordionMultiple({}, true, false)).toBe(true);
  });
});
