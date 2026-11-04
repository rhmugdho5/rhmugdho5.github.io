/* ============================================================
   LEARNING JOURNEY — the interactive "focus map" in the Journey section.
   Be honest: these are focus areas, NOT completed qualifications.
   status: "using"    = I use it in projects/tools today
           "learning" = I am actively strengthening it
           "interest" = an area I want to grow into
   Fields: id, label (chip), short (graph label), status, text, links (ids)
   ============================================================ */
window.SITE = window.SITE || {};

window.SITE.journey = {
  center: {
    label: "Cybersecurity", status: "primary",
    text: "My primary long-term career direction. I am building the foundations first: programming, systems, algorithms and networks.",
  },
  statusLabels: { using: "Using in projects", learning: "Currently learning", interest: "Area of interest", primary: "Primary direction" },
  nodes: [
    { id: "programming", label: "Programming", short: "Programming", status: "using",
      text: "C, Java and C++, practised through academic and personal projects using procedural and object-oriented design.", links: ["secdev"] },
    { id: "linux", label: "Linux", short: "Linux", status: "using",
      text: "Linux / Fedora is part of my everyday toolkit. I want to grow this towards system administration.", links: ["os"] },
    { id: "networks", label: "Computer Networks", short: "Networks", status: "interest",
      text: "An area of interest I plan to study in more depth as part of my security foundations.", links: ["secfund"] },
    { id: "os", label: "Operating Systems & Computer Systems", short: "OS & Systems", status: "learning",
      text: "Currently strengthening my knowledge of computer systems.", links: [] },
    { id: "dsa", label: "Data Structures & Algorithms", short: "DSA", status: "learning",
      text: "Currently strengthening, with profiles on LeetCode, Codeforces and AtCoder for competitive programming.", links: ["programming"] },
    { id: "secfund", label: "Security Fundamentals", short: "Security Basics", status: "learning",
      text: "Building the basics, including short trainings from Cyberwarfare Labs (see Certifications).", links: [] },
    { id: "secdev", label: "Secure Software Development", short: "Secure Dev", status: "interest",
      text: "Bringing a security mindset into the software I build.", links: [] },
  ],
};
