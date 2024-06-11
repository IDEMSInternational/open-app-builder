[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/IDEMSInternational/open-app-builder.git)

# Open App Builder

[Online Documentation](https://idemsinternational.github.io/open-app-builder/)

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
$ git lfs clone https://github.com/IDEMSInternational/open-app-builder.git
```
Note - if you do a regular git clone, you can always run `git lfs fetch --all` later to sync assets

### Install required dependencies
```
$ cd open-app-builder
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

See [Deployment Documentation](https://idemsinternational.github.io/open-app-builder/developers/deployments/) for information about creating and configuring deployments.

## Running locally

### Start the local server
```
yarn start
```
This will start a local server and serve the app in your browser on http://localhost:4200

# For Content Coders

Please see [Quickstart Authors](https://idemsinternational.github.io/open-app-builder/authors/quickstart/)

# For Developers

Please see [Quickstart Developers](https://idemsinternational.github.io/open-app-builder/developers/quickstart/)
