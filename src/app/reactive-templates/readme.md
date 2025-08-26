
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
