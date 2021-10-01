# API Workspace

## Description
The API workspace provides methods to communicate from the frontend app to the backend server. Namely we have:

- REST API built with [Nest](https://github.com/nestjs/nest)
- DB Init and Migration functions built with [Sequelize](https://sequelize.org/) and [Umzug](https://github.com/sequelize/umzug)


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Updating DB Models
All changes to database structures are handled by migration scripts, found in [src/db/migrations](./src/db/migrations).

The files must be named sequentially as that is the order they are applied in.

## Importing Spec into REST Clients 
To view a json representation of the docs, a url is produced depending on the basepath the api is served from, e.g.
`http://localhost:3000/-json`
`http://localhost:3000/api-json`
https://stackoverflow.com/a/69388317/5693245

Additionally a [spec-export.json](./spec-export.json) document is created when running locally and committed to the repo.

Either the file or link can be directly imported into a REST client like insomnia


## Examples and References
- https://github.com/nestjs/nest/tree/master/sample/07-sequelize/src
- https://docs.nestjs.com/recipes/sql-sequelize#sql-sequelize
- https://github.com/sequelize/umzug/tree/master/examples/1.sequelize-typescript

(Future - bundle node_modules with build so they do not have to be copied)
- https://github.com/ZenSoftware/bundled-nest

## Additional notes
- Package.json lists ts-node and typescript in both dev and prod deps. This is because they are used both for bundling and at runtime (umzug), and need to be installed to the relevant docker containers during build.