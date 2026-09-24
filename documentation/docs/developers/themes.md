# Themes

A theme sets the colours, fonts and component styling for a deployment. Themes live in
`src/theme/themes`, and a deployment lists the ones it can use in its config:

```ts title=".idems_app/deployments/my-deployment/config.ts"
config.app_config.APP_THEMES.available = ["example_theme"];
config.app_config.APP_THEMES.defaultThemeName = "example_theme";
```

For how themes fit alongside component styles, global stylesheets and deployment styles — and
why a theme override sometimes loses to a component — see [Styling](./styling.md).

## How a theme is built

A theme folder contains:

| File | Contents |
| --- | --- |
| `_index.scss` | The theme's mixin: its colours and its variable values |
| `_overrides.scss` | Rules that style components beyond what variables can express |
| `_typography.scss` | `@font-face` declarations for the theme's fonts |

`_index.scss` passes the theme's colours to the shared `utils.theme` mixin, which generates the
full colour palettes (`--ion-color-primary-50` to `-900` and so on), then applies the theme's own
variable values on top:

```scss title="src/theme/themes/example_theme/_index.scss"
@use "../utils";
@use "./overrides" as overrides;
@use "./typography";

@mixin theme-example_theme {
  @include utils.theme(
    $theme-name: "example_theme",
    $color-primary: hsl(202, 98%, 32%),
    $color-secondary: hsl(78, 53%, 55%),
    $variable-overrides: (
      ion-font-family: "Quicksand",
      row-margin-top: 10px,
    )
  ) {
    @include overrides.overrides;
  }
}
```

Every theme is registered in two files:

```scss title="src/theme/themes/_index.scss"
@forward "./example_theme/index";
```

```scss title="src/theme/variables.scss"
@include themes.theme-example_theme;
```

## Parent themes

Themes that share a design inherit from a parent theme, so a change can be made once for all of
them. `plh_kids_teens` is the parent of `plh_kids_teens_mx`, `_my`, `_pa` and `_za`.

A parent theme is not selectable by a deployment, and is not registered in `variables.scss`. It
holds the variable values and the override rules its children share:

```scss title="src/theme/themes/plh_kids_teens/_index.scss"
@forward "./overrides";

/// Theme variable values shared by all plh_kids_teens_* themes.
/// Each child theme merges its own values over these.
$variables: (
  paragraph-spacing: 12px,
  row-margin-top: 10px,
);
```

A child theme sets its colours, merges its own variable values over the parent's, and applies the
parent's overrides before its own:

```scss title="src/theme/themes/plh_kids_teens_mx/_index.scss"
@use "sass:map";
@use "../utils";
@use "../plh_kids_teens" as parent;
@use "./overrides" as overrides;
@use "./typography";

@mixin theme-plh_kids_teens_mx {
  @include utils.theme(
    $theme-name: "plh_kids_teens_mx",
    $color-primary: hsl(183 100% 16%),
    $color-secondary: hsl(18 87% 35%),
    $variable-overrides: map.merge(
      parent.$variables,
      (
        audio-background: var(--ion-color-primary-50),
      )
    )
  ) {
    @include parent.overrides;
    @include overrides.overrides;
  }
}
```

## Adding a child theme

1. **Create the folder** `src/theme/themes/<theme-name>` with an `_index.scss` as above, an
   `_overrides.scss` (a `@mixin overrides` that can start out empty) and a `_typography.scss` if the
   theme uses different fonts.
2. **Set the theme's colours** in the `utils.theme` call. The palettes are generated from them, so
   only set individual palette values (e.g. `ion-color-primary-600`) if a generated shade doesn't work.
3. **Add variable values** for anything that differs from the parent, inside the `map.merge`.
4. **Register it** in `src/theme/themes/_index.scss` and `src/theme/variables.scss`.
5. **Add it to a deployment's config** as `available` and, usually, `defaultThemeName`.

Don't create a theme by copying an existing one. Copies drift apart, and a fix then has to be
repeated in each of them.

## Where to make a change

- **A change for every theme:** the component's own styles, which is usually best. If a theme may
  want a different value, use a variable with a base value in `src/theme/variables.scss`.
- **A change for every theme in a family:** the parent theme, either as a shared variable value or a
  shared override rule.
- **A change for one theme:** that theme's variable values, or its own override rules as a last resort.

Prefer variables over override rules. An override rewrites a rule the component didn't expect to
have changed, so it breaks quietly when the component changes. If a change needs a value the
component doesn't expose, add a variable for it rather than overriding the rule.

Note that a child theme's rules are applied **after** its parent's, so a child can change a parent's
rule but cannot remove it. If only some children want a rule, move it out of the parent into the
children that do, or give the parent a variable that each child sets.

## Checking a change

Theme CSS is generated at build time, so a change can be checked by compiling it:

```sh
# check all themes still compile
npx sass --no-source-map --load-path=node_modules src/theme/variables.scss > /dev/null
```

To see what a change does to one theme, compile just that theme before and after, and compare:

```scss title="check.scss"
@use "src/theme/themes/index" as themes;
@include themes.theme-plh_kids_teens_mx;
```

```sh
npx sass --no-source-map --load-path=. --load-path=node_modules check.scss > after.css
```

A refactor that is meant to change nothing should produce the same declarations for each theme.
Remember that moving a rule between a parent and a child changes the order it is applied in, which
can change which of two rules wins.
