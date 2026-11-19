# Navigation triggers

Some action triggers fire when the user moves around the app, rather than when they tap something. They go in an `update_action_list` row, so the template runs the actions itself:

| type               | name     | action_list                                         |
| ------------------ | -------- | --------------------------------------------------- |
| update_action_list | on_enter | nav_enter \| set_field: home_last_seen: @calc(now()) |

A navigation trigger on an ordinary row, such as a button, does nothing.

There are two navigation triggers. For new content, use `nav_enter`. `nav_resume` is older and fires in a less predictable set of cases (see below). Avoid authoring the same actions on both.

## nav_enter

`nav_enter` fires on a page or nav-stack template each time that template comes to the front:

| Event                                                         | Where `nav_enter` fires                                            |
| ------------------------------------------------------------- | ------------------------------------------------------------------ |
| The first visit to a page, or a nav stack opening             | That template                                                      |
| Going back to a page, or `go_to` a different page             | That page                                                          |
| A pop-up closes, including a fullscreen pop-up                | The nav stack on top, or the page if no nav stack is open          |
| A nav stack closes, however it is closed                      | The nav stack underneath, or the page if it was the last one       |
| `nav_stack: close_all`                                        | Once, on the page                                                  |
| `go_to` the page you are on, `emit: force_reload`             | Does not fire                                                      |
| The app returns from the background                           | Does not fire                                                      |

While a pop-up or a nav stack covers a template, `nav_enter` doesn't fire on it. When the template comes back to the front, its rows are reprocessed before the `nav_enter` actions run, so values that depend on fields changed in the meantime (e.g. inside a nav stack) are up to date. Templates that don't use `nav_enter` are not affected.

When the app starts, `nav_enter` fires on the home page once any fullscreen pop-ups from launch actions (e.g. onboarding) have closed.

!!! Warning
    A pop-up opened from `nav_enter` closes back onto the template, which fires `nav_enter` again. Give the row a condition on a field its own actions set, or the pop-up reopens every time it is closed. For example, a row with the condition `!@fields.invite_shown` and the actions `nav_enter | pop_up: invite; nav_enter | set_field: invite_shown: true`.

!!! Note
    `nav_enter` only fires on page templates and on the template a nav stack opens. It doesn't fire on templates nested inside them, or on pop-ups. A nested or pop-up template that uses it logs a warning in the browser console.

### A nav stack that closes and then opens a pop-up

When an action list closes a nav stack and then opens a pop-up, the page underneath is in front for a moment between the two. So `nav_enter` fires on the page as the nav stack closes, and again when the pop-up closes. For example, with a lesson template opened in a nav stack:

| type     | name   | action_list                                                        |
| -------- | ------ | ------------------------------------------------------------------ |
| template | lesson | completed \| nav_stack: close_top; completed \| pop_up: well_done |

the page's `nav_enter` actions run as `well_done` opens. If those actions open a pop-up too, both pop-ups open at once. Ways to handle this in content:

- **Hold field:** before closing, the nav stack sets a field, e.g. `completed | set_field: home_hold: true` before `completed | nav_stack: close_top`. The page's `nav_enter` row has the condition `!@fields.home_hold` so it doesn't run while the field is set. A second `nav_enter` row with the condition `@fields.home_hold` clears it (`nav_enter | set_field: home_hold: false`). With this, the page's actions next run when `well_done` closes.
- **Let the page open the pop-up:** instead of opening `well_done` itself, the nav stack sets a field naming it, e.g. `completed | set_field: pending_pop_up: well_done`. On the page, a `nav_enter` row with the condition `@fields.pending_pop_up` opens it and clears the field: `nav_enter | pop_up: @fields.pending_pop_up; nav_enter | set_field: pending_pop_up: false`. The page then decides the order of all its pop-ups in one place.

### Limitations

- If a `go_to` runs from inside a pop-up without `dismiss_pop_up: true`, the pop-up stays open behind the new page. It still counts as open, so `nav_enter` doesn't fire on the new page until it closes.
- Content synced with an older version of the app builder reads `nav_enter` as `click`. Sync the content again after updating.

## nav_resume

`nav_resume` fires when the URL changes in certain ways, rather than when a template comes to the front:

| Event                                              | Where `nav_resume` fires                                              |
| -------------------------------------------------- | --------------------------------------------------------------------- |
| A pop-up closes                                    | The page and the templates nested in it                               |
| A pop-up opened inside a nav stack closes          | The nav stack, and also the page underneath it, while the stack is still open |
| Going back to a page, or `go_to` a page visited before | That page                                                         |
| `go_to` the page you are on                        | That page                                                             |
| The first visit to a page                          | Does not fire                                                         |
| A fullscreen pop-up closes                         | Does not fire                                                         |
| A nav stack closes                                 | Does not fire                                                         |
| The app returns from the background                | Does not fire                                                         |

Unlike `nav_enter`, it also fires on nested templates, and the page is reprocessed before it fires whether or not the page uses it.

Because `nav_resume` doesn't fire when a nav stack closes, a page whose values depend on fields changed in a nav stack isn't refreshed when the stack closes. Either use `nav_enter` on that page, or add `click | emit: force_reload` after `click | nav_stack: open` on the row that opens the stack.
