# Rejoan Hasan Mugdho — Portfolio

Plain HTML, CSS and vanilla JavaScript. No build step, no dependencies, no backend. Works by double-clicking `index.html` and on GitHub Pages.

**You almost never touch HTML.** The page is rendered from the files in `data/`.

```
rhmugdho5.github.io/
├── index.html          page skeleton + SEO tags (rarely edited)
├── styles.css          design system (colour tokens at the top)
├── script.js           renders the page + all interactions (no need to edit)
├── data/
│   ├── profile.js        name, intro, typing phrases, status, terminal card, semester, contact, CV & photo paths, about text
│   ├── education.js      education timeline
│   ├── learning.js       interactive learning map (focus areas + how they connect)
│   ├── skills.js         capability map: categories + honest status per skill
│   ├── projects.js       project showcase
│   ├── certifications.js certificates & courses (expandable cards)
│   ├── achievements.js   recognition + competitions
│   └── social.js         GitHub / LinkedIn / LeetCode / Codeforces / AtCoder
├── assets/
│   ├── cv.pdf  profile.jpg/.webp  profile-480.*  favicon.svg
│   ├── og-image.jpg  apple-touch-icon.png
│   └── projects/         project preview artwork (replace with screenshots anytime)
├── robots.txt  sitemap.xml  404.html  .nojekyll
```

## What's new in this version
- Animated network-topology background (canvas) in the hero and contact sections, plus a slowly flowing grid. Pauses off-screen and when the tab is hidden; a static frame is drawn for reduced-motion users.
- Portrait composition with orbital lines, corner brackets, a decorative ID label and a small profile summary panel (real facts only). Subtle pointer parallax on desktop.
- Rotating role line, terminal card in About, scroll progress bar, count-up numbers (counts are computed from your data files), refined cursor ring on desktop (the normal cursor stays visible).
- **Learning map** (Journey section): interactive network of focus areas — click or use keyboard. Statuses: Hands-on / Currently learning / Exploring. Edit in `data/learning.js`.
- **Capability map** (Skills): tabbed categories, every skill tagged *Used in projects*, *Listed skill*, *Currently learning* or *Area of interest*. No percentages.
- **Projects**: large per-project showcases with their own accent colour and artwork; subtle 3D tilt on hover.
- **Credentials**: expandable cards with details; filters.
- Everything respects `prefers-reduced-motion`.

## Deploy (your normal workflow)

1. Extract the ZIP and copy **everything** (including the hidden `.nojekyll`) into your `rhmugdho5.github.io` repo, replacing old files. Old files you no longer need: `assets/rejoan-profile.png`, `assets/Rejoan_Hasan_Mugdho_CV.pdf`.
2. `git add -A && git commit -m "Update portfolio" && git push`
3. Repo → Settings → Pages → Deploy from branch → `main` / root (only needed once).

Preview locally: open `index.html`, or run `python3 -m http.server 8000` in the folder.

## Everyday edits

| I want to… | Edit |
|---|---|
| Update my semester | `data/profile.js` → `currentSemester: "3rd Semester"` (shows in hero chip + education timeline; `""` hides it) |
| Change intro / about text / tagline / typing phrases | `data/profile.js` |
| Add a project | copy a block in `data/projects.js`; put an image in `assets/projects/` |
| Add a project's GitHub/demo link | fill `links.github` / `links.demo` in `data/projects.js` — empty links are never shown |
| Add a certification | copy a block in `data/certifications.js` |
| Add an award / competition | copy a block in `data/achievements.js` (`type: "recognition"` or `"competition"`) |
| Add a skill | add `{ name: "...", status: "skill" }` to `items` in `data/skills.js` (status: `project`, `skill`, `learning`, `interest`) |
| Add / change a learning-map topic | `data/learning.js` (give it an `id` and list it in `links` of related topics) |
| Change the hero status line, rotating phrases, terminal card, status panel | `data/profile.js` |
| Give a project its own colour / caption | `accent` and `imageNote` in `data/projects.js` |
| Add expanded details to a certificate | `details`, `topics`, `url`, `date` in `data/certifications.js` |
| Add education | copy a block in `data/education.js` |
| Update social / coding links | `data/social.js` |
| Replace my CV | overwrite `assets/cv.pdf` (same name). Different name? change `cv.file` in `profile.js` and the `href` of the two `data-cv` links is updated automatically |
| Replace my photo | overwrite `assets/profile.jpg`, `profile.webp` (960×1280) and `profile-480.jpg/.webp` (480×640) |
| Change colours | `:root` variables at the top of `styles.css` |

Every data file has comments and a copy-paste example at the top. A trailing comma or missing quote is the usual cause of a blank section — open the browser console (F12) to see the error.

### Things still in HTML (edit only if they change)
`index.html` holds the page `<title>`, meta description, Open Graph tags, the JSON-LD block and the download filename on the nav CV button. Update these if your name/university ever changes. Social-preview image: `assets/og-image.jpg` (1200×630).

## GitHub API
The Profiles section calls the public GitHub API (no key) to show your repo/follower count and a "Latest on GitHub" list. If it's blocked or rate-limited the section simply stays hidden. Turn off with `githubApi: false` in `data/social.js`. Use that list to copy each project's repository URL into `projects.js`.

## Items to verify (flagged from the CV)
- **Project repository links** aren't in the CV, so all are blank placeholders.
- **Space Invaders:** your CV calls it "Space Invaders – ASCII Game"; "Galactic Warfare: Deluxe Edition" comes from your brief and is used as the subtitle. Edit if wrong.
- **Certificate/achievement dates and issuer details** — the CV gives none for dates, so none are shown.
- **Competitions** are described as participation (CV heading: "Competitions & Participation"); add `note` if you have a result.
- **Project preview images** are original illustrations, not screenshots. Drop real screenshots into `assets/projects/` and update `image`.
- **Semester** isn't in the CV: `currentSemester` is empty.
- Fonts load from Google Fonts (Space Grotesk, Inter, JetBrains Mono); offline they fall back to system fonts. I could not render those exact fonts in my test environment, so check the look once on the live site.
- Hero panel/label text ("STATUS · Student", "ID · RHM-01", "A·07") is decorative or taken from your CV — edit `statusPanel` in `profile.js`.
- Skill statuses and learning-map wording are derived from your CV (projects, "currently strengthening", interests). Adjust them if any status is not accurate.
- Lighthouse has not been run. If your browser console shows a GitHub API error, that is only the optional GitHub stats call being blocked/offline.
