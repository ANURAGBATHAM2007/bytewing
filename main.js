/* ============================================================
   ByteWing – main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Elements ── */
  const navbar = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scroll-top');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  const overlay   = document.getElementById('modal-overlay');
  const btnLogin  = document.getElementById('btn-login');
  const modalClose = document.getElementById('modal-close');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const particleContainer = document.getElementById('particles');
  const statsSection = document.getElementById('stats');

  /* ── Navbar scroll ── */
  window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 20);
    // Scroll-top button
    if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  /* ── Hamburger mobile menu ── */
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      hamburger.classList.toggle('active', open);
      hamburger.setAttribute('aria-expanded', open);
    });
    // Close when clicking outside
    document.addEventListener('click', e => {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', false);
      }
    });
  }

  /* ── Login/Signup Modal ── */
  function openModal() { 
    if (overlay) { overlay.classList.add('active'); document.body.style.overflow = 'hidden'; }
  }
  function closeModal() { 
    if (overlay) { overlay.classList.remove('active'); document.body.style.overflow = ''; }
  }

  if (btnLogin) btnLogin.addEventListener('click', e => { e.preventDefault(); openModal(); });
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // Modal tabs
  document.querySelectorAll('.modal-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.modal-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panelId = tab.dataset.modalTab;
      if (panelId) {
        const panel = document.getElementById('modal-panel-' + panelId);
        if (panel) panel.classList.add('active');
      }
    });
  });

  // Role selector
  document.querySelectorAll('.role-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Form submit (demo)
  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      showToast('Logged in successfully! Welcome back to ByteWing.');
      closeModal();
    });
  }
  
  if (signupForm) {
    signupForm.addEventListener('submit', e => {
      e.preventDefault();
      showToast('Account created! Welcome to ByteWing 🎉');
      closeModal();
    });
  }

  /* ── FAQs accordion ── */
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item  = q.closest('.faq-item');
      if (!item) return;
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      document.querySelectorAll('.faq-question').forEach(qq => qq.setAttribute('aria-expanded', false));
      if (!isOpen) {
        item.classList.add('open');
        q.setAttribute('aria-expanded', true);
      }
    });
  });

  /* ── How It Works tabs ── */
  document.querySelectorAll('.how-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.how-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.how-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const tabId = tab.dataset.tab;
      if (tabId) {
        const panel = document.getElementById('panel-' + tabId);
        if (panel) panel.classList.add('active');
      }
    });
  });

  /* ── Animated Stats counter ── */
  const statNums = document.querySelectorAll('.stat-num');
  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated || !statsSection) return;
    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      statsAnimated = true;
      statNums.forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        if (isNaN(target)) return;
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = Math.floor(current);
          if (current >= target) clearInterval(timer);
        }, 16);
      });
    }
  }
  if (statsSection) {
    window.addEventListener('scroll', animateStats, { passive: true });
    animateStats(); // run once on load
  }

  /* ── Scroll reveal ── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0) {
    const revealObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    reveals.forEach(el => revealObs.observe(el));

    // Auto-add reveal to main sections
    const revealTargets = [
      '.pillar-card', '.stat-item', '.testimonial-card',
      '.field-card', '.step-item', '.faq-item', '.press-logo'
    ];
    revealTargets.forEach(selector => {
      document.querySelectorAll(selector).forEach((el, i) => {
        el.classList.add('reveal');
        if (i < 4) el.classList.add(`reveal-delay-${i + 1}`);
        revealObs.observe(el);
      });
    });
  }

  /* ── Hero Particles ── */
  if (particleContainer) {
    const colors = ['#18b2b8', '#f97316', '#1a5c61', '#f5a623'];
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 4 + 2;
      p.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random()*100}%;
        top:${Math.random()*100}%;
        background:${colors[Math.floor(Math.random()*colors.length)]};
        --dur:${6 + Math.random()*8}s;
        --delay:${Math.random()*6}s;
      `;
      particleContainer.appendChild(p);
    }
  }

  /* ── Scroll to top ── */
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
        // Close mobile menu if open
        if (navLinks) navLinks.classList.remove('open');
        if (hamburger) hamburger.classList.remove('active');
      }
    });
  });

  /* ── Hero CTA hover ripple ── */
  document.querySelectorAll('.btn-primary, .btn-secondary, .btn-accent').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position:absolute; border-radius:50%;
        background:rgba(255,255,255,0.3);
        width:100px; height:100px;
        left:${e.offsetX - 50}px; top:${e.offsetY - 50}px;
        animation:ripple 0.6s ease-out forwards;
        pointer-events:none;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add ripple animation keyframes
  const style = document.createElement('style');
  style.textContent = '@keyframes ripple { from { transform:scale(0); opacity:1; } to { transform:scale(4); opacity:0; } }';
  document.head.appendChild(style);

  /* ── Toast notification ── */
  function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position:fixed; bottom:80px; left:50%; transform:translateX(-50%) translateY(20px);
      background:linear-gradient(135deg,#f97316,#1a5c61);
      color:#fff; padding:14px 28px; border-radius:50px;
      font-weight:600; font-size:0.9rem; z-index:9999;
      box-shadow:0 8px 32px rgba(0,212,255,0.4);
      transition:all 0.3s ease; opacity:0; white-space:nowrap;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  /* ── Navbar dropdown click & keyboard accessibility ── */
  document.querySelectorAll('.nav-btn').forEach(btn => {
    // Click toggle
    btn.addEventListener('click', e => {
      e.preventDefault();
      const parent = btn.closest('.nav-item');
      if (!parent) return;
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      
      // Close siblings
      document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('open');
        item.querySelector('.nav-btn')?.setAttribute('aria-expanded', 'false');
      });

      if (!isExpanded) {
        parent.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });

    // Keyboard toggle
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', e => {
    if (!e.target.closest('.nav-item')) {
      document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('open');
        item.querySelector('.nav-btn')?.setAttribute('aria-expanded', 'false');
      });
    }
  });

  /* ── Pillar card click (demo) ── */
  document.querySelectorAll('.pillar-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      openModal();
    });
  });

  console.log('%c🚀 ByteWing Loaded!', 'color:#00d4ff;font-size:18px;font-weight:bold;');
});
