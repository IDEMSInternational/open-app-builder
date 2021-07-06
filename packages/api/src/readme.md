# Start Locally
## 0. Be sure you add .env file
## 1. Install all packages
``` npm i ```
## 2. Before start please run migrations to be sure you have an updated version of DB
``` npm run migrate ```
## 3. Build the project
``` npm run build ```
## 4. Run server
``` npm run start ```

___
## [Migration rules](https://www.npmjs.com/package/postgres-migrations)
### Make migrations idempotent
Migrations should only be run once, but this is a good principle to follow regardless.

### Migrations are immutable
Once applied (to production), a migration cannot be changed.

This is enforced by storing a hash of the file contents for each migration in the migrations table.

These hashes are checked when running migrations.

### Migrations should be backwards compatible
Backwards incompatible changes can usually be made in a few stages.

### File name
A migration file must match the following pattern:

[id][separator][name][extension]

| Section  | Accepted Values | Description |
| ------------- | ------------- | ------------- |
| id            | Any integer or left zero integers  | Consecutive integer ID. **Must start from 1 and be consecutive, e.g. if you have migrations 1-4, the next one must be 5.** |
| separator     | _ or - or nothing  | |
| name          | Any length text  | |
| extension     | .sql or .js  | File extensions supported **not case sensitive**|

Example:

```
migrations
├ 1_create-initial-tables.sql
├ 2-alter-initial-tables.SQL
└ 3-alter-initial-tables-again.js
```

Migrations will be performed in the order of the ids. **If ids are not consecutive or if multiple migrations have the same id, the migration run will fail.**

**Note that file names cannot be changed later.**


Links for future reference:
- https://sequelize.org/
- https://swarmlet.dev/docs/

TODO
- Split docker server deployment from server app code