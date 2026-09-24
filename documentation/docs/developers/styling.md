# Styling

This page answers two questions: where a style rule belongs, and why a rule that looks correct
isn't winning.

For themes specifically — how one is built, parent themes, adding a child theme — see
[Themes](./themes.md).

## The layers

| Layer | Where | Use it for |
| --- | --- | --- |
| Component styles | `*.component.scss` next to the component | How a component looks by default, in every theme |
| Component global styles | `*.component.global.scss`, registered in `src/theme/_components.scss` | Parts of a component that its own styles cannot reach (see [below](#content-a-component-cannot-reach)) |
| App-wide styles | `src/theme/variables.scss`, `_typography.scss`, `_layout.scss` | Base variable values, and styling of plain HTML that components render |
| Themes | `src/theme/themes/*/_index.scss` (variables), then `_overrides.scss` (rules) | Anything that differs between deployments |
| Deployment styles | `src/theme/deployment/` | Rules that apply to every deployment, including hacks that don't belong to one component |
| Platform overrides | `src/theme/overrides.ios.scss` | Differences between iOS and Android |

`src/global.scss` pulls these together, and `variables.scss` is where every theme is included, so
theme rules land in the cascade at that point.

Component styles are the exception: Angular injects them at runtime rather than through
`global.scss`, so you cannot reason about component styles versus global styles by source order.
Specificity decides, which is the subject of the next section.

Prefer the highest layer that can express the change. A component style is one rule that every
theme benefits from; a theme override is a copy that has to be maintained separately and breaks
quietly when the component changes.

## Why a theme override may lose to a component

Component styles are compiled with Angular's emulated encapsulation, which rewrites their
selectors to include an attribute unique to that component:

```scss
// audio.component.scss, as authored
.container-player .btn-play ion-icon { … }

// as compiled (the id is generated per component)
.container-player .btn-play ion-icon[_ngcontent-ng-c12345] { … }
```

A theme override contributes one attribute (`[data-theme="…"]`) plus a few element names. A
component selector contributes a class for each level of nesting, plus that encapsulation
attribute. Specificity counts classes and attributes together and ranks them above element names,
so a deeply nested component rule frequently outranks a theme override:

| Selector | Specificity |
| --- | --- |
| `[data-theme="x"] body plh-audio ion-icon` | 0,1,3 |
| `.container-player .btn-play ion-icon[_ngcontent-…]` | 0,3,1 |

This is why `_overrides.scss` files carry so much `!important`. It is usually not carelessness —
it is what made the rule apply at all. When you move a rule out of a theme override and into a
component, check what was actually winning before, rather than assuming the override was in
effect.

A few components set `ViewEncapsulation.None` (`plh-template-component` among them), so their
styles are global and get no encapsulation attribute. Rules in those files apply everywhere and
need to be written defensively.

## Custom properties resolve where they are declared

A `var()` inside a custom property is substituted on the element where that property is
**declared**, not where it is eventually used:

```scss
:root {
  --paragraph-spacing: 0.75em;
  // Resolves here, against :root — a theme that sets --paragraph-spacing will not change it
  --text-outer-margin: var(--paragraph-spacing);
}
```

So a default written at `:root` that refers to another variable captures the base value and
ignores whatever a theme sets. Defaults that need to follow a theme's own values are declared per
theme instead, in `$component-variable-defaults` in `themes/utils/generate-theme.scss`. Fixed
values belong in `variables.scss`.

Note that lengths are not affected by this. A custom property holds unresolved tokens, so
`--text-outer-margin: 0.75em` inherited by a child still resolves `em` against that child's own
font size.

### Never declare theme variables below the theme scope

Theme variables are declared on `body` (see `themes/utils/theme-selectors.scss`). Anything that
re-declares one of them on an element **inside** `body` wins for everything within it, silently
disabling that variable for every theme.

If a value needs to apply everywhere, give it a base value in `variables.scss`. Declaring it lower
in the tree does not make it a stronger default, it makes it an unconditional one.

## Content a component cannot reach

Some markup is outside the reach of a component's own encapsulated styles. That is what
`*.component.global.scss` files are for; each is registered in `src/theme/_components.scss`.

**Markdown rendered through `[innerHTML]`.** The generated elements carry no encapsulation
attribute, so component styles never match them. The text bubble styles its markdown this way.

**Ionic components injected elsewhere in the DOM.** Modals are created by `ModalController` and
attached outside the component that opened them, so their styling has to be global. Nav-stacks and
popups both work this way.

### Modals get a second copy of every theme variable

Each theme emits its variables twice — on `[data-theme] body`, and again on
`[data-theme] ion-modal::part(content)`. The second exists because a modal's content is inside a
shadow root, and the part is the only handle on it.

Two consequences:

- The part declaration sits **deeper** than anything on `body`, so inside a modal it wins. If the
  two ever disagree, page content and modal content render differently.
- You cannot write descendant selectors after `::part()`. Rules nested under it are emitted but
  never match, so only the variable declarations take effect.

"Modal" here means everything Ionic presents as one: nav-stacks, template popups, the combo box
modal and search, the audio transcript, the reactive dropdown. A nav-stack holds a whole template,
so a change that looks like it affects a dialog can affect a main app flow.

## Page rows and nested content

A template's rows are rendered by `plh-template-container`, which is the only place that gives a
row `class="row"`. Components that render child rows — display groups, text bubbles, accordions —
render them as plain `plh-template-component`.

Row spacing follows the same distinction. `template-component.scss` applies `--row-margin-top`
only to direct children of a container:

```scss
plh-template-container > plh-template-component:not([data-hidden="true"])
  ~ plh-template-component:not([data-hidden="true"]) {
  margin-top: var(--row-margin-top);
}
```

Rows nested inside a component get no row spacing, and are spaced by whatever that component
provides.

So a rule meant for page-level content has to say so, by targeting
`plh-template-component.row > …`. A rule written against the component alone also applies to every
copy of it nested inside a container, where the container's own padding is usually already
handling the spacing — and where the result depends on what the container happens to hold.

## Checking a change

Theme CSS is generated at build time, so a change can be checked by compiling it, and a refactor
meant to change nothing can be verified by comparing one theme's declarations before and after.
[Themes](./themes.md#checking-a-change) describes both.

Neither catches a change in layout. A rule moved between layers can leave every declaration
identical and still render differently, because which rule applies depends on specificity, and
because a rule that reaches inside a container has an effect that depends on what the container
holds. Those changes still need checking by eye, in each theme they affect.
