# Actions

Github actions for use by deployment repos

## Creating Action Templates
Action templates follow the same syntax as github-actions 

## Adding Variables
Action templates can be modified with user input variables. These are denoted with
```
%{VARIABLE_NAME}
```
Variables for replacement should be defined in the action template `config.ts`

**Note** - when actions are triggered from main app workflows all active deployment variables will be available and can be set as default value for any inputs

## Managing Secrets
Actions may additionally require github secrets to be configured. Currently these need to be configured manually