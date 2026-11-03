# Test Visual

Visual regression testing tools to compare screenshots taken from within the current app platform with those generated in a previous release

## Compare screenshots
Compare screenshots of the current local repo with 

1. Ensure the local app is built
`yarn build`

2. Run screenshot comparison script
`yarn workspace test-visual start compare --clean`

Output will be updated as screenshots are produced, and image diffs populated to folder
```
{
  "new": 0,
  "different": 412,
  "same": 464
}
```



## Compare theme layout
Compare the computed styles and layout of components across every theme, between a git ref and the local working tree. This is intended for refactoring theme styles and variables (e.g. moving overrides into a parent theme or component styles), where the aim is to confirm exactly which themes and components are visually affected.

`yarn workspace test-visual start theme-layout --base origin/master`

Options
- `--base` git ref to compare against (default `HEAD`)
- `--themes` comma-separated list of themes (default all themes included in `src/theme/variables.scss`)
- `--modes` comma-separated list of Ionic modes (default `md,ios`)

Styles are compiled from both sources and applied to static component fixtures (`src/commands/theme-layout/fixtures.html`), which are rendered with Ionic in headless Chrome. Every computed style value (including `::before`/`::after` content) and the bounding box of every element are recorded for each theme and compared. Output lists elements with changed styles (and whether this affected layout), along with any other layout changes. A full report is written to `output/theme-layout/report.json`, alongside the generated fixture pages, which can be opened in a browser for inspection (e.g. `output/theme-layout/current/index.html?theme=default&mode=md`).

To check a result can be trusted, run the command with `--base HEAD` and no local changes: this should report no changes. When verifying a refactor, it can also help to reintroduce a known problem and confirm it is reported.

Limitations
- Fixtures approximate rendered component markup, so should be updated if component templates change or new components need to be compared. Include any combinations of variants or states that theme rules may conflict on (e.g. several `data-variant` values, or locked and highlighted states together)
- Ionic and fonts are loaded from the local installation for both sources

## Manually populating screenshots
### v0.12+
(WiP docs - to confirm use of gh action or alts)

### older versions
As these scripts were not available to earlier versions process will involve
1. Download release source code from repo, e.g. https://github.com/IDEMSInternational/parenting-app-ui/releases
2. Extract to `cache/releases` folder, 
3. setup environment/config as required
4. Run app src from extracted folder (`yarn start`)
5. Run generate scripts from this repo (`yarn workspace test-visual start -- generate --clean`)
6. Manually edit release to upload generated `screenshots.zip`


## Developers
All CLI scripts can be used with the `dev` yarn script to add watch and live-reload, e.g.
```
`yarn workspace test-visual dev -- generate`
```
Note - depending on commander and files updated, live reload may not always work (requires further investigation)

## References and Links
- https://github.com/mapbox/pixelmatch
- https://github.com/americanexpress/jest-image-snapshot
- https://medium.com/nerd-for-tech/automated-visual-regression-testing-with-typescript-puppeteer-jest-and-jest-image-snapshot-9e14dd9d0fe7
- https://medium.com/nerd-for-tech/automated-visual-regression-testing-with-typescript-playwright-jest-and-jest-image-snapshot-86db6f3364f5



