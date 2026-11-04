/* ============================================================
   SOCIAL & CODING PROFILES — source: CV.
   Fields: id, name, handle, url, blurb, icon
   `icon` is a built-in key: github, linkedin, leetcode, codeforces, atcoder
   To hide a profile, delete its block. To add one, copy a block.
   `showInHero: true` puts it in the hero button row.
   ============================================================ */
window.SITE = window.SITE || {};

window.SITE.social = [
  { id: "github",     name: "GitHub",     handle: "@rhmugdho5",
    url: "https://github.com/rhmugdho5",
    blurb: "Source code for my projects and experiments.", icon: "github", showInHero: true },
  { id: "linkedin",   name: "LinkedIn",   handle: "rejoan-hasan-mugdho",
    url: "https://bd.linkedin.com/in/rejoan-hasan-mugdho",
    blurb: "Professional profile and network.", icon: "linkedin", showInHero: true },
  { id: "leetcode",   name: "LeetCode",   handle: "RJXvy2sFh7",
    url: "https://leetcode.com/u/RJXvy2sFh7/",
    blurb: "Data structures & algorithms practice.", icon: "leetcode" },
  { id: "codeforces", name: "Codeforces", handle: "rhmugdho5",
    url: "https://codeforces.com/profile/rhmugdho5",
    blurb: "Competitive programming contests.", icon: "codeforces" },
  { id: "atcoder",    name: "AtCoder",    handle: "rhmugdho5",
    url: "https://atcoder.jp/users/rhmugdho5",
    blurb: "Algorithmic contests and practice.", icon: "atcoder" },
];
