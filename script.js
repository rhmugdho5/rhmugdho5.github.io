(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const navPanel = document.querySelector('.nav-panel');

  if (menuButton && navPanel) {
    const closeMenu = () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      navPanel.classList.remove('is-open');
    };
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!open));
      menuButton.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
      navPanel.classList.toggle('is-open', !open);
    });
    navPanel.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', () => { if (window.innerWidth > 780) closeMenu(); });
  }

  const progress = document.getElementById('scrollProgress');
  let ticking = false;
  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    if (progress) progress.style.width = `${Math.min(100, Math.max(0, percent))}%`;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { window.requestAnimationFrame(updateProgress); ticking = true; }
  }, { passive: true });
  updateProgress();

  const revealItems = document.querySelectorAll('.reveal');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  // A restrained typewriter rotation highlights the learning-focused positioning.
  const roleText = document.getElementById('roleText');
  const roles = ['Building my cybersecurity foundation', 'Exploring secure software development', 'Learning Linux and computer networks'];
  if (roleText && !reduceMotion) {
    let roleIndex = 0;
    let charIndex = roles[0].length;
    let deleting = false;
    const type = () => {
      const phrase = roles[roleIndex];
      charIndex += deleting ? -1 : 1;
      roleText.textContent = phrase.slice(0, charIndex);
      let delay = deleting ? 28 : 48;
      if (!deleting && charIndex === phrase.length) { deleting = true; delay = 1900; }
      else if (deleting && charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 340; }
      window.setTimeout(type, delay);
    };
    window.setTimeout(type, 1900);
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
