#  Notifications

Notifications can be authored to be sent from the app, and are handled from with the `Campaigns` system. Campaigns can contain schedules that determine when notifications should be sent (e.g. specific day/time-of-day) as well as rows that specify what to send. 

!!! Tip
    Campaigns only ever send one notification at their scheduled time, preventing the user being inundated with notifications if multiple are present in a campaign.

Here is an example of two rows added to a `==content_list==` for creating notifications. Information about the specific flow subtypes can be found below

| flow_type | flow_subtype      | flow_name |
| --------- | ------------      | --------- |
|data_list	| campaign_schedule	| example_campaign_schedule |
|data_list	| campaign_rows	    | example_campaign_rows |

## Campaign Schedule

| Column            | Description |
| -----------     | ----------- |
| id*                            | Unique identifier for schedule |
| activation_condition_list     | Conditions to evaluate for activating campaign. Must satisfy ALL |
| deactivation_condition_list   | Conditions to evaluate for deactivating campaign. Must not satisfy ANY |
| schedule.start_date           | Date of earliest notification. If in past will be ignored |
| schedule.end_date             | Date of latest notification, including the whole of that day. If in past will be ignored |
| schedule.day_of_week          | Send notifications weekly on a given day of the week (numbered from 1 - Monday, to 7 - Sunday) |
| schedule.batch_size           | Maximum number of notifications to schedule, e.g. if scheduling weekly specify number of weeks to pre-schedule |
| schedule.repeat_every_days    | Days between notifications in a [repeating schedule](#repeating-schedules) |
| schedule.repeat_count         | Number of notifications in a [repeating schedule](#repeating-schedules), including the first |
| time.hour                     | Hour of day to send notifications on, in 24h format       |
| time.minute                   | Minute of day to send notification on |
| delay.days                    | Offset to schedule notification a given number of days from today |
| delay.hours                   | As `delay.days`, in hours |
| delay.minutes                 | As `delay.days`, in minutes |

The default settings for notifications will schedule a daily at 12pm. These settings are defined in the `NOTIFICATION_DEFAULTS` variable.

### Repeating schedules

A schedule with `schedule.repeat_every_days` and `schedule.repeat_count` schedules a series of notifications in advance: the first at `schedule.start_date` (at `time.hour` and `time.minute`, plus any `delay`), then one every `repeat_every_days` days, `repeat_count` in total. Each sends the highest priority campaign row that applies.

For example, a check-in every 30 days after the date stored in the field `last_check_in`, 5 in total, with a reminder a week after each:

| id                | schedule.start_date     | schedule.repeat_every_days | schedule.repeat_count | time.hour | delay.days |
| ----------------- | ----------------------- | -------------------------- | --------------------- | --------- | ---------- |
| check_in          | @fields.last_check_in   | 30                         | 5                     | 19        | 30         |
| check_in_reminder | @fields.last_check_in   | 30                         | 5                     | 19        | 37         |

- Notifications in the series that are already in the past are skipped.
- `schedule.end_date` is compared with each date before its `delay` is added, as for other schedules. So in the example, an end date stops a reminder only when its check-in is stopped too.
- Without a `schedule.start_date`, the series starts from the next send time each time campaigns are checked (see [Scheduling Frequency](#scheduling-frequency)), so it keeps moving forward. Set a start date to keep it fixed.
- When the start date comes from a field, add an activation condition on that field (e.g. `@fields.last_check_in`), so nothing is scheduled before it is set.
- `schedule.day_of_week` and `schedule.batch_size` are not used.
- Notifications are identified by their campaign row, so give each schedule its own rows: a row used by two schedules is only scheduled for one of them.

## Campaign Rows

| Column            | Description |
| -----------     | ----------- |
| **id**                            | Unique identifier for notification |
| activation_condition_list     | Conditions to evaluate for activating campaign. Must satisfy ALL |
| deactivation_condition_list   | Conditions to evaluate for deactivating campaign. Must not satisfy ANY |
| priority           | Number given to specify which notification should take priority when multiple active (highest priority sent sent) |
| campaign_list             | List of campaign schedules to include notifications in |
| text          | Notification message |
| title                     | Notification title |
| action_list               | Actions to run when the notification is sent (`sent`) or tapped (`click`) |

## Advanced Topics

### Notification Debugging
The app provides a `/campaigns` page that can be used to provide an overview of currently scheduled campaigns and can be used to see which campaign schedules are active

![](./images/notifications-campaigns-screen.png)

Additionally an individual campaign can be examined to see all evaluated rows and their current status from the **All Campaigns** dropdown on the same page

![](images/notifications-campaign-dropdown.png)

Clicking the notification icon in the top-right will lead to another `/notifications` page that shows details of scheduled notifications

![](./images/notifications-debug-screen.png)


### Scheduling Frequency
Campaigns are checked, and their notifications scheduled again:

- when the app starts
- after the actions of a campaign notification run
- when a field that a campaign schedule or row refers to changes: `@fields.name` in any of its columns, or the field of a `field_evaluation` condition. Several changes close together trigger one check, about 2 seconds after the last.

For other changes, such as data that a `db_lookup` condition reads, use the `campaign: recalculate` action to check campaigns straight away, e.g.

| type   | name        | action_list                       |
| ------ | ----------- | --------------------------------- |
| button | button_done | click \| campaign: recalculate    |

!!! warning
    Notifications are only scheduled while the app is open. If a user may not open the app for a while, schedule the notifications they need in advance, with `schedule.batch_size` or a [repeating schedule](#repeating-schedules).