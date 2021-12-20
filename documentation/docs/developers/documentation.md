# Editing Documentation

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
      - authors/template-component-parameter-list.md
  - Developers:
      - developers/quickstart.md
      - developers/documentation.md
      - developers/device-testing.md
```
