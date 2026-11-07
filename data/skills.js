/* ============================================================
   SKILLS  —  the "capability map"
   ------------------------------------------------------------
   Each group is a tab. Each item has an honest STATUS instead of a
   percentage bar:

     status: "project"  – used in one of my listed projects
             "skill"    – listed in my CV skills
             "learning" – I am currently learning / strengthening it
             "interest" – an area I'm interested in and exploring

   Optional per item:  note: "short text shown in the tile"

   Add a skill:     add { name: "...", status: "skill" } to `items`.
   Add a category:  copy a whole { ... } block.
   Icons: code, book, tools, terminal, layers, star, shield
   Never claim a status you can't back up — that's the point of this map.
   ============================================================ */
window.PORTFOLIO = window.PORTFOLIO || {};

window.PORTFOLIO.skillStatuses = {
  project:  { label: "Used in projects" },
  skill:    { label: "Listed skill" },
  learning: { label: "Currently learning" },
  interest: { label: "Area of interest" },
};

window.PORTFOLIO.skills = [
  {
    title: "Programming Languages",
    icon: "code",
    blurb: "Languages I write code in.",
    items: [
      { name: "C", status: "project", note: "PACT · Space Invaders" },
      { name: "Java", status: "project", note: "Sirat · MySphere" },
      { name: "C++", status: "skill" },
    ],
  },
  {
    title: "CS Fundamentals",
    icon: "book",
    blurb: "The concepts everything else is built on.",
    items: [
      { name: "Object-Oriented Programming", status: "project", note: "Sirat · MySphere" },
      { name: "File Handling", status: "project", note: "PACT" },
      { name: "Problem Solving", status: "skill" },
      { name: "Data Structures & Algorithms", status: "learning" },
      { name: "Computer Systems", status: "learning" },
    ],
  },
  {
    title: "Development Tools",
    icon: "tools",
    blurb: "Tooling for building and versioning.",
    items: [
      { name: "Git", status: "skill" },
      { name: "GitHub", status: "skill" },
      { name: "VS Code", status: "skill" },
      { name: "Java Swing", status: "project", note: "Sirat · MySphere" },
    ],
  },
  {
    title: "Operating Systems",
    icon: "terminal",
    blurb: "Operating systems I work with and want to understand better.",
    items: [
      { name: "Linux / Fedora", status: "skill" },
      { name: "Linux & System Administration", status: "interest" },
    ],
  },
  {
    title: "Cybersecurity Interests",
    icon: "shield",
    blurb: "My primary long-term direction — learning step by step.",
    items: [
      { name: "Cybersecurity", status: "learning", note: "Cyberwarfare Labs training" },
      { name: "Secure Software Development", status: "interest" },
      { name: "Computer Networks", status: "interest" },
    ],
  },
  {
    title: "Other Technical Skills",
    icon: "star",
    blurb: "Everyday productivity skills.",
    items: [
      { name: "Touch Typing", status: "skill" },
      { name: "Microsoft Office", status: "skill" },
    ],
  },
];
