# Adding Documentation

For full documentation visit [mkdocs.org](https://www.mkdocs.org).

## Commands

* `mkdocs new [dir-name]` - Create a new project.
* `mkdocs serve` - Start the live-reloading docs server.
* `mkdocs build` - Build the documentation site.
* `mkdocs -h` - Print help message and exit.

## Project layout

    mkdocs.yml    # The configuration file.
    docs/
        index.md  # The documentation homepage.
        ...       # Other markdown pages, images and other files.


## Adding pages
These can be created in any sensible nested folder structure, and linked in the `nav` section of `mkdocs.yml` (used to prevent default alphabetical order), e.g.

```yml
nav:
  - Intro: index.md
  - Authors:
      - authors/quickstart.md
      - authors/notifications.md
  - Display Components:
      - components/audio.md
  - Developers:
      - developers/quickstart.md
      - developers/documentation.md
      - developers/device-testing.md
```

## Styling
A full set of styling options can be found from the theme documentation at https://squidfunk.github.io/mkdocs-material/reference/

!!! info
    This includes how to add things like callouts (admonitions), buttons, tables and more!

[View Theme Docs :fontawesome-solid-external-link-alt:](https://squidfunk.github.io/mkdocs-material/reference/){ .md-button .md-button--primary }

## Embedding Images
Images can be linked from local files, ideally in a nested `images` folder or similar. 

If editing in VSCode and adding screenshots, a handy extension to use is [Paste Image](https://marketplace.visualstudio.com/items?itemName=mushan.vscode-paste-image) which allows copy/paste directly into markdown files (using `ctrl + alt + v`) and will create the required image file (like how things work in github)

If using the extension it is recommended to enable the VSCode setting  `pasteImage.showFilePathConfirmInputBox`, which will prompt a filepath for saving images

![](images/paste-image.png)

## Component Docs
Individual component documentation can be found in the `./components` folder, ideally each document should contain the following information:

- [x] Example syntax for use in google sheet template
- [x] Example google sheet linked
- [x] Example live preview linked
- [x] List of available parameters, with description and defaults
- [x] Link in sidebar (added in `mkdocs.yml`)



