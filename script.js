/* ====================================================
   ZIYAAN TECHNOLOGIES – JavaScript (Animations + UX)
   ==================================================== */

// ─── FLOATING NAV ────────────────────────────────────
const floatingNav = document.getElementById('floatingNav');
const menuToggle  = document.getElementById('menuToggle');
const floatingMenu = document.getElementById('floatingMenu');
const navLinks = document.querySelectorAll('.floating-links .nav-link');
const sections = document.querySelectorAll('main section[id]');

function closeMenu() {
  floatingMenu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation menu');
}

function updateFloatingNav() {
  const visible = window.scrollY > 120;
  floatingNav.classList.toggle('floating-nav-visible', visible);
  floatingNav.toggleAttribute('inert', !visible);
  floatingNav.setAttribute('aria-hidden', String(!visible));
  if (!visible) closeMenu();
}

function updateActiveNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 140) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

window.addEventListener('scroll', () => {
  updateFloatingNav();
  updateActiveNav();
}, { passive: true });
updateFloatingNav();
updateActiveNav();

menuToggle.addEventListener('click', () => {
  const open = floatingMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
});

floatingMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

// ─── REVEAL ON SCROLL ────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ─── COUNT-UP ANIMATION ──────────────────────────────
const statNumbers = document.querySelectorAll('.stat-number');
let counted = false;

function runCountUp() {
  if (counted) return;
  const heroStats = document.querySelector('.hero-stats');
  if (!heroStats) return;
  const rect = heroStats.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    counted = true;
    statNumbers.forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      let current = 0;
      const step = Math.ceil(target / 40);
      const interval = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current;
        if (current >= target) clearInterval(interval);
      }, 40);
    });
  }
}
window.addEventListener('scroll', runCountUp, { passive: true });
runCountUp();

// ─── CONTACT FORM ─────────────────────────────────────
const form    = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const original = submitBtn.innerHTML;
  submitBtn.innerHTML = '<span>Sending…</span>';
  submitBtn.disabled = true;
  setTimeout(() => {
    form.reset();
    submitBtn.innerHTML = original;
    submitBtn.disabled  = false;
    success.style.display = 'block';
    setTimeout(() => { success.style.display = 'none'; }, 5000);
  }, 1400);
});

// ─── FOOTER YEAR ─────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();
