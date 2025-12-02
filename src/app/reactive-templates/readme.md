
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

## Further Reading

- See the `reactive-components` directory for available base and UI components.
- Review the `parameters.ts` file for how to define and use parameters in templates.

## TODO

Technical Tasks

* Run end to end tests on pr

Features

* update component (data list update)
* action component
* navigation component

Functionality not yet supported by reactive templates:

* Display Groups
* Global Variables
* Template debug mode
* Modals and modal navigation e.g. nav stack
* Clearing variable store when loading a new page?

Components without reactive equivalents:

* accordion
* animated-slides
* audio
* button-apple-sign-in
* button-google-sign-in
* carousel
* combo-box
* dashed-box
* data-items
* date-time-picker
* drawer
* html
* icon-banner
* latex
* layout
* navigation-bar
* number-selector
* odk-form
* pdf
* progress-path
* qr-code
* radio-button-grid
* radio-group
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
* youtube
