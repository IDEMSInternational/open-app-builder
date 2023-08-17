# XLSForm Converter

This package converts xlsform to xml and enketo JSON

This is a 2-step process, and is run in docker containers to ensure correct python and node environments to run conversions.
The steps use the following tools to convert xlsform to xml, and then xml to enketo json

https://github.com/xlsform/pyxform
https://github.com/enketo/enketo-transformer



## Prerequisites
- Docker

## Use
Place any forms to be converted in the `forms` folder and then run script

```
yarn workspace @idemsInternational/xlsform-converter start
```

## TODO
- [x] XML conversion script
- [x] Enekto JSON conversion script
- [x] Docker runtime
- [ ] Media file support
- [ ] Public API
- [ ] Serverless Deployment
- [ ] Tests