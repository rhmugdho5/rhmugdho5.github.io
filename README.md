# Rejoan Hasan Mugdho — Personal Portfolio

A responsive, cybersecurity-inspired personal portfolio built with HTML, CSS and vanilla JavaScript. Designed for GitHub Pages.

## Project structure

```text
rejoan-portfolio/
├── index.html
├── styles.css
├── script.js
├── config.js
├── README.md
└── assets/
    └── Rejoan_Hasan_Mugdho_CV.pdf
```

## Before publishing

1. Open `config.js`.
2. Replace `YOUR_GITHUB_USERNAME` with your GitHub username (the handle only).
3. Add your preferred public contact email to `contactEmail`.
4. Optionally set `githubProfileUrl` if you use a different profile URL.
5. Replace the starter CV PDF in `assets/` with your final, up-to-date CV.
6. Review project descriptions, certificates and links. Add repository URLs to the project modal data in `script.js` if you want direct project links.
7. Update the education and achievement details if anything has changed.

The GitHub section reads public repositories from GitHub's public REST API. It does not require a personal access token. GitHub API rate limits may apply.

The contact form uses a `mailto:` link. It opens the visitor's email application; it does not send messages to a server. For a true website-hosted form, connect a form provider (for example Formspree) and replace the submit handler in `script.js`.

## Preview locally

Open `index.html` in a browser. For a local development server, run this command from the project folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy to GitHub Pages

1. Create a public GitHub repository named `YOUR_GITHUB_USERNAME.github.io`.
2. Upload the contents of this folder to the repository root (not the containing folder).
3. In GitHub, open **Settings → Pages**.
4. Select **Deploy from a branch**, choose `main` and `/ (root)`, then save.
5. Wait for the Pages deployment and open `https://YOUR_GITHUB_USERNAME.github.io`.

For official details, see:
- https://docs.github.com/en/pages
- https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user

## Notes

- No framework, build step, API key or server is required.
- Animations respect the visitor's reduced-motion preference.
- The CV included is a starter profile document. Replace it with your verified, complete CV before sharing the site professionally.
