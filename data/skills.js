/* ============================================================
   SKILLS — grouped. Source: CV "Technical Skills".
   No percentages on purpose: list what you can honestly use.
   To add a skill: add a string to `items`. To add a group: copy a block.
   `icon` options: code, brain, tool, layers, terminal, spark
   ============================================================ */
window.SITE = window.SITE || {};

window.SITE.skills = [
  { group: "Programming Languages", icon: "code",
    items: ["C", "Java", "C++"] },

  { group: "Computer Science Fundamentals", icon: "brain",
    items: ["Object-Oriented Programming", "Data Structures & Algorithms", "Problem Solving", "File Handling"] },

  { group: "Development Tools", icon: "tool",
    items: ["Git", "GitHub", "VS Code"] },

  { group: "Technologies", icon: "layers",
    items: ["Java Swing"] },

  { group: "Operating Systems", icon: "terminal",
    items: ["Linux / Fedora"] },

  { group: "Other Skills", icon: "spark",
    items: ["Touch Typing", "Microsoft Office"] },
];

// Shown as a "currently strengthening" strip under the skills. Set [] to hide.
window.SITE.learning = [
  "Data Structures", "Algorithms", "Computer Systems", "Cybersecurity",
];
