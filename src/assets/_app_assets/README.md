# App Assets
Assets will automatically be copied into this folder from the corresponding shared data repo assets folder during build. 

Example `angular.json` config snippet
```
{
    "glob": "**/*",
    "input": "node_modules/plh-data/assets",
    "output": "assets/_app_assets"
},
```

They will not show up in git.