# Code Releases

Code releases should be made periodically, although there is no set schedule. The default code version that is targeted by deployments when building through GitHub actions is determined by the organisation variable, `APP_CODE_BRANCH`. Deployment repos can optionally set a repo-level variable with the same name to override this value and target a different code version.

## Making a new code release
1. Run `yarn run version --package` to bump the version number as specified in package.json.
2. Commit these changes and merge a PR to master. This will update the version number of the latest draft release.
3. Check the release notes of the draft release and publish it (edit the release and then select "Publish release").
4. In order to update the default code version targeted by repos, update the organisation variable `APP_CODE_BRANCH` to point to the latest variable tag. To update a particular deployment's target code version, update or add the `APP_CODE_BRANCH` variable to that deployment's content repo. This will override the default value set by the organisation variable.