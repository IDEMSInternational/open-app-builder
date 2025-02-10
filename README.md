#### ☁ Open in the Cloud 
[![Open in VS Code](https://img.shields.io/badge/Open%20in-VS%20Code-blue?logo=visualstudiocode)](https://vscode.dev/github/IDEMSInternational/open-app-builder)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/IDEMSInternational/open-app-builder)
[![Open in CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/embed/react-markdown-preview-co1mj?fontsize=14&hidenavigation=1&theme=dark)
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/IDEMSInternational/open-app-builder)
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/IDEMSInternational/open-app-builder?template=node&title=ngx-vcard%20Example)
[![Open in Repl.it](https://replit.com/badge/github/withastro/astro)](https://replit.com/github/IDEMSInternational/open-app-builder)
[![Open in Glitch](https://img.shields.io/badge/Open%20in-Glitch-blue?logo=glitch)](https://glitch.com/edit/#!/import/github/IDEMSInternational/open-app-builder)
[![Open in Codeanywhere](https://codeanywhere.com/img/open-in-codeanywhere-btn.svg)](https://app.codeanywhere.com/#https://github.com/IDEMSInternational/open-app-builder)

# Open App Builder

[Online Documentation](https://idemsinternational.github.io/open-app-builder/)

# Quickstart

## Prerequisites

1. Download and install [Git](https://git-scm.com/downloads)  
   This will be used to download the repository

2. Download and install [Git LFS](https://git-lfs.github.com/)  
   This will be used to download any required binary assets, such as images or pdfs

3. Download and install [Node](https://nodejs.org/en/download/)   
   This is the programming language required to run the project. We currently support any of the versions prefixed `v20.x.x` or `v18.x.x`

4. Download and Install [Yarn](https://classic.yarnpkg.com/en/docs/install)  
   This manages all 3rd-party code dependencies

## Installation

### Download the repo with binary assets

To download the repo into the current working directory, run:
```
git lfs clone https://github.com/IDEMSInternational/open-app-builder.git
```
Note - if you do a regular git clone, you can always run `git lfs fetch --all` later to sync assets

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
The app supports using different workspace or deployment configurations. These are stored in [.idems_app/deployments](./.idems_app/deployments)

To use an existing deployment, run the following script:
```
yarn workflow deployment set
```
If you have already imported or created a deployment, this will present an interactive list of deployments to select from.

If you have no available deployments, see [Deployment Documentation](https://idemsinternational.github.io/open-app-builder/developers/deployments/) for information about creating and configuring deployments.

## Running locally

### Start the local server
```
yarn start
```
This will start a local server and serve the app in your browser on http://localhost:4200.

## Finishing setup

In order to complete the setup process, navigate to the relevant section of the documentation from the options below, and continue with the steps outlined.

### For Content Authors

Please see [Quickstart Authors](https://idemsinternational.github.io/open-app-builder/authors/quickstart/)

### For Developers

Please see [Quickstart Developers](https://idemsinternational.github.io/open-app-builder/developers/quickstart/)
