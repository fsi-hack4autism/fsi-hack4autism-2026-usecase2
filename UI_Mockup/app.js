// =========================================================
// Lifelong Profile — IEP Companion · MVP mockup interactions
// =========================================================
// This is a static POC. All data is hard-coded in index.html.
// JS handles only: sidebar navigation, dimension tab switching,
// and intra-app "go to" links.

(function () {
  'use strict';

  // ---------- Sidebar view switching ----------
  const navItems = document.querySelectorAll('.nav-item');
  const views = document.querySelectorAll('.view');

  function showView(viewId) {
    views.forEach(v => v.classList.remove('active'));
    const target = document.getElementById('view-' + viewId);
    if (target) target.classList.add('active');

    navItems.forEach(n => n.classList.remove('active'));
    const activeNav = document.querySelector(`.nav-item[data-view="${viewId}"]`);
    if (activeNav) activeNav.classList.add('active');

    // Scroll to top of content on navigation
    const content = document.querySelector('.content');
    if (content) content.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const view = item.getAttribute('data-view');
      if (view) showView(view);
    });
  });

  // ---------- "Go to" links anywhere in the app ----------
  document.addEventListener('click', (e) => {
    const goto = e.target.closest('[data-goto]');
    if (!goto) return;
    e.preventDefault();
    const view = goto.getAttribute('data-goto');
    if (view) showView(view);
  });

  // ---------- Dimension tab switching (Multi-Year Comparison) ----------
  const dimTabs = document.querySelectorAll('.dim-tab');
  const dimContents = document.querySelectorAll('.dim-content');

  dimTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const dim = tab.getAttribute('data-dim');
      dimTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      dimContents.forEach(c => c.classList.remove('active'));
      const target = document.getElementById('dim-' + dim);
      if (target) target.classList.add('active');
    });
  });

  // ---------- Citation links — friendly stub ----------
  // In a real build these would open the source document at the cited page.
  document.querySelectorAll('a[href="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const cite = a.textContent.trim();
      // Soft visual confirmation only — keeps the mockup quiet but interactive.
      a.style.background = '#fffbcc';
      setTimeout(() => { a.style.background = ''; }, 600);
      console.info('[Citation clicked]', cite);
    });
  });

})();
