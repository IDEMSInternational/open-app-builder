# Test Visual

Visual regression testing tools to compare screenshots taken from within the current app platform with those generated in a previous release

## Compare screenshots
`




## Manually populating screenshots
### v0.12+
(WiP docs - to confirm use of gh action or alts)

### older versions
As these scripts were not available to earlier versions process will involve
1. Download release source code from repo, e.g. https://github.com/IDEMSInternational/parenting-app-ui/releases
2. Extract to folder, setup environment/config as required
3. Run app src from extracted folder (`yarn start`)
4. Run generate scripts from this repo (`yarn workspace test-visual start -- generate --clean`)
5. Manually edit release to upload generated `screenshots.zip`


## Developers
All CLI scripts can be used with the `dev` yarn script to add watch and live-reload, e.g.
```
`yarn workspace test-visual dev -- generate`
```

## References and Links
- https://medium.com/nerd-for-tech/automated-visual-regression-testing-with-typescript-puppeteer-jest-and-jest-image-snapshot-9e14dd9d0fe7
- https://medium.com/nerd-for-tech/automated-visual-regression-testing-with-typescript-playwright-jest-and-jest-image-snapshot-86db6f3364f5


