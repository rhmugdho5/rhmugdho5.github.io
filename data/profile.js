/* ============================================================
   PROFILE  —  your personal information
   ------------------------------------------------------------
   Edit the values between the quotes. Save, commit, push.
   Anything left as "" (empty) is simply not shown on the site.
   ============================================================ */
window.PORTFOLIO = window.PORTFOLIO || {};

window.PORTFOLIO.profile = {
  /* ---------- Identity ---------- */
  name: "Rejoan Hasan Mugdho",
  firstName: "Rejoan",
  designation: "Computer Science & Engineering Student",
  tagline: "Building Secure Systems. Solving Real Problems.",

  /* Short intro shown in the hero (keep it to 2–3 sentences). */
  intro:
    "CSE undergraduate at North South University with hands-on experience in C and Java. I'm building a strong foundation in computer science, with cybersecurity as the field I'm most drawn to.",

  /* Phrases that rotate in the typing animation under the name.
     Add / remove / reword freely. (First phrase is shown if the visitor
     prefers reduced motion.) */
  typing: [
    "Cybersecurity Enthusiast",
    "Computer Science Student",
    "Developer",
    "Problem Solver",
    "Lifelong Learner",
  ],

  /* Small status line in the hero (pulsing dot). Keep it truthful and short. */
  status: "Studying CSE · Focus: Cybersecurity",

  /* Minimal "system status" panel next to the portrait. Each row is a
     label + value. These are plain facts about you — edit freely. */
  statusPanel: [
    { label: "STATUS", value: "Student" },
    { label: "PROGRAM", value: "B.Sc. CSE" },
    { label: "FOCUS", value: "Cybersecurity" },
  ],

  /* Terminal card in the About section. Lines starting with "$" are commands,
     everything else is output. Keep to real information. */
  terminal: [
    "$ whoami",
    "rejoan-hasan-mugdho",
    "$ focus --current",
    "Cybersecurity | Development | Problem Solving",
    "$ education --now",
    "B.Sc. CSE @ North South University",
    "$ languages --used",
    "C, Java",
  ],

  /* ---------- Education snapshot (hero + about) ---------- */
  university: "North South University",
  universityShort: "NSU",
  department: "Computer Science & Engineering",
  degree: "B.Sc. in Computer Science & Engineering",
  startYear: "2025",

  /* UPDATE EACH SEMESTER — e.g. "2nd Semester". Leave "" to hide it.
     It appears in the hero card and on the Education timeline. */
  currentSemester: "",

  primaryInterest: "Cybersecurity",

  /* ---------- Contact ---------- */
  email: "rhmugdho5@gmail.com",
  //phone: "+880 1930361178",          // shown as written
  //phoneLink: "+8801930361178",       // used for tel: link (no spaces)
  /* Subject line pre-filled when someone clicks "Email me". */
  emailSubject: "Hello Rejoan — reaching out from your portfolio",

  /* ---------- Files (replace the file, keep the name — or change here) ---------- */
  cv: {
    file: "assets/cv.pdf",
    downloadName: "Rejoan_Hasan_Mugdho_CV.pdf",
  },

  /* Replace assets/profile.jpg (and .webp) with a new photo of the SAME NAME,
     or change the paths here. Recommended: portrait 3:4, about 960×1280. */
  photo: {
    jpg: "assets/profile.jpg",
    webp: "assets/profile.webp",
    small: { jpg: "assets/profile-480.jpg", webp: "assets/profile-480.webp" },
    width: 960,
    height: 1280,
    alt: "Portrait of Rejoan Hasan Mugdho outdoors in a green field",
  },

  /* ---------- About section ---------- */
  about: {
    heading: "A foundation built on fundamentals, pointed at security.",
    paragraphs: [
      "I'm a Computer Science & Engineering undergraduate at North South University, building my foundation in programming, data structures and algorithms, and computer systems.",
      "I've built academic and personal projects in C and Java using both procedural and object-oriented approaches — from a Swing desktop expense tracker to a real-time console game with boss phases and power-ups.",
      "Cybersecurity is the field I'm most drawn to. I'm learning it step by step alongside Linux, computer networks and secure software development, and I enjoy turning ideas into practical tools that actually work.",
    ],
    /* "What I'm focusing on now" card (taken from the CV profile). */
    focusNow: [
      "Data structures & algorithms",
      "Computer systems",
      "Cybersecurity",
      "Linux & system administration",
    ],
    /* Spoken languages (from the CV). */
    languages: [
      { name: "Bangla", level: "Native" },
      { name: "English", level: "Professional working proficiency" },
    ],
  },

  /* Areas of interest (from the CV). `primary: true` highlights a tag. */
  interests: [
    { name: "Cybersecurity", primary: true },
    { name: "Secure Software Development" },
    { name: "Software Engineering" },
    { name: "Linux & System Administration" },
    { name: "Computer Networks" },
    { name: "Data Structures & Algorithms" },
    { name: "Problem Solving" },
  ],

  /* Contact section copy */
  contact: {
    heading: "Let's build something secure.",
    text: "Open to conversations about internships, collaborations, projects and learning opportunities. The quickest way to reach me is email.",
  },

  /* Footer line */
  footerNote: "Built with HTML, CSS & vanilla JavaScript.",
};
