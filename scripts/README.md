# App Scripts

The app scripts are designed to automated various aspects of the development and deployment cycle.

Most scripts require additional configuration files which are not publically available within this repo.
To use the scripts you should first contact the development team for the required configurations.

## Running scripts from this folder

Scripts may be added to the `package.json` and can also be listed in the default `index.ts` file which
is called via `npm run start`. E.g.

```
npm run start
```

will call the interactive cli script selection

```
npm run version
```

will call the version script

## Running scripts from parent folder

If calling scripts from the main parent repo, all calls should be prefixed with `scripts`, i.e.

```
npm run scripts
```

will call the interactive cli script selection

```
npm run scripts version
```

will call the version script

## Developing scripts

To easy development, an additional `dev` script has been created that will start a
nodemon server, live-reloading the chosen script whenever an input `.ts` file changes.

```
npm run dev
```

will run live-reload of the main start scripts

```
npm run dev version
```

will run live-reload of the version script
