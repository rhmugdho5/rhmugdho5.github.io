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
    type: "recognition",
    title: "NASA Artemis II Boarding Pass",
    issuer: "NASA",
    date: "",
    note: "",
    url: "",
  },
  {
    type: "recognition",
    title: "Nancy Grace Roman Space Telescope: Message in the Stars",
    issuer: "NASA",
    date: "",
    note: "",
    url: "",
  },
  {
    type: "competition",
    title: "Intellectus Olympiad",
    issuer: "Eminent Youth",
    date: "",
    note: "",
    url: "",
  },
  {
    type: "competition",
    title: "3rd LKTW National Olympiad Expo 2026 — IQ Quiz",
    issuer: "Let's Know the World",
    date: "",
    note: "",
    url: "",
  },
];
