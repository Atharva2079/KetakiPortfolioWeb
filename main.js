/* ============================================================
   KETAKI KHADILKAR — PORTFOLIO WEBSITE v2.0
   Epic Animations: GSAP, Lenis, Morphing Shapes, Particles
   ============================================================ */

// ===== HIGH-PERFORMANCE LENIS SMOOTH SCROLL =====
const lenis = new Lenis({
  duration: 0.95,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1.0,
  touchMultiplier: 1.2,
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(500, 33);

// ===== REGISTER PLUGINS =====
gsap.registerPlugin(ScrollTrigger);

// ===== MORPHING SHAPE DATA =====
const MORPH_SHAPES = [
  // Asterisk star
  "M116 192C107 191 100 184 100 175V161C100 156 94 153 91 157L71 177C64 184 53 184 46 176C40 170 41 159 48 153L57 143C61 140 59 134 54 134H25C15 134 8 126 8 116C9 107 17 100 26 100H39C45 100 47 94 43 91L23 70C16 64 17 53 24 46C31 40 41 41 48 47L57 57C61 61 67 58 67 53V25C67 15 75 8 84 8C93 9 100 16 100 26V39C100 45 106 47 110 43L130 23C137 16 148 16 154 24C160 31 159 41 153 47L143 57C140 61 142 66 147 66H175C184 66 192 74 192 83C193 92 185 100 176 100H161C156 100 153 106 157 110L177 130C184 137 184 148 176 154C170 160 159 159 153 153L143 143C140 140 134 142 134 147V175C134 185 126 193 116 192Z",
  // 6-pointed star
  "M174 125C180 128 182 132 182 138C182 143 181 146 178 150C175 153 171 154 166 154C164 154 162 154 160 152L116 128V176C116 181 114 184 111 187C108 190 104 192 100 192C96 192 92 190 89 187C86 184 84 181 84 176V127L41 152C38 153 36 154 33 154C29 154 25 153 22 150C19 146 18 143 18 138C18 136 18 133 20 131C21 128 23 126 26 125L69 100L27 76C21 72 18 68 18 62C18 57 19 54 22 51C25 47 29 46 34 46C36 46 38 47 42 48L84 72V24C84 20 86 16 89 13C92 10 96 8 100 8C104 8 108 10 111 13C114 16 116 20 116 24V73L163 47C163 46 164 46 166 46C171 46 175 47 178 51C181 54 182 57 182 62C182 67 180 72 175 75L131 100L174 125Z",
  // Blob
  "M192 122C192 125 191 128 190 132C180 147 172 165 153 165C147 165 140 164 132 160C129 156 126 155 123 156C120 156 116 156 113 155C97 166 93 191 71 191C67 191 61 190 55 188C55 164 32 154 8 145C21 127 24 108 55 103C55 88 42 70 42 56C42 51 44 46 49 42L57 40C74 40 91 56 103 56C110 56 116 51 120 37C124 25 137 9 152 9C159 9 166 13 171 23C163 40 160 59 160 78V90C172 103 192 107 192 122Z",
  // Splat
  "M192 41C192 44 181 60 167 75C142 103 142 103 157 117C178 136 195 165 189 171C187 173 174 171 163 163C134 147 130 148 125 173C119 204 105 196 96 159L89 130C73 138 51 158 29 152C2 144 1 122 28 106C55 90 55 82 26 58C11 45 6 35 9 27C16 8 40 12 66 36C96 62 99 63 99 41C99 32 103 22 108 16C121 3 127 6 135 25C141 41 145 42 167 39C181 37 192 37 192 41Z",
  // Flower  
  "M88 192C83 192 77 190 71 185C64 177 60 169 60 160C60 157 61 153 62 149L63 145C63 140 60 137 54 135C47 133 40 130 33 126C26 123 21 117 17 110C16 106 15 102 15 99C15 89 20 84 31 83L38 82C41 82 43 82 46 83C49 83 51 84 54 84C57 85 60 86 63 86C65 86 67 85 68 84C70 82 71 81 71 79L70 77C67 66 61 57 53 49C47 43 44 36 42 27C42 21 44 16 47 13C50 10 54 8 58 8L62 9C72 10 80 15 87 23C92 28 98 35 106 45L110 50L118 44C132 31 142 25 149 25C155 25 160 27 165 32C173 39 177 46 177 54C177 61 171 72 160 85L150 98C145 103 142 107 142 110C142 113 143 115 144 116L167 132C176 138 181 146 185 155L185 160C185 169 180 174 170 174C164 174 158 172 152 170C141 165 133 161 131 160C128 158 126 157 124 157C121 157 118 159 115 163L112 170C105 185 97 192 88 192Z",
];

// ===== PARTICLE SYSTEM =====
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let particles = [];
  const PARTICLE_COUNT = 16;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.3 + 0.05;
      this.pulseSpeed = Math.random() * 0.02 + 0.005;
      this.pulsePhase = Math.random() * Math.PI * 2;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.pulsePhase += this.pulseSpeed;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }
    draw() {
      const pulse = Math.sin(this.pulsePhase) * 0.5 + 0.5;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232, 168, 56, ${this.opacity * pulse})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  
  animate();
}

// ===== HARDWARE ACCELERATED CURSOR GLOW =====
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
  const setX = gsap.quickSetter(cursorGlow, 'x', 'px');
  const setY = gsap.quickSetter(cursorGlow, 'y', 'px');
  let targetX = -500, targetY = -500, currentX = -500, currentY = -500;

  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  }, { passive: true });

  gsap.ticker.add(() => {
    currentX += (targetX - currentX) * 0.15;
    currentY += (targetY - currentY) * 0.15;
    setX(currentX);
    setY(currentY);
  });
}

// ============================================================
// EPIC PRELOADER — Studio Carbon Inspired
// ============================================================
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const morphPath = document.getElementById('morphPath');
  const percentEl = document.getElementById('loaderPercent');
  const textCycler = document.getElementById('loaderTextCycler');
  const curtainLeft = document.getElementById('curtainLeft');
  const curtainRight = document.getElementById('curtainRight');
  const loaderAsterisk = document.getElementById('loaderAsterisk');

  let currentMorph = 0;
  let progress = 0;
  const words = textCycler.querySelectorAll('.loader-word');
  let currentWord = 0;

  // Morph the asterisk shape
  function morphShape() {
    currentMorph = (currentMorph + 1) % MORPH_SHAPES.length;
    gsap.to(morphPath, {
      attr: { d: MORPH_SHAPES[currentMorph] },
      duration: 1.2,
      ease: 'power2.inOut',
    });
  }

  // Cycle words
  function cycleWord() {
    const prev = words[currentWord];
    prev.classList.remove('active');
    prev.classList.add('exit');
    
    currentWord = (currentWord + 1) % words.length;
    const next = words[currentWord];
    
    setTimeout(() => {
      prev.classList.remove('exit');
      next.classList.add('active');
    }, 300);
  }

  // Morph interval
  const morphInterval = setInterval(morphShape, 1500);
  const wordInterval = setInterval(cycleWord, 800);

  // Progress counter animation
  const counterTween = gsap.to({ val: 0 }, {
    val: 100,
    duration: 3.5,
    ease: 'power2.inOut',
    onUpdate: function() {
      progress = Math.round(this.targets()[0].val);
      percentEl.textContent = progress;
    },
    onComplete: () => {
      clearInterval(morphInterval);
      clearInterval(wordInterval);
      revealSite();
    }
  });

  function revealSite() {
    const revealTl = gsap.timeline({
      onComplete: () => {
        preloader.style.display = 'none';
        initAllAnimations();
      }
    });

    // Scale up the asterisk dramatically
    revealTl.to(loaderAsterisk, {
      scale: 15,
      opacity: 0,
      rotation: 180,
      duration: 0.8,
      ease: 'power3.in',
    });

    // Fade text
    revealTl.to([textCycler, '.loader-counter', '.loader-tagline'], {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
    }, '<');

    // Split curtains
    revealTl.to(curtainLeft, {
      xPercent: -100,
      duration: 0.8,
      ease: 'power4.inOut',
    }, '-=0.3');

    revealTl.to(curtainRight, {
      xPercent: 100,
      duration: 0.8,
      ease: 'power4.inOut',
    }, '<');

    // Fade loader bg
    revealTl.to('.loader-bg', {
      opacity: 0,
      duration: 0.4,
    }, '-=0.4');
  }
}

// ===== SPLIT TEXT HELPER =====
function splitTextToChars(element) {
  const text = element.textContent;
  element.innerHTML = '';
  text.split('').forEach((char) => {
    const span = document.createElement('span');
    span.classList.add('char');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    element.appendChild(span);
  });
  return element.querySelectorAll('.char');
}

// ===== HERO ANIMATIONS =====
function initHeroAnimations() {
  const heroTl = gsap.timeline({ delay: 0.2 });

  // Split hero name lines
  const nameLines = document.querySelectorAll('.hero-name-line');
  const allChars = [];
  nameLines.forEach((line) => {
    const chars = splitTextToChars(line);
    allChars.push(...chars);
  });

  // Animate badge
  heroTl.to('.hero-asterisk-badge', {
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
  });

  // Animate characters with stagger and add continuous float/hover
  heroTl.to(allChars, {
    opacity: 1,
    y: 0,
    rotateX: 0,
    duration: 0.7,
    stagger: 0.025,
    ease: 'back.out(1.7)',
    onComplete: () => {
      // Add continuous floating and magnetic hover to each character
      allChars.forEach((char, i) => {
        // Continuous float
        gsap.to(char, {
          y: -8,
          rotationZ: i % 2 === 0 ? 3 : -3,
          duration: 1.5 + Math.random() * 0.5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: Math.random() * 0.5
        });

        // Hover effect
        char.addEventListener("mouseenter", () => {
          gsap.killTweensOf(char); // Stop float temporarily
          gsap.to(char, {
            scale: 1.3,
            color: "var(--accent-amber)",
            rotationZ: (Math.random() - 0.5) * 40,
            y: -15,
            duration: 0.3,
            ease: "back.out(2)"
          });
        });

        char.addEventListener("mouseleave", () => {
          gsap.to(char, {
            scale: 1,
            color: "var(--text-primary)",
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              // Restart float
              gsap.to(char, {
                y: -8,
                rotationZ: i % 2 === 0 ? 3 : -3,
                duration: 1.5 + Math.random() * 0.5,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut"
              });
            }
          });
        });
      });
    }
  }, '-=0.4');

  // Subtitle
  heroTl.to('.hero-subtitle', {
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
  }, '-=0.3');

  // CTA button
  heroTl.to('.hero-cta-row', {
    opacity: 1,
    duration: 0.6,
    ease: 'power2.out',
  }, '-=0.3');

  // Scroll indicator
  heroTl.to('#scrollIndicator', {
    opacity: 1,
    duration: 0.6,
    ease: 'power2.out',
  }, '-=0.2');

  // Parallax gradients
  gsap.to('.hero-bg-gradient.g1', {
    y: -200,
    scrollTrigger: {
      trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1,
    },
  });

  gsap.to('.hero-bg-gradient.g2', {
    y: -150, x: 100,
    scrollTrigger: {
      trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1,
    },
  });

  gsap.to('.hero-bg-gradient.g3', {
    y: -100, x: -80,
    scrollTrigger: {
      trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1,
    },
  });

  // Fade out hero on scroll
  gsap.to('.hero-content', {
    y: -100, opacity: 0,
    scrollTrigger: {
      trigger: '#hero', start: '60% top', end: 'bottom top', scrub: 1,
    },
  });

  gsap.to('#scrollIndicator', {
    opacity: 0,
    scrollTrigger: {
      trigger: '#hero', start: '20% top', end: '40% top', scrub: 1,
    },
  });
}

// ===== NAVBAR =====
function initNavbar() {
  ScrollTrigger.create({
    start: 'top -80',
    end: 99999,
    toggleClass: { className: 'scrolled', targets: '#navbar' },
  });

  // Back to top
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      lenis.scrollTo('#hero', { duration: 2 });
    });
  }

  // Smooth scroll for nav links
  document.querySelectorAll('[data-nav]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href');
      lenis.scrollTo(target, { duration: 1.5 });
    });
  });

  // CTA button scroll
  const heroCtaBtn = document.getElementById('heroCtaBtn');
  if (heroCtaBtn) {
    heroCtaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      lenis.scrollTo('#slique', { duration: 1.5 });
    });
  }

  // Mobile hamburger
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      
      if (mobileMenu.classList.contains('open')) {
        lenis.stop();
      } else {
        lenis.start();
      }
    });

    // Close menu on link click
    document.querySelectorAll('.mobile-menu-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        lenis.start();
        const target = link.getAttribute('href');
        lenis.scrollTo(target, { duration: 1.5 });
      });
    });
  }
}

// ===== ABOUT ANIMATIONS =====
function initAboutAnimations() {
  // Image parallax
  gsap.from('.about-image-wrapper', {
    y: 80, opacity: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#about', start: 'top 70%', end: 'top 30%', scrub: 1,
    },
  });

  // Text content reveal
  gsap.from('.about-heading, .about-description, .outside-studio-heading', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.about-text-content', start: 'top 75%',
      toggleActions: 'play none none reverse',
    },
  });

  // Workflow Diagram Animation
  const wfTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.about-workflow',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    }
  });

  // Top Row: Observe -> Question -> Build
  wfTl.to('.wf-observe', { opacity: 1, y: 0, duration: 0.4 })
      .to('.wf-arrow-right', { opacity: 1, duration: 0.2, stagger: 0.2 }, '-=0.2')
      .to('.wf-question', { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
      .to('.wf-build', { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
      // Connectors
      .to('.wf-conn-right', { opacity: 1, duration: 0.3 })
      // Bottom Row: Test -> Improve -> Repeat (right to left)
      .to('.wf-test', { opacity: 1, y: 0, duration: 0.4 })
      .to('.wf-arrow-left', { opacity: 1, duration: 0.2, stagger: 0.2 }, '-=0.2')
      .to('.wf-improve', { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
      .to('.wf-repeat', { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
      .to('.wf-conn-left', { opacity: 1, duration: 0.3 });

  // Details Table
  gsap.from('.table-row', {
    y: 20, opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.about-details-table', start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  });

  // Hobbies Grid
  gsap.to('.hobby-item', {
    opacity: 1, y: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.hobbies-grid', start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  });
}

// ===== PROJECT HEADER ANIMATIONS =====
function initProjectHeaders() {
  document.querySelectorAll('.project-reveal-header').forEach(header => {
    gsap.to(header, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: header,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  });
}

// ===== 01. SLIQUE (TOASTER) ANIMATIONS =====
function initSliqueAnimations() {
  // Heat background glow
  gsap.to('.slique-heat-bg', {
    opacity: 1,
    scrollTrigger: {
      trigger: '.slique-hero-wrapper',
      start: 'top 60%',
      end: 'bottom top',
      scrub: 1,
    },
  });

  // Title
  gsap.to('#slique .project-mega-title', {
    opacity: 1,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.slique-hero-wrapper',
      start: 'top 55%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.to('#slique .project-mega-sub', {
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.slique-hero-wrapper',
      start: 'top 50%',
      toggleActions: 'play none none reverse',
    },
  });

  // Toaster scene — pinned scroll animation (cards pop up 1 by 1 across 5 scrolls)
  const toasterTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.toaster-scene',
      start: 'top top',
      end: '+=300%',
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  // Toaster base reveal
  toasterTl.to('.toaster-base', {
    opacity: 1,
    duration: 0.5,
    ease: 'power2.out',
  });

  // Slot openings
  toasterTl.to('.toaster-slot-opening', {
    opacity: 1,
    duration: 0.3,
    stagger: 0.08,
    ease: 'power2.out',
  }, '-=0.2');

  // Toast cards POP UP one by one with spring physics
  const toastCards = document.querySelectorAll('.toast-card');
  const slotGlows = document.querySelectorAll('.slot-glow');
  const sliqueLever = document.getElementById('sliqueLever');

  toastCards.forEach((card, index) => {
    const offset = index === 0 ? '+=0.1' : '+=0.05';

    // Glow first
    toasterTl.to(slotGlows[index], {
      opacity: 0.85,
      duration: 0.2,
      ease: 'power2.in',
    }, offset);

    // Card pops with spring
    toasterTl.to(card, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'back.out(2.5)',
    }, '-=0.1');

    // Glow settles
    toasterTl.to(slotGlows[index], {
      opacity: 0.4,
      duration: 0.3,
      ease: 'power2.out',
    }, '-=0.3');
  });

  // Hold briefly so user can inspect all 5 cards
  toasterTl.to({}, { duration: 0.5 });

  // Interactive Click on Toaster Lever: Toast again!
  if (sliqueLever) {
    sliqueLever.addEventListener('click', () => {
      const popTl = gsap.timeline();
      popTl.to(sliqueLever, { y: 24, duration: 0.2, ease: 'power2.in' })
           .to(slotGlows, { opacity: 1, duration: 0.2, stagger: 0.03 }, '<')
           .to(toastCards, { y: 65, duration: 0.2, stagger: 0.03, ease: 'power2.in' }, '<')
           .to(sliqueLever, { y: 0, duration: 0.4, ease: 'elastic.out(1, 0.4)', delay: 0.2 })
           .to(toastCards, { y: 0, duration: 0.55, stagger: 0.06, ease: 'back.out(2.4)' }, '<')
           .to(slotGlows, { opacity: 0.4, duration: 0.35 }, '-=0.25');
    });
  }

  // Hover effect on individual toast cards
  toastCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -16, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
      if (slotGlows[index]) {
        gsap.to(slotGlows[index], { opacity: 0.85, duration: 0.25 });
      }
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, duration: 0.35, ease: 'back.out(1.8)', overwrite: 'auto' });
      if (slotGlows[index]) {
        gsap.to(slotGlows[index], { opacity: 0.4, duration: 0.3 });
      }
    });
  });
}

// ===== 02. SYNCFORCE (EV RESCUE TOOL) ANIMATIONS =====
function initSyncForceAnimations() {
  gsap.from('#syncforce .project-eyebrow, #syncforce .project-mega-title, #syncforce .project-mega-sub, #syncforce .project-meta-pills', {
    y: 20,
    opacity: 0.6,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.syncforce-hero',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // Pressure Gauge Counter on Scroll
  const gaugePath = document.getElementById('gaugePath');
  const gaugeCounter = document.getElementById('gaugeCounter');

  if (gaugePath && gaugeCounter) {
    ScrollTrigger.create({
      trigger: '.pressure-gauge-card',
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to({ val: 0, offset: 251 }, {
          val: 300,
          offset: 0,
          duration: 2,
          ease: 'power2.out',
          onUpdate: function() {
            const currentVal = Math.round(this.targets()[0].val);
            gaugeCounter.textContent = currentVal;
            gaugePath.style.strokeDashoffset = this.targets()[0].offset;
          }
        });
      }
    });
  }

  // Interactive Mode Switcher
  const btnModeAbrasive = document.getElementById('btnModeAbrasive');
  const btnModeFoam = document.getElementById('btnModeFoam');
  const modeTitle = document.getElementById('modeTitle');
  const modeDesc = document.getElementById('modeDesc');

  if (btnModeAbrasive && btnModeFoam && modeTitle && modeDesc) {
    btnModeAbrasive.addEventListener('click', () => {
      btnModeAbrasive.classList.add('active');
      btnModeFoam.classList.remove('active');
      gsap.to('#modeDisplayBox', {
        opacity: 0.2, duration: 0.15, onComplete: () => {
          modeTitle.textContent = 'Water + Tungsten Abrasive Mixture';
          modeDesc.textContent = 'Ultra-high pressure abrasive slurry punctures ultra-high-strength steel car bodywork and battery casings within seconds without generating thermal sparks.';
          gsap.to('#modeDisplayBox', { opacity: 1, duration: 0.25 });
        }
      });
    });

    btnModeFoam.addEventListener('click', () => {
      btnModeFoam.classList.add('active');
      btnModeAbrasive.classList.remove('active');
      gsap.to('#modeDisplayBox', {
        opacity: 0.2, duration: 0.15, onComplete: () => {
          modeTitle.textContent = 'Water + Class B Foam Suppression';
          modeDesc.textContent = 'High-expansion foam mixture delivered via specialized brass nozzle to smother battery cell thermal propagation and blanket vapor clouds.';
          gsap.to('#modeDisplayBox', { opacity: 1, duration: 0.25 });
        }
      });
    });
  }

  // Main Hero Product Showcase entrance
  gsap.from('.syncforce-hero-product-card', {
    y: 25,
    opacity: 0.8,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.syncforce-showcase-container',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // Protocol cards stagger — subtle y only, NEVER INVISIBLE
  gsap.from('.protocol-card', {
    y: 20,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.workflow-protocol-section',
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  });
}

// ===== 03. AVOSPIN (FIDGET TOY) ANIMATIONS =====
function initAvoSpinAnimations() {
  gsap.from('#avospin .project-eyebrow, #avospin .project-mega-title, #avospin .project-mega-sub, #avospin .project-meta-pills', {
    y: 20,
    opacity: 0.6,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.avospin-hero',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // Spinner rotation on scroll
  const spinner = document.getElementById('avospinSpinner');
  if (spinner) {
    gsap.to(spinner, {
      rotation: 720,
      ease: 'none',
      scrollTrigger: {
        trigger: '#avospin',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    });

    spinner.addEventListener('mouseenter', () => {
      gsap.to(spinner, { rotation: '+=180', duration: 0.8, ease: 'power2.out' });
    });
  }
}

// ===== 04. ACTICOMPRESS (ANATOMECH) ANIMATIONS =====
function initActicompressAnimations() {
  gsap.from('#acticompress .project-eyebrow, #acticompress .project-mega-title, #acticompress .project-mega-sub, #acticompress .project-meta-pills', {
    y: 20,
    opacity: 0.6,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.acticompress-hero',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // Dual Mode CMF Switcher
  const btnCmfHealth = document.getElementById('btnCmfHealth');
  const btnCmfSports = document.getElementById('btnCmfSports');
  const cmfTitle = document.getElementById('cmfTitle');
  const cmfDescription = document.getElementById('cmfDescription');

  if (btnCmfHealth && btnCmfSports && cmfTitle && cmfDescription) {
    btnCmfHealth.addEventListener('click', () => {
      btnCmfHealth.classList.add('active');
      btnCmfSports.classList.remove('active');
      gsap.to('.cmf-card-info', {
        opacity: 0.2, duration: 0.15, onComplete: () => {
          cmfTitle.textContent = 'Clinical Health Mode';
          cmfDescription.textContent = 'Soft, anti-microbial hypoallergenic textiles with neutral soothing medical tones. Engineered for elderly patients with venous edema and lymphedema, featuring magnetic alignment latches for painless self-donning.';
          gsap.to('.cmf-card-info', { opacity: 1, duration: 0.25 });
        }
      });
    });

    btnCmfSports.addEventListener('click', () => {
      btnCmfSports.classList.add('active');
      btnCmfHealth.classList.remove('active');
      gsap.to('.cmf-card-info', {
        opacity: 0.2, duration: 0.15, onComplete: () => {
          cmfTitle.textContent = 'Athletic Performance Mode';
          cmfDescription.textContent = 'High-tensile aerodynamic moisture-wicking weave with graphite and vibrant cobalt accents. Built for dynamic muscle recovery, reducing lactate buildup during high-impact endurance training.';
          gsap.to('.cmf-card-info', { opacity: 1, duration: 0.25 });
        }
      });
    });
  }
}

// ===== 05. OUTSIDE THE STUDIO ANIMATIONS =====
function initOutsideStudioAnimations() {
  gsap.from('#outside-studio .project-eyebrow, #outside-studio .project-mega-title, #outside-studio .project-mega-sub, #outside-studio .project-meta-pills', {
    y: 20,
    opacity: 0.6,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.outside-hero',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // F1 speed trail scrub
  gsap.to('.f1-speed-trail', {
    x: '30%',
    opacity: 0.7,
    ease: 'none',
    scrollTrigger: {
      trigger: '.outside-hero',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
  });

  // 3D Tilt Effect on Passion Cards
  document.querySelectorAll('.passion-card[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(card, {
        rotationY: x * 0.04,
        rotationX: -y * 0.04,
        transformPerspective: 1000,
        duration: 0.25,
        ease: 'power2.out',
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.4,
        ease: 'power2.out',
      });
    });
  });
}

// ===== 06. OTHER EXPLORATIONS ANIMATIONS =====
function initExplorationsAnimations() {
  gsap.from('#explorations .project-eyebrow, #explorations .project-mega-title, #explorations .project-mega-sub, #explorations .project-meta-pills', {
    y: 20,
    opacity: 0.6,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.explorations-hero',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });
}

// ===== FULLSCREEN SLIDE INSPECTOR MODAL =====
const SLIDE_METADATA = [
  { page: 1, title: 'Cover · Ketaki Khadilkar Industrial Design' },
  { page: 2, title: 'About Me · Design Workflow, Tools & Background' },
  { page: 3, title: 'Index of Selected Works (01 - 06)' },
  { page: 4, title: '01 SLIQUE · Multi-Slot Toaster for Morning Routines' },
  { page: 5, title: '01 SLIQUE · User Research, POV & Pain Points' },
  { page: 6, title: '01 SLIQUE · Sketching, Heating & Mechanisms' },
  { page: 7, title: '01 SLIQUE · Stainless Steel Fabrication & Assembly Drawings' },
  { page: 8, title: '01 SLIQUE · Prototyping, 5-Slot Architecture & Details' },
  { page: 9, title: '01 SLIQUE · KeyShot Renders & Final Form' },
  { page: 10, title: '02 SYNCFORCE · Modular Rescue Tool for EV Fires' },
  { page: 11, title: '02 SYNCFORCE · Field Study: 6 Fire Stations & Benchmark' },
  { page: 12, title: '02 SYNCFORCE · Connect, Lock, Operate: Storz Coupling' },
  { page: 13, title: '02 SYNCFORCE · Final 1:1 Prototype, Materials & 3D Nozzles' },
  { page: 14, title: '03 AVOSPIN · Sensory Fidget Toy Design & Ergonomics' },
  { page: 15, title: '03 AVOSPIN · Mechanism, Planetary Gear CAD & Exploded View' },
  { page: 16, title: '03 AVOSPIN · 5-Day Sprint: 6 Gear Iterations & 3 Body Builds' },
  { page: 17, title: '04 ACTICOMPRESS (ANATOMECH) · Healthcare Compression Wearables' },
  { page: 18, title: '04 ACTICOMPRESS · Clinical Discovery, 10 Interviews & 4 Cycles' },
  { page: 19, title: '04 ACTICOMPRESS · Testing, Dual CMF Modes & Mobile/Web UI' },
  { page: 20, title: '05 OUTSIDE THE STUDIO · 9 Creative & Athletic Pursuits' },
  { page: 21, title: '06 OTHER EXPLORATIONS · Modulo, EchoBloom, Jaipur Pottery & Healthcare' },
  { page: 22, title: "Contact & Collaborations · Let's Build Something" },
];

function initSlideModal() {
  const modal = document.getElementById('slideModal');
  if (!modal) return;

  const modalBackdrop = document.getElementById('modalBackdrop');
  const btnClose = document.getElementById('btnModalClose');
  const btnPrev = document.getElementById('btnModalPrev');
  const btnNext = document.getElementById('btnModalNext');
  const btnZoom = document.getElementById('btnZoomToggle');
  const mainImage = document.getElementById('modalMainImage');
  const imageWrapper = document.getElementById('modalImageWrapper');
  const counterEl = document.getElementById('modalSlideCounter');
  const titleEl = document.getElementById('modalSlideTitle');
  const thumbsContainer = document.getElementById('modalThumbnails');

  let currentSlideIndex = 0;
  let isZoomed = false;

  // Generate Thumbnails
  thumbsContainer.innerHTML = '';
  SLIDE_METADATA.forEach((meta, idx) => {
    const thumb = document.createElement('div');
    thumb.className = `modal-thumb ${idx === 0 ? 'active' : ''}`;
    thumb.innerHTML = `<img src="assets/portfolio_pages/page_${String(meta.page).padStart(2, '0')}.jpg" alt="Thumbnail ${meta.page}" loading="lazy" />`;
    thumb.addEventListener('click', () => setSlide(idx));
    thumbsContainer.appendChild(thumb);
  });

  function setSlide(index) {
    if (index < 0) index = SLIDE_METADATA.length - 1;
    if (index >= SLIDE_METADATA.length) index = 0;
    currentSlideIndex = index;

    const meta = SLIDE_METADATA[currentSlideIndex];
    const imagePath = `assets/portfolio_pages/page_${String(meta.page).padStart(2, '0')}.jpg`;

    isZoomed = false;
    imageWrapper.classList.remove('zoomed');

    gsap.to(mainImage, {
      opacity: 0.3,
      duration: 0.12,
      onComplete: () => {
        mainImage.src = imagePath;
        counterEl.textContent = `Slide ${String(meta.page).padStart(2, '0')} / 22`;
        titleEl.textContent = meta.title;
        gsap.to(mainImage, { opacity: 1, duration: 0.2 });
      }
    });

    const thumbs = thumbsContainer.querySelectorAll('.modal-thumb');
    thumbs.forEach((t, i) => {
      t.classList.toggle('active', i === currentSlideIndex);
      if (i === currentSlideIndex) {
        t.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    });
  }

  function openModal(pageNumber) {
    const targetIdx = SLIDE_METADATA.findIndex(m => m.page === pageNumber);
    setSlide(targetIdx !== -1 ? targetIdx : 0);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    isZoomed = false;
    imageWrapper.classList.remove('zoomed');
  }

  btnClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);
  btnPrev.addEventListener('click', () => setSlide(currentSlideIndex - 1));
  btnNext.addEventListener('click', () => setSlide(currentSlideIndex + 1));

  btnZoom.addEventListener('click', () => {
    isZoomed = !isZoomed;
    imageWrapper.classList.toggle('zoomed', isZoomed);
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') setSlide(currentSlideIndex - 1);
    if (e.key === 'ArrowRight') setSlide(currentSlideIndex + 1);
  });

  document.querySelectorAll('.slide-inspect-btn, [data-slide]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pageNum = parseInt(btn.getAttribute('data-slide'), 10) || 1;
      openModal(pageNum);
    });
  });
}

// ===== MARQUEE ANIMATION =====
function initMarquee() {
  gsap.to('.marquee-track', {
    x: '-=300',
    ease: 'none',
    scrollTrigger: {
      trigger: '.projects-marquee',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.5,
    },
  });
}

// ===== CONTACT ANIMATIONS =====
function initContactAnimations() {
  // Always visible, subtle motion only
}

// ===== MAGNETIC HOVER ON NAV LINKS =====
function initMagneticHover() {
  document.querySelectorAll('.nav-links a, .hero-cta-btn, .contact-link').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
    });
  });
}

// ============================================================
// INITIALIZE EVERYTHING
// ============================================================
function initAllAnimations() {
  initHeroAnimations();
  initNavbar();
  initAboutAnimations();
  initProjectHeaders();
  initSliqueAnimations();
  initSyncForceAnimations();
  initAvoSpinAnimations();
  initActicompressAnimations();
  initOutsideStudioAnimations();
  initExplorationsAnimations();
  initSlideModal();
  initMarquee();
  initContactAnimations();
  initMagneticHover();

  ScrollTrigger.refresh();
}

// ===== KICK OFF =====
window.addEventListener('DOMContentLoaded', () => {
  initParticles();
  
  if (document.fonts) {
    document.fonts.ready.then(() => {
      initPreloader();
    });
  } else {
    initPreloader();
  }
});

window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});
