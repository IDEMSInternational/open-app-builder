## Shared Data
(Rough notes for use in discussions and planning follow-ups)

## TODO

**Discuss on call**
- Auth ids vs device ids (ability to use security rules)
- Security rules (rule not filters, unlike postgres... determines if query will be allowed or not)
- Deleting collections (local persistence)
- Optimising reads (keeping deleted on server)
- Data structures. Likely difficulty in making data migrations in future. Why want to keep very minimal top-level info (server data compatibility with legacy app users).


### Next
- [ ] PLH-specific group component
- [ ] Syncing deleted collection or those user removed from. Likely some sort of user_sync table that informs users of operations required such as local delete when collection or user permission removed from a collection. Might need cloud function to populate (or open security rules to allow write by shared data user), and keep timestamped to allow sync across multiple devices. E.g. user_sync/{user_id}/operations/{op_id}  (or deltas)

### Template Component
- [ ] Process item loop dynamic data (?)
- [ ] map author params

### Author Actions
- [ ] Main Operations
- [ ] Param validation
- [ ] Tests

### Documentation
- [ ] Retroactive RFC
- [ ] Creating firebase deployment db (default vs named - free quota only on default)
- [ ] Using AppCheck for improved security
- [ ] Configuring access rules
- [ ] Location Pricing (https://cloud.google.com/firestore/pricing)
- [ ] Component Demo
- [ ] Migrate to documentation pages

### Features
- [ ] Sub-collections (e.g. messages)
- [ ] Access code and invite links
- [ ] Error handling messages

### Core
- [ ] Public/private group handling
- [ ] Component registration (currently hardcoded)

**Rules**
Firestore uses rules to manage control access to data. They differ from typical row-based access control (RBAC) in that they do not filter data, but instead assert whether a request is permitted or not. 

So if rules are setup to only allow a user to query data where they have been marked as the original creator, then querying all data will fail, and only a query with specific user filter will work. See more info at: https://firebase.google.com/docs/firestore/security/rules-query

See [./firestore.rules](./firestore.rules) for example rules to apply to firestore. These need to be manually specified as required


**Troubleshooting**
1. FirebaseError: Missing or insufficient permissions.
Likely db not created or permissions not setup






