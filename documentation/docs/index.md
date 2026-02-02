# Getting Setup

## Prerequisites

1. Download and install [Git](https://git-scm.com/downloads)  
   This will be used to download the repository

2. Download and install [Node](https://nodejs.org/en/download/)   
   This is the programming language required to run the project. 
   We currently support any of the versions prefixed `v22.x.x` or `v24.x.x`

3. Download and Install [Yarn](https://classic.yarnpkg.com/en/docs/install)  
   This manages all 3rd-party code dependencies

## Installation

### Download the repo with binary assets
!!! tip "Choosing a location to download the repo"

      It is best to download the repo to a folder path that does not include any spaces. If using a user documents directory that includes spaces, e.g. `/user/my name`, you may need to re-open the terminal in a different folder instead.

To download the repo into the current working directory, run:
```
git clone https://github.com/IDEMSInternational/open-app-builder.git
```

### Install required dependencies
Navigate to the newly cloned directory if you have not done so already:
```
cd open-app-builder
```

From the route of the project, run the following command to download and install the required dependencies:
```
yarn install
```
Note - you may have to do this from time to time when the code is updated

## Configuration
### Set Deployment
A "deployment" corresponds to a particular app created with Open App Builder. A deployment consists of content and configuration files, which are stored in `.idems_app/deployments`.

In order to work on a deployment, it must be made available locally, either by importing an existing deployment from a remote source or creating a new one. See [Deployments](https://idemsinternational.github.io/open-app-builder/developers/deployments/) for information about creating and configuring deployments.

For example, to import the debug deployment, run
```sh
yarn workflow deployment import https://github.com/IDEMSInternational/app-debug-content
```

After importing a creating a deployment, it can be set to active by running:
```sh
yarn workflow deployment set
```
This will present an interactive list of all available deployments to select from.

## Running locally

### Start the local server
```
yarn start
```
This will start a local server and serve the app in your browser on http://localhost:4200.

## Finishing setup

In order to complete the setup process, navigate to the relevant section of the documentation from the options below, and continue with the steps outlined.

### For Content Authors

Please see [Quickstart Authors](./authors/quickstart.md)

### For Developers

Please see [Quickstart Developers](./developers/quickstart.md)
