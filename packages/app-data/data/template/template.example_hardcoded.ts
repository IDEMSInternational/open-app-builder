/* eslint-disable */
import { FlowTypes } from "data-models";
const template: FlowTypes.Template[] = [
  {
    flow_type: "template",
    flow_subtype: "example_hardcoded",
    flow_name: "example_hardcoded_fields",
    status: "released",
    rows: [
      {
        type: "title",
        name: "title",
        value: "Example Hardcoded Fields",
        _translations: {
          value: {},
        },
        exclude_from_translation: true,
        _nested_name: "title",
      },
      {
        type: "subtitle",
        name: "deployment_name_label",
        value: "_deployment_name",
        _translations: {
          value: {},
        },
        exclude_from_translation: true,
        _nested_name: "deployment_name_label",
      },
      {
        type: "text",
        name: "deployment_name_value",
        value: "@fields._deployment_name",
        _translations: {
          value: {},
        },
        exclude_from_translation: true,
        _nested_name: "deployment_name_value",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@fields._deployment_name",
              matchedExpression: "@fields._deployment_name",
              type: "fields",
              fieldName: "_deployment_name",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields._deployment_name": ["value"],
        },
      },
      {
        type: "subtitle",
        name: "server_sync_latest_label",
        value: "_server_sync_latest",
        _translations: {
          value: {},
        },
        exclude_from_translation: true,
        _nested_name: "server_sync_latest_label",
      },
      {
        type: "text",
        name: "server_sync_latest_value",
        value: "@fields._server_sync_latest",
        _translations: {
          value: {},
        },
        exclude_from_translation: true,
        _nested_name: "server_sync_latest_value",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@fields._server_sync_latest",
              matchedExpression: "@fields._server_sync_latest",
              type: "fields",
              fieldName: "_server_sync_latest",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields._server_sync_latest": ["value"],
        },
      },
      {
        type: "subtitle",
        name: "app_language_label",
        value: "_app_language",
        _translations: {
          value: {},
        },
        exclude_from_translation: true,
        _nested_name: "app_language_label",
      },
      {
        type: "text",
        name: "app_language_value",
        value: "@fields._app_language",
        _translations: {
          value: {},
        },
        exclude_from_translation: true,
        _nested_name: "app_language_value",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@fields._app_language",
              matchedExpression: "@fields._app_language",
              type: "fields",
              fieldName: "_app_language",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields._app_language": ["value"],
        },
      },
    ],
    _xlsxPath: "quality_assurance/example_templates/hardcoded_variables.xlsx",
  },
];
export default template;
