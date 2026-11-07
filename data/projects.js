/* ============================================================
   PROJECTS
   ------------------------------------------------------------
   Every object below becomes a project card. Order = display order.

   Fields:
     title        – project name
     subtitle     – one-line tagline
     category     – small label above the title (e.g. "Desktop Application")
     description  – 1–3 sentences
     features     – bullet list of key features (only things that are true!)
     tech         – technology tags
     accent       – colour used for this project's identity (any hex colour)
     imageNote    – small caption on the preview. Keep "Illustration — not a
                    screenshot" until you add a real screenshot, then set it to "".
     image        – preview image path. SVG/PNG/JPG/WebP all work.
                    Replace with a real screenshot any time, e.g.
                    "assets/projects/sirat.png"
     imageAlt     – alt text for the image
     links.github – repository URL, or "" if not published / unknown
     links.demo   – live demo URL, or "" if there is none
     featured     – true makes the card span the full width (use sparingly)

   LINKS: any link left as "" is NOT shown on the site, so there are
   never broken buttons. Paste the URL in and it appears automatically.
   Your repository names are listed live in the "Latest on GitHub" strip
   (Profiles section) once the site is online — copy the URLs from there.

   EXAMPLE of a new project (copy, paste above the closing ];):
     {
       title: "My New Project",
       subtitle: "What it does in one line",
       category: "Web Application",
       description: "A short professional description.",
       features: ["Feature one", "Feature two"],
       tech: ["Python", "Flask"],
       image: "assets/projects/my-new-project.png",
       imageAlt: "Screenshot of My New Project",
       links: { github: "https://github.com/rhmugdho5/my-new-project", demo: "" },
     },
   ============================================================ */
window.PORTFOLIO = window.PORTFOLIO || {};

window.PORTFOLIO.projects = [
  {
    title: "Sirat",
    subtitle: "Your Islamic Life Companion",
    category: "Desktop Application",
    description:
      "An Islamic lifestyle desktop application for everyday practice, built with Java Swing using object-oriented design.",
    features: ["Salah", "Dhikr", "Java Swing graphical interface", "Object-oriented architecture"],
    tech: ["Java", "Java Swing", "OOP"],
    accent: "#00E6AD",
    imageNote: "Illustration — not a screenshot",
    image: "assets/projects/sirat.svg",
    imageAlt: "Illustrated application window for Sirat with Salah and Dhikr sections",
    links: {
      github: "", // <- paste the repository URL here, e.g. "https://github.com/rhmugdho5/Sirat"
      demo: "",
    },
    featured: false,
  },
  {
    title: "MySphere",
    subtitle: "Personal Expense Tracker",
    category: "Desktop Application",
    description:
      "A desktop application for managing personal expenses, built with Java Swing and object-oriented programming.",
    features: ["Personal expense management", "Java Swing graphical interface", "Object-oriented architecture"],
    tech: ["Java", "Java Swing", "OOP"],
    accent: "#36A9FF",
    imageNote: "Illustration — not a screenshot",
    image: "assets/projects/mysphere.svg",
    imageAlt: "Illustrated dashboard for MySphere with charts",
    links: { github: "", demo: "" },
    featured: false,
  },
  {
    title: "PACT",
    subtitle: "Program & Accountability Console Tracker",
    category: "Console Application",
    description:
      "A console application for managing users, programs, tasks, deadlines and accountability, built in C with file handling.",
    features: ["User management", "Programs and tasks", "Deadlines", "Accountability tracking", "File handling"],
    tech: ["C", "File Handling"],
    accent: "#7FD4FF",
    imageNote: "Illustration — not a screenshot",
    image: "assets/projects/pact.svg",
    imageAlt: "Illustrated management console for PACT with users, programs, tasks and deadlines",
    links: { github: "", demo: "" },
    featured: false,
  },
  {
    title: "Space Invaders",
    subtitle: "Galactic Warfare: Deluxe Edition",
    category: "Console Game · ASCII",
    description:
      "A real-time ASCII console game for Windows with enemies, power-ups, boss phases and scoring.",
    features: ["Real-time gameplay", "Enemies and power-ups", "Boss phases", "Scoring system"],
    tech: ["C", "Windows API"],
    accent: "#FFB84D",
    imageNote: "Illustration — not a screenshot",
    image: "assets/projects/space-invaders.svg",
    imageAlt: "Retro CRT illustration of the Space Invaders ASCII console game",
    links: { github: "", demo: "" },
    featured: false,
  },
];
