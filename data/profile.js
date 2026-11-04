/* ============================================================
   PROFILE — your identity, hero text, about text, contact info.
   Source: CV (Rejoan_Hasan_Mugdho.pdf). Edit values between quotes.
   After saving: commit + push. No HTML editing needed.
   ============================================================ */
window.SITE = window.SITE || {};

window.SITE.profile = {
  name: "Rejoan Hasan Mugdho",
  firstName: "Rejoan Hasan",          // shown on line 1 of the hero heading
  lastName: "Mugdho",                 // shown on line 2 (accent colour)
  title: "Computer Science & Engineering Student",
  tagline: "Building Secure Systems. Solving Real Problems.",

  // Hero intro (1–2 sentences)
  intro:
    "CSE undergraduate at North South University with a primary interest in cybersecurity — learning by building practical projects in C and Java.",

  // The typing animation in the hero cycles through these. Add/remove freely.
  typingPhrases: [
    "Cybersecurity",
    "Secure Software Development",
    "Linux & Systems",
    "Problem Solving",
  ],
  typingPrefix: "Currently exploring",

  // University line. `semester` is optional — set e.g. "Semester 3" or "3rd Semester"
  // and it appears in the hero and education timeline. Leave "" to hide it.
  university: "North South University",
  department: "Computer Science & Engineering",
  semester: "",

  location: "Bangladesh",              // set "" to hide
  availability: "Open to internships, learning & collaboration", // set "" to hide

  // Files (relative to index.html). To replace: overwrite the file, keep the name.
  photo: "assets/profile.jpg",
  photoAlt: "Portrait of Rejoan Hasan Mugdho",
  cv: "assets/cv.pdf",
  cvDownloadName: "Rejoan_Hasan_Mugdho_CV.pdf",

  // About section — each string is one paragraph.
  about: [
    "I'm a Computer Science & Engineering undergraduate at North South University, beginning my journey in 2025. My interest in cybersecurity is what pulls me deeper into computer systems, Linux and how software really works.",
    "My programming foundation is in C and Java, with C++ also in my toolkit. I turn what I learn into practical projects — from a Java Swing expense tracker to a Windows-API console game — using procedural and object-oriented design.",
    "I'm currently strengthening my knowledge of data structures, algorithms, computer systems and cybersecurity, and I keep a presence on competitive programming platforms. I am a student and a learner, and I aim to keep building things that solve real problems.",
  ],
  currentFocus: "Data structures, algorithms, computer systems & cybersecurity",

  // Areas of interest (from CV)
  interests: [
    "Cybersecurity",
    "Secure Software Development",
    "Software Engineering",
    "Linux & System Administration",
    "Computer Networks",
    "Data Structures & Algorithms",
    "Problem Solving",
  ],

  languages: [
    { name: "Bangla", level: "Native" },
    { name: "English", level: "Professional Working Proficiency" },
  ],

  // Contact (from CV). Email link is built from `email`.
  email: "rhmugdho5@gmail.com",
  phone: "+880 1930361178",            // set "" to hide the phone card
  emailSubject: "Hello Rejoan — via your portfolio",
  contactHeading: "Let's talk about security, software, or opportunities.",
  contactText:
    "Whether it's an internship, a project, a competition team or a question about something I've built — I'd be glad to hear from you.",

  githubUsername: "rhmugdho5",        // used by the live GitHub stats
};
