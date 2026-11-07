/* ============================================================
   EDUCATION  —  newest first
   ------------------------------------------------------------
   Fields:
     degree       – name of the qualification
     institution  – school / college / university
     period       – text shown on the timeline, e.g. "2025 — Present"
     current      – true for the one you are studying now (shows a pulse)
     detail       – optional extra line (e.g. semester, CGPA, focus).
                    Leave "" to hide.

   To update your SEMESTER, edit `currentSemester` in profile.js —
   it is added to the current entry automatically.

   EXAMPLE of a new entry:
     {
       degree: "M.Sc. in Cybersecurity",
       institution: "Some University",
       period: "2029 — 2031",
       detail: "Thesis: ...",
     },
   ============================================================ */
window.PORTFOLIO = window.PORTFOLIO || {};

window.PORTFOLIO.education = [
  {
    degree: "B.Sc. in Computer Science & Engineering",
    institution: "North South University",
    period: "2025 — Present",
    current: true,
    detail: "",
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Govt. Science College",
    period: "2024",
    detail: "",
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Ideal School and College",
    period: "2022",
    detail: "",
  },
];
