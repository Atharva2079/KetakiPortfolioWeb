/* ============================================================
   KETAKI KHADILKAR — PORTFOLIO WEBSITE v2.0
   Epic Animations: GSAP, Lenis, Morphing Shapes, Particles
   ============================================================ */

// ===== LENIS SMOOTH SCROLL =====
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
  touchMultiplier: 2,
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

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
  const PARTICLE_COUNT = 40;

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

// ===== CURSOR GLOW =====
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow) {
  document.addEventListener('mousemove', (e) => {
    gsap.to(cursorGlow, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.8,
      ease: 'power2.out',
    });
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

// ===== SLIQUE (TOASTER) ANIMATIONS =====
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

  // Toaster scene — pinned scroll animation
  const toasterTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.toaster-scene',
      start: 'top top',
      end: '+=300%',
      pin: true,
      scrub: 1,
      anticipatePin: 1,
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

  // Toast cards POP UP one by one
  const toastCards = document.querySelectorAll('.toast-card');
  const slotGlows = document.querySelectorAll('.slot-glow');

  toastCards.forEach((card, index) => {
    const offset = index === 0 ? '+=0.1' : '+=0.05';

    // Glow first
    toasterTl.to(slotGlows[index], {
      opacity: 0.8,
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

  // Hold
  toasterTl.to({}, { duration: 0.5 });

  // Context cards
  gsap.to('.context-card', {
    opacity: 1,
    y: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.slique-context',
      start: 'top 75%',
      toggleActions: 'play none none reverse',
    },
  });
}

// ===== SYNCFORCE ANIMATIONS =====
function initSyncForceAnimations() {
  // Title
  gsap.to('#syncforce .project-mega-title', {
    opacity: 1,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.syncforce-hero',
      start: 'top 55%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.to('#syncforce .project-mega-sub', {
    opacity: 1,
    duration: 0.8,
    scrollTrigger: {
      trigger: '.syncforce-hero',
      start: 'top 50%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.to('#syncforce .project-meta-pills', {
    opacity: 1,
    duration: 0.8,
    scrollTrigger: {
      trigger: '.syncforce-hero',
      start: 'top 45%',
      toggleActions: 'play none none reverse',
    },
  });

  // Horizontal scroll
  const track = document.getElementById('syncforceTrack');
  if (track) {
    const totalScrollWidth = track.scrollWidth - window.innerWidth;

    gsap.to(track, {
      x: () => -totalScrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: '.horizontal-scroll-wrapper',
        start: 'top top',
        end: () => `+=${totalScrollWidth}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
  }

  // Spec blocks
  gsap.to('.spec-block', {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.syncforce-specs',
      start: 'top 75%',
      toggleActions: 'play none none reverse',
    },
  });

  // Animated spec numbers (count up)
  document.querySelectorAll('.spec-number').forEach(el => {
    const endVal = parseInt(el.textContent, 10);
    el.textContent = '0';
    
    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: endVal,
          duration: 2,
          ease: 'power2.out',
          onUpdate: function() {
            el.textContent = Math.round(this.targets()[0].val);
          }
        });
      }
    });
  });
}

// ===== AVOSPIN ANIMATIONS =====
function initAvoSpinAnimations() {
  // Title
  gsap.to('#avospin .project-mega-title', {
    opacity: 1,
    duration: 1,
    scrollTrigger: {
      trigger: '.avospin-hero',
      start: 'top 55%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.to('#avospin .project-mega-sub', {
    opacity: 1,
    duration: 0.8,
    scrollTrigger: {
      trigger: '.avospin-hero',
      start: 'top 50%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.to('#avospin .project-meta-pills', {
    opacity: 1,
    duration: 0.8,
    scrollTrigger: {
      trigger: '.avospin-hero',
      start: 'top 45%',
      toggleActions: 'play none none reverse',
    },
  });

  // Spinner rotation on scroll
  const spinner = document.getElementById('avospinSpinner');
  if (spinner) {
    gsap.to(spinner, {
      rotation: 360,
      ease: 'none',
      scrollTrigger: {
        trigger: '.avospin-showcase',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      },
    });
  }

  // Feature cards stagger
  gsap.to('.avospin-feature', {
    opacity: 1,
    x: 0,
    duration: 0.7,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.avospin-features',
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
  });

  // Gallery items
  gsap.to('#avospin .gallery-item', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#avospin .project-gallery',
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
  });
}

// ===== MODULO ANIMATIONS =====
function initModuloAnimations() {
  // Blueprint grid fade in
  gsap.to('.blueprint-grid', {
    opacity: 1,
    duration: 1.5,
    scrollTrigger: {
      trigger: '.modulo-hero',
      start: 'top 60%',
      toggleActions: 'play none none reverse',
    },
  });

  // Title
  gsap.to('#modulo .project-mega-title', {
    opacity: 1,
    duration: 1,
    scrollTrigger: {
      trigger: '.modulo-hero',
      start: 'top 55%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.to('#modulo .project-mega-sub', {
    opacity: 1,
    duration: 0.8,
    scrollTrigger: {
      trigger: '.modulo-hero',
      start: 'top 50%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.to('#modulo .project-meta-pills', {
    opacity: 1,
    duration: 0.8,
    scrollTrigger: {
      trigger: '.modulo-hero',
      start: 'top 45%',
      toggleActions: 'play none none reverse',
    },
  });

  // Parts assembly — scatter to position
  const parts = document.querySelectorAll('.modulo-part');
  const offsets = [
    { x: -150, y: -100, rotate: -15 },
    { x: 150, y: -50, rotate: 10 },
    { x: -80, y: 120, rotate: -8 },
  ];

  parts.forEach((part, i) => {
    gsap.from(part, {
      x: offsets[i].x,
      y: offsets[i].y,
      rotation: offsets[i].rotate,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.modulo-assembly',
        start: 'top 60%',
        end: 'top 20%',
        scrub: 1,
      },
    });
  });

  // Info text
  gsap.to('.modulo-info h3', {
    opacity: 1,
    duration: 0.8,
    scrollTrigger: {
      trigger: '.modulo-info',
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.to('.modulo-info p', {
    opacity: 1,
    duration: 0.8,
    scrollTrigger: {
      trigger: '.modulo-info p',
      start: 'top 75%',
      toggleActions: 'play none none reverse',
    },
  });

  // Specs
  gsap.to('.modulo-spec', {
    opacity: 1,
    y: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.modulo-specs',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });
}

// ===== MARQUEE ANIMATION =====
function initMarquee() {
  // Speed up marquee on scroll
  gsap.to('.marquee-track', {
    x: '-=200',
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
  gsap.to('.contact-label', {
    opacity: 1,
    duration: 0.8,
    scrollTrigger: {
      trigger: '#contact', start: 'top 65%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.to('.contact-heading', {
    opacity: 1,
    duration: 1,
    scrollTrigger: {
      trigger: '#contact', start: 'top 60%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.to('.contact-subtext', {
    opacity: 1,
    duration: 0.8,
    scrollTrigger: {
      trigger: '#contact', start: 'top 55%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.to('.contact-link', {
    opacity: 1,
    y: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.contact-links', start: 'top 75%',
      toggleActions: 'play none none reverse',
    },
  });
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
  initModuloAnimations();
  initMarquee();
  initContactAnimations();
  initMagneticHover();

  // Refresh ScrollTrigger
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

// Refresh on resize
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});
