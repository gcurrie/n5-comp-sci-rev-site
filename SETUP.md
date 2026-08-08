# Project Setup — N5 Revision Site

How this project folder was connected to GitHub, and how to do it yourself next time.

## What was done (8 Aug 2026)

The GitHub repository existed at https://github.com/gcurrie/n5-comp-sci-rev-site
(created via the GitHub website with a README), but the local project folder was empty —
the repo had never been **cloned** (downloaded and linked) onto this computer.

The fix was one command, run inside the empty project folder:

```bash
git clone https://github.com/gcurrie/n5-comp-sci-rev-site .
```

The trailing `.` means "clone into this folder" rather than creating a new subfolder.
This only works if the folder is empty.

## Setting up a new project yourself in future

1. **Create the repo on GitHub** (github.com → New repository). Ticking
   "Add a README" is fine — it gives the repo an initial commit.
2. **Clone it into your project folder.** Either:
   - `git clone https://github.com/gcurrie/<repo-name> .` from inside an empty folder, or
   - `git clone https://github.com/gcurrie/<repo-name>` from the parent folder
     (creates a subfolder named after the repo).
3. **Work, then commit and push:**
   ```bash
   git add -A
   git commit -m "Describe the change"
   git push
   ```

If you create files *before* cloning, the clone will refuse because the folder
isn't empty. In that case: `git init`, then
`git remote add origin https://github.com/gcurrie/<repo-name>`,
`git fetch origin`, `git branch --set-upstream-to=origin/main main`, and merge/pull.
Cloning first is much simpler.

## Running the site locally

The `.claude/launch.json` is set up so Claude Code can start a preview server, or run:

```bash
py -m http.server 8765
```

then open http://localhost:8765 in a browser.
