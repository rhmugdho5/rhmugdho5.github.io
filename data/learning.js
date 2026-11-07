/* ============================================================
   LEARNING MAP  —  "Journey" section (interactive network)
   ------------------------------------------------------------
   Each node is a topic I'm working on. Click one on the site to see
   its details. Nodes connect to `links`. The centre node is
   the first one with `center: true`.

   Fields:
     id      – unique short id
     label   – text on the node
     status  – "hands-on"  (I build / use this)
               "learning"  (current focus)
               "interest"  (exploring, not yet formal)
     text    – 1–2 honest sentences shown in the detail panel
     links   – ids of related nodes

   These are focus areas — NOT completed qualifications. Keep wording honest.
   Add a node: copy a block, give it a new id, and list it in some `links`.
   ============================================================ */
window.PORTFOLIO = window.PORTFOLIO || {};

window.PORTFOLIO.learning = {
  heading: "Where my learning is heading",
  intro:
    "Cybersecurity is my long-term direction. These are the foundations I'm building around it — some I already use in projects, some I'm still learning.",
  statuses: {
    "hands-on": "Hands-on",
    learning: "Currently learning",
    interest: "Exploring",
  },
  nodes: [
    {
      id: "security", label: "Cybersecurity", center: true, status: "learning",
      text: "My primary long-term direction. I'm learning the fundamentals step by step and have taken training from Cyberwarfare Labs on AI-assisted web application recon and agentic adversaries.",
      links: ["networks", "linux", "secdev", "os", "programming"],
    },
    {
      id: "programming", label: "Programming", status: "hands-on",
      text: "Projects in C and Java using procedural and object-oriented design: a Swing desktop app, a console tracker and a real-time console game.",
      links: ["dsa", "secdev", "security"],
    },
    {
      id: "dsa", label: "Data Structures & Algorithms", status: "learning",
      text: "Strengthening the fundamentals and practising problem solving on LeetCode, Codeforces and AtCoder.",
      links: ["programming", "os"],
    },
    {
      id: "os", label: "Operating Systems", status: "learning",
      text: "Building an understanding of how computer systems work under the hood.",
      links: ["linux", "dsa", "security"],
    },
    {
      id: "linux", label: "Linux", status: "hands-on",
      text: "Fedora is my working environment, with growing interest in Linux system administration.",
      links: ["os", "networks", "security"],
    },
    {
      id: "networks", label: "Computer Networks", status: "interest",
      text: "An area of interest I want to go deeper into, since most security work touches networks.",
      links: ["security", "linux"],
    },
    {
      id: "secdev", label: "Secure Software Development", status: "interest",
      text: "Interested in writing code that is secure by design — the link between my development work and security.",
      links: ["programming", "security"],
    },
  ],
};
