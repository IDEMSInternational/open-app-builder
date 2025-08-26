# End to End Tests

## End-to-End (E2E) Testing with Cypress

This package contains E2E tests for the Open App Builder project using [Cypress](https://www.cypress.io/).

### Prerequisites

- Node.js and Yarn installed
- The project dependencies installed (`yarn install` at the repo root)
- [Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress) is included as a dev dependency

### Test Deployment

Test data and specifications are managed a deployment named Test

**Test Source Deployment:**
https://drive.google.com/drive/u/0/folders/1EpRmiR2zTpU17EndofUHFUyca85IDyLV

### Creating Cypress Tests

1. Add new test files under `cypress/e2e/` in this package.
2. Use the [Cypress API](https://docs.cypress.io/api/table-of-contents) to write your tests.
3. Reference or import any required test data from the Google Drive folder (download and place in `cypress/fixtures/` if needed).
4. Follow the naming conventions and structure of existing tests for consistency.
5. Refer to Cypress [best practices](https://docs.cypress.io/app/core-concepts/best-practices)


```

### Running Cypress Tests

**Open the Cypress UI:**

```sh
yarn cy:open
```

**Run all tests in headless mode:**

```sh
yarn cy:run
```

> These scripts are defined in the root `package.json` or this package's `package.json`.

### Additional Notes

- Keep test data in sync with the Google Drive source.
- For troubleshooting Cypress, see the [official docs](https://docs.cypress.io/).
