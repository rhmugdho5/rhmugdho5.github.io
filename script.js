/* ==========================================================
   Rejoan Hasan Mugdho — Portfolio
   Renders the whole page from the files in /data and wires up
   the interactions. You normally never need to edit this file.
   ========================================================== */
(function () {
  "use strict";

  const P = window.PORTFOLIO || {};
  const profile = P.profile || {};
  const social = P.social || { profiles: [] };
  const education = P.education || [];
  const skills = P.skills || [];
  const skillStatuses = P.skillStatuses || {};
  const learning = P.learning || { nodes: [] };
  const projects = P.projects || [];
  const certs = P.certifications || [];
  const achievements = P.achievements || [];

  const reduceMotion = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const finePointer = !!(window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches);

  /* ---------- helpers ---------- */
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.prototype.slice.call((r || document).querySelectorAll(s));
  const esc = (v) => String(v == null ? "" : v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  /* Only allow safe URL schemes + relative paths. */
  function url(u) {
    u = String(u || "").trim();
    if (!u || /^\s*javascript:/i.test(u)) return "";
    return /^(https?:|mailto:|tel:|#|\.{0,2}\/|[\w-]+[\/.])/i.test(u) ? u : "";
  }
  const icon = (n) => '<svg class="i" aria-hidden="true"><use href="#i-' + esc(n) + '"/></svg>';
  const ext = (h) => (/^https?:/i.test(h) ? ' target="_blank" rel="noopener noreferrer"' : "");
  const set = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; return el; };
  const initials = (s) => String(s || "").split(/\s+/).filter((w) => /[A-Za-z]/.test(w)).map((w) => w[0].toUpperCase()).join("");
  const colour = (c) => (/^#[0-9a-f]{3,8}$/i.test(String(c || "")) ? c : "");

  /* ---------- simple text bindings: <span data-bind="key"> ---------- */
  const nameParts = String(profile.name || "").trim().split(/\s+/);
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";
  const firstLast = nameParts.length > 1 ? nameParts.slice(0, -1).join(" ") : profile.name || "";
  const about = profile.about || {};
  const contact = profile.contact || {};
  const bindings = {
    university: profile.university, universityShort: profile.universityShort, department: profile.department,
    designation: profile.designation, tagline: profile.tagline, intro: profile.intro, status: profile.status,
    primaryInterest: profile.primaryInterest, name: profile.name, firstLast, lastName,
    typingFirst: (profile.typing && profile.typing[0]) || "",
    aboutHeading: about.heading, contactHeading: contact.heading, contactText: contact.text, footerNote: profile.footerNote,
  };
  $$("[data-bind]").forEach((el) => {
    const v = bindings[el.getAttribute("data-bind")];
    if (v !== undefined && v !== "") el.textContent = v;
  });
  const yearEl = $("#year"); if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- CV links + photo ---------- */
  const cv = profile.cv || {};
  $$("[data-cv]").forEach((a) => {
    if (cv.file) a.setAttribute("href", cv.file);
    if (cv.downloadName) a.setAttribute("download", cv.downloadName);
  });
  const ph = profile.photo;
  if (ph) {
    const img = $("#heroPhoto"), src = $("#heroSrcSmall");
    if (img) {
      if (ph.jpg) img.src = ph.jpg;
      if (ph.alt) img.alt = ph.alt;
      if (ph.width) img.width = ph.width;
      if (ph.height) img.height = ph.height;
    }
    if (src && ph.webp) src.srcset = (ph.small && ph.small.webp ? ph.small.webp + " 480w, " : "") + ph.webp + " 960w";
  }

  /* ---------- hero: social buttons + status panel ---------- */
  set("heroSocial", (social.profiles || []).filter((p) => p.hero && url(p.url)).map((p) =>
    '<li><a href="' + esc(url(p.url)) + '"' + ext(url(p.url)) + ' aria-label="' + esc(p.label) + '">' + icon(p.icon) + esc(p.label) + "</a></li>").join(""));

  (function () {
    let rows = (profile.statusPanel || []).slice();
    if (profile.currentSemester) rows.splice(1, 0, { label: "SEMESTER", value: profile.currentSemester });
    set("statusPanel", rows.map((r) => '<div><dt>' + esc(r.label) + '</dt><dd' + (/focus/i.test(r.label) ? ' class="em"' : "") + ">" + esc(r.value) + "</dd></div>").join(""));
  })();

  /* ---------- about (bento) ---------- */
  (function () {
    const codingCount = (social.profiles || []).filter((p) => p.badge).length;
    const paras = (about.paragraphs || []).map((t) => "<p>" + esc(t) + "</p>").join("");
    const focus = (about.focusNow || []).map((t) => "<li>" + esc(t) + "</li>").join("");
    const langs = (about.languages || []).map((l) => '<div class="lang"><b>' + esc(l.name) + "</b><span>" + esc(l.level) + "</span></div>").join("");
    const tl = profile.terminal || [];
    const term = tl.map((l, i) => {
      const cmd = /^\$\s/.test(l);
      return '<span class="term-line ' + (cmd ? "cmd" : "out") + '" style="--i:' + i + '">' + esc(cmd ? l.replace(/^\$\s/, "") : l) + "</span>";
    }).join("") + '<span class="term-line cursor-line" style="--i:' + tl.length + '"></span>';
    set("aboutBento",
      '<article class="card b-bio reveal"><h3>Introduction</h3>' + paras + "</article>" +
      (tl.length ? '<article class="card b-term reveal" style="--d:.08s" aria-label="Terminal summary"><div class="term-bar"><i></i><i></i><i></i><span>rhm@portfolio: ~</span></div><div class="term-body">' + term + "</div></article>" : "") +
      '<article class="card b-focus reveal"><h3>Currently strengthening</h3><ul class="checklist">' + focus + "</ul></article>" +
      '<article class="card b-stats reveal" style="--d:.08s">' +
        '<div class="stat"><b data-count="' + projects.length + '">0</b><span>Featured projects</span></div>' +
        '<div class="stat"><b data-count="' + certs.length + '">0</b><span>Courses &amp; certificates</span></div>' +
        '<div class="stat"><b data-count="' + codingCount + '">0</b><span>Coding platforms</span></div></article>' +
      '<article class="card b-lang reveal"><h3>Languages</h3>' + langs + "</article>");
  })();

  /* ---------- journey: education ---------- */
  set("eduTimeline", education.map((e, i) => {
    let detail = e.detail || "";
    if (e.current && profile.currentSemester) detail = profile.currentSemester + (detail ? " · " + detail : "");
    return '<li class="tl-item' + (e.current ? " current" : "") + ' reveal" style="--d:' + i * 0.08 + 's"><span class="tl-dot" aria-hidden="true"></span><div class="card tl-card">' +
      '<span class="tl-period">' + esc(e.period) + "</span>" +
      "<h4>" + esc(e.degree) + (e.current ? '<span class="badge">In progress</span>' : "") + "</h4>" +
      "<p>" + esc(e.institution) + "</p>" + (detail ? '<p style="margin-top:.3rem">' + esc(detail) + "</p>" : "") + "</div></li>";
  }).join(""));
  const jl = $("#journeyLead"); if (jl && learning.intro) jl.textContent = learning.intro;

  /* ---------- journey: learning map (interactive SVG network) ---------- */
  (function () {
    const root = $("#learnMap");
    const nodes = learning.nodes || [];
    if (!root || !nodes.length) return;
    const statusLabel = learning.statuses || {};
    const byId = {}; nodes.forEach((n) => (byId[n.id] = n));
    const centerNode = nodes.find((n) => n.center) || nodes[0];
    const outer = nodes.filter((n) => n !== centerNode);
    let selected = centerNode.id;
    const mq = window.matchMedia("(max-width: 700px)");

    function wrap(label, max) {
      const words = String(label).split(" "), lines = [];
      let cur = "";
      words.forEach((w) => {
        if ((cur + " " + w).trim().length > max && cur) { lines.push(cur); cur = w; } else cur = (cur + " " + w).trim();
      });
      if (cur) lines.push(cur);
      return lines;
    }
    function layout() {
      const m = mq.matches;
      const W = m ? 360 : 640, H = m ? 560 : 430, cx = W / 2, cy = H / 2, rx = m ? 112 : 235, ry = m ? 200 : 140;
      const pos = {};
      pos[centerNode.id] = { x: cx, y: cy };
      outer.forEach((n, i) => {
        const a = (-90 + (360 / outer.length) * i) * Math.PI / 180;
        pos[n.id] = { x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a) };
      });
      return { W, H, pos, max: m ? 13 : 16 };
    }
    function draw() {
      const L = layout(), seen = {}, edges = [];
      nodes.forEach((n) => (n.links || []).forEach((t) => {
        if (!byId[t]) return;
        const k = [n.id, t].sort().join("|");
        if (seen[k]) return; seen[k] = 1;
        edges.push('<line class="l-edge" data-a="' + esc(n.id) + '" data-b="' + esc(t) + '" x1="' + L.pos[n.id].x.toFixed(1) + '" y1="' + L.pos[n.id].y.toFixed(1) + '" x2="' + L.pos[t].x.toFixed(1) + '" y2="' + L.pos[t].y.toFixed(1) + '"/>');
      }));
      const ns = nodes.map((n) => {
        const p = L.pos[n.id], c = n === centerNode, r = c ? 14 : 9, lines = wrap(n.label, L.max);
        const above = p.y < L.H / 2 - 2 || (c ? false : false);
        const base = c ? p.y + r + 22 : above ? p.y - r - 12 - (lines.length - 1) * 16 : p.y + r + 20;
        const tsp = lines.map((ln, i) => '<tspan x="' + p.x.toFixed(1) + '" y="' + (base + i * 16).toFixed(1) + '">' + esc(ln) + "</tspan>").join("");
        const lastY = base + (lines.length - 1) * 16 + 6, firstY = base - 14;
        const top = Math.min(p.y - r - 8, firstY), bot = Math.max(p.y + r + 8, lastY);
        return '<g class="l-node ' + esc(n.status) + (c ? " center" : "") + '" data-id="' + esc(n.id) + '" tabindex="0" role="button" aria-label="' + esc(n.label) + ", " + esc(statusLabel[n.status] || n.status) + '">' +
          '<rect class="hit" x="' + (p.x - 62).toFixed(1) + '" y="' + top.toFixed(1) + '" width="124" height="' + (bot - top).toFixed(1) + '" rx="10"/>' +
          '<circle class="ring" cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="' + (r + 8) + '"/><circle class="core" cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="' + r + '"/><text>' + tsp + "</text></g>";
      }).join("");
      const legend = Object.keys(statusLabel).map((k) => {
        const css = k === "hands-on" ? "background:var(--em)" : k === "learning" ? "background:var(--blue)" : "border:1.5px solid var(--muted)";
        return '<span><i style="' + css + '"></i>' + esc(statusLabel[k]) + "</span>";
      }).join("");
      root.innerHTML = '<svg class="learn-svg" viewBox="0 0 ' + L.W + " " + L.H + '" role="group" aria-label="Interactive map of my learning focus areas">' + edges.join("") + ns + "</svg>" +
        '<div class="learn-detail" id="learnDetail" aria-live="polite"></div><div class="learn-legend">' + legend + "<span>Select a node to read more</span></div>";
      select(selected, true);
    }
    function select(id, quiet) {
      const n = byId[id]; if (!n) return;
      selected = id;
      $$(".l-node", root).forEach((g) => g.classList.toggle("sel", g.getAttribute("data-id") === id));
      $$(".l-edge", root).forEach((e) => e.classList.toggle("on", e.getAttribute("data-a") === id || e.getAttribute("data-b") === id));
      const rel = (n.links || []).filter((t) => byId[t]).concat(nodes.filter((o) => (o.links || []).indexOf(id) > -1 && (n.links || []).indexOf(o.id) < 0).map((o) => o.id));
      $("#learnDetail", root).innerHTML =
        '<div class="ld-top"><h4>' + esc(n.label) + '</h4><span class="st-chip ' + esc(n.status) + '">' + esc(statusLabel[n.status] || n.status) + "</span></div><p>" + esc(n.text) + "</p>" +
        (rel.length ? '<div class="ld-links"><small>Connected to</small>' + rel.map((t) => '<button type="button" data-go="' + esc(t) + '">' + esc(byId[t].label) + "</button>").join("") + "</div>" : "");
    }
    root.addEventListener("click", (e) => {
      const g = e.target.closest(".l-node"), b = e.target.closest("[data-go]");
      if (g) select(g.getAttribute("data-id")); else if (b) select(b.getAttribute("data-go"));
    });
    root.addEventListener("keydown", (e) => {
      const g = e.target.closest && e.target.closest(".l-node");
      if (g && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); select(g.getAttribute("data-id")); }
    });
    (mq.addEventListener ? mq.addEventListener.bind(mq, "change") : mq.addListener.bind(mq))(draw);
    draw();
  })();

  /* ---------- skills: capability map ---------- */
  (function () {
    const root = $("#skillsMap");
    if (!root || !skills.length) return;
    let cur = 0;
    const used = {};
    skills.forEach((g) => (g.items || []).forEach((it) => { if (typeof it === "object") used[it.status] = 1; }));
    const legend = Object.keys(skillStatuses).filter((k) => used[k]).map((k) => '<span><span class="st-chip ' + esc(k) + '">' + esc(skillStatuses[k].label) + "</span></span>").join("");

    root.innerHTML =
      '<div class="skill-tabs" role="tablist" aria-label="Skill categories" aria-orientation="vertical">' +
      skills.map((g, i) => '<button class="skill-tab" role="tab" type="button" id="stab' + i + '" aria-controls="spanel" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '" data-i="' + i + '"><span class="skill-ico">' + icon(g.icon || "code") + '</span><span class="t">' + esc(g.title) + "</span><em>" + (g.items || []).length + "</em></button>").join("") +
      '</div><div class="skill-panel" id="spanel" role="tabpanel" aria-live="polite"></div>';

    const panel = $("#spanel", root);
    function show(i, focus) {
      cur = i;
      const g = skills[i];
      $$(".skill-tab", root).forEach((b, k) => { b.setAttribute("aria-selected", k === i); b.tabIndex = k === i ? 0 : -1; if (k === i && focus) b.focus(); });
      panel.setAttribute("aria-labelledby", "stab" + i);
      panel.innerHTML =
        '<div class="sp-head"><h4>' + esc(g.title) + "</h4>" + (g.blurb ? "<p>" + esc(g.blurb) + "</p>" : "") + "</div>" +
        '<ul class="sp-grid">' + (g.items || []).map((it, k) => {
          const o = typeof it === "string" ? { name: it, status: "skill" } : it;
          const st = skillStatuses[o.status] ? o.status : "skill";
          return '<li class="sk st-' + esc(st) + '" style="--i:' + k + '"><b>' + esc(o.name) + "</b>" + (o.note ? "<small>" + esc(o.note) + "</small>" : "") + '<span class="st-chip ' + esc(st) + '">' + esc((skillStatuses[st] || {}).label || st) + "</span></li>";
        }).join("") + '</ul><div class="sk-legend">' + legend + "</div>";
    }
    root.addEventListener("click", (e) => { const b = e.target.closest(".skill-tab"); if (b) show(+b.getAttribute("data-i")); });
    root.addEventListener("keydown", (e) => {
      if (!e.target.closest(".skill-tab")) return;
      const k = e.key; let n = cur;
      if (k === "ArrowDown" || k === "ArrowRight") n = (cur + 1) % skills.length;
      else if (k === "ArrowUp" || k === "ArrowLeft") n = (cur - 1 + skills.length) % skills.length;
      else if (k === "Home") n = 0; else if (k === "End") n = skills.length - 1; else return;
      e.preventDefault(); show(n, true);
    });
    show(0);
  })();

  set("interests", "<h3>Areas of interest</h3>" + '<ul class="tags">' + (profile.interests || []).map((t) => '<li class="tag' + (t.primary ? " primary" : "") + '">' + esc(t.name) + "</li>").join("") + "</ul>");

  /* ---------- projects ---------- */
  set("projectsGrid", projects.map((p, i) => {
    const gh = url(p.links && p.links.github), demo = url(p.links && p.links.demo), imgSrc = url(p.image), ac = colour(p.accent);
    const links = (gh ? '<a href="' + esc(gh) + '"' + ext(gh) + ' aria-label="' + esc(p.title) + ' source code on GitHub">' + icon("github") + "Source code</a>" : "") +
                  (demo ? '<a href="' + esc(demo) + '"' + ext(demo) + ' aria-label="' + esc(p.title) + ' live demo">' + icon("arrow-up-right") + "Live demo</a>" : "");
    return '<article class="proj" style="' + (ac ? "--accent:" + ac : "") + '">' +
      '<div class="p-media reveal"><div class="p-frame">' + (imgSrc ? '<img src="' + esc(imgSrc) + '" alt="' + esc(p.imageAlt || p.title + " preview") + '" width="1000" height="640" loading="lazy" decoding="async">' : "") +
      (p.imageNote ? '<span class="p-note">' + esc(p.imageNote) + "</span>" : "") + "</div></div>" +
      '<div class="p-body reveal" style="--d:.1s"><p class="p-idx">' + String(i + 1).padStart(2, "0") + (p.category ? '<span class="p-cat">' + esc(p.category) + "</span>" : "") + "</p>" +
      "<h3>" + esc(p.title) + "</h3>" + (p.subtitle ? '<p class="p-sub">' + esc(p.subtitle) + "</p>" : "") +
      '<p class="p-desc">' + esc(p.description) + "</p>" +
      ((p.features || []).length ? '<ul class="feat">' + p.features.map((f) => "<li>" + esc(f) + "</li>").join("") + "</ul>" : "") +
      '<ul class="p-tech" aria-label="Technologies">' + (p.tech || []).map((t) => "<li>" + esc(t) + "</li>").join("") + "</ul>" +
      '<div class="p-links">' + links + "</div></div></article>";
  }).join(""));

  /* subtle 3D tilt on project previews (mouse only) */
  if (finePointer && !reduceMotion) {
    $$(".p-media").forEach((m) => {
      const f = $(".p-frame", m);
      m.addEventListener("pointermove", (e) => {
        if (e.pointerType !== "mouse") return;
        const r = m.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        f.style.setProperty("--rx", (-y * 5).toFixed(2) + "deg"); f.style.setProperty("--ry", (x * 6).toFixed(2) + "deg");
      });
      m.addEventListener("pointerleave", () => { f.style.setProperty("--rx", "0deg"); f.style.setProperty("--ry", "0deg"); });
    });
  }

  /* ---------- credentials wall (expandable) ---------- */
  const TYPES = {
    certification: { label: "Certification", plural: "Certifications", icon: "cert", org: "Issuer" },
    recognition: { label: "Recognition", plural: "Recognition", icon: "award", org: "Awarded by" },
    competition: { label: "Competition", plural: "Competitions", icon: "flag", org: "Organizer" },
  };
  const creds = []
    .concat(certs.map((c) => Object.assign({ type: "certification" }, c)))
    .concat(achievements.map((a) => Object.assign({}, a)))
    .filter((c) => TYPES[c.type]);

  function credCard(c, i) {
    const t = TYPES[c.type], u = url(c.url), id = "cred" + i;
    const rows =
      (c.details ? "<div><dt>About</dt><dd>" + esc(c.details) + "</dd></div>" : "") +
      (c.issuer ? "<div><dt>" + t.org + "</dt><dd>" + esc(c.issuer) + "</dd></div>" : "") +
      "<div><dt>Type</dt><dd>" + t.label + (c.category ? " · " + esc(c.category) : "") + "</dd></div>" +
      "<div><dt>Date</dt><dd" + (c.date ? ">" + esc(c.date) : ' class="muted">Not listed') + "</dd></div>" +
      (c.note ? "<div><dt>Note</dt><dd>" + esc(c.note) + "</dd></div>" : "") +
      ((c.topics || []).length ? '<div><dt>Topics</dt><dd><ul class="tags">' + c.topics.map((x) => '<li class="tag">' + esc(x) + "</li>").join("") + "</ul></dd></div>" : "") +
      (u ? '<div><dt>Verify</dt><dd><a href="' + esc(u) + '"' + ext(u) + ">View credential " + icon("arrow-up-right") + "</a></dd></div>" : "");
    return '<article class="card cred' + (c.featured ? " featured" : "") + '" data-type="' + c.type + '">' +
      '<button class="cred-toggle" type="button" aria-expanded="false" aria-controls="' + id + '"><span class="cred-top"><span class="cred-ico">' + icon(t.icon) + '</span><span class="cred-right"><span class="cred-type">' + t.label + '</span><span class="cred-plus">' + icon("plus") + "</span></span></span>" +
      "<h4>" + esc(c.title) + "</h4>" + (c.issuer ? '<span class="issuer">' + esc(c.issuer) + "</span>" : "") + "</button>" +
      '<div class="cred-more" id="' + id + '" role="region" aria-label="' + esc(c.title) + ' details"><div><dl>' + rows + "</dl></div></div></article>";
  }
  let activeFilter = "all";
  function renderCreds() {
    set("credGrid", creds.filter((c) => activeFilter === "all" || c.type === activeFilter).map(credCard).join(""));
  }
  (function () {
    const bar = $("#credFilters"), grid = $("#credGrid");
    if (!bar || !grid) return;
    const keys = ["all"].concat(Object.keys(TYPES).filter((k) => creds.some((c) => c.type === k)));
    bar.innerHTML = keys.map((k) => {
      const n = k === "all" ? creds.length : creds.filter((c) => c.type === k).length;
      return '<button class="filter" type="button" data-f="' + k + '" aria-pressed="' + (k === "all") + '">' + (k === "all" ? "All" : TYPES[k].plural) + "<span>" + n + "</span></button>";
    }).join("");
    bar.addEventListener("click", (e) => {
      const b = e.target.closest(".filter"); if (!b) return;
      activeFilter = b.getAttribute("data-f");
      $$(".filter", bar).forEach((x) => x.setAttribute("aria-pressed", x === b ? "true" : "false"));
      renderCreds();
    });
    grid.addEventListener("click", (e) => {
      const b = e.target.closest(".cred-toggle"); if (!b) return;
      const card = b.closest(".cred"), open = !card.classList.contains("open");
      card.classList.toggle("open", open); b.setAttribute("aria-expanded", String(open));
    });
    renderCreds();
  })();

  /* ---------- coding / social profiles ---------- */
  set("profilesGrid", (social.profiles || []).filter((p) => url(p.url)).map((p, i) => {
    const ico = p.badge ? '<span class="pf-ico" aria-hidden="true">' + esc(p.badge) + "</span>" : '<span class="pf-ico">' + icon(p.icon) + "</span>";
    return '<a class="card profile reveal" id="pf-' + esc(p.id) + '" href="' + esc(url(p.url)) + '"' + ext(url(p.url)) + ' style="--d:' + (i % 3) * 0.07 + 's" aria-label="' + esc(p.label) + ", " + esc(p.handle) + '">' +
      '<div class="pf-top">' + ico + '<span class="pf-arrow">' + icon("arrow-up-right") + "</span></div>" +
      "<h3>" + esc(p.label) + '</h3><p class="pf-handle">' + esc(p.handle) + "</p>" +
      '<p class="pf-desc">' + esc(p.description) + '</p><p class="pf-stats" aria-live="polite"></p></a>';
  }).join(""));

  /* ---------- contact ---------- */
  (function () {
    const email = profile.email || "";
    const subj = profile.emailSubject ? "?subject=" + encodeURIComponent(profile.emailSubject) : "";
    const cta = $("#emailCta");
    if (cta && email) cta.setAttribute("href", "mailto:" + email + subj);
    const items = [];
    if (email) items.push({ l: "Email", i: "mail", t: email, h: "mailto:" + email + subj });
    if (profile.phone) items.push({ l: "Phone", i: "phone", t: profile.phone, h: "tel:" + (profile.phoneLink || profile.phone.replace(/\s+/g, "")) });
    (social.profiles || []).filter((p) => p.id === "linkedin" || p.id === "github").forEach((p) => items.push({ l: p.label, i: p.icon, t: p.handle, h: p.url }));
    set("contactList", items.map((c) => '<li><a href="' + esc(url(c.h)) + '"' + ext(url(c.h)) + "><small>" + icon(c.i) + esc(c.l) + "</small><span>" + esc(c.t) + "</span></a></li>").join(""));
    const btn = $("#copyEmail");
    if (btn) btn.addEventListener("click", () => {
      const label = $("span", btn), old = label.textContent;
      const done = (ok) => { label.textContent = ok ? "Copied!" : email; setTimeout(() => (label.textContent = old), 2200); };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(email).then(() => done(true), () => done(false));
      else {
        const ta = document.createElement("textarea"); ta.value = email; ta.setAttribute("readonly", "");
        ta.style.cssText = "position:fixed;opacity:0"; document.body.appendChild(ta); ta.select();
        let ok = false; try { ok = document.execCommand("copy"); } catch (e) {}
        document.body.removeChild(ta); done(ok);
      }
    });
  })();

  /* ---------- typing animation ---------- */
  (function () {
    const el = $("#typed"), words = profile.typing || [];
    if (!el || words.length < 2 || reduceMotion) { const c = $(".caret"); if (c && reduceMotion) c.style.display = "none"; return; }
    let w = 0, n = words[0].length, deleting = true;
    function tick() {
      const word = words[w]; let delay = deleting ? 28 : 62;
      el.textContent = word.slice(0, n);
      if (!deleting && n === word.length) { deleting = true; delay = 1800; n -= 1; }
      else if (deleting && n === 0) { deleting = false; w = (w + 1) % words.length; delay = 280; n = 1; }
      else n += deleting ? -1 : 1;
      setTimeout(tick, delay);
    }
    setTimeout(tick, 2400);
  })();

  /* ---------- header, progress, active link, hero scroll-parallax ---------- */
  const header = $("#siteHeader"), bar = $("#progressBar"), heroBg = $(".hero-bg"), heroEl = $("#top");
  let ticking = false;
  function onScroll() {
    const y = window.scrollY || document.documentElement.scrollTop;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.transform = "scaleX(" + (h > 0 ? Math.min(1, y / h) : 0) + ")";
    if (header) header.classList.toggle("scrolled", y > 12);
    if (heroBg && !reduceMotion && y < window.innerHeight * 1.2) heroBg.style.transform = "translate3d(0," + (y * 0.12).toFixed(1) + "px,0)";
    ticking = false;
  }
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  onScroll();

  const links = $$("#navLinks a");
  if ("IntersectionObserver" in window) {
    const secObs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const clear = en.target.id === "top";
        links.forEach((a) => {
          const on = !clear && a.getAttribute("href") === "#" + en.target.id;
          a.classList.toggle("active", on);
          if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach((a) => { const s = $(a.getAttribute("href")); if (s) secObs.observe(s); });
    if (heroEl) secObs.observe(heroEl);
  }

  /* ---------- mobile nav ---------- */
  const toggle = $("#navToggle"), menu = $("#navMenu");
  function setMenu(open) {
    if (!toggle || !menu) return;
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  if (toggle) {
    toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") { setMenu(false); toggle.focus(); } });
    document.addEventListener("click", (e) => { if (!e.target.closest(".nav")) setMenu(false); });
    window.addEventListener("resize", () => { if (window.innerWidth > 880) setMenu(false); });
  }

  /* ---------- scroll reveal + count-up ---------- */
  function countUp(el) {
    const target = +el.getAttribute("data-count") || 0;
    if (reduceMotion || target === 0) { el.textContent = target; return; }
    const t0 = performance.now(), dur = 1100;
    (function step(t) {
      const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(target * e);
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }
  const reveals = $$(".reveal:not(.in)"), counters = $$("[data-count]");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const rObs = new IntersectionObserver((entries, o) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); o.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach((el) => rObs.observe(el));
    const cObs = new IntersectionObserver((entries, o) => {
      entries.forEach((en) => { if (en.isIntersecting) { countUp(en.target); o.unobserve(en.target); } });
    }, { threshold: 0.6 });
    counters.forEach((el) => cObs.observe(el));
    setTimeout(() => $$(".reveal:not(.in)").forEach((el) => { if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("in"); }), 1200);
  } else {
    reveals.forEach((el) => el.classList.add("in"));
    counters.forEach(countUp);
  }

  /* ---------- card spotlight, custom cursor, hero pointer parallax (one shared loop) ---------- */
  const cursor = $("#cursor");
  const useCursor = finePointer && !reduceMotion && !!cursor;
  if (useCursor) document.documentElement.classList.add("has-cursor");
  const cur = { x: -100, y: -100, tx: -100, ty: -100 }, par = { x: 0, y: 0, tx: 0, ty: 0 };
  let looping = false;
  function frame() {
    let busy = false;
    if (useCursor) {
      cur.x += (cur.tx - cur.x) * 0.22; cur.y += (cur.ty - cur.y) * 0.22;
      cursor.style.transform = "translate3d(" + cur.x.toFixed(1) + "px," + cur.y.toFixed(1) + "px,0)";
      if (Math.abs(cur.tx - cur.x) > 0.2 || Math.abs(cur.ty - cur.y) > 0.2) busy = true;
    }
    if (heroEl && !reduceMotion) {
      par.x += (par.tx - par.x) * 0.08; par.y += (par.ty - par.y) * 0.08;
      heroEl.style.setProperty("--px", par.x.toFixed(3)); heroEl.style.setProperty("--py", par.y.toFixed(3));
      if (Math.abs(par.tx - par.x) > 0.002 || Math.abs(par.ty - par.y) > 0.002) busy = true;
    }
    looping = busy; if (busy) requestAnimationFrame(frame);
  }
  const kick = () => { if (!looping) { looping = true; requestAnimationFrame(frame); } };
  const interactive = "a, button, [role=button], .card, .filter, [tabindex='0'], .p-frame";
  document.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    if (useCursor) {
      cur.tx = e.clientX; cur.ty = e.clientY; cursor.classList.remove("hide");
      cursor.classList.toggle("hover", !!(e.target.closest && e.target.closest(interactive)));
    }
    const card = e.target.closest && e.target.closest(".card");
    if (card) { const r = card.getBoundingClientRect(); card.style.setProperty("--mx", e.clientX - r.left + "px"); card.style.setProperty("--my", e.clientY - r.top + "px"); }
    if (heroEl && !reduceMotion && e.clientY < heroEl.getBoundingClientRect().bottom) {
      par.tx = (e.clientX / window.innerWidth - 0.5) * 2; par.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    }
    kick();
  }, { passive: true });
  document.documentElement.addEventListener("mouseleave", () => { if (cursor) cursor.classList.add("hide"); par.tx = par.ty = 0; kick(); });

  /* ---------- animated network background (canvas) ---------- */
  function NetBg(canvas, o) {
    if (!canvas || !canvas.getContext) return null;
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0, nodes = [], packets = [], pairs = [], visible = true, running = false, last = 0, spawn = 0, pointer = null;
    const rnd = (a, b) => a + Math.random() * (b - a);

    function seed() {
      const small = w < 700, n = Math.min(small ? o.maxSmall : o.max, Math.round((w * h) / o.area));
      nodes = [];
      for (let i = 0; i < n; i++) nodes.push({ x: rnd(0, w), y: rnd(0, h), vx: rnd(-o.speed, o.speed), vy: rnd(-o.speed, o.speed), r: rnd(1, 2.1), c: i % 4 === 0 ? "0,230,173" : "54,169,255" });
    }
    function size() {
      const r = canvas.getBoundingClientRect(); if (!r.width || !r.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = r.width; h = r.height; canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); seed(); draw();
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      const max = (w < 700 ? o.dist * 0.75 : o.dist), max2 = max * max; pairs = [];
      ctx.lineWidth = 0.8;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j], dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
          if (d2 < max2) {
            const al = (1 - Math.sqrt(d2) / max) * 0.3;
            ctx.strokeStyle = "rgba(54,169,255," + al.toFixed(3) + ")";
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
            if (pairs.length < 200) pairs.push(i, j);
          }
        }
        if (pointer) {
          const dx = a.x - pointer.x, dy = a.y - pointer.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 150) { ctx.strokeStyle = "rgba(0,230,173," + ((1 - d / 150) * 0.45).toFixed(3) + ")"; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(pointer.x, pointer.y); ctx.stroke(); }
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]; ctx.fillStyle = "rgba(" + n.c + ",.75)";
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, 6.2832); ctx.fill();
      }
      for (let k = 0; k < packets.length; k++) {
        const p = packets[k], a = nodes[p.a], b = nodes[p.b]; if (!a || !b) continue;
        const x = a.x + (b.x - a.x) * p.t, y = a.y + (b.y - a.y) * p.t;
        ctx.fillStyle = "rgba(0,230,173,.18)"; ctx.beginPath(); ctx.arc(x, y, 6, 0, 6.2832); ctx.fill();
        ctx.fillStyle = "rgba(0,230,173,.95)"; ctx.beginPath(); ctx.arc(x, y, 2.2, 0, 6.2832); ctx.fill();
      }
    }
    function loop(t) {
      if (!running) return;
      const dt = Math.min(50, t - last || 16); last = t;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]; n.x += (n.vx * dt) / 16; n.y += (n.vy * dt) / 16;
        if (n.x < -10) n.x = w + 10; else if (n.x > w + 10) n.x = -10;
        if (n.y < -10) n.y = h + 10; else if (n.y > h + 10) n.y = -10;
      }
      spawn -= dt;
      if (spawn <= 0 && pairs.length) { const k = Math.floor(Math.random() * (pairs.length / 2)) * 2; packets.push({ a: pairs[k], b: pairs[k + 1], t: 0 }); spawn = o.packetEvery; if (packets.length > 6) packets.shift(); }
      packets = packets.filter((p) => (p.t += dt / 1300) < 1);
      draw(); requestAnimationFrame(loop);
    }
    function sync() {
      const want = visible && !document.hidden && !reduceMotion;
      if (want && !running) { running = true; last = 0; requestAnimationFrame(loop); } else if (!want) running = false;
    }
    if ("IntersectionObserver" in window) new IntersectionObserver((en) => { visible = en[0].isIntersecting; sync(); }).observe(canvas);
    document.addEventListener("visibilitychange", sync);
    if ("ResizeObserver" in window) new ResizeObserver(size).observe(canvas.parentElement); else window.addEventListener("resize", size);
    size(); sync();
    return { setPointer: (p) => { pointer = p; } };
  }
  const heroNet = NetBg($("#heroNet"), { max: 70, maxSmall: 34, area: 15000, dist: 150, speed: 0.22, packetEvery: 900 });
  NetBg($("#contactNet"), { max: 30, maxSmall: 18, area: 14000, dist: 130, speed: 0.15, packetEvery: 1500 });
  if (heroNet && heroEl && finePointer) {
    const cv = $("#heroNet");
    heroEl.addEventListener("pointermove", (e) => { const r = cv.getBoundingClientRect(); heroNet.setPointer({ x: e.clientX - r.left, y: e.clientY - r.top }); }, { passive: true });
    heroEl.addEventListener("pointerleave", () => heroNet.setPointer(null));
  }

  /* ---------- GitHub API (optional, fails silently) ---------- */
  (function () {
    const user = social.githubUser;
    if (!user || social.githubApi === false || !window.fetch) return;
    const KEY = "gh-" + user, TTL = 30 * 60 * 1000;
    const cached = () => { try { const c = JSON.parse(sessionStorage.getItem(KEY)); if (c && Date.now() - c.t < TTL) return c.d; } catch (e) {} return null; };
    const store = (d) => { try { sessionStorage.setItem(KEY, JSON.stringify({ t: Date.now(), d })); } catch (e) {} };
    const get = (u) => fetch(u, { headers: { Accept: "application/vnd.github+json" } }).then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); });
    function render(d) {
      const card = $("#pf-github .pf-stats");
      if (card && d.user) card.textContent = d.user.public_repos + " public repos · " + d.user.followers + " followers";
      const repos = (d.repos || []).filter((r) => !r.fork && /^https:\/\/github\.com\//.test(r.html_url)).slice(0, 4);
      if (!repos.length) return;
      set("ghRepos", repos.map((r) => {
        const upd = r.pushed_at ? new Date(r.pushed_at).toLocaleDateString("en-GB", { month: "short", year: "numeric" }) : "";
        return '<li><a href="' + esc(r.html_url) + '" target="_blank" rel="noopener noreferrer"><b>' + esc(r.name) + "</b><p>" + esc(r.description || "No description yet.") + "</p><small>" + esc([r.language, upd && "Updated " + upd].filter(Boolean).join(" · ")) + "</small></a></li>";
      }).join(""));
      const box = $("#ghLatest"); if (box) { box.hidden = false; box.classList.add("in"); }
    }
    const c = cached(); if (c) return render(c);
    Promise.all([get("https://api.github.com/users/" + encodeURIComponent(user)), get("https://api.github.com/users/" + encodeURIComponent(user) + "/repos?sort=pushed&per_page=12")])
      .then((r) => { const d = { user: r[0], repos: r[1] }; store(d); render(d); }).catch(() => {});
  })();
})();
