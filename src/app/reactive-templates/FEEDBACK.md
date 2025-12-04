# Reactive Templates Feedback

## Overview
This document serves as a central repository for architectural feedback, technical concerns, and feature requests for the Reactive Templates feature. It is intended to guide future development and refactoring efforts.

---

## 1. Highlights
> Architectural wins and patterns to encourage.

### True Reactivity
- **React State Management**: The use of **Signals** and **RxJS** creates a robust dependency graph external to the template rows.
- **Efficiency**: Components only update when their specific dependencies change, avoiding the performance pitfalls of dirty-checking the entire tree.

### Clean Architecture
- **Encapsulation**: The `RowBaseComponent` abstraction provides clean code encapsulation, making it straightforward to add new component types without modifying the core engine.
- **Minimalism**: The implementation feels significantly more minimal than previous iterations.

### Developer Experience
- **JSON5**: Embracing JSON5 allows for easier authoring of complex nested data structures compared to single Excel cells.
- **Documentation**: The codebase encourages documentation through examples and future TDD practices.
- **Testing**: Cypress integration (planned/existing) for end-to-end verification.

---

## 2. Concerns
> Critical issues, performance risks, and complexity warnings.

### Architecture: Runtime Data Parsing
- **Severity**: High
- **Context**: `ArrayOfObjectsParser.parseExpression` (see `src/app/reactive-templates/services/type-parsers/array-of-objects.parser.ts`)
- **Issue**: Data types (like answer lists) are parsed at runtime using custom formats (e.g., `key: name | value: val;`) instead of a standard parser.
- **Risk**: 
    - Inherits legacy inconsistencies.
    - "Inline runtime parsing" for query lists with variables in JSON5 confuses raw JSON vs. custom app data parser syntax.
    - Fragile regex/split-based parsing is error-prone.
- **Mitigation**: Move parsing to a build-time step or enhance the main parser to accept JSON5 directly.

### Architecture: Parameter Validation
- **Severity**: Medium
- **Context**: `Parameter.cast` (see `src/app/reactive-templates/reactive-components/parameters.ts`)
- **Issue**: The current `Parameter` class mixes state management with rudimentary type casting (`Number()`, `String()`).
- **Risk**: Lack of strict validation (like Zod) means invalid parameters are only caught at runtime, potentially causing silent failures.
- **Mitigation**: Adopt a Zod-based approach to validate parameters at the parser level before runtime.

### Architecture: Circular Dependencies
- **Severity**: High
- **Context**: `EvaluationService` & `VariableStore`
- **Issue**: No explicit mechanism to detect or handle circular dependencies between reactive variables.
- **Risk**: Infinite loops or stack overflows if Variable A depends on Variable B and vice versa.

---

## 3. Challenges
> Unresolved architectural problems that need design work.

### State Passing
- **Context**: `TemplateService`
- **Issue**: Current `begin_template` syntax is limited to a handful of named variables.
- **Need**: A general syntax for passing inputs that works for inline templates, pop-ups, and `go_to` templates.

### Namespace Management
- **Context**: `NamespaceService`
- **Issue**: Handling variables across namespaces, especially with multiple nested templates of the same name or "global" variables.

---

## 4. Wishlist
> Feature requests, DX improvements, and missing capabilities.

### Standards & Syntax
- [ ] **Standardized Input/Output**: Create new standards for template input/output variables.
- [ ] **Syntax Migration**: Migrate away from `@var` syntax in favor of standard interpolation like `${var}`.

### Developer Experience
- [ ] **Parser-friendly data validators**: Tools to validate template JSON against schema during development, and easily flag breaking changes for future authors.



## 5. Future Feedback
> Not discussed in detail during call, will review more in future

- Data loops
- Data list operators (and other structures to create or modify lists at runtime)
- Dynamic evaluation
- Actions