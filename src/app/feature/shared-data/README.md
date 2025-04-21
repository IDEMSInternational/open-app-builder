## Shared Data


## Review Notes
Firestore structures

- Querying optimised for all documents in a collection

Case 1
`/shared_data/{group_id}`
                  |  { createdBy: 'user_1', updatedAt: '...', label:'Group 1',}


+ Single query to `shared_data` can list all groups
- Syncing endpoint will sync all data from all groups unnecessarily (metadata + data combined)

Case 2
`/shared_data/{group_id}/shared/data`
                  |               | { label:'Group 1' }    
                  | { createdBy: 'user_1', updatedAt: '...', label:'Group 1',}
+ Can still list all groups without 

Case 3
`/shared_data/{group_id}`

Case 4
`/shared_data/{group_id}`


- Likely difficulty in making data migrations in future. Why want to keep very minimal top-level info (server data compatibility with legacy app users).
Minimal track collection creator auth id (assume later permissions), and a single boolean `isPublic` . These top-level used for db access control and query efficiency.

- Shared data is automatically stored in local data_lists for offline access. Authors should avoid manually authoring any lists with reserved prefix `shared_`, unless explicitly expecting it to be replaced by server data


## TODO
**Discuss on call**
- Auth ids vs device ids (ability to use security rules)
- Security rules (rule not filters, unlike postgres... determines if query will be allowed or not)
- Deleting collections (local persistence)
- Optimising reads (keeping deleted on server)

**Dev**
- PLH-specific group component
- Handle deleted collections / removed groups (possible regular full query and/or aggregation), or some sort of user_sync table that informs users of operations required such as local delete when collection or user permission removed from a collection. Might need cloud function to populate (or open security rules to allow write by shared data user), and keep timestamped to allow sync across multiple devices. E.g. user_sync/{user_id}/operations/{op_id}  (or deltas)
- Authoring actions and components
  - Update data
  - Render data_items
- Make plans for nested (do not implement)
  Short term possible public groups all synced and filtered by code?
- Add separate public/private group queries (handle case where public <-> private but already persisted)
  Possible require all stale data to be re-synced? Or just disallow toggle... Or just leave synced snapshot


**Service**
- [ ] Add support for dynamicDataService persisting internal collection data
- [ ] Local data caching and only fetch updated responses (consistent timestamp management)
- [ ] Support both collection and doc query (depending on path segments)
      Collection query returns array of items, doc query returns single item 

**Component**
- [ ] Process item loop dynamic data (?)
- [ ] map author params

**Actions**
- [ ] Main Operations
- [ ] Param validation
- [ ] Tests

**User Journeys**
- [ ] Create new shared data repo
- [ ] Handle auth case if allowed to create or not (anonymous vs signed in)
- [ ] Handle case collection does not exist
- [ ] Handle case doc already exists

**Documentation**
- [ ] Creating firebase deployment db (default vs named - free quota only on default)
- [ ] Using AppCheck for improved security
- [ ] Configuring access rules
- [ ] Location Pricing (https://cloud.google.com/firestore/pricing)
- [ ] Component Demo
- [ ] Migrate to documentation pages


**Rules**
Firestore uses rules to manage control access to data. They differ from typical row-based access control (RBAC) in that they do not filter data, but instead assert whether a request is permitted or not. 

So if rules are setup to only allow a user to query data where they have been marked as the original creator, then querying all data will fail, and only a query with specific user filter will work. See more info at: https://firebase.google.com/docs/firestore/security/rules-query

See below current list of recommended rules for data access

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
  
  	// Function to check if user is the owner
    function isOwner() {
      return request.auth != null && resource.data._created_by == request.auth.uid;
    }
    
    function isMember() {
      return request.auth.uid in resource.data.members;
    }
    
    function isPublic() {
      return resource.data.isPublic == true;
    }
    
    // Function to check whether only nested document.data updated and not
    // any parent keys such as document.public or document._created_by
    function isProfileUpdateOnly(){
    	return request.resource.data.diff(resource.data).affectedKeys().hasOnly(['profile','_updated_at'])
    }
    
    // Match documents in the shared_data collection
    match /shared_data/{documentId} {
    
    	// Allow all users to sync list of groups
    	allow list: if isOwner() || isMember() || isPublic();

      // Allow reads if the document has public field set to true
      allow read: if isOwner() || isMember() || isPublic();
      
      // Allow creation if user is authenticated and doc sets _created_by 
      allow create: if request.resource.data._created_by == request.auth.uid;
      
      // Allow update by creator, or to child inner data by anyone
      allow update: if isOwner();
                             
     // Allow deletes only by the creator
      allow delete: if isOwner();
    }
    
    // Default rule - deny all other access
    match /{document=**} {
      allow read: if false;
      allow write: if false;
    }
  }
}
```

**Troubleshooting**
1. FirebaseError: Missing or insufficient permissions.
Likely db not created or permissions not setup

## Future Tasks

### Documentation
- [ ] Scaffold RFC for follow-up

### Features
- [ ] Private group management
- [ ] Sub-collections (e.g. messages)
- [ ] Fine-grained permissions (e.g. owner and write-access)
- [ ] Access code and invite links
- [ ] Group user roles
- [ ] Error handling messages

### Core
- [ ] Pass device id to providers for use in queries, e.g. `const { identifier: uuid } = await Device.getId();`
- [ ] Public/private group handling
- [ ] Component registration (currently hardcoded)




