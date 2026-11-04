# Rejoan Hasan Mugdho — Portfolio

Premium dark portfolio built with plain HTML, CSS and JavaScript. **No build step, no backend, no dependencies.**
All content is rendered from the files in `data/`, so you update the site by editing data, not HTML.

```text
rhmugdho5.github.io/
├── index.html          page shell + SEO/Open Graph tags (rarely edited)
├── styles.css          design system (colours are variables at the top)
├── script.js           renders everything from /data (you normally never edit this)
├── data/
│   ├── profile.js        name, tagline, intro, about text, semester, email, phone, photo & CV paths
│   ├── education.js      education timeline
│   ├── skills.js         skill groups + "currently strengthening" strip
│   ├── projects.js       project cards
│   ├── certifications.js certifications & training
│   ├── achievements.js   achievements + competitions
│   └── social.js         GitHub, LinkedIn, LeetCode, Codeforces, AtCoder
├── assets/
│   ├── cv.pdf  profile.jpg  favicon.svg  og-image.jpg
│   └── projects/         put project screenshots here
└── README.md
```

## Your workflow

Edit in VS Code → save → `git add . && git commit -m "Update portfolio" && git push` → GitHub Pages redeploys in about a minute.
To preview locally just double-click `index.html` (works offline except Google Fonts and GitHub stats), or run `python3 -m http.server 8000` and open http://localhost:8000.

## How to update things

| I want to… | Edit |
|---|---|
| Add a project | Copy a block in `data/projects.js`, fill it in |
| Add a project's GitHub / demo link | Set `github:` / `demo:` in that block. Empty = button hidden |
| Add a project screenshot | Save it in `assets/projects/`, set `image: "assets/projects/name.png"` |
| Add a certificate | Copy a block into `data/certifications.js` (add `date` and `url` when you have them) |
| Add an achievement / competition | `data/achievements.js` |
| Update my semester | `semester: "Semester 3"` in `data/profile.js` (shows in hero + education). `""` hides it |
| Add / remove a skill | `data/skills.js` → `items` |
| Change social links | `data/social.js` |
| Change email / phone | `data/profile.js` (`phone: ""` hides it) |
| Replace my CV | Overwrite `assets/cv.pdf` (keep the name) |
| Replace my photo | Overwrite `assets/profile.jpg` (portrait 4:5, about 880×1100, under 150 KB) |
| Change colours | `:root` variables at the top of `styles.css` |

Every data file has comments and examples. Keep the quotes and commas intact; if something breaks, open the browser console (F12) to see which file has the typo.

## Things only editable in `index.html`
Social-preview and search tags can't use JavaScript, so if your name, description, email or profile links ever change, also update the `<title>`, `description`, `og:` tags and the JSON-LD block in `<head>`.

## Deploy
Copy everything inside this folder (including the hidden `.nojekyll`) into your `rhmugdho5.github.io` repository root, replacing the old files. Delete the old `config.js` and `assets/Rejoan_Hasan_Mugdho_CV.pdf` — they are no longer used. Then commit and push.

## Notes
- Animations are lightweight (CSS + IntersectionObserver) and disabled under `prefers-reduced-motion`.
- GitHub stats and recent repos load from GitHub's public API and are cached for 10 minutes in the tab; if offline or rate-limited, that part is simply hidden.
- Fonts (Inter, Space Grotesk, JetBrains Mono) load from Google Fonts with system fallbacks.

## Content to double-check (flagged during the build)
1. **Project repo URLs** are blank on purpose: none were in your CV or old site. Add them in `projects.js`.
2. **Sirat** details beyond "Salah, Dhikr" (Quran, habits, zakat, duas, goals, role-based users, team project) come from your old site, not the CV. Remove what is not accurate. **MySphere** has only the CV's one-line description, so its features are deliberately minimal.
3. **Space Invaders**: the CV calls it "ASCII Game", the old site "Galactic Warfare – Deluxe Edition". Both are shown.
4. **Removed from the old site** because they are not in the CV: the planned *PassFort* project, "Python · Exploring", and "ICPC preparation". Add them back if true.
5. **Certifications and achievements have no dates** in the CV, so none are shown (only "2026" from the LKTW event name).
6. **Semester** is not stated in the CV; set it in `profile.js`.
7. **LinkedIn URL** uses the CV's `bd.linkedin.com/...` form; your old site used `www.linkedin.com/...`. Both reach the same profile.
8. The CV says CS50x is from "Harvard University"; it is kept as written.
