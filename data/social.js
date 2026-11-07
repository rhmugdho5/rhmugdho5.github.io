/* ============================================================
   SOCIAL & CODING PROFILES
   ------------------------------------------------------------
   Each entry becomes a card in the "Profiles" section and
   (where `hero: true`) an icon button in the hero.
   To add a profile: copy one block, change the values.
   To remove: delete the block (or set url to "").
   `icon` can be: github, linkedin, leetcode, codeforces, atcoder, mail
   ============================================================ */
window.PORTFOLIO = window.PORTFOLIO || {};

window.PORTFOLIO.social = {
  /* GitHub username used for the live GitHub stats / latest repositories.
     Set githubApi to false to switch the GitHub API calls off entirely. */
  githubUser: "rhmugdho5",
  githubApi: true,

  profiles: [
    {
      id: "github",
      label: "GitHub",
      handle: "@rhmugdho5",
      url: "https://github.com/rhmugdho5",
      description: "Source code for my academic and personal projects.",
      icon: "github",
      hero: true,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      handle: "Rejoan Hasan Mugdho",
      url: "https://bd.linkedin.com/in/rejoan-hasan-mugdho",
      description: "Professional profile and connections.",
      icon: "linkedin",
      hero: true,
    },
    {
      id: "leetcode",
      label: "LeetCode",
      handle: "RJXvy2sFh7",
      url: "https://leetcode.com/u/RJXvy2sFh7/",
      description: "Data structures & algorithms practice.",
      icon: "leetcode",
      badge: "LC",
    },
    {
      id: "codeforces",
      label: "Codeforces",
      handle: "rhmugdho5",
      url: "https://codeforces.com/profile/rhmugdho5",
      description: "Competitive programming profile.",
      icon: "codeforces",
      badge: "CF",
    },
    {
      id: "atcoder",
      label: "AtCoder",
      handle: "rhmugdho5",
      url: "https://atcoder.jp/users/rhmugdho5",
      description: "Competitive programming profile.",
      icon: "atcoder",
      badge: "AC",
    },
  ],
};
