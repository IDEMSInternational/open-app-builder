# Demo Component Package

## Intro
This demo package contains example template components that can be instantiated through the template app authoring system

## Basic component
This package contains a "basic" component for demonstration purposes. The corresponding component demo template spreadsheet can be found [here](https://docs.google.com/spreadsheets/d/1QrlhmASCDfnorV1f4XTkWAUOJlGHopCTruIDutsCY1k/edit?gid=603128459#gid=603128459).

## Adding components

### Generating component files
New components can be added to a particular component package using the Angular CLI. For example, a new component can be added to the `demo` package by running the following command: 
```sh
ng generate component packages/components/demo/<component-name>
```

### New template component boilerplate
 To make the component available to the core app code, the component class must be added to `exports` and `declarations` of the `index.ts` file for the component package. Additionally, In order to expose the new component to the spreadsheet template authoring level, a mapping should be added to the relevant `COMPONENT_MAPPING` object. The key that assigned to the value of the component class is the string that will be used in authored templates to instantiate the component. See `packages/components/demo/index.ts` for an example of these patterns.