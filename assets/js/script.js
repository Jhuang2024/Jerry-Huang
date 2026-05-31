/* =========================================================
   Jerry Huang :: Portfolio interactions
   theme · rotating roles · count-up · scroll reveal ·
   dot-rail spy · progress bar · hero spotlight ·
   award filter · language bars · contact form
   ========================================================= */
(function () {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- THEME ---------- */
  const root = document.documentElement;
  const saved = localStorage.getItem('jh-theme');
  if (saved) root.setAttribute('data-theme', saved);
  $('#themeToggle')?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('jh-theme', next);
  });

  /* ---------- YEAR ---------- */
  $('#year').textContent = new Date().getFullYear();

  /* ---------- HEADER SHADOW + PROGRESS ---------- */
  const header = $('#header');
  const progress = $('#progress');
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 24);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- ROTATING ROLES ---------- */
  const roles = [
    'Founder', 'UC Berkeley \'30', 'Entrepreneur', 'UN Youth Delegate',
    'ML Researcher'
  ];
  const rotator = $('#rotator');
  if (rotator && !reduce) {
    let i = 0, j = 0, deleting = false;
    const tick = () => {
      const word = roles[i];
      rotator.textContent = deleting ? word.slice(0, j--) : word.slice(0, j++);
      let delay = deleting ? 45 : 90;
      if (!deleting && j > word.length) { deleting = true; delay = 1400; }
      else if (deleting && j < 0) { deleting = false; j = 0; i = (i + 1) % roles.length; delay = 350; }
      setTimeout(tick, delay);
    };
    tick();
  }

  /* ---------- SCROLL REVEAL ---------- */
  const revealItems = $$('.reveal:not(.in-view)');
  if (reduce) {
    revealItems.forEach(el => el.classList.add('in-view'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealItems.forEach(el => io.observe(el));
  }

  /* ---------- COUNT-UP STATS ---------- */
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const dur = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(target * eased);
      el.innerHTML = prefix + val.toLocaleString() + (suffix ? `<span class="suffix">${suffix}</span>` : '');
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const statWrap = $('#heroStats');
  if (statWrap) {
    if (reduce) {
      statWrap.classList.add('in-view');
      $$('.num', statWrap).forEach(el => {
        const pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
        el.innerHTML = pre + parseFloat(el.dataset.count).toLocaleString() + (suf ? `<span class="suffix">${suf}</span>` : '');
      });
    } else {
      const so = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
            $$('.num', e.target).forEach(animateCount);
            so.unobserve(e.target);
          }
        });
      }, { threshold: 0.4 });
      so.observe(statWrap);
    }
  }

  /* ---------- LANGUAGE BARS ---------- */
  const langList = $('#langList');
  if (langList) {
    const fill = () => $$('i', langList).forEach(i => { i.style.width = i.dataset.w + '%'; });
    if (reduce) fill();
    else {
      const lo = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { fill(); lo.disconnect(); } });
      }, { threshold: 0.4 });
      lo.observe(langList);
    }
  }

  /* ---------- TIMELINE FILL + ACTIVE ITEM ---------- */
  const timeline = $('.timeline');
  const tlFill = $('.timeline-fill');
  if (timeline && tlFill) {
    const updateFill = () => {
      const r = timeline.getBoundingClientRect();
      const anchor = window.innerHeight * 0.48;
      const h = Math.min(Math.max(anchor - r.top, 0), r.height);
      tlFill.style.height = h + 'px';
    };
    window.addEventListener('scroll', updateFill, { passive: true });
    window.addEventListener('resize', updateFill);
    updateFill();

    if (!reduce) {
      const tlItems = $$('.tl-item');
      const tlSpy = new IntersectionObserver((entries) => {
        entries.forEach(e => e.target.classList.toggle('active', e.isIntersecting));
      }, { rootMargin: '-45% 0px -45% 0px' });
      tlItems.forEach(i => tlSpy.observe(i));
    }
  }

  /* ---------- DOT RAIL SCROLL-SPY ---------- */
  const railLinks = $$('#rail a');
  const sections = railLinks.map(a => $(a.getAttribute('href'))).filter(Boolean);
  if (sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = '#' + e.target.id;
          railLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
        }
      });
    }, { threshold: 0, rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => spy.observe(s));
  }

  /* ---------- HERO SPOTLIGHT ---------- */
  const hero = $('#home');
  const spot = $('#spotlight');
  if (hero && spot && !reduce && window.matchMedia('(pointer:fine)').matches) {
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      spot.style.opacity = '1';
      spot.style.left = (e.clientX - r.left - 210) + 'px';
      spot.style.top = (e.clientY - r.top - 210) + 'px';
    });
    hero.addEventListener('pointerleave', () => { spot.style.opacity = '0'; });
  }

  /* ---------- PROJECT CARD POINTER GLOW ---------- */
  $$('.proj').forEach(card => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    });
  });

  /* ---------- AWARD FILTER ---------- */
  const filterBar = $('#awardFilter');
  if (filterBar) {
    const cards = $$('#awardGrid .award');
    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.chip');
      if (!btn) return;
      $$('.chip', filterBar).forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      cards.forEach(c => c.classList.toggle('hide', cat !== 'all' && c.dataset.cat !== cat));
    });
  }

  /* ---------- CONTACT FORM ---------- */
  const form = $('#contact-form');
  if (form) {
    const status = $('#status');
    const setStatus = (msg, color) => { status.textContent = msg; status.style.color = color; };
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const name = $('#name').value.trim();
      const email = $('#email').value.trim();
      const subject = $('#subject').value.trim();
      const message = $('#message').value.trim();
      if (!name || !email || !subject || !message) return setStatus('Please fill out all fields.', 'var(--accent-2)');
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email)) return setStatus('Please enter a valid email.', 'var(--accent-2)');
      if (message.length < 10) return setStatus('Message must be at least 10 characters.', 'var(--accent-2)');
      setStatus('Sending…', 'var(--ink-muted)');
      try {
        const res = await fetch(form.action, {
          method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' }
        });
        if (res.ok) { setStatus(`Thanks, ${name}! Your message has been sent.`, 'oklch(0.78 0.16 150)'); form.reset(); }
        else setStatus('Something went wrong, please try again later.', 'var(--accent-2)');
      } catch (err) {
        console.error(err);
        setStatus('Network error. Check your connection and retry.', 'var(--accent-2)');
      }
    });
  }
  /* ---------- PROJECT CARD 3D TILT + MAGNETIC CTAS ---------- */
  if (!reduce && window.matchMedia('(pointer:fine)').matches) {
    $$('.proj').forEach(card => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `translateY(-6px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });

    $$('.hero-cta .btn').forEach(btn => {
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        const mx = (e.clientX - r.left - r.width / 2) * 0.25;
        const my = (e.clientY - r.top - r.height / 2) * 0.35;
        btn.style.transform = `translate(${mx.toFixed(1)}px, ${my.toFixed(1)}px)`;
      });
      btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
    });
  }

  /* ---------- BACK TO TOP ---------- */
  const toTop = $('#toTop');
  if (toTop) {
    window.addEventListener('scroll', () => {
      toTop.classList.toggle('show', window.scrollY > 600);
    }, { passive: true });
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));
  }

  /* ---------- COPY EMAIL ---------- */
  const copyBtn = $('#copyEmail');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const label = copyBtn.querySelector('.label');
      const original = label.textContent;
      try { await navigator.clipboard.writeText(copyBtn.dataset.email); } catch (e) { /* noop */ }
      label.textContent = 'Copied to clipboard';
      label.classList.add('copied');
      setTimeout(() => { label.textContent = original; label.classList.remove('copied'); }, 1500);
    });
  }
})();
