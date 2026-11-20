# Navigation triggers

Navigation triggers run actions when the user moves around the app. Use them in an `update_action_list` row (on an ordinary row, such as a button, they do nothing):

| type               | name     | action_list                                          |
| ------------------ | -------- | ---------------------------------------------------- |
| update_action_list | on_enter | nav_enter \| set_field: home_last_seen: @calc(now()) |

There are two: `nav_enter` and the older `nav_resume`. Use `nav_enter` for new content.

## nav_enter

`nav_enter` fires on a page, or on the template a nav stack opens, each time it comes to the front:

- on the first visit to a page, or when a nav stack opens
- when going back to a page, or on `go_to` a different page
- when a pop-up or nav stack above it closes
- after `emit: force_reload` reloads it, unless the reload came from its own `nav_enter` actions

It doesn't fire on `go_to` the page you are on, or when the app returns from the background. At app start, it waits until any launch pop-ups (e.g. onboarding) have closed.

Before the actions run, the template is reprocessed, so values that depend on fields changed elsewhere are up to date. Templates nested inside a page and pop-up templates don't get `nav_enter`.

!!! Warning
    A pop-up opened from `nav_enter` fires `nav_enter` again when it closes. Give the row a condition on a field its own actions set (e.g. `!@fields.invite_shown`, with `nav_enter | set_field: invite_shown: true`), or the pop-up reopens every time.

## nav_resume

`nav_resume` fires on a page and the templates nested in it when a pop-up closes, when going back to the page, and on `go_to` a page visited before (including the page you are on). It doesn't fire on the first visit to a page, when a fullscreen pop-up or a nav stack closes, or when the app returns from the background.

A page that uses `nav_enter` doesn't need `nav_resume | emit: force_reload` to refresh, and with both, `nav_enter` fires twice when the user comes back.
