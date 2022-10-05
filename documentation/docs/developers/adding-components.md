# Adding Components

Example adding a `subtitle` component

## Register type definition and component mapping
All google sheet template rows are type-checked, and as such any new row types need to have their type definitions and component mappings registered.

  ```ts title="packages\data-models\flowTypes.ts"
  export type TemplateRowType =
      | "subtitle"
  ```
  ```ts title="src\app\shared\components\template\components\index.ts"
  import { TemplateSubtitleComponent } from "./subtitle";

  export const TEMPLATE_COMPONENTS = [
    TemplateSubtitleComponent
  ]

  export const TEMPLATE_COMPONENT_MAPPING = {
    subtitle: TemplateSubtitleComponent,
  ```

## Create example template
There should ideally be at least two examples created, one with basic configuration and others showing the full range of parameter options

These can be authored in the [components_demo](https://drive.google.com/drive/folders/1k1SCF6PFHwGK2fNPzKtyBrjn3zSW87rw) google drive folder

!!! caution
    The example sheet should be kept in draft state to avoid type-errors if merged into branches without type updates.

    Instead just temporarily mark as released if needing to sync into local branch

## Create documentation
All components should have documentation added to the `documentation` folder. 

Follow authoring instructions in [Adding Documentation](../../contributors/documentation/authoring/#component-docs) and see demos in the local `documentation/docs/components` folder
