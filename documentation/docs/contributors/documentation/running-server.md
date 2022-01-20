# Running Documentation Server

## Pre-Requisites
The documentation requires python to be installed:   
[https://www.python.org/downloads/](https://www.python.org/downloads/)

## Installation
The scripts below will create a python [virtual environment](https://docs.python.org/3/library/venv.html), activate, install required dependencies and start local server

=== "Windows (powershell)"

    ``` ps1 linenums="1"
    cd documentation
    python -m venv .venv
    .\.venv\Scripts\Activate.ps1
    pip install -r requirements.txt
    mkdocs serve
    ```

=== "Linux (bash)"

    ```sh linenums="1"
    cd documentation
    python -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt
    mkdocs serve
    ```

## Running locally
Once installed, subsequent server starts can skip installation steps

=== "Windows (powershell)"

    ``` ps1 linenums="1"
    cd documentation
    .\.venv\Scripts\Activate.ps1
    mkdocs serve
    ```

=== "Linux (bash)"

    ```sh linenums="1"
    cd documentation
    source .venv/bin/activate
    mkdocs serve
    ```

The server will start at [http://127.0.0.1:8000](http://127.0.0.1:8000)
