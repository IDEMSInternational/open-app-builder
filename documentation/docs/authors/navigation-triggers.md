# Navigation triggers

Navigation triggers run actions when the user moves around the app. Use them in an `update_action_list` row (on an ordinary row, such as a button, they do nothing):

| type               | name     | action_list                                          |
| ------------------ | -------- | ---------------------------------------------------- |
| update_action_list | on_enter | nav_enter \| set_field: home_last_seen: @calc(now()) |

There are two: `nav_enter` and the older `nav_resume`. Use `nav_enter` for new content.

## nav_enter

`nav_enter` fires on a page, the template a nav stack opens, or a fullscreen pop-up, each time it comes to the front:

- on the first visit to a page, or when a nav stack or fullscreen pop-up opens
- when going back to a page, or on `go_to` a different page
- when a pop-up or nav stack above it closes

It doesn't fire on `go_to` the page you are on, after `emit: force_reload`, or when the app returns from the background. At app start, a page's `nav_enter` waits until any launch pop-ups (e.g. onboarding) have closed.

Before the actions run, the template is reprocessed, so values that depend on fields changed elsewhere are up to date. Templates nested inside another template and pop-ups that aren't fullscreen don't get `nav_enter`, and log a warning in the browser console if they declare it.

Because `nav_enter` doesn't fire after `emit: force_reload`, locals set by its actions go back to their values in the sheet when the template reloads. Store values that should last in fields.

!!! Warning
    A pop-up opened from `nav_enter` fires `nav_enter` again when it closes. Give the row a condition on a field its own actions set (e.g. `!@fields.invite_shown`, with `nav_enter | set_field: invite_shown: true`), or the pop-up reopens every time.

## nav_resume

`nav_resume` fires on a page and the templates nested in it when a pop-up closes, when going back to the page, and on `go_to` a page visited before (including the page you are on). It doesn't fire on the first visit to a page, when a fullscreen pop-up or a nav stack closes, or when the app returns from the background.

A page that uses `nav_enter` doesn't need `nav_resume | emit: force_reload` to refresh. With both, the page also reloads after `nav_enter` has reprocessed it, which can reset locals set by its `nav_enter` actions.
