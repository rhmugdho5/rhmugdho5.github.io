/* ============================================================
   CERTIFICATIONS & TRAINING
   ------------------------------------------------------------
   Each entry becomes a card in the "Credentials" wall.

   Fields:
     title    – name of the course / certificate
     issuer   – organization that issued it
     date     – e.g. "Mar 2026". Leave "" if unknown (hidden, never invented)
     category – small tag: "Computer Science", "Cybersecurity", "Programming",
                "Professional Skills", ... (any text; used for the card tag)
     url      – link to the certificate / verification page, or ""
     details  – optional 1–2 sentences shown when the card is expanded
     topics   – optional list of topic tags shown when expanded
     featured – true gives the card a subtle highlight

   Dates are empty because the CV does not state them. Fill them in
   whenever you like — they will appear automatically.

   EXAMPLE of a new certification:
     {
       title: "Certificate Name",
       issuer: "Issuing Organization",
       date: "Jan 2027",
       category: "Cybersecurity",
       url: "https://example.com/verify/123",
     },
   ============================================================ */
window.PORTFOLIO = window.PORTFOLIO || {};

window.PORTFOLIO.certifications = [
  {
    title: "CS50x: Introduction to Computer Science",
    issuer: "Harvard University",
    date: "",
    category: "Computer Science",
    url: "",
    details: "Harvard's introductory computer science course.",
    featured: true,
  },
  {
    title: "Automating Passive Web Application Recon with n8n & AI",
    issuer: "Cyberwarfare Labs",
    date: "",
    category: "Cybersecurity",
    url: "",
    topics: ["Web application reconnaissance", "n8n", "AI"],
    featured: true,
  },
  {
    title: "The Rise of Agentic Adversary",
    issuer: "Cyberwarfare Labs",
    date: "",
    category: "Cybersecurity",
    url: "",
  },
  {
    title: "C Programming Course",
    issuer: "10 Minute School",
    date: "",
    category: "Programming",
    url: "",
  },
  {
    title: "Basics of Management",
    issuer: "10 Minute School",
    date: "",
    category: "Professional Skills",
    url: "",
  },
  {
    title: "Fire Safety Awareness",
    issuer: "10 Minute School",
    date: "",
    category: "Professional Skills",
    url: "",
  },
];
