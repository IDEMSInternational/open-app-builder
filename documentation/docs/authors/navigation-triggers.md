# Navigation triggers

Some action triggers fire when the user moves around the app, rather than when they tap something. They are used in an `update_action_list` row, so the template runs the actions itself:

| type               | name          | action_list                              |
| ------------------ | ------------- | ---------------------------------------- |
| update_action_list | on_resume     | nav_resume \| set_field: last_seen: @calc(now()) |

A `nav_resume` trigger on an ordinary row, such as a button, does nothing.

## nav_resume

`nav_resume` fires when the user comes back to a template they were already on.

| Event                                              | Where `nav_resume` fires                                  |
| -------------------------------------------------- | --------------------------------------------------------- |
| A pop-up closes                                    | The nav stack on top, or the page if no nav stack is open |
| A nav stack closes                                 | The nav stack underneath, or the page if it was the last  |
| Back to a page, or `go_to` a page visited before   | That page                                                 |
| `go_to` the page you are on                        | That page                                                 |
| The first visit to a page                          | Does not fire                                             |
| A fullscreen pop-up closes                         | Does not fire                                             |
| The app returns from the background                | Does not fire                                             |

It fires on the template on top and on every template nested inside it. While a nav stack is open, it does not fire on the page underneath. Before the actions run, the template on top is reprocessed in the same way as after `emit: force_reprocess`.

When the action list that closes a nav stack also opens a pop-up, for example:

| type     | name        | action_list                                                     |
| -------- | ----------- | --------------------------------------------------------------- |
| template | lesson      | completed \| nav_stack: close_top; completed \| pop_up: well_done |

then `nav_resume` waits until the rest of that list has run, and fires on the page when the pop-up closes, not when the nav stack closes.
