# khalilbalaree.github.io

Source for my personal website: **https://khalilbalaree.github.io**

The site has my publications, a blog on my research, and a travel map.

## Structure

- `_pages/` – about, publications, blog and travel pages
- `_posts/` – blog posts
- `_bibliography/papers.bib` – publication list
- `assets/img/` – figures and publication previews

## Run locally

```bash
docker compose up
# or, with Ruby and Bundler installed:
bundle install && bundle exec jekyll serve
```

Then open http://localhost:8080 (Docker) or http://localhost:4000 (Jekyll).

## Deploy

Pushing to `master` triggers the GitHub Actions workflow in `.github/workflows/deploy.yml`, which builds the site and publishes it to the `gh-pages` branch.

## Credits

Built on the [al-folio](https://github.com/alshedivat/al-folio) Jekyll theme, released under the [MIT License](LICENSE).
