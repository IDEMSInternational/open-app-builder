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

## Examples and References
- https://github.com/nestjs/nest/blob/master/sample/07-sequelize/package.json
- https://docs.nestjs.com/recipes/sql-sequelize#sql-sequelize
- https://github.com/sequelize/umzug/tree/master/examples/1.sequelize-typescript