# Documentation

This repo contains documentation for the repository. 

The docs are created with MKDocs and deployed via Github Actions

https://www.mkdocs.org/


## Quickstart

```
pip install -r requirements.txt
```
```
mkdocs serve
```


## Using Virtual Environment

Set and activate a virtual environment
https://docs.python.org/3/library/venv.html

Create VEnv
```
python -m venv .venv
```

Set Venv

```sh
source .venv/bin/activate
```

```ps1
.\.venv\Scripts\Activate.ps1
```

Deactivate env
```
deactivate
```

## Theming
https://squidfunk.github.io/mkdocs-material/

## Deploying
Additional config to deploy via Github Actions can be found in [documentation-deploy.yml](../.github/workflows/documentation-deploy.yml)