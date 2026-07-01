/* =========================================================
   Jerry Huang :: Portfolio interactions
   theme · scroll reveal · count-up · hero identity scene ·
   trajectory scroll-drive · project drawer · build graph ·
   proof filter · builder-stack evidence · magnetic buttons ·
   dot-rail / nav spy · contact form
   ========================================================= */
(function () {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(pointer:fine)').matches;

  /* ---------- THEME ---------- */
  const root = document.documentElement;
  const saved = localStorage.getItem('jh-theme');
  if (saved) root.setAttribute('data-theme', saved);
  $('#themeToggle')?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('jh-theme', next);
  });

  /* ---------- MOBILE MENU ---------- */
  const menuToggle = $('#menuToggle');
  const mobileMenu = $('#mobileMenu');
  if (menuToggle && mobileMenu) {
    const setMenu = (open) => {
      document.body.classList.toggle('menu-open', open);
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      mobileMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
      document.body.style.overflow = open ? 'hidden' : '';
    };
    menuToggle.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
    mobileMenu.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  }

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

  /* ---------- COUNT-UP STATS (HTML already renders the final value; this
     progressively animates over it and always lands back on that value) ---------- */
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
  if (statWrap && !reduce) {
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
  } else if (statWrap) {
    statWrap.classList.add('in-view');
  }

  /* ---------- HERO IDENTITY SCENE ---------- */
  const heroScene = $('#heroScene');
  if (heroScene) {
    if (!reduce) requestAnimationFrame(() => heroScene.classList.add('jh-animate'));
    if (!reduce && fine) {
      const wrap = $('#heroSceneWrap');
      wrap.addEventListener('pointermove', (e) => {
        const r = wrap.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        heroScene.style.transform = `rotateX(${(-py * 4).toFixed(2)}deg) rotateY(${(px * 5).toFixed(2)}deg)`;
      });
      wrap.addEventListener('pointerleave', () => { heroScene.style.transform = ''; });
    }
  }
  const contactVisual = $('.contact-finale-visual');
  if (contactVisual && !reduce) {
    const cvObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('jh-animate'); cvObs.unobserve(e.target); } });
    }, { threshold: 0.5 });
    cvObs.observe(contactVisual);
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

  /* ---------- TRAJECTORY MAP: scroll-driven line fill + node activation ---------- */
  const trajTrack = $('#trajTrack');
  const trajFill = $('#trajFill');
  if (trajTrack && trajFill) {
    const trajNodes = $$('.traj-node', trajTrack);
    const updateTraj = () => {
      const r = trajTrack.getBoundingClientRect();
      const anchor = window.innerHeight * 0.7;
      const total = r.height || 1;
      const progressPx = Math.min(Math.max(anchor - r.top, 0), total);
      const pct = (progressPx / total) * 100;
      trajFill.style.width = pct + '%';
      trajNodes.forEach(node => {
        const pos = parseFloat(node.dataset.pos) || 0;
        node.classList.toggle('active', pct >= pos - 4);
      });
    };
    window.addEventListener('scroll', updateTraj, { passive: true });
    window.addEventListener('resize', updateTraj);
    updateTraj();
  }

  /* ---------- HERO SPOTLIGHT ---------- */
  const hero = $('#home');
  const spot = $('#spotlight');
  if (hero && spot && !reduce && fine) {
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      spot.style.opacity = '1';
      spot.style.left = (e.clientX - r.left - 210) + 'px';
      spot.style.top = (e.clientY - r.top - 210) + 'px';
    });
    hero.addEventListener('pointerleave', () => { spot.style.opacity = '0'; });
  }

  /* ---------- PROJECT CARD POINTER GLOW + 3D TILT ---------- */
  $$('.work-card').forEach(card => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    });
  });
  if (!reduce && fine) {
    $$('.work-card').forEach(card => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `translateY(-6px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
  }

  /* ---------- Generic "evidence" lookup shared by the Build Graph and
     Builder Stack: finds the real on-page element a short id refers to,
     so every relationship reads from a single source of truth. ---------- */
  function findEvidenceEl(id) {
    return document.getElementById(id)
      || document.querySelector(`[data-project="${id}"]`)
      || document.querySelector(`[data-ev-id="${id}"]`);
  }
  function evidenceSummary(el) {
    if (!el) return null;
    const h = el.querySelector('h1,h2,h3,h4') || (el.matches('h1,h2,h3,h4') ? el : null);
    const roleEl = el.querySelector('.tl-role');
    const pEl = el.querySelector('p');
    const title = (roleEl ? roleEl.textContent : (h ? h.textContent : el.getAttribute('aria-label') || el.id)).trim();
    const text = pEl ? pEl.textContent.trim() : '';
    const targetId = el.id || (el.closest('section[id]') || {}).id || '';
    return { title, text, targetId };
  }
  function flashScrollTo(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    el.classList.remove('jh-flash'); void el.offsetWidth; el.classList.add('jh-flash');
    setTimeout(() => el.classList.remove('jh-flash'), 1400);
  }

  /* ---------- PROJECT DETAIL DRAWER ---------- */
  const overlay = $('#drawerOverlay');
  const drawer = $('#workDrawer');
  const drawerBody = $('#drawerBody');
  const drawerClose = $('#drawerClose');
  let lastFocused = null;
  function openDrawer(projectId, triggerEl) {
    const tpl = $('#tpl-' + projectId);
    if (!tpl || !drawer) return;
    drawerBody.innerHTML = '';
    drawerBody.appendChild(tpl.content.cloneNode(true));
    lastFocused = triggerEl || document.activeElement;
    overlay.hidden = false; drawer.hidden = false;
    requestAnimationFrame(() => { overlay.classList.add('show'); drawer.classList.add('show'); });
    document.body.style.overflow = 'hidden';
    drawerClose.focus();
  }
  function closeDrawer() {
    if (!drawer || drawer.hidden) return;
    overlay.classList.remove('show'); drawer.classList.remove('show');
    document.body.style.overflow = '';
    setTimeout(() => { overlay.hidden = true; drawer.hidden = true; }, reduce ? 0 : 380);
    if (lastFocused) lastFocused.focus();
  }
  $$('.work-card').forEach(card => {
    const open = () => openDrawer(card.dataset.project, card);
    card.addEventListener('click', open);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
  });
  drawerClose?.addEventListener('click', closeDrawer);
  overlay?.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || !drawer || drawer.hidden) return;
    closeDrawer();
  });
  drawer?.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusables = $$('button, a[href]', drawer).filter(el => el.offsetParent !== null);
    if (!focusables.length) return;
    const first = focusables[0], last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* ---------- PROJECT CONSTELLATION / BUILD GRAPH ---------- */
  const cstEl = $('#constellationEl');
  const cstEdges = $('#cstEdges');
  const cstDetail = $('#cstDetail');
  if (cstEl) {
    const allNodes = $$('.cst-node', cstEl);
    const projectNodes = $$('.cst-node--project', cstEl);
    const skillNodes = $$('.cst-node--skill', cstEl);

    function drawEdges(sourceEl, relatedEls) {
      if (!cstEdges || !fine) return;
      cstEdges.innerHTML = '';
      const box = cstEl.getBoundingClientRect();
      cstEdges.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
      const sr = sourceEl.getBoundingClientRect();
      const sx = sr.left - box.left + sr.width / 2;
      const sy = sr.top - box.top + sr.height / 2;
      relatedEls.forEach(el => {
        const r = el.getBoundingClientRect();
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', sx); line.setAttribute('y1', sy);
        line.setAttribute('x2', r.left - box.left + r.width / 2);
        line.setAttribute('y2', r.top - box.top + r.height / 2);
        cstEdges.appendChild(line);
      });
    }
    function clearEdges() { if (cstEdges) cstEdges.innerHTML = ''; }

    function relatedFor(node) {
      const isProject = node.classList.contains('cst-node--project');
      const ids = (isProject ? node.dataset.skills : node.dataset.projects || '').split(',').map(s => s.trim()).filter(Boolean);
      const pool = isProject ? skillNodes : projectNodes;
      return pool.filter(n => ids.includes(n.dataset.node));
    }

    function highlight(node) {
      const related = relatedFor(node);
      allNodes.forEach(n => {
        if (n === node || related.includes(n)) { n.classList.add('cst-active'); n.classList.remove('cst-dim'); }
        else { n.classList.remove('cst-active'); n.classList.add('cst-dim'); }
      });
      drawEdges(node, related);
    }
    function clearHighlight() {
      allNodes.forEach(n => n.classList.remove('cst-active', 'cst-dim'));
      clearEdges();
    }

    function showDetail(node) {
      const isProject = node.classList.contains('cst-node--project');
      const id = node.dataset.node;
      const el = findEvidenceEl(id);
      const summary = evidenceSummary(el);
      if (!summary) { cstDetail.innerHTML = '<p class="cst-hint">Select a node to see its connections here.</p>'; return; }
      const related = relatedFor(node).map(n => n.textContent.trim()).join(' · ');
      cstDetail.innerHTML = `
        <div class="cst-detail-title">${summary.title}</div>
        <p>${summary.text}</p>
        <p class="cst-detail-links"><span class="cst-hint">${isProject ? 'Skills' : 'Projects'}: ${related || '—'}</span></p>
      `;
    }

    let activeNode = null;
    allNodes.forEach(node => {
      node.addEventListener('mouseenter', () => { if (!activeNode) highlight(node); });
      node.addEventListener('mouseleave', () => { if (!activeNode) clearHighlight(); });
      node.addEventListener('focus', () => highlight(node));
      node.addEventListener('click', () => {
        if (activeNode === node) { activeNode = null; clearHighlight(); cstDetail.innerHTML = '<p class="cst-hint">Select a node to see its connections here.</p>'; return; }
        activeNode = node; highlight(node); showDetail(node);
      });
    });
    window.addEventListener('resize', () => { if (activeNode) drawEdges(activeNode, relatedFor(activeNode)); });
  }

  /* ---------- PROOF MATRIX FILTER ---------- */
  const proofFilter = $('#proofFilter');
  if (proofFilter) {
    const cards = $$('#proofGrid .proof-card');
    proofFilter.addEventListener('click', (e) => {
      const btn = e.target.closest('.chip');
      if (!btn) return;
      $$('.chip', proofFilter).forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      cards.forEach(c => c.classList.toggle('hide', cat !== 'all' && c.dataset.cat !== cat));
    });
  }

  /* ---------- BUILDER STACK: skill -> evidence ---------- */
  const bsPanel = $('#bsEvidencePanel');
  if (bsPanel) {
    const skillBtns = $$('.bs-skill');
    skillBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const wasActive = btn.classList.contains('bs-active');
        skillBtns.forEach(b => b.classList.remove('bs-active'));
        if (wasActive) {
          bsPanel.innerHTML = '<p class="bs-evidence-hint">Select a skill to see where it\'s used.</p>';
          return;
        }
        btn.classList.add('bs-active');
        const ids = btn.dataset.evidence.split(',').map(s => s.trim()).filter(Boolean);
        const items = ids.map(id => {
          const el = findEvidenceEl(id);
          const s = evidenceSummary(el);
          if (!s) return '';
          return `<div class="bs-evidence-item"><a href="#${s.targetId}" data-jump="${s.targetId}">${s.title}</a><p>${s.text}</p></div>`;
        }).join('');
        bsPanel.innerHTML = `<div class="bs-evidence-title">${btn.textContent.trim()} — shows up in</div>${items}`;
        $$('a[data-jump]', bsPanel).forEach(a => {
          a.addEventListener('click', (e) => { e.preventDefault(); flashScrollTo(a.dataset.jump); });
        });
      });
    });
  }

  /* ---------- NAV SCROLL-SPY (dot rail + top links) ---------- */
  const railLinks = $$('#rail a');
  const topLinkEls = $$('#topLinks a');
  const spySections = new Map();
  railLinks.forEach(a => { const s = $(a.getAttribute('href')); if (s) spySections.set(s, [a]); });
  topLinkEls.forEach(a => {
    const s = $(a.getAttribute('href'));
    if (s) { const arr = spySections.get(s) || []; arr.push(a); spySections.set(s, arr); }
  });
  if (spySections.size) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const links = spySections.get(e.target) || [];
          const activeHref = '#' + e.target.id;
          railLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === activeHref));
          topLinkEls.forEach(a => a.classList.toggle('active', a.getAttribute('href') === activeHref));
        }
      });
    }, { threshold: 0, rootMargin: '-45% 0px -50% 0px' });
    spySections.forEach((_, section) => spy.observe(section));
  }

  /* ---------- MAGNETIC BUTTONS ---------- */
  if (!reduce && fine) {
    $$('.magnetic').forEach(btn => {
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        const mx = (e.clientX - r.left - r.width / 2) * 0.25;
        const my = (e.clientY - r.top - r.height / 2) * 0.35;
        btn.style.transform = `translate(${mx.toFixed(1)}px, ${my.toFixed(1)}px)`;
      });
      btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
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
        if (res.ok) { setStatus(`Thanks, ${name}! Your message has been sent.`, 'var(--accent-success)'); form.reset(); }
        else setStatus('Something went wrong, please try again later.', 'var(--accent-2)');
      } catch (err) {
        console.error(err);
        setStatus('Network error. Check your connection and retry.', 'var(--accent-2)');
      }
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
