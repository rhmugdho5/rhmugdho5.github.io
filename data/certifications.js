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
    date: "May 2026",
    category: "Computer Science",
    url: "https://cs50.harvard.edu/certificates/69ef4f8e-3670-4263-ae08-0372ac0f7ca3",
    details: "Harvard's introductory computer science course.",
    featured: true,
  },
  {
    title: "Threat Intelligence: Connecting the Dots in Cybersecurity",
    issuer: "Cyberwarfare Labs",
    date: "October 2026",
    category: "Cybersecurity",
    url: "https://drive.google.com/file/d/1m7iXbwKsbaoBHdT6RTQD3zlOfSP2P6_3/view?usp=sharing",
  },
  {
    title: "Inside the APT Playbook: Malware Analysis and Threat Actor Profiling for Modern Threat Intelligence.",
    issuer: "Cyberwarfare Labs",
    date: "September 2026",
    category: "Cybersecurity",
    url: "https://drive.google.com/file/d/1qogl-e_IAu_W7a2dkoXm6XApLjhkffWq/view?usp=sharing",
  },
  {
    title: "Automating Passive Web Application Recon with n8n & AI",
    issuer: "Cyberwarfare Labs",
    date: "July 2026",
    category: "Cybersecurity",
    url: "https://drive.google.com/file/d/1a32meJ-M0YrwuFNKYYazApS3MVUfPIcO/view?usp=sharing",
    topics: ["Web application reconnaissance", "n8n", "AI"],
    featured: true,
  },
  {
    title: "The Rise of Agentic Adversary",
    issuer: "Cyberwarfare Labs",
    date: "July 2026",
    category: "Cybersecurity",
    url: "https://drive.google.com/file/d/1E_5js1V6X5R5dQZGAKXwtgLr-J5WPunF/view?usp=sharing",
  },
  {
    title: "C Programming Course",
    issuer: "10 Minute School",
    date: "September 2023",
    category: "Programming",
    url: "https://drive.google.com/file/d/17nHLnl0KmSYKsEziZpJ4mlMJrlJ_gTHg/view?usp=sharing",
  },
  {
    title: "Basics of Management",
    issuer: "10 Minute School",
    date: "March 2025",
    category: "Professional Skills",
    url: "https://drive.google.com/file/d/1yzIABA0tbBbd3PFB5B31tBme44NNNNJu/view?usp=sharing",
  },
  {
    title: "Fire Safety Awareness",
    issuer: "10 Minute School",
    date: "May 2023",
    category: "Professional Skills",
    url: "https://drive.google.com/file/d/1iqGkvhoToUvUZSDyCP-5DX51GK-ARiH9/view?usp=sharing",
  },
];
