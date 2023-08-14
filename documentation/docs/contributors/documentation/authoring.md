# Adding Documentation

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
    This includes how to add things like call-outs (admonitions), buttons, tables and more!

[View Theme Docs :fontawesome-solid-external-link-alt:](https://squidfunk.github.io/mkdocs-material/reference/){ .md-button .md-button--primary }

## Screenshots and Images
Images can be linked from local files, ideally in a nested `images` folder or similar. 

If editing in VSCode and adding screenshots, a handy extension to use is [Paste Image](https://marketplace.visualstudio.com/items?itemName=mushan.vscode-paste-image) which allows copy/paste directly into markdown files (using `ctrl + alt + v`) and will create the required image file (like how things work in github)

If using the extension it is recommended to enable the VSCode setting  `pasteImage.showFilePathConfirmInputBox`, which will prompt a filepath for saving images

![](../images/paste-image.png)

!!! tip
    When adding screenshots the recommended device width is **425px**. This is the size available in google chrome as `Mobile L` configuration. If the screenshot is unclear at this sizing the next recommendation would be 768px

## Component Docs
Individual component documentation can be found in the `./components` folder, ideally each document should contain the following information:

- [x] Example syntax for use in google sheet template
- [x] Example google sheet linked
- [x] Example live preview linked
- [x] List of available parameters, with description and defaults
- [x] Link in sidebar (added in `mkdocs.yml`)



