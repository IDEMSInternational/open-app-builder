# Actions

Github actions for use by deployment repos

## Creating Templates
Templates follow the same syntax as github-actions 

### Adding Variables
Templates can be modified with user input variables. These are denoted with
````
%{VARIABLE_NAME}
```
Variables for replacement should be defined in the template configuration `index.ts`