(() => {
  'use strict';
  const root = document.documentElement;
  root.classList.add('js');
  const themeToggle = document.getElementById('theme-toggle');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let savedTheme = null;
  try { savedTheme = localStorage.getItem('su-yikai-theme'); } catch (_) { /* Storage may be unavailable. */ }
  if (savedTheme !== 'light' && savedTheme !== 'dark') savedTheme = null;
  function applyTheme(theme) {
    root.dataset.theme = theme;
    const dark = theme === 'dark';
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.setAttribute('aria-label', dark ? '切换至浅色模式' : '切换至深色模式');
  }
  applyTheme(savedTheme || (systemTheme.matches ? 'dark' : 'light'));
  themeToggle.addEventListener('click', () => {
    savedTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(savedTheme);
    try { localStorage.setItem('su-yikai-theme', savedTheme); } catch (_) { /* Theme still works without storage. */ }
  });
  systemTheme.addEventListener('change', event => {
    if (!savedTheme) applyTheme(event.matches ? 'dark' : 'light');
  });

  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('site-nav');
  function setMenu(open) {
    nav.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? '关闭导航菜单' : '打开导航菜单');
  }
  menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('click', event => {
    if (!nav.contains(event.target) && !menuToggle.contains(event.target)) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuToggle.focus();
    }
  });
  window.matchMedia('(min-width: 821px)').addEventListener('change', event => {
    if (event.matches) setMenu(false);
  });

  const navLinks = [...nav.querySelectorAll('a[href^="#"]')];
  if ('IntersectionObserver' in window) {
    const sections = [document.getElementById('home'), ...navLinks.map(link => document.querySelector(link.getAttribute('href')))].filter(Boolean);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          const active = link.getAttribute('href') === '#' + entry.target.id;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
    sections.forEach(section => observer.observe(section));
  }

  const toast = document.getElementById('toast');
  let toastTimer;
  function showToast(message) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('visible');
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 4000);
  }
  document.getElementById('copy-email').addEventListener('click', async () => {
    const email = '1223694121@qq.com';
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(email);
      showToast('邮箱已复制：' + email);
    } catch (_) {
      // Keep a usable fallback without asking for a browser permission.
      const emailLink = document.querySelector('.email-row a');
      const selection = window.getSelection();
      if (selection) {
        const range = document.createRange();
        range.selectNodeContents(emailLink);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      showToast('邮箱已选中，请长按或按 Ctrl/Cmd+C 复制');
    }
  });
  document.getElementById('copyright-year').textContent = String(new Date().getFullYear());
})();
