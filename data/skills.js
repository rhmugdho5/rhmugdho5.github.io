/* ============================================================
   SKILLS — the capability map. Source: CV "Technical Skills" and interests.
   Each group has two honest lists:
     items    = skills you HAVE USED (shown with a solid emerald dot)
     learning = things you are CURRENTLY LEARNING / STRENGTHENING (blue dashed)
   No percentages on purpose. Move a skill from `learning` to `items`
   when you have really used it in a project or coursework.
   `icon` options: code, brain, tool, layers, terminal, shield, spark
   ============================================================ */
window.SITE = window.SITE || {};

window.SITE.skills = [
  { group: "Programming Languages", icon: "code",
    items: ["C", "Java", "C++"], learning: [] },

  { group: "Computer Science Fundamentals", icon: "brain",
    items: ["Object-Oriented Programming", "Problem Solving", "File Handling"],
    learning: ["Data Structures & Algorithms"] },

  { group: "Development Tools", icon: "tool",
    items: ["Git", "GitHub", "VS Code", "Java Swing"], learning: [] },

  { group: "Operating Systems", icon: "terminal",
    items: ["Linux / Fedora"], learning: ["Computer systems"] },

  { group: "Cybersecurity Interests", icon: "shield",
    items: [],
    learning: ["Cybersecurity fundamentals", "Secure software development", "Computer networks", "Linux & system administration"] },

  { group: "Other Technical Skills", icon: "spark",
    items: ["Touch Typing", "Microsoft Office"], learning: [] },
];
