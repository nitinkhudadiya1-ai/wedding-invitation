/* ===========================
   ASHISH WEDS KINJU — script.js
   =========================== */

/* ── Loader ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    document.body.style.overflow = '';
    initHeroAnimations();
  }, 2800);
});

/* ── Custom Cursor ── */
const cursorDot  = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursorDot.style.left  = mx + 'px';
  cursorDot.style.top   = my + 'px';
});

(function animateCursor() {
  rx += (mx - rx) * .12;
  ry += (my - ry) * .12;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top  = ry + 'px';
  requestAnimationFrame(animateCursor);
})();

document.querySelectorAll('a, button, .gallery-item, .event-card, .couple-card')
  .forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

/* ── Scroll Progress ── */
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - innerHeight) * 100;
  progressBar.style.width = pct + '%';
}, { passive: true });

/* ── Navbar ── */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a, #mobile-nav a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('scroll-top').classList.toggle('visible', window.scrollY > 400);
  updateActiveNav();
}, { passive: true });

function updateActiveNav() {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}

/* ── Mobile Nav ── */
const toggle   = document.getElementById('nav-toggle');
const mobileNav = document.getElementById('mobile-nav');
const spans    = toggle.querySelectorAll('span');

toggle.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  document.body.classList.toggle('menu-open', open);
  spans[0].style.transform = open ? 'rotate(45deg) translate(4px,4px)' : '';
  spans[1].style.opacity   = open ? '0' : '1';
  spans[2].style.transform = open ? 'rotate(-45deg) translate(4px,-4px)' : '';
});

mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    document.body.classList.remove('menu-open');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
  });
});

/* ── Scroll To Top ── */
document.getElementById('scroll-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── Canvas Particles ── */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.r  = Math.random() * 1.5 + .3;
      this.vx = (Math.random() - .5) * .25;
      this.vy = -(Math.random() * .4 + .15);
      this.a  = Math.random() * .6 + .2;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.y < -5) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,168,76,${this.a})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 90; i++) particles.push(new Particle());

  (function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  })();
})();

/* ── Floating Petals ── */
(function initPetals() {
  const hero   = document.getElementById('hero');
  const colors = ['#E8B4B8','#F5C6CB','#FADADD','#F7E7CE','#EED9A4'];

  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    const size = Math.random() * 16 + 10;
    p.style.cssText = `
      left:${Math.random()*100}vw;
      top:-30px;
      width:${size}px;
      height:${size}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      animation-duration:${Math.random()*8+7}s;
      animation-delay:${Math.random()*10}s;
      opacity:${Math.random()*.5+.2};
    `;
    hero.appendChild(p);
  }
})();

/* ── Hero GSAP Animations ── */
function initHeroAnimations() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl
    .to('.hero-eyebrow',    { opacity: 1, y: 0, duration: .9, from: { y: 30 } })
    .to('.hero-name-groom', { opacity: 1, y: 0, duration: 1, from: { y: 60 } }, '-=.5')
    .to('.hero-heart',      { opacity: 1, duration: .6 }, '-=.3')
    .to('.hero-name-bride', { opacity: 1, y: 0, duration: 1, from: { y: 60 } }, '-=.7')
    .to('.hero-divider',    { opacity: 1, width: 200, duration: 1 }, '-=.4')
    .to('.hero-date',       { opacity: 1, y: 0, duration: .7, from: { y: 20 } }, '-=.5')
    .to('.hero-location',   { opacity: 1, y: 0, duration: .7, from: { y: 20 } }, '-=.5')
    .to('.hero-tagline',    { opacity: 1, y: 0, duration: .8, from: { y: 20 } }, '-=.4')
    .to('.hero-buttons',    { opacity: 1, y: 0, duration: .7, from: { y: 20 } }, '-=.4');
}

/* Parallax hero bg */
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (heroBg) heroBg.style.transform = `translateY(${y * .35}px)`;
}, { passive: true });

/* ── Open Invitation scroll ── */
document.getElementById('btn-open').addEventListener('click', () => {
  document.querySelector('#love-story').scrollIntoView({ behavior: 'smooth' });
});
document.getElementById('btn-events').addEventListener('click', () => {
  document.querySelector('#events').scrollIntoView({ behavior: 'smooth' });
});

/* ── Music ── */
const audio     = document.getElementById('bg-music');
const musicBtn  = document.getElementById('music-btn');
const musicIcon = musicBtn.querySelector('i');
let musicStarted = false;

function startMusic() {
  audio.volume = .35;
  audio.play().then(() => {
    musicIcon.className = 'fas fa-pause';
    musicStarted = true;
  }).catch(() => {});
}

musicBtn.addEventListener('click', () => {
  if (!musicStarted) { startMusic(); return; }
  if (audio.paused) {
    audio.play();
    musicIcon.className = 'fas fa-pause';
  } else {
    audio.pause();
    musicIcon.className = 'fas fa-play';
  }
});

// Autoplay on first interaction
['click','touchstart','keydown'].forEach(evt => {
  document.addEventListener(evt, () => {
    if (!musicStarted) startMusic();
  }, { once: true });
});

/* ── Floating Hearts on click ── */
document.addEventListener('click', e => {
  if (e.target.closest('#music-btn, #scroll-top, .nav-toggle, button[type="submit"]')) return;
  for (let i = 0; i < 3; i++) {
    const h = document.createElement('div');
    h.className = 'floating-heart';
    h.textContent = ['❤️','🌸','✨'][Math.floor(Math.random()*3)];
    h.style.left = (e.clientX - 10 + (Math.random()*30-15)) + 'px';
    h.style.top  = (e.clientY - 10) + 'px';
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 3000);
  }
});

/* ── Countdown ── */
(function initCountdown() {
  const target = new Date('2026-12-12T18:30:00');
  const els = {
    d: document.getElementById('cd-days'),
    h: document.getElementById('cd-hours'),
    m: document.getElementById('cd-mins'),
    s: document.getElementById('cd-secs'),
  };

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const now  = new Date();
    const diff = target - now;
    if (diff <= 0) {
      Object.values(els).forEach(el => el.textContent = '00');
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000)  / 60000);
    const s = Math.floor((diff % 60000)    / 1000);
    els.d.textContent = pad(d);
    els.h.textContent = pad(h);
    els.m.textContent = pad(m);
    els.s.textContent = pad(s);
  }
  tick();
  setInterval(tick, 1000);
})();

/* ── Gallery Lightbox ── */
(function initGallery() {
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lightbox-img');
  const items    = document.querySelectorAll('.gallery-item img');
  let current    = 0;

  function open(idx) {
    current = idx;
    lbImg.src = items[idx].src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  items.forEach((img, i) => {
    img.parentElement.addEventListener('click', () => open(i));
  });

  document.getElementById('lb-close').addEventListener('click', close);
  document.getElementById('lb-prev').addEventListener('click', () => open((current - 1 + items.length) % items.length));
  document.getElementById('lb-next').addEventListener('click', () => open((current + 1) % items.length));

  lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  open((current - 1 + items.length) % items.length);
    if (e.key === 'ArrowRight') open((current + 1) % items.length);
  });
})();

/* ── RSVP Form + Google Sheets ── */

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxdXatmHsSf8ctI6tbqblq-VDIKko8XC_Jn5hCBTNB5IJhKmShLAlifYawipFZc3TbkBw/exec";

const WEB_APP_URL="YOUR_WEBAPP_URL";

document.getElementById("rsvp-form").addEventListener("submit",async function(e){

e.preventDefault();

const btn=this.querySelector("button");

btn.disabled=true;

btn.innerHTML="Sending...";

const data={

name:document.getElementById("name").value,

mobile:document.getElementById("mobile").value,

guests:document.getElementById("guests").value,

events:document.getElementById("events").value,

message:document.getElementById("message").value

};

try{

await fetch(WEB_APP_URL,{

method:"POST",

mode:"no-cors",

headers:{

"Content-Type":"text/plain"

},

body:JSON.stringify(data)

});

btn.innerHTML="✓ RSVP Confirmed";

this.reset();

}
catch(e){

console.log(e);

btn.innerHTML="Send RSVP";

alert("Connection Error");

}

btn.disabled=false;

});

/* ── AOS Init ── */
AOS.init({
  duration: 800,
  easing: 'ease-out-cubic',
  once: true,
  offset: 80,
});

/* ── GSAP Timeline Scrub ── */
gsap.utils.toArray('.timeline-item').forEach((item, i) => {
  gsap.fromTo(item,
    { opacity: 0, x: i % 2 === 0 ? 60 : -60 },
    {
      opacity: 1, x: 0, duration: .9,
      scrollTrigger: {
        trigger: item,
        start: 'top 82%',
        toggleActions: 'play none none none',
      }
    }
  );
});

/* ── Smooth section transitions with GSAP ── */
gsap.utils.toArray('.section-eyebrow, .section-title').forEach(el => {
  gsap.fromTo(el,
    { opacity: 0, y: 24 },
    {
      opacity: 1, y: 0, duration: .8,
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    }
  );
});
