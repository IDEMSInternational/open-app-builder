Cypress.on("uncaught:exception", (e) => {
  // There seems to be an issue with ionic always throwing this error
  if (e.message.includes("elm[aelFn] is not a function")) {
    // we expected this error, so let's ignore it
    // and let the test continue
    return false;
  }
  // on any other error message the test fails
});
