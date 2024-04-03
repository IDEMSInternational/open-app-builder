# Getting Setup

## Prerequisites

1. Download and install [Git](https://git-scm.com/downloads)  
   This will be used to download the repository

2. Download and install [Git LFS](https://git-lfs.github.com/)  
   This will be used to download any required binary assets, such as images or pdfs

3. Download and install [Node](https://nodejs.org/en/download/)  
   This is the programming language required to run the project

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
Deployments are used to configure data sources (such as google drive) and store generated content.   

An initial deployment can be created via the command
```
yarn workflow deployment create
```
You will be prompted to specify the deployment type, this should be a `New Local Deployment`. You will also be prompted to provide a name.

See [Deployment Documentation](./developers/deployments.md) for more information about configuring deployments

## Running locally

### Start the local server
```
yarn start
```
This will start a local server and serve the app in your browser on http://localhost:4200

# For Content Coders

Please see [Quickstart Authors](./authors/quickstart.md)

# For Developers

Please see [Quickstart Developers](./developers/quickstart.md)
