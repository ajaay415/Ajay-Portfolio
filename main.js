(() => {
  const data = window.PORTFOLIO_DATA;
  const skillsRoot = document.getElementById('skills-grid');
  const projectsRoot = document.getElementById('project-grid');
  if (data && skillsRoot) {
    skillsRoot.innerHTML = data.skills.map(group => `
      <article class="skill-panel"><div class="skill-panel-top"><span>${group.number}</span><span class="skill-arrow">↗</span></div>
      <h3>${group.title}</h3><div class="skill-tags">${group.items.map(item => `<span>${item}</span>`).join('')}</div></article>`).join('');
  }
  if (data && projectsRoot) {
    projectsRoot.innerHTML = data.projects.map(project => `
      <article class="project-card accent-${project.accent}"><div class="project-art"><span class="project-art-number">${project.number}</span><span class="project-art-symbol">{<i>✳</i>}</span><span class="project-art-type">${project.type}</span></div>
      <div class="project-info"><div class="project-meta"><span>${project.type}</span><span class="status">${project.status}</span></div><h3>${project.title}</h3><p>${project.description}</p><div class="project-tags">${project.stack.map(tag => `<span>${tag}</span>`).join('')}</div><a class="project-link" href="${project.link}" target="_blank" rel="noreferrer">View GitHub profile <span>↗</span></a></div></article>`).join('');
  }
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');
  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open'); toggle?.setAttribute('aria-expanded', 'false');
  }));
  document.getElementById('year').textContent = new Date().getFullYear();
  const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveal.unobserve(entry.target); }
  }), { threshold: .12 });
  document.querySelectorAll('.section, .project-card, .skill-panel').forEach(el => { el.classList.add('reveal'); reveal.observe(el); });
})();