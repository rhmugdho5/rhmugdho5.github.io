/* ============================================================
   ACHIEVEMENTS, RECOGNITION & COMPETITIONS
   ------------------------------------------------------------
   Shown beside certifications in the "Credentials" wall.

   Fields:
     type     – "recognition"  (awards, honours, special mentions)
                "competition" (contests, olympiads, participation)
     title    – name of the achievement / event
     issuer   – organizer / awarding organization
     date     – e.g. "2026". Leave "" if unknown (hidden, never invented)
     note     – optional short line (rank, result, what it was).
                Only write what is true.
     url      – link to proof / event page, or ""

   Wording below follows the CV exactly. The CV lists the two olympiads
   under "Competitions & Participation", so they are described as
   participation — add a `note` such as "Ranked 5th" if you have a result.

   EXAMPLE:
     {
       type: "competition",
       title: "Inter-University Programming Contest",
       issuer: "Organizer Name",
       date: "2027",
       note: "Team rank 12",
       url: "",
     },
   ============================================================ */
window.PORTFOLIO = window.PORTFOLIO || {};

window.PORTFOLIO.achievements = [
  {
    type: "participation",
    title: "NASA’s International Observe the Moon Night 2026",
    issuer: "NASA",
    date: "September 2026",
    note: "",
    url: "https://drive.google.com/file/d/130li8OIjlZHV9SamVa9aXmoS9JjhFyrO/view?usp=sharing",
  },
  {
    type: "recognition",
    title: "NASA Artemis II Boarding Pass",
    issuer: "NASA",
    date: "February 2026",
    note: "",
    url: "https://drive.google.com/file/d/1O4rAmUjrUG3cwBLMCsDAc9xbn-YrcTgp/view?usp=sharing",
  },
  {
    type: "recognition",
    title: "Nancy Grace Roman Space Telescope: Message in the Stars",
    issuer: "NASA",
    date: "August 2026",
    note: "",
    url: "https://drive.google.com/file/d/1M51G7kR4FC_bNkI9dV3hQ-SYpmpZe6d8/view?usp=sharing",
  },
  {
    type: "competition",
    title: "Intellectus Olympiad",
    issuer: "Eminent Youth",
    date: "June 2026",
    note: "",
    url: "https://drive.google.com/file/d/1f2PzuJdfZcDbc5-O1LVQbnhfnbv-VsfI/view?usp=sharing",
  },
  {
    type: "competition",
    title: "3rd LKTW National Olympiad Expo 2026 — IQ Quiz",
    issuer: "Let's Know the World",
    date: "July 2026",
    note: "",
    url: "https://drive.google.com/file/d/1Ilh8R5bXM-emCm9tYYlwbn4uP-2aXAog/view?usp=sharing",
  },
];
