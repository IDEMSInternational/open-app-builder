import {
  assignTranslatedFields,
  DEFAULT_LANGUAGE,
  getFlowLanguage,
  splitLanguageSuffix,
} from "./translations.transform";

/** yarn workspace scripts test -t translations.transform.spec.ts */
describe("Beta translations transform", () => {
  describe("getFlowLanguage", () => {
    it("uses the flow language, or the default", () => {
      expect(getFlowLanguage({ language: "spa" })).toEqual("spa");
      expect(getFlowLanguage({ language: " spa " })).toEqual("spa");
      expect(getFlowLanguage({})).toEqual(DEFAULT_LANGUAGE);
      expect(getFlowLanguage({ language: "" })).toEqual(DEFAULT_LANGUAGE);
    });
  });

  describe("splitLanguageSuffix", () => {
    it("splits columns ending in a language code", () => {
      expect(splitLanguageSuffix("title::eng")).toEqual({ field: "title", language: "eng" });
      expect(splitLanguageSuffix("title::kw_ar")).toEqual({ field: "title", language: "kw_ar" });
    });

    it("ignores other columns, including other uses of ::", () => {
      expect(splitLanguageSuffix("title")).toBeUndefined();
      expect(splitLanguageSuffix("fields::favourite")).toBeUndefined();
      expect(splitLanguageSuffix("::eng")).toBeUndefined();
    });
  });

  describe("assignTranslatedFields", () => {
    it("returns rows without suffixed columns unchanged", () => {
      const row = { id: "a", title: "Hello" };
      expect(assignTranslatedFields(row)).toBe(row);
    });

    it("removes the suffix, keeping the column position, and records the language", () => {
      const row = { id: "a", "title::eng": "Hello", number: 1 };
      const parsed = assignTranslatedFields(row);
      expect(parsed).toEqual({
        id: "a",
        title: "Hello",
        number: 1,
        _translatedFields: { title: { eng: "Hello" } },
      });
      expect(Object.keys(parsed)).toEqual(["id", "title", "number", "_translatedFields"]);
      expect(row).toEqual({ id: "a", "title::eng": "Hello", number: 1 });
    });

    it("treats unsuffixed columns as the flow language", () => {
      const row = { title: "Hola", "title::eng": "Hello" };
      expect(assignTranslatedFields(row, "spa")).toEqual({
        title: "Hola",
        _translatedFields: { title: { spa: "Hola", eng: "Hello" } },
      });
    });

    it("lets a suffixed column for the flow language replace the unsuffixed one", () => {
      const row = { title: "Hello?", "title::eng": "Hello" };
      expect(assignTranslatedFields(row, "eng")).toEqual({
        title: "Hello",
        _translatedFields: { title: { eng: "Hello" } },
      });
    });

    it("uses the first language given when there is no text in the flow language", () => {
      const row = { "title::eng": "Hello", "title::fra": "Bonjour" };
      expect(assignTranslatedFields(row, "spa")).toEqual({
        title: "Hello",
        _translatedFields: { title: { eng: "Hello", fra: "Bonjour" } },
      });
    });

    it("ignores empty suffixed columns", () => {
      expect(assignTranslatedFields({ id: "a", "title::eng": "" })).toEqual({ id: "a" });
      expect(assignTranslatedFields({ title: "Hi", "title::fra": "" })).toEqual({ title: "Hi" });
    });

    describe("translations", () => {
      const translations = {
        fil: { data_list: { Hello: "Kumusta" }, template: { Hello: "Kumusta (template)" } },
        spa: { data_list: { Bonjour: "Hola" } },
        fra: { data_list: { Hello: "Salut" } },
      };

      it("adds the translation of each language for the row's context", () => {
        const row = { id: "a", "title::eng": "Hello" };
        expect(assignTranslatedFields(row, "eng", { translations, context: "data_list" })).toEqual({
          id: "a",
          title: "Hello",
          _translatedFields: { title: { eng: "Hello", fil: "Kumusta", fra: "Salut" } },
        });
      });

      it("keeps authored text over translations, and matches any authored language", () => {
        const row: Record<string, any> = { "title::eng": "Hi", "title::fra": "Bonjour" };
        const parsed = assignTranslatedFields(row, "eng", { translations, context: "data_list" });
        expect(parsed._translatedFields).toEqual({
          title: { eng: "Hi", fra: "Bonjour", spa: "Hola" },
        });
      });

      it("translates unsuffixed translatable fields, e.g. template value", () => {
        const row = { type: "text", value: "Hello", include_in_translation: true };
        expect(
          assignTranslatedFields(row, "eng", {
            translations,
            context: "template",
            translatableFields: ["value"],
          })
        ).toEqual({
          ...row,
          _translatedFields: { value: { eng: "Hello", fil: "Kumusta (template)" } },
        });
      });

      it("records translatable fields without translations, and skips empty ones", () => {
        const options = { translatableFields: ["value"] };
        expect(assignTranslatedFields({ value: "Hi" }, "eng", options)).toEqual({
          value: "Hi",
          _translatedFields: { value: { eng: "Hi" } },
        });
        const empty = { value: "" };
        expect(assignTranslatedFields(empty, "eng", options)).toBe(empty);
      });
    });
  });
});
