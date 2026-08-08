# National 5 Computing Science — Revision Site

A static revision website for the SQA National 5 Computing Science course (C816 75),
covering Software Design & Development, Computer Systems, and Database Design &
Development. Built to match the design of the
[Higher Computing Science revision site](https://github.com/gcurrie/higher-comp-sci-rev-site).

## Structure

- `index.html` — course overview and assessment breakdown
- `sdd/` — Software Design & Development (14 pages)
- `cs/` — Computer Systems (6 pages)
- `ddd/` — Database Design & Development (9 pages)
- `resources/` — past papers, checklists, links, exam tips
- `css/`, `js/` — shared stylesheet, navigation, search and syntax highlighting
- `resources/**/visualisers/` — interactive embedded visualisers

Web Design & Development (the alternative optional area) is intentionally not covered.

## Running locally

```bash
py -m http.server 8765
```

then open http://localhost:8765. See `SETUP.md` for git/GitHub setup notes.
