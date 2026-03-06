/* ====================================================
   ZIYAAN TECHNOLOGIES – JavaScript (Animations + UX)
   ==================================================== */

// ─── PARTICLES ───────────────────────────────────────
const canvas = document.getElementById('particles-canvas');
const ctx    = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createParticle() {
  return {
    x:    Math.random() * canvas.width,
    y:    Math.random() * canvas.height,
    size: Math.random() * 1.5 + 0.4,
    vx:   (Math.random() - 0.5) * 0.3,
    vy:   (Math.random() - 0.5) * 0.3,
    alpha: Math.random() * 0.5 + 0.15,
    color: ['#3b82f6','#06b6d4','#8b5cf6'][Math.floor(Math.random() * 3)]
  };
}

for (let i = 0; i < 100; i++) particles.push(createParticle());

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.alpha;
    ctx.fill();

    // Draw connections
    for (let j = i + 1; j < particles.length; j++) {
      const q    = particles[j];
      const dist = Math.hypot(p.x - q.x, p.y - q.y);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = 0.06 * (1 - dist / 120);
        ctx.lineWidth   = 0.6;
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ─── NAVBAR SCROLL ───────────────────────────────────
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
}, { passive: true });

function updateActiveNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// ─── HAMBURGER MENU ──────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  mobileLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  mobileLinks.classList.contains('open')
    ? spans[0].style.cssText = 'transform:rotate(45deg) translate(5px,5px)'
    : spans[0].style.cssText = '';
  mobileLinks.classList.contains('open')
    ? spans[1].style.cssText = 'opacity:0'
    : spans[1].style.cssText = '';
  mobileLinks.classList.contains('open')
    ? spans[2].style.cssText = 'transform:rotate(-45deg) translate(5px,-5px)'
    : spans[2].style.cssText = '';
});

mobileLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => s.style.cssText = '');
  });
});

// ─── REVEAL ON SCROLL ────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ─── COUNT-UP ANIMATION ──────────────────────────────
const statNumbers = document.querySelectorAll('.stat-number');
let counted = false;

function runCountUp() {
  if (counted) return;
  const heroSection = document.querySelector('.hero-stats');
  if (!heroSection) return;
  const rect = heroSection.getBoundingClientRect();
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

// ─── SMOOTH CURSOR GLOW ───────────────────────────────
let mouseX = 0, mouseY = 0;
const glow = document.createElement('div');
glow.style.cssText = `
  position: fixed; pointer-events: none; z-index: 9999;
  width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: opacity 0.3s;
  opacity: 0;
`;
document.body.appendChild(glow);

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  glow.style.left = mouseX + 'px';
  glow.style.top  = mouseY + 'px';
  glow.style.opacity = '1';
});
document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });

// ─── SMOOTH SCROLL for all anchor links ──────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
