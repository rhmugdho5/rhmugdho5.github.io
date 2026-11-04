/* ============================================================
   PROJECTS — add a new project by copying one block and filling it in.
   Newest/most important first. No HTML needed.

   Fields
   - title, subtitle   : name + short label
   - description       : 1–3 sentences
   - features          : 3–5 short bullet points (only things that are true)
   - tech              : technology tags
   - type              : e.g. "Desktop app", "Console app", "Game"
   - github            : full repo URL, e.g. "https://github.com/rhmugdho5/sirat"
                         Leave "" and no button is shown (nothing broken).
   - demo              : live demo URL. Leave "" to hide.
   - image             : optional screenshot, e.g. "assets/projects/sirat.png".
                         Leave "" to use the generated cover.
   - icon              : cover icon: moon, wallet, checklist, invader, shield, code
   - accent            : "emerald" or "blue" (cover colour)
   ============================================================ */
window.SITE = window.SITE || {};

window.SITE.projects = [
  {
    title: "Sirat",
    subtitle: "Your Islamic Life Companion",
    type: "Desktop app · Team project",
    description:
      "A Java desktop application that brings an Islamic daily routine into one place, featuring Salah and Dhikr. Built with a Swing interface and object-oriented design.",
    features: [
      "Salah and Dhikr features",
      "Further lifestyle modules: Quran reading, habits, zakat, duas and goals",
      "Role-based users",
      "File-based data handling",
    ],
    tech: ["Java", "Swing", "OOP", "File Handling"],
    github: "",
    demo: "",
    image: "",
    icon: "moon",
    accent: "emerald",
  },
  {
    title: "MySphere",
    subtitle: "Personal Expense Tracker",
    type: "Desktop app",
    description:
      "A Java desktop application for managing personal expenses, built with Swing and object-oriented programming.",
    features: [
      "Personal expense management",
      "Desktop GUI built with Java Swing",
      "Object-oriented design",
    ],
    tech: ["Java", "Swing", "OOP"],
    github: "",
    demo: "",
    image: "",
    icon: "wallet",
    accent: "blue",
  },
  {
    title: "PACT",
    subtitle: "Program & Accountability Console Tracker",
    type: "Console app",
    description:
      "A C console application for managing users, programs, tasks, deadlines and accountability, using structured records and file-based storage.",
    features: [
      "User and program management",
      "Task and deadline tracking",
      "Accountability workflow, including subscription and administrator data",
      "Persistent storage with C file handling",
    ],
    tech: ["C", "File Handling", "Console"],
    github: "",
    demo: "",
    image: "",
    icon: "checklist",
    accent: "emerald",
  },
  {
    title: "Space Invaders",
    subtitle: "Galactic Warfare: Deluxe Edition",
    type: "ASCII console game",
    description:
      "A real-time ASCII console game in C, using the Windows API for console control. It features enemies, power-ups, boss phases and scoring.",
    features: [
      "Enemies, power-ups and boss phases",
      "Scoring system",
      "Real-time gameplay loop with keyboard input",
      "Retro ASCII rendering via the Windows API",
    ],
    tech: ["C", "Windows API", "Game Loop"],
    github: "",
    demo: "",
    image: "",
    icon: "invader",
    accent: "blue",
  },
];
