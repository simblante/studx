// STUDX main.js (Phase 1): mobile menu + "coming soon" toast for unbuilt pages.

const nav = document.querySelector('.nav');
const menuBtn = document.getElementById('menuBtn');
const toast = document.getElementById('toast');
let toastTimer;

// Guard: only wire the menu toggle if both nav and menuBtn exist.
// Some pages may import this file without a header.
if (nav && menuBtn) {
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
}

// Close mobile menu after tapping a link.
// Guard: only runs if the nav exists.
if (nav) {
  document.querySelectorAll('#navLinks a').forEach(a =>
    a.addEventListener('click', () => nav.classList.remove('open')));
}

function showToast(message) {
  if (!toast) return;   // Guard: no toast element on this page.
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

// Links/buttons marked .soon point to features built in later phases.
document.querySelectorAll('.soon').forEach(el =>
  el.addEventListener('click', e => {
    e.preventDefault();
    showToast('COMING SOON: built in Phase ' + el.dataset.phase);
  }));