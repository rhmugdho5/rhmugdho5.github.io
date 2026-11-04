/* Renders the whole site from the files in /data. You normally never edit this file. */
(() => {
  "use strict";
  const S = window.SITE || {};
  const P = S.profile || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = v => String(v ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const safeUrl = u => (/^(https?:\/\/|mailto:|tel:|assets\/|\.\/)/i.test(u || "") ? u : "");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- icons ---------- */
  const IC = {
    arrow: '<path d="M7 17 17 7M8 7h9v9"/>', download: '<path d="M12 3v12m0 0-4-4m4 4 4-4M4 20h16"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>',
    brain: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
    tool: '<circle cx="6" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="8" r="2"/><path d="M6 8v8M18 10c0 4-6 3-12 6"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5zM3 13l9 5 9-5"/>',
    terminal: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3M13 15h4"/>',
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>',
    wallet: '<path d="M4 7a2 2 0 0 1 2-2h12v4M4 7v10a2 2 0 0 0 2 2h14V9H6a2 2 0 0 1-2-2z"/><circle cx="16" cy="14" r="1"/>',
    checklist: '<path d="m4 6 2 2 3-3M4 14l2 2 3-3M12 7h8M12 15h8"/>',
    invader: '<path d="M8 4v2M16 4v2M7 6h10v2h3v6h-2v3h-3v-2H9v2H6v-3H4V8h3zM9 10h2v2H9zM13 10h2v2h-2z"/>',
    shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
    graduation: '<path d="m2 9 10-5 10 5-10 5zM6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/>',
    github: "M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.4-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"
  };
  const svg = (k, cls = "") => k === "github"
    ? `<svg class="i fill ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${IC.github}"/></svg>`
    : `<svg class="i ${cls}" viewBox="0 0 24 24" aria-hidden="true">${IC[k] || IC.code}</svg>`;
  const MONO = { linkedin: "in", leetcode: "LC", codeforces: "CF", atcoder: "AC" };
  const brand = k => k === "github" ? svg("github") : `<span class="badge" aria-hidden="true">${MONO[k] || esc(k.slice(0, 2))}</span>`;

  /* ---------- simple bindings ---------- */
  const get = path => path.split(".").reduce((o, k) => (o == null ? o : o[k]), S);
  $$("[data-text]").forEach(el => { el.textContent = get(el.dataset.text) ?? ""; });
  $$("[data-icon]").forEach(el => { el.outerHTML = svg(el.dataset.icon); });
  $("#year").textContent = new Date().getFullYear();
  const mail = `mailto:${P.email}?subject=${encodeURIComponent(P.emailSubject || "")}`;

  /* ---------- hero ---------- */
  const parts = (P.tagline || "").split(/(?<=\.)\s+/);
  $("#tagline").innerHTML = esc(parts[0] || "") + (parts[1] ? ` <span>${esc(parts.slice(1).join(" "))}</span>` : "");
  const avail = [P.availability, P.location].filter(Boolean).join(" · ");
  $("#heroAvail").textContent = avail;
  const photo = $("#photo"); photo.src = P.photo; photo.alt = P.photoAlt || P.name;
  photo.onerror = () => { photo.removeAttribute("src"); };
  $("#chipUni").textContent = [P.university, P.semester].filter(Boolean).join(" · ");
  const cv = $("#cvBtn"); cv.href = P.cv; cv.setAttribute("download", P.cvDownloadName || "");
  $("#mailBtn").href = mail;
  $("#heroSocial").innerHTML = (S.social || []).filter(s => s.showInHero && safeUrl(s.url))
    .map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(s.name)} (opens in new tab)">${brand(s.icon)}${esc(s.name)}</a>`).join("");
  $("#brandMark").textContent = (P.name || "RM").split(/\s+/).map(w => w[0]).filter(Boolean).slice(0, 1).concat((P.lastName || "M")[0]).join("").toUpperCase();

  /* typing animation */
  const typed = $("#typed"), words = P.typingPhrases || [];
  if (typed && words.length) {
    if (reduce || words.length === 1) typed.textContent = words[0];
    else {
      let w = 0, c = 0, del = false;
      const tick = () => {
        const word = words[w];
        typed.textContent = word.slice(0, c);
        if (!del && c === word.length) { del = true; return setTimeout(tick, 1700); }
        if (del && c === 0) { del = false; w = (w + 1) % words.length; return setTimeout(tick, 350); }
        c += del ? -1 : 1; setTimeout(tick, del ? 28 : 65);
      };
      tick();
    }
  }

  /* ---------- about ---------- */
  const counts = [
    [(S.projects || []).length, "Featured projects"],
    [((S.skills || [])[0] || { items: [] }).items.length, "Programming languages"],
    [(S.certifications || []).length, "Courses & trainings"],
  ];
  $("#aboutGrid").innerHTML =
    `<article class="card b-about reveal">${(P.about || []).map(t => `<p>${esc(t)}</p>`).join("")}</article>` +
    counts.map(([n, l], i) => `<div class="card b-stat reveal" style="--d:${(i + 1) * .08}s"><div class="stat-n">${n}</div><div class="stat-l">${l}</div></div>`).join("") +
    `<div class="card b-int reveal"><h3>Areas of interest</h3><div class="tags">${(P.interests || []).map(t => `<span class="tag big">${esc(t)}</span>`).join("")}</div></div>` +
    `<div class="card b-foc reveal"><h3>Current focus</h3><p>${esc(P.currentFocus || "")}</p></div>` +
    `<div class="card b-lang reveal"><h3 style="margin:0">Languages</h3>${(P.languages || []).map(l => `<div class="lang"><b>${esc(l.name)}</b><span>${esc(l.level)}</span></div>`).join("")}</div>`;

  /* ---------- education ---------- */
  $("#eduList").innerHTML = (S.education || []).map(e => `
    <li class="t-item reveal ${e.status === "current" ? "current" : ""}"><div class="card">
      <div class="t-row"><h3>${esc(e.degree)}</h3><span class="t-per">${esc(e.period)}</span></div>
      <p class="t-school">${esc(e.school)}</p>
      ${e.details ? `<p class="t-det">${esc(e.details)}</p>` : ""}
      ${e.useSemester && P.semester ? `<span class="tag t-sem">${esc(P.semester)}</span>` : ""}
      ${e.note ? `<p class="t-det">${esc(e.note)}</p>` : ""}
    </div></li>`).join("");

  /* ---------- skills ---------- */
  $("#skillGrid").innerHTML = (S.skills || []).map((g, i) => `
    <article class="card skill reveal" style="--d:${(i % 3) * .07}s"><div class="ico">${svg(g.icon || "code")}</div><h3>${esc(g.group)}</h3>
    <div class="tags">${g.items.map(t => `<span class="tag big">${esc(t)}</span>`).join("")}</div></article>`).join("");
  const L = S.learning || [];
  $("#learning").innerHTML = L.length ? `<span>Currently strengthening:</span>${L.map(t => `<span class="tag">${esc(t)}</span>`).join("")}` : "";

  /* ---------- projects ---------- */
  $("#projGrid").innerHTML = (S.projects || []).map((p, i) => {
    const gh = safeUrl(p.github), demo = safeUrl(p.demo), img = safeUrl(p.image);
    const ac = p.accent === "blue" ? "54,169,255" : "0,230,173";
    return `<article class="card proj reveal" style="--ac:${ac};--d:${(i % 2) * .08}s">
      <div class="cover" ${img ? "" : 'aria-hidden="true"'}>
        ${img ? `<img src="${esc(img)}" alt="${esc(p.title)} preview" loading="lazy">` : `<div class="glyph">${svg(p.icon || "code")}</div>`}
        <span class="num">${String(i + 1).padStart(2, "0")}</span><span class="path">~/projects/${esc(p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"))}</span>${p.type ? `<span class="typ">${esc(p.type)}</span>` : ""}
      </div>
      <div class="p-body">
        <h3>${esc(p.title)}</h3><p class="p-sub">${esc(p.subtitle || "")}</p>
        <p class="p-desc">${esc(p.description)}</p>
        <ul class="feat">${(p.features || []).map(f => `<li>${esc(f)}</li>`).join("")}</ul>
        <div class="p-foot"><div class="tags">${(p.tech || []).map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div>
          <div class="p-links">${gh ? `<a href="${esc(gh)}" target="_blank" rel="noopener noreferrer">${svg("github")}Source code</a>` : ""}${demo ? `<a href="${esc(demo)}" target="_blank" rel="noopener noreferrer">${svg("arrow")}Live demo</a>` : ""}</div></div>
      </div></article>`;
  }).join("");

  /* ---------- certifications / achievements ---------- */
  const link = u => safeUrl(u) ? `<a class="v" href="${esc(u)}" target="_blank" rel="noopener noreferrer">Verify ↗</a>` : "";
  $("#certGrid").innerHTML = (S.certifications || []).map((c, i) => `
    <li class="card cert reveal" style="--d:${(i % 2) * .06}s"><span class="k">${esc(c.type || "Certificate")}</span><b>${esc(c.title)}</b><span class="o">${esc(c.issuer)}</span>${c.date ? `<span class="d">${esc(c.date)}</span>` : ""}${c.note ? `<span class="o">${esc(c.note)}</span>` : ""}${link(c.url)}</li>`).join("");
  const ach = (arr, k) => (arr || []).map(a => `<li class="card ach reveal"><span class="k">${k}</span><b>${esc(a.title)}</b><span class="o">${esc(a.org)}</span>${a.date ? `<span class="d" style="font:400 .78rem var(--f-m);color:var(--em)">${esc(a.date)}</span>` : ""}${link(a.url)}</li>`).join("");
  $("#achList").innerHTML = ach(S.achievements, "Achievement");
  $("#compList").innerHTML = ach(S.competitions, "Competition");
  $("#compList").classList.add("comp");

  /* ---------- profiles ---------- */
  $("#profGrid").innerHTML = (S.social || []).filter(s => safeUrl(s.url)).map((s, i) => `
    <a class="card prof reveal" style="--d:${i * .05}s" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(s.name)} profile (opens in new tab)">
      <span class="logo ${s.icon === "github" ? "" : "txt"}">${s.icon === "github" ? svg("github") : esc(MONO[s.icon] || s.name.slice(0, 2))}</span>
      <b>${esc(s.name)}</b><span class="h">${esc(s.handle || "")}</span><p>${esc(s.blurb || "")}</p>
      ${s.icon === "github" ? '<div class="gh-stats" id="ghStats"></div>' : ""}
      <span class="go">View profile ${svg("arrow")}</span></a>`).join("");

  /* ---------- contact ---------- */
  const soc = id => (S.social || []).find(s => s.id === id);
  const ci = (ico, label, val, href, ext) => `<li><a class="c-item" href="${esc(href)}" ${ext ? 'target="_blank" rel="noopener noreferrer"' : ""}><span class="ico">${ico}</span><span><small>${label}</small><span class="v">${esc(val)}</span></span></a></li>`;
  $("#contactList").innerHTML =
    (P.email ? ci(svg("mail"), "Email", P.email, mail) : "") +
    (P.phone ? ci(svg("phone"), "Phone", P.phone, "tel:" + P.phone.replace(/[^+\d]/g, "")) : "") +
    (soc("linkedin") ? ci(brand("linkedin"), "LinkedIn", soc("linkedin").handle, soc("linkedin").url, true) : "") +
    (soc("github") ? ci(brand("github"), "GitHub", soc("github").handle, soc("github").url, true) : "");

  /* ---------- GitHub API (optional; fails silently) ---------- */
  (async () => {
    const u = P.githubUsername; if (!u) return;
    const key = "gh:" + u, now = Date.now();
    try {
      let d; try { d = JSON.parse(sessionStorage.getItem(key)); } catch (e) {}
      if (!d || now - d.t > 6e5) {
        const [a, b] = await Promise.all([
          fetch(`https://api.github.com/users/${encodeURIComponent(u)}`),
          fetch(`https://api.github.com/users/${encodeURIComponent(u)}/repos?sort=pushed&per_page=12&type=owner`)]);
        if (!a.ok || !b.ok) throw new Error("GitHub API " + a.status);
        d = { t: now, user: await a.json(), repos: await b.json() };
        try { sessionStorage.setItem(key, JSON.stringify(d)); } catch (e) {}
      }
      const st = $("#ghStats");
      if (st) st.innerHTML = `<span><b>${+d.user.public_repos || 0}</b> repos</span><span><b>${+d.user.followers || 0}</b> followers</span>`;
      const repos = d.repos.filter(r => !r.fork && r.name.toLowerCase() !== u.toLowerCase() + ".github.io").slice(0, 4);
      if (repos.length) {
        $("#repoList").innerHTML = repos.map(r => `<li><a class="card repo" href="${esc(r.html_url)}" target="_blank" rel="noopener noreferrer"><b>${esc(r.name)}</b><p>${esc(r.description || "No description yet.")}</p><span>${esc(r.language || "—")} · updated ${new Date(r.pushed_at).toLocaleDateString("en", { month: "short", year: "numeric" })}</span></a></li>`).join("");
        $("#repos").hidden = false;
      }
    } catch (e) { /* offline or rate-limited: the section simply stays hidden */ }
  })();

  /* ---------- nav: mobile menu, sticky state, active link, progress ---------- */
  const nav = $("#nav"), menu = $("#menuBtn"), links = $("#navLinks"), bar = $("#progress");
  const setMenu = o => { links.classList.toggle("open", o); menu.setAttribute("aria-expanded", o); menu.setAttribute("aria-label", o ? "Close menu" : "Open menu"); };
  menu.addEventListener("click", () => setMenu(menu.getAttribute("aria-expanded") !== "true"));
  $$("a", links).forEach(a => a.addEventListener("click", () => setMenu(false)));
  addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });
  addEventListener("resize", () => { if (innerWidth > 900) setMenu(false); });
  const secs = $$("main section[id]");
  let tick = false;
  const onScroll = () => {
    tick = false;
    const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    nav.classList.toggle("stuck", y > 20);
    let cur = "";
    for (const s of secs) if (s.getBoundingClientRect().top <= innerHeight * .35) cur = s.id;
    $$("a", links).forEach(a => { const on = a.getAttribute("href") === "#" + cur; a.classList.toggle("active", on); on ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current"); });
  };
  addEventListener("scroll", () => { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* ---------- scroll reveal ---------- */
  const rev = $$(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .08, rootMargin: "0px 0px -6% 0px" });
    rev.forEach((el, i) => { if (el.closest(".hero")) el.style.setProperty("--d", (i % 8) * .09 + "s"); io.observe(el); });
  } else rev.forEach(el => el.classList.add("in"));
})();
