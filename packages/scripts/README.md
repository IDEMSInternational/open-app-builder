# App Scripts

The app scripts are designed to automated various aspects of the development and deployment cycle.
The consist of a set of `commands` that are executed within an interactive CLI, alongside a base set of reusable `tasks`

Scripts also act as a wrapper around the `workflows` package, which can be used to execute series of commands


## Running scripts 
Both scripts and workflows are called via an interactive CLI

**Runtime**
Scripts can be executed directly from source typescript files using utility functions defined in the root package.json
```sh
yarn scripts [command-name]
```
```sh
yarn workflow [workflow-name]
```
This will compile typescript and execute at runtime (slower process but scripts always up-to-date)

**NOTE** - this method will be deprecated in the future in favor of always running
prebuild

**Prebuild**
It is also possible to pre-compile and package the scripts for direct execution from `bin`

```sh
yarn app-scripts [command-name]
```

or to run a pre-configured workflow
```sh
yarn app-workflow [workflow-name]
```

Both of these shorthand methods are exposed via the `bin` folder of this workspace

The methods include a check to see if the relevant scripts workspace has been prebuilt
(based on scripts `package.json` version number), building only if updated.

If for any reason manual building is required, this can be achieved by the command

```sh
yarn workspace scripts build
```

## Developing scripts

To easy development, an additional `dev` script has been created that will start a
nodemon server, live-reloading the chosen script whenever an input `.ts` file changes.

```sh
yarn workspace scripts dev [name]
```

will run live-reload of the named script
