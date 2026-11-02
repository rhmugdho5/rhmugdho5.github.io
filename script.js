(() => {
  const config = window.PORTFOLIO_CONFIG || {};
  const githubUser = (config.githubUsername || "").trim();
  const githubUrl = config.githubProfileUrl || (githubUser && githubUser !== "YOUR_GITHUB_USERNAME" ? `https://github.com/${githubUser}` : "");
  const email = (config.contactEmail || "").trim();

  // Header links and profile actions
  ["githubProfileLink", "githubCta", "contactGithubLink"].forEach(id => {
    const el = document.getElementById(id);
    if (el && githubUrl) el.href = githubUrl;
    else if (el) { el.href = "https://github.com/"; el.title = "Set your GitHub username in config.js"; }
  });
  const emailLink = document.getElementById("contactEmailLink");
  if (emailLink && email) emailLink.href = `mailto:${email}`;
  document.getElementById("year").textContent = new Date().getFullYear();

  // Mobile navigation
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));

  // Reveal-on-scroll animation; reduced-motion users see content immediately.
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  } else revealEls.forEach(el => el.classList.add("visible"));

  // Project details
  const projects = {
    pact: {title:"PACT", eyebrow:"C PROGRAMMING / CONSOLE APPLICATION", description:"Program & Accountability Console Tracker is a C project built around structured records and text-file storage. It organizes users, programs, tasks, subscriptions and administrator data in a console-based workflow.", stack:["C","File I/O","Structured data","Console application"], url:""},
    space: {title:"Space Invaders: Galactic Warfare – Deluxe Edition", eyebrow:"GAME DEVELOPMENT / C", description:"A console-based arcade game experiment focused on game loops, keyboard interaction, collision logic and rendering a retro space-combat experience in the terminal.", stack:["C","Game loop","Keyboard input","Console rendering"], url:""},
    sirat: {title:"Sirat – Your Islamic Life Companion", eyebrow:"JAVA / OBJECT-ORIENTED PROGRAMMING", description:"A team-built Java desktop application designed to bring together prayer, Quran reading, dhikr, habits, zakat, duas, goals and other Islamic lifestyle features. The project uses Swing UI, OOP concepts, role-based users and file handling.", stack:["Java","Swing GUI","OOP","Inheritance","File handling"], url:""},
    passfort: {title:"PassFort – Password Security Checker", eyebrow:"CYBERSECURITY LEARNING PROJECT / PLANNED", description:"A planned beginner-friendly project to evaluate password quality using validation rules, criteria checks and a clear strength score. It is intended as a learning exercise—not a substitute for secure password storage or professional security auditing.", stack:["Java","Input validation","Password hygiene","Security fundamentals"], url:""}
  };
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalEyebrow = document.getElementById("modalEyebrow");
  const modalStack = document.getElementById("modalStack");
  const modalLink = document.getElementById("modalLink");
  document.querySelectorAll("[data-project]").forEach(card => card.addEventListener("click", () => {
    const project = projects[card.dataset.project];
    if (!project) return;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    modalEyebrow.textContent = project.eyebrow;
    modalStack.replaceChildren(...project.stack.map(item => { const span = document.createElement("span"); span.textContent = item; return span; }));
    if (project.url) { modalLink.href = project.url; modalLink.hidden = false; }
    else modalLink.hidden = true;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }));
  const closeModal = () => { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; };
  modal.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", event => { if (event.key === "Escape" && modal.classList.contains("open")) closeModal(); });

  // Public GitHub API: no token is needed for public repositories.
  const repoGrid = document.getElementById("repoGrid");
  const repoStatus = document.getElementById("repoStatus");
  const repoCount = document.getElementById("repoCount");
  const followerCount = document.getElementById("followerCount");
  const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  if (!githubUser || githubUser === "YOUR_GITHUB_USERNAME") {
    repoStatus.textContent = "CONFIGURATION NEEDED";
    repoGrid.innerHTML = '<div class="repo-loading">Add your GitHub username in <strong>config.js</strong> to display your public repositories here.</div>';
  } else {
    fetch(`https://api.github.com/users/${encodeURIComponent(githubUser)}/repos?sort=updated&per_page=6&type=owner`, {headers:{"Accept":"application/vnd.github+json"}})
      .then(response => { if (!response.ok) throw new Error(`GitHub API returned ${response.status}`); return response.json(); })
      .then(repos => {
        repoCount.textContent = repos.length ? repos.length : "0";
        if (!repos.length) { repoStatus.textContent = "NO PUBLIC REPOSITORIES FOUND"; repoGrid.innerHTML = '<div class="repo-loading">No public repositories were returned for this account.</div>'; return; }
        repoStatus.textContent = "LIVE FROM GITHUB";
        repoGrid.innerHTML = repos.map(repo => `<a class="repo-card" href="${escapeHTML(repo.html_url)}" target="_blank" rel="noreferrer"><h4>${escapeHTML(repo.name)}</h4><p>${escapeHTML(repo.description || "No description added yet.")}</p><div class="repo-meta"><span class="repo-language">${escapeHTML(repo.language || "Repository")}</span><span>★ ${repo.stargazers_count}</span><span>⑂ ${repo.forks_count}</span></div></a>`).join("");
      })
      .catch(() => { repoStatus.textContent = "GITHUB UNAVAILABLE"; repoGrid.innerHTML = '<div class="repo-loading">Could not load repositories right now. Check the username, network connection or GitHub API rate limit.</div>'; });
    fetch(`https://api.github.com/users/${encodeURIComponent(githubUser)}`)
      .then(response => response.ok ? response.json() : Promise.reject())
      .then(user => { followerCount.textContent = user.followers ?? "—"; })
      .catch(() => { followerCount.textContent = "—"; });
  }

  // Contact form: opens a pre-addressed email draft. Configure contactEmail in config.js.
  document.getElementById("contactForm").addEventListener("submit", event => {
    event.preventDefault();
    const note = document.getElementById("formNote");
    if (!email) { note.textContent = "Please add your contact email in config.js before publishing this form."; note.style.color = "#f0bd7a"; return; }
    const formData = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Portfolio message from ${formData.get("name")}`);
    const body = encodeURIComponent(`Name: ${formData.get("name")}\nEmail: ${formData.get("email")}\n\n${formData.get("message")}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    note.textContent = "Your email app should open with the message prepared. Please send it from there.";
  });
})();
