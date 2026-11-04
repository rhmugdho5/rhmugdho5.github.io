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
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

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

  /* ---------- bindings ---------- */
  const get = path => path.split(".").reduce((o, k) => (o == null ? o : o[k]), S);
  $$("[data-text]").forEach(el => { el.textContent = get(el.dataset.text) ?? ""; });
  $$("[data-icon]").forEach(el => { el.outerHTML = svg(el.dataset.icon); });
  $("#year").textContent = new Date().getFullYear();
  const mail = `mailto:${P.email}?subject=${encodeURIComponent(P.emailSubject || "")}`;
  const slug = t => String(t).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  /* ---------- hero ---------- */
  const parts = (P.tagline || "").split(/(?<=\.)\s+/);
  $("#tagline").innerHTML = esc(parts[0] || "") + (parts[1] ? ` <span>${esc(parts.slice(1).join(" "))}</span>` : "");
  $("#heroAvail").textContent = [P.availability, P.location].filter(Boolean).join(" · ");
  const photo = $("#photo"); photo.src = P.photo; photo.alt = P.photoAlt || P.name;
  const uniLine = [P.university, P.semester].filter(Boolean).join(" · ");
  $("#panelRows").innerHTML = [...(P.heroPanel || []), { k: "university", v: uniLine }].filter(r => r.v)
    .map(r => `<div><dt>${esc(r.k)}</dt><dd>${esc(r.v)}</dd></div>`).join("");
  $("#labUni").textContent = [P.department && "CSE", P.university && "NSU"].filter(Boolean).join(" · ");
  const cv = $("#cvBtn"); cv.href = P.cv; cv.setAttribute("download", P.cvDownloadName || "");
  $("#mailBtn").href = mail;
  $("#heroSocial").innerHTML = (S.social || []).filter(s => s.showInHero && safeUrl(s.url))
    .map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(s.name)} (opens in new tab)">${brand(s.icon)}${esc(s.name)}</a>`).join("");
  $("#brandMark").textContent = ((P.firstName || P.name || "R")[0] + (P.lastName || "M")[0]).toUpperCase();
  if (reduce) $$("#portrait animateMotion").forEach(a => a.remove());

  const typed = $("#typed"), words = P.typingPhrases || [];
  if (typed && words.length) {
    if (reduce || words.length === 1) typed.textContent = words[0];
    else {
      let w = 0, c = 0, del = false;
      const tick = () => {
        const word = words[w]; typed.textContent = word.slice(0, c);
        if (!del && c === word.length) { del = true; return setTimeout(tick, 1800); }
        if (del && c === 0) { del = false; w = (w + 1) % words.length; return setTimeout(tick, 320); }
        c += del ? -1 : 1; setTimeout(tick, del ? 26 : 58);
      };
      tick();
    }
  }

  /* ---------- hero network canvas (pauses off-screen / hidden tab) ---------- */
  (() => {
    const cv = $("#net"); if (!cv || !cv.getContext) return;
    const ctx = cv.getContext("2d"), hero = $("#home");
    let W = 0, H = 0, nodes = [], pk = [], raf = 0, vis = true, mx = -999, my = -999, f = 0;
    const D = 135;
    const size = () => {
      const r = cv.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 1.5);
      W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(64, Math.max(24, W * H / 20000)));
      nodes = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .28, vy: (Math.random() - .5) * .28, r: Math.random() * 1.3 + .8, b: Math.random() < .28 }));
      pk = [];
    };
    const draw = move => {
      ctx.clearRect(0, 0, W, H);
      for (const n of nodes) {
        if (move) { n.x += n.vx; n.y += n.vy; if (n.x < -10) n.x = W + 10; else if (n.x > W + 10) n.x = -10; if (n.y < -10) n.y = H + 10; else if (n.y > H + 10) n.y = -10; }
      }
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j], dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
          if (d < D) { ctx.strokeStyle = `rgba(${a.b || b.b ? "54,169,255" : "0,230,173"},${(1 - d / D) * .34})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
        const md = Math.hypot(a.x - mx, a.y - my);
        if (md < 150) { ctx.strokeStyle = `rgba(234,242,248,${(1 - md / 150) * .28})`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mx, my); ctx.stroke(); }
        ctx.fillStyle = a.b ? "rgba(54,169,255,.95)" : "rgba(0,230,173,.95)"; ctx.beginPath(); ctx.arc(a.x, a.y, a.r + .3, 0, 6.283); ctx.fill();
      }
      if (move) {
        if (f++ % 45 === 0 && pk.length < 5) { for (let t = 0; t < 12; t++) { const a = nodes[Math.random() * nodes.length | 0], b = nodes[Math.random() * nodes.length | 0]; if (a !== b && Math.hypot(a.x - b.x, a.y - b.y) < D) { pk.push({ a, b, t: 0 }); break; } } }
        pk = pk.filter(p => (p.t += .018) < 1);
        for (const p of pk) { ctx.fillStyle = "#EAF2F8"; ctx.globalAlpha = .9 * Math.sin(p.t * Math.PI); ctx.beginPath(); ctx.arc(p.a.x + (p.b.x - p.a.x) * p.t, p.a.y + (p.b.y - p.a.y) * p.t, 2, 0, 6.283); ctx.fill(); ctx.globalAlpha = 1; }
      }
    };
    const loop = () => { draw(true); raf = requestAnimationFrame(loop); };
    const start = () => { if (!raf && vis && !document.hidden && !reduce) raf = requestAnimationFrame(loop); };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };
    size(); draw(false);
    let rt; addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { size(); draw(false); }, 200); });
    if (!reduce) {
      new IntersectionObserver(e => { vis = e[0].isIntersecting; vis ? start() : stop(); }).observe(hero);
      document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());
      if (finePointer) { hero.addEventListener("pointermove", e => { const r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; }); hero.addEventListener("pointerleave", () => { mx = my = -999; }); }
      start();
    }
  })();

  /* ---------- about ---------- */
  const counts = [
    [(S.projects || []).length, "Featured projects"],
    [((S.skills || [])[0] || { items: [] }).items.length, "Programming languages used"],
    [(S.certifications || []).length, "Courses & trainings"],
  ];
  const term = (P.terminal || []).map((l, i, a) => `<div class="tl ${i === a.length - 1 ? "last" : ""}" style="--d:${i * .28}s"><span class="c">${esc(l.cmd)}</span><span class="o">${esc(l.out)}</span></div>`).join("");
  $("#aboutGrid").innerHTML =
    `<article class="card b-about reveal">${(P.about || []).map(t => `<p>${esc(t)}</p>`).join("")}</article>` +
    `<div class="card b-term reveal" style="--d:.1s"><div class="term" id="term"><div class="term-bar"><i></i><i></i><i></i><span>rhm@portfolio ~</span></div><div class="term-body">${term}</div></div></div>` +
    counts.map(([n, l], i) => `<div class="card b-stat reveal" style="--d:${i * .08}s"><div class="stat-n count" data-n="${n}">${n}</div><div class="stat-l">${l}</div></div>`).join("") +
    `<div class="card b-int reveal"><h3>Areas of interest</h3><div class="tags">${(P.interests || []).map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div>${P.currentFocus ? `<p class="focus"><b>Currently strengthening:</b> ${esc(P.currentFocus)}</p>` : ""}</div>` +
    `<div class="card b-lang reveal" style="--d:.1s"><h3>Languages</h3>${(P.languages || []).map(l => `<div class="lang"><b>${esc(l.name)}</b><span>${esc(l.level)}</span></div>`).join("")}</div>`;

  /* ---------- education ---------- */
  $("#eduList").innerHTML = (S.education || []).map(e => `
    <li class="t-item reveal ${e.status === "current" ? "current" : ""}"><div class="card">
      <div class="t-row"><h3>${esc(e.degree)}</h3><span class="t-per">${esc(e.period)}</span></div>
      <p class="t-school">${esc(e.school)}</p>
      ${e.details ? `<p class="t-det">${esc(e.details)}</p>` : ""}
      ${e.useSemester && P.semester ? `<span class="tag t-sem">${esc(P.semester)}</span>` : ""}
      ${e.note ? `<p class="t-det">${esc(e.note)}</p>` : ""}
    </div></li>`).join("");

  /* ---------- focus map ---------- */
  (() => {
    const J = S.journey; if (!J || !(J.nodes || []).length) { $(".fm") && ($(".fm").hidden = true); return; }
    const all = [{ id: "core", label: J.center.label, short: J.center.label, status: "primary", text: J.center.text }, ...J.nodes];
    const SL = J.statusLabels || {};
    const cx = 280, cy = 170, rx = 150, ry = 118, N = J.nodes.length;
    const pos = {}; J.nodes.forEach((n, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / N; pos[n.id] = { x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a), a }; });
    const seen = new Set(); let edges = "", pkts = "";
    J.nodes.forEach((n, i) => {
      const p = pos[n.id], d = `M${cx},${cy}L${p.x.toFixed(1)},${p.y.toFixed(1)}`;
      edges += `<path class="fm-e" data-a="core" data-b="${n.id}" d="${d}"/>`;
      if (!reduce) pkts += `<circle r="2.2" fill="#00E6AD" opacity=".85"><animateMotion dur="${(3.6 + i * .5).toFixed(1)}s" begin="-${(i * .9).toFixed(1)}s" repeatCount="indefinite" path="${d}"/></circle>`;
      (n.links || []).forEach(id => { const q = pos[id], k = [n.id, id].sort().join(); if (!q || seen.has(k)) return; seen.add(k); edges += `<path class="fm-e" data-a="${n.id}" data-b="${id}" d="M${p.x.toFixed(1)},${p.y.toFixed(1)}L${q.x.toFixed(1)},${q.y.toFixed(1)}"/>`; });
    });
    const nodesSvg = J.nodes.map(n => {
      const p = pos[n.id], c = Math.cos(p.a), s = Math.sin(p.a);
      const anchor = c > .3 ? "start" : c < -.3 ? "end" : "middle", tx = c > .3 ? 16 : c < -.3 ? -16 : 0, ty = Math.abs(c) <= .3 ? (s > 0 ? 28 : -18) : 4;
      return `<g class="fm-n" data-id="${n.id}" data-s="${n.status}" transform="translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})"><circle class="h" r="17"/><circle class="d" r="7"/><text x="${tx}" y="${ty}" text-anchor="${anchor}">${esc(n.short || n.label)}</text></g>`;
    }).join("");
    $("#fmSvg").innerHTML = `${edges}${pkts}<g class="fm-n fm-core" data-id="core" data-s="primary" transform="translate(${cx} ${cy})"><circle class="halo" r="64"/><circle class="h" r="58" fill="#00E6AD"/><circle class="d" r="50"/><text text-anchor="middle" y="4">${esc(J.center.label)}</text></g>`.replace("</g>", "</g>") + nodesSvg;
    $("#fmChips").innerHTML = all.map(n => `<button type="button" class="chip" data-id="${n.id}" data-s="${n.status}" aria-pressed="false">${esc(n.label)}</button>`).join("");
    const pick = id => {
      const n = all.find(x => x.id === id) || all[0];
      $$("#fmChips .chip").forEach(b => b.setAttribute("aria-pressed", b.dataset.id === n.id));
      $$("#fmSvg .fm-n").forEach(g => g.classList.toggle("sel", g.dataset.id === n.id));
      $$("#fmSvg .fm-e").forEach(e => e.classList.toggle("on", e.dataset.a === n.id || e.dataset.b === n.id));
      const d = $("#fmDetail"); d.dataset.s = n.status;
      d.innerHTML = `<b>${esc(n.label)}</b><span class="st">${esc(SL[n.status] || n.status)}</span><p>${esc(n.text)}</p>`;
    };
    $("#fmChips").addEventListener("click", e => { const b = e.target.closest(".chip"); if (b) pick(b.dataset.id); });
    $("#fmSvg").addEventListener("click", e => { const g = e.target.closest(".fm-n"); if (g) pick(g.dataset.id); });
    pick("core");
  })();

  /* ---------- skills (capability map) ---------- */
  (() => {
    const G = S.skills || [];
    const nU = G.reduce((a, g) => a + (g.items || []).length, 0), nL = G.reduce((a, g) => a + (g.learning || []).length, 0);
    $("#skBar").innerHTML = `<div class="seg" role="group" aria-label="Filter skills">${[["all", "All"], ["used", "Used"], ["learning", "Learning"]].map(([k, l], i) => `<button type="button" data-f="${k}" aria-pressed="${i === 0}">${l}</button>`).join("")}</div>
      <div class="legend"><span><i class="dot"></i>Used in projects or coursework (${nU})</span><span><i class="dot l"></i>Currently learning (${nL})</span></div>`;
    $("#skillGrid").innerHTML = G.map((g, i) => `
      <article class="card skill reveal" data-u="${(g.items || []).length}" data-l="${(g.learning || []).length}" style="--d:${(i % 3) * .07}s">
        <div class="sk-h"><div class="ico">${svg(g.icon || "code")}</div><div><h3>${esc(g.group)}</h3><span class="sk-n">${(g.items || []).length} used · ${(g.learning || []).length} learning</span></div></div>
        <div class="tags">${(g.items || []).map(t => `<span class="pill u" title="Used">${esc(t)}</span>`).join("")}${(g.learning || []).map(t => `<span class="pill l" title="Currently learning">${esc(t)}</span>`).join("")}</div>
      </article>`).join("");
    $("#skBar").addEventListener("click", e => {
      const b = e.target.closest("button[data-f]"); if (!b) return; const f = b.dataset.f;
      $$("#skBar button").forEach(x => x.setAttribute("aria-pressed", x === b));
      $("#skillGrid").dataset.f = f;
      $$("#skillGrid .skill").forEach(c => c.classList.toggle("dim", (f === "used" && !+c.dataset.u) || (f === "learning" && !+c.dataset.l)));
    });
  })();

  /* ---------- project previews (original illustrations, not screenshots) ---------- */
  const win = (t, body, cls) => `<div class="pv v-${cls}"><div class="wbar"><i></i><i></i><i></i><span>${t}</span></div><div class="wbody">${body}</div><span class="cap">illustrative preview</span></div>`;
  const star = '<svg class="pat" aria-hidden="true"><defs><pattern id="st" width="46" height="46" patternUnits="userSpaceOnUse"><path d="M23 6l4 10 10-4-4 10 10 4-10 4 4 10-10-4-4 10-4-10-10 4 4-10-10-4 10-4-4-10 10 4z" fill="none" stroke="rgba(0,230,173,.09)"/></pattern></defs><rect width="100%" height="100%" fill="url(#st)"/></svg>';
  const V = {
    sirat: p => win("Sirat", `${star}<div class="sb"><div class="it on">${svg("moon")}Salah</div><div class="it">${svg("spark")}Dhikr</div><span class="sk"></span><span class="sk" style="width:70%"></span><span class="sk" style="width:85%"></span></div>
      <div class="mn"><h4>${svg("moon")}Salah</h4>${["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].map(n => `<div class="r"><span>${n}</span><span class="sk a"></span></div>`).join("")}</div>`, "sirat"),
    mysphere: p => win("MySphere", `<div class="kp">${["Expenses", "Categories", "Overview"].map(n => `<div class="k">${n}<span class="sk a"></span></div>`).join("")}</div>
      <div class="row"><div class="ch">Spending overview<div class="bars">${[48, 72, 38, 85, 58, 66, 44].map(h => `<i style="height:${h}%"></i>`).join("")}</div></div>
      <div class="dn"><svg viewBox="0 0 120 120" aria-hidden="true"><g fill="none" stroke-width="14" transform="rotate(-90 60 60)"><circle cx="60" cy="60" r="44" stroke="rgba(145,164,183,.14)"/><circle cx="60" cy="60" r="44" stroke="#36A9FF" stroke-dasharray="110 276"/><circle cx="60" cy="60" r="44" stroke="#00E6AD" stroke-dasharray="64 276" stroke-dashoffset="-116"/><circle cx="60" cy="60" r="44" stroke="#EAF2F8" stroke-opacity=".6" stroke-dasharray="36 276" stroke-dashoffset="-186"/></g></svg></div></div>`, "mysphere"),
    pact: p => win("pact ~ console", `<pre><b>PACT</b>  Program &amp; Accountability Tracker
<i>────────────────────────────</i>
 <b>1</b>  Users
 <b>2</b>  Programs
 <b>3</b>  Tasks
 <b>4</b>  Deadlines
 <b>5</b>  Accountability

<b>&gt;</b> <i>_</i></pre>
      <div class="tb"><div class="tr h"><span class="sk"></span><span class="sk"></span><span class="sk"></span></div>${["", "b", "m", "", "b"].map((c, i) => `<div class="tr"><span class="sk" style="width:${80 - i * 8}%"></span><span class="sk" style="width:${60 + i * 6}%"></span><i class="st ${c}"></i></div>`).join("")}</div>`, "pact"),
    invaders: p => `<div class="pv v-inv"><pre aria-hidden="true">${esc(`SCORE ------           BOSS [####--]

   (oo)  (oo)  (oo)  (oo)  (oo)
   <oo>  <oo>  <oo>  <oo>  <oo>
   {oo}  {oo}  {oo}  {oo}  {oo}

                  [P]
          |
         /_^_\\`).replace("[P]", "<i>[P]</i>").replace("SCORE", "<b>SCORE</b>")}</pre><span class="cap">illustrative preview</span></div>`,
  };

  /* ---------- projects ---------- */
  $("#projGrid").innerHTML = (S.projects || []).map((p, i) => {
    const gh = safeUrl(p.github), demo = safeUrl(p.demo), img = safeUrl(p.image);
    const ac = p.accent === "blue" ? "54,169,255" : "0,230,173";
    const pv = img ? `<div class="pv"><img class="shot" src="${esc(img)}" alt="${esc(p.title)} screenshot" loading="lazy"></div>`
      : V[p.visual] ? V[p.visual](p) : `<div class="pv v-icon"><div class="g">${svg(p.icon || "code")}</div></div>`;
    return `<article class="card proj reveal" style="--ac:${ac}" id="proj-${slug(p.title)}">
      <div class="pv-wrap" ${img ? "" : 'aria-hidden="true"'}>${pv}</div>
      <div class="pi">
        <div class="p-meta"><b>${String(i + 1).padStart(2, "0")}</b>${p.type ? `<span>${esc(p.type)}</span>` : ""}</div>
        <h3>${esc(p.title)}</h3><p class="p-sub">${esc(p.subtitle || "")}</p>
        <p class="p-desc">${esc(p.description)}</p>
        <ul class="feat">${(p.features || []).map(f => `<li>${esc(f)}</li>`).join("")}</ul>
        <div class="p-foot"><div class="tags">${(p.tech || []).map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div>
          <div class="p-links">${gh ? `<a href="${esc(gh)}" target="_blank" rel="noopener noreferrer">${svg("github")}Source code</a>` : ""}${demo ? `<a href="${esc(demo)}" target="_blank" rel="noopener noreferrer">${svg("arrow")}Live demo</a>` : ""}</div></div>
      </div></article>`;
  }).join("");
  $("#projGrid").addEventListener("pointermove", e => { const c = e.target.closest(".proj"); if (!c) return; const r = c.getBoundingClientRect(); c.style.setProperty("--mx", e.clientX - r.left + "px"); c.style.setProperty("--my", e.clientY - r.top + "px"); });

  /* ---------- certifications (expandable) / achievements ---------- */
  const link = u => safeUrl(u) ? `<a class="v" href="${esc(u)}" target="_blank" rel="noopener noreferrer">Verify credential ↗</a>` : "";
  $("#certGrid").innerHTML = (S.certifications || []).map((c, i) => `
    <li class="card cert reveal" style="--d:${(i % 2) * .06}s">
      <button type="button" class="cert-h" aria-expanded="false" aria-controls="cb${i}"><span><span class="k">${esc(c.type || "Certificate")}</span><b>${esc(c.title)}</b><span class="o">${esc(c.issuer)}</span></span><span class="chev" aria-hidden="true"></span></button>
      <div class="cert-b" id="cb${i}" role="region"><div><div class="in">${c.details ? `<p>${esc(c.details)}</p>` : ""}<div class="m"><span class="tag">Issuer: ${esc(c.issuer)}</span>${c.date ? `<span class="tag">${esc(c.date)}</span>` : ""}</div>${c.note ? `<p>${esc(c.note)}</p>` : ""}${link(c.url)}</div></div></div></li>`).join("");
  $("#certGrid").addEventListener("click", e => {
    const b = e.target.closest(".cert-h"); if (!b) return; const li = b.closest(".cert"), o = !li.classList.contains("open");
    li.classList.toggle("open", o); b.setAttribute("aria-expanded", o);
  });
  const ach = (arr, k) => (arr || []).map(a => `<li class="card ach reveal"><span class="k">${k}</span><b>${esc(a.title)}</b><span class="o">${esc(a.org)}</span>${a.date ? `<span class="o" style="color:var(--em);font-family:var(--f-m)">${esc(a.date)}</span>` : ""}${link(a.url)}</li>`).join("");
  $("#achList").innerHTML = ach(S.achievements, "Achievement");
  $("#compList").innerHTML = ach(S.competitions, "Competition"); $("#compList").classList.add("comp");

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
        const [a, b] = await Promise.all([fetch(`https://api.github.com/users/${encodeURIComponent(u)}`), fetch(`https://api.github.com/users/${encodeURIComponent(u)}/repos?sort=pushed&per_page=12&type=owner`)]);
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
    } catch (e) { /* offline or rate-limited: simply hidden */ }
  })();

  /* ---------- nav, progress, parallax ---------- */
  const nav = $("#nav"), menu = $("#menuBtn"), links = $("#navLinks"), bar = $("#progress"), hero = $("#home");
  const setMenu = o => { links.classList.toggle("open", o); menu.setAttribute("aria-expanded", o); menu.setAttribute("aria-label", o ? "Close menu" : "Open menu"); };
  menu.addEventListener("click", () => setMenu(menu.getAttribute("aria-expanded") !== "true"));
  $$("a", links).forEach(a => a.addEventListener("click", () => setMenu(false)));
  addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });
  addEventListener("resize", () => { if (innerWidth > 900) setMenu(false); });
  const secs = $$("main section[id]"); let tick = false;
  const onScroll = () => {
    tick = false;
    const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    nav.classList.toggle("stuck", y > 20);
    if (!reduce && y < innerHeight * 1.2) hero.style.setProperty("--py", (y * .16).toFixed(1) + "px");
    let cur = ""; for (const s of secs) if (s.getBoundingClientRect().top <= innerHeight * .35) cur = s.id;
    $$("a", links).forEach(a => { const on = a.getAttribute("href") === "#" + cur; a.classList.toggle("active", on); on ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current"); });
  };
  addEventListener("scroll", () => { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* portrait tilt (desktop, motion allowed) */
  if (finePointer && !reduce) {
    const fr = $("#frame");
    hero.addEventListener("pointermove", e => { const r = hero.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; fr.style.setProperty("--ry", (x * 5).toFixed(2) + "deg"); fr.style.setProperty("--rx", (-y * 4).toFixed(2) + "deg"); });
    hero.addEventListener("pointerleave", () => { fr.style.setProperty("--rx", "0deg"); fr.style.setProperty("--ry", "0deg"); });
  }

  /* custom cursor ring (additive: the native cursor stays) */
  if (finePointer && !reduce) {
    const ring = document.createElement("div"), dot = document.createElement("div");
    ring.className = "cur"; dot.className = "cur-dot"; ring.setAttribute("aria-hidden", "true"); dot.setAttribute("aria-hidden", "true");
    document.body.append(ring, dot);
    let tx = 0, ty = 0, rx = 0, ry = 0, run = false;
    const step = () => { rx += (tx - rx) * .2; ry += (ty - ry) * .2; ring.style.transform = `translate3d(${rx}px,${ry}px,0)`; if (Math.abs(tx - rx) + Math.abs(ty - ry) > .1) requestAnimationFrame(step); else run = false; };
    addEventListener("pointermove", e => { tx = e.clientX; ty = e.clientY; dot.style.transform = `translate3d(${tx}px,${ty}px,0)`; ring.classList.add("on"); dot.classList.add("on"); if (!run) { run = true; requestAnimationFrame(step); } });
    document.addEventListener("pointerover", e => ring.classList.toggle("hot", !!e.target.closest("a,button,.chip,.fm-n")));
    document.addEventListener("pointerleave", () => { ring.classList.remove("on"); dot.classList.remove("on"); });
  }

  /* ---------- reveal + count-up (real numbers only) + terminal ---------- */
  const countUp = el => {
    const n = +el.dataset.n; if (reduce || !n) return; let t0;
    const f = t => { t0 = t0 || t; const k = Math.min(1, (t - t0) / 900); el.textContent = Math.round(n * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(f); }; requestAnimationFrame(f);
  };
  const rev = $$(".reveal, #term");
  if ("IntersectionObserver" in window && !reduce) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return; const t = e.target; t.classList.add("in"); io.unobserve(t);
      $$(".count", t).forEach(countUp);
    }), { threshold: .1, rootMargin: "0px 0px -6% 0px" });
    rev.forEach((el, i) => { if (el.closest(".hero")) el.style.setProperty("--d", (i % 8) * .09 + "s"); io.observe(el); });
  } else rev.forEach(el => el.classList.add("in"));
})();
