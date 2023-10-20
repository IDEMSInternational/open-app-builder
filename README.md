[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/IDEMSInternational/parenting-app-ui.git)

# Parenting App UI

[Online Documentation](https://idemsinternational.github.io/parenting-app-ui/)


# Quickstart

## Prequisites

1. Download and install [Git](https://git-scm.com/downloads)  
   This will be used to download the repository

2. Download and install [Git LFS](https://git-lfs.github.com/)  
   This will be used to download any required binary assets, such as images or pdfs

3. Download and install [Node](https://nodejs.org/en/download/)  
   This is the programming lanugage required to run the project

4. Download and Install [Yarn](https://classic.yarnpkg.com/en/docs/install)  
   This manages all 3rd-party code dependencies

## Installation

### Download the repo with binary assets
```
$ git lfs clone https://github.com/IDEMSInternational/parenting-app-ui.git
```
Note - if you do a regular git clone, you can always run `git lfs fetch --all` later to sync assets

### Install required dependencies
```
$ cd parenting-app-ui
$ yarn install
```
Note - you may have to do this from time to time when content is updated)

## Configuration
### Set Deployment
The app supports using different workspace or deployment configurations. These are stored in [.idems_app/deployments](./.idems_app/deployments)

To use an existing deployment, run the following script:
```
yarn workflow deployment set
```
This will present an interactive list of deployments to select from.

See [Deployment Documentation](https://idemsinternational.github.io/parenting-app-ui/developers/deployments/) for information about creating and configuring deployments.

### Firebase
To be able to run the full project a specific configuration file needs to be included to access
the online database and authentication methods.
```
$ cp src/environments/firebaseConfig.sample.ts src/environments/firebaseConfig.ts
```
The default file is blank. It should be replaced with a version requested from the dev team.

(Note - this process will likely be simplified in the future)

## Running locally

### Start the local server
```
yarn start
```
This will start a local server and serve the app in your browser on http://localhost:4200

# For Content Coders

Please see [Quickstart Authors](https://idemsinternational.github.io/parenting-app-ui/authors/quickstart/)

# For Developers

Please see [Quickstart Developers](https://idemsinternational.github.io/parenting-app-ui/developers/quickstart/)
