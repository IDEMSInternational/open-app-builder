---
name: assistant-update
description: Commit an addition to the assistant knowledge base (.claude/, AGENTS.md, CLAUDE.md) to the running assistant-updates PR. Use only when a developer with write access explicitly asks to add a proposed rule or note.
---

# Add to the running `assistant-updates` PR

Knowledge-base additions share one running PR, so they don't each become a PR on the code repo. `.claude/`-only
PRs get the `assistant` label, which keeps them out of release notes and lets people filter them out of the PR
list (`-label:assistant`). The repo's normal review rules apply: any human on the team reviews and merges the PR.
The assistant never approves or merges it, even when asked, because it would be acting under a person's account.

Before starting, check all of this. If any fails, stop and say why:

- A developer with write access asked for this addition. Authors pass the snippet to a developer instead.
- It only touches `.claude/`, `AGENTS.md` or `CLAUDE.md`. Code fixes get a normal PR, and bugs a normal issue.
- It follows "Maintaining this knowledge base" in `AGENTS.md`: durable, general, in the entry format.

## Steps

Work in a temporary sparse clone, so the person's checkout, branch and uncommitted work are not touched. A
worktree does not suit this: a full checkout can fail on Windows (`Filename too long`), and the repo's pre-commit
hook needs `node_modules`. A fresh clone has no hooks installed, and that hook only formats `ts`, `scss` and `html`
files, so nothing is skipped for these edits.

```sh
REPO=IDEMSInternational/open-app-builder
BRANCH=master
git ls-remote --exit-code --heads "https://github.com/$REPO.git" assistant-updates && BRANCH=assistant-updates
CLONE=$(mktemp -d)
git clone --quiet --depth 1 --filter=blob:none --sparse --branch "$BRANCH" "https://github.com/$REPO.git" "$CLONE"
cd "$CLONE"
git sparse-checkout set .claude
[ "$BRANCH" = master ] && git switch -c assistant-updates
```

Make the edit in the clone, not the person's checkout, which may not have the PR's latest entries. Check there
for an entry to update rather than duplicate.

```sh
git add .claude AGENTS.md CLAUDE.md
git commit -m "<what was learned, in one line>"
git push origin assistant-updates
```

If the push is rejected because someone else pushed first, run `git pull --rebase origin assistant-updates` and
push again. Then make sure a PR is open, creating it only if this prints nothing:

```sh
gh pr list --repo "$REPO" --head assistant-updates --state open --json url --jq '.[].url'

gh pr create --repo "$REPO" --base master --head assistant-updates \
  --title "chore: assistant knowledge base updates" \
  --body "Running PR for assistant knowledge base additions, merged every couple of weeks."
```

Delete the temporary clone and give the person the PR link.

The branch is deleted when the PR merges, so the next addition starts again from `master`. Master must be merged
into the branch before the PR can be merged, because the repo requires branches to be up to date.
