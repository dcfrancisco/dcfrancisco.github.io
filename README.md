Portfolio site scaffolded to `docs/` for GitHub Pages.

To preview locally, open `docs/index.html` in a browser or run a simple static server:

```bash
# from repository root
python3 -m http.server --directory docs 8000
```

GitHub Pages deployment options:

- Serve from the `docs/` folder on the `main` branch (Repository Settings → Pages → Source: main /docs)
- Or build to a `gh-pages` branch and enable Pages from that branch.

Next steps:

- Add more writing posts under `docs/writing/` and project details under `docs/projects/`.
- Optional: migrate to Astro or Next.js for templating and richer workflows.
