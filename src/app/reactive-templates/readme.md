
# Reactive Templates

## Overview

Reactive templates are a feature of Open App Builder that allow you to define dynamic, data-driven UI components and logic using a declarative, template-based approach. They enable:

- Dynamic form and UI generation based on template definitions
- Reactive updates to UI when underlying data changes
- Parameterized and reusable component logic
- Integration with signals and Angular's reactivity system

## How It Works

- Templates are defined as JSON objects describing the structure, parameters, and logic of UI components.
- Each template can specify parameters, conditions, actions, and dependencies.
- The system uses Angular signals and a variable store to keep the UI in sync with data changes.
- Components implementing `RowBaseComponent` (e.g., `TextBoxComponent`, `SetVariableComponent`, etc.) are designed to work with reactive templates.

## Enabling Reactive Templates

To enable reactive templates in your app, set the `useReactiveTemplates` flag to `true` in your app configuration. This is typically done in your deployment config.ts file

```typescript
    import { generateDeploymentConfig } from "scripts";
    const config = generateDeploymentConfig("test")

    // more config here... 

    config.useReactiveTemplates = true;

    // more config here... 

    export default config;
```

Once enabled, the app will use the new reactive template system for supported flows and components.

## Reactive Expressions

| type         | name | value                                             | parameter_list     | condition             | comments                                                                                               |
| ----         | ---- | -----                                             | --------------     | ---------             | --------                                                                                               |
| text         | ex1  | This value: ${local.myVar} will be displayed      | value_type: string |                       | typical string value type in a displayed component                                                     |
| text         | ex2  | "This value" + local.myVar + "will be displayed"  | value_type: script |                       | alternative syntax to resolve a string for display                                                     |
| text         | ex3  | This is conditional                               | value_type: string | local.myVar === "foo" | condition is always evaluated as value_type: script                                                    |
| text         | ex4  | local.count > 0 ? local.count + " items" : "none" | value_type: script |                       | ternary expression returning a computed string                                                         |
| set_variable | ex5  | key: name_1 \| value: This is value 1;<br>key: name_2 \| value: This is value 2; | value_type: list   |                       | semicolon-separated entries, each with pipe-separated key:value pairs; parsed into an array of objects |
| set_variable | ex6  | key: ${local.key} \| value: static label;         | value_type: list   |                       | values may reference local/global/system variables using `${local.var}` or bare `local.var` syntax     |
| dropdown     | ex7  | key: opt_a \| value: Option A;<br>key: opt_b \| value: Option B;<br>key: opt_c \| value: Option C; | value_type: list   |                       | inline static options list for a dropdown component                                                    |

## Data list pages

Data lists can be viewed at `/data_list/<flow_name>` (all lists, with a search box, at `/data_list`).
The page shows the list's source sheet, with an **Open spreadsheet** link when it was synced from
Google Drive, and a table of the rows in its json (as loaded from app_data, before any dynamic data
changes; the first 500 rows).

## Debug: open a template's spreadsheet

With `?debugMode=true` each template shows a debugger bar. If the template has a `_source.url`
(synced from Google Drive) an **Open spreadsheet** link opens it. When running locally with no
`_source`, **Create spreadsheet** creates a Google Sheet from the template json (in the first
`google_drive.sheets_folders` folder) and opens it. This needs the local dev server running beside
`yarn start`:

```sh
yarn workflow beta dev_server            # app calls http://127.0.0.1:3010
yarn workflow beta open_sheet <flow_name>    # same thing from the terminal
yarn workflow beta create_sheet <flow_name>  # always create a new sheet
yarn workflow beta create_sheet <flow_a> <flow_b> --name <sheet_name>  # one sheet, a tab per flow
yarn workflow beta sync_transient_sheets     # sync created sheets into the app
```

Created sheets are *transient*: they go in My Drive (unless `--folder` is given) and the external
deployment json is not changed. Instead the app copy in `src/assets/app_data/sheets/<flow_type>/`
gets the sheet's `_source` and `"transient": "true"`, and the flow is added to
`src/assets/app_data/transient_sheets.json`. Next to the spreadsheet button, **Sync fixed
sheets** runs `beta sync_fixed_sheets` (the deployment `sheets_folders`, written to `google_drive/`, then
everything is re-processed into `src/assets`, which replaces transient copies), and **Sync transient
sheets** downloads the sheets in `transient_sheets.json` and re-processes only those flows into
`src/assets`. Only templates and data lists can have transient sheets.

Data lists have their own page at `/data_list/<flow_name>` (all lists at `/data_list`), showing the
same open/create spreadsheet button and a table of the list's rows from its json.

The first sheet creation asks for Google Drive permission to create files; run `open_sheet` in a
terminal once if the app reports Drive is not authorized.

## Further Reading

- See the `reactive-components` directory for available base and UI components.
- Deployment-specific components (currently PLH) live in `reactive-components/plh/`, with their own
  component map that is spread into `REACTIVE_COMPONENT_MAP`, so they can be moved to a separate package later.
- Review the `parameters.ts` file for how to define and use parameters in templates.

## TODO

Technical Tasks

* Run end to end tests on pr

Functionality not yet supported by reactive templates:

* Modals and modal navigation e.g. nav stack
* Translations

Components without reactive equivalents:

* animated-slides
* audio x
* button-apple-sign-in
* button-google-sign-in
* carousel
* combo-box x
* dashed-box
* data-items
* date-time-picker x
* drawer
* html
* icon-banner
* latex
* layout
* navigation-bar x
* number-selector
* odk-form
* pdf x
* progress-path
* qr-code
* radio-button-grid
* radio-group 
* radio-list x
* round-icon-button
* select-text
* shared-data
* simple-checkbox
* slider
* square-icon-button
* table
* task-card
* task-progress-bar
* text-area
* text-bubble
* tile-component
* timer
* youtube x
