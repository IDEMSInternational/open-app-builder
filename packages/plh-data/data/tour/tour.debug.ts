/* eslint-disable */
import { FlowTypes } from "data-models";
const tour: FlowTypes.Tour[] = [
  {
    flow_type: "tour",
    flow_name: "example_lang_tour",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "step",
        title: "<p>Standard Template</p>",
        _translations: {
          title: {
            spa: true,
          },
          message_text: {
            spa: true,
          },
        },
        message_text:
          "<p>This is a standard template that demonstrates a variety of things that would need to be translated and a few things that are excluded from translation.</p>",
        route: "template/example_lang_template_1",
      },
      {
        type: "step",
        title: "<p>Nested Template</p>",
        _translations: {
          title: {
            spa: true,
          },
          message_text: {
            spa: true,
          },
        },
        message_text:
          "<p>This is a nested template that demonstrates a variety of things that would need to be translated and a few things that are excluded from translation. This will allow us to check that the multi-lingual system works with nesting.</p>",
        route: "template/example_lang_template_2",
      },
      {
        type: "step",
        title: "<p>Component to translate</p>",
        _translations: {
          title: {
            spa: true,
          },
          message_text: {
            spa: true,
          },
        },
        message_text:
          "<p>This is an example of a component that requires translation: the placeholder text and the selected option should be translated</p>",
        template_component_name: "combo_box",
        route: "template/example_lang_template_1",
      },
      {
        type: "step",
        title: "<p>Component that should not be translated translate</p>",
        _translations: {
          title: {
            spa: true,
          },
          message_text: {
            spa: true,
          },
        },
        message_text:
          "<p>This is an example of a component that is excluded from translation. The button text should still be Pop-up 1.</p>",
        template_component_name: "button_1",
        route: "template/example_lang_template_1",
      },
      {
        type: "step",
        title: "<p>Step without translation</p>",
        _translations: {
          title: {
            spa: false,
          },
          message_text: {
            spa: false,
          },
        },
        message_text:
          "<p>This step in the tour should not be translated as the exclude_from_translation column is TRUE.</p>",
        route: "template/example_lang_template_1",
        exclude_from_translation: true,
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_languages.xlsx",
  },
];
export default tour;
