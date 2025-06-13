# Notifications

The notifications feature is used by authors to schedule one-time notifications.

## Authoring Integration
**Fields**
`@fields._notification_permission_status` updates with current notification permission status

**Data Lists**
`@data._notifications` lists all schedule notifications

## Relation to Campaigns System
The action, service and types all currently sit independently to the campaigns system, which is tightly coupled to an alternative shared notification service. In the future the two features should likely be merged.


## TODO
- [ ] Update debug pages to track notifications created from action (not only campaigns)
- [ ] Tests