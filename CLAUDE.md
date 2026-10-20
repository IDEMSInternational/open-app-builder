@AGENTS.md

# Claude Code specifics

- `.claude/settings.json` denies the file-editing tools, as a backstop for the suggest-only rule in `AGENTS.md`.
- The topic notes in `.claude/rules/` load automatically: at session start, or — for files with `paths:`
  frontmatter — when you read a matching file. Skills in `.claude/skills/` load on demand.
- Personal notes and your role (e.g. `I am an author.`) go in `CLAUDE.local.md` (gitignored) or auto-memory.
