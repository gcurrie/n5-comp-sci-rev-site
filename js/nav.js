/* Shared navigation injection */
(function () {
  const ROOT = (function () {
    const depth = document.documentElement.dataset.depth || '0';
    return '../'.repeat(parseInt(depth, 10));
  })();

  const LINKS = [
    { href: '', label: 'Home' },
    { href: 'sdd/', label: 'SDD' },
    { href: 'cs/', label: 'Computer Systems' },
    { href: 'ddd/', label: 'DDD' },
    { href: 'resources/', label: 'Resources' },
  ];

  function currentActive(href) {
    const full = ROOT + href;
    const path = window.location.pathname;
    if (href === '') {
      return path.endsWith('/index.html') && document.documentElement.dataset.depth === '0';
    }
    return path.includes('/' + href); // href ends with '/', so 'cs/' only matches the /cs/ folder (not e.g. /wdd/css.html)
  }

  const bannerHTML = `
<div class="construction-banner" role="status">
  🚧 This site is currently under construction — not all content is final.
</div>`;

  const navHTML = `
<header class="site-header">
  <div class="header-inner">
    <a href="${ROOT}index.html" class="site-logo">
      <div class="logo-icon">
        <svg viewBox="0 0 120 120" width="36" height="36" aria-hidden="true" focusable="false">
          <polygon points="117,60 88.5,109.4 31.5,109.4 3,60 31.5,10.6 88.5,10.6" fill="#C9A227"/>
          <text x="60" y="72" text-anchor="middle" font-size="33" font-weight="700" fill="#002D1C"
                textLength="60" lengthAdjust="spacingAndGlyphs">CRH</text>
        </svg>
      </div>
      <div class="logo-text">
        <span class="logo-title">Computing Revision Hub</span>
        <span class="logo-sub">National 5 Computing Revision</span>
      </div>
    </a>
    <nav class="site-nav" id="site-nav">
      ${LINKS.map(l => `<a href="${ROOT}${l.href}index.html"${currentActive(l.href) ? ' class="active"' : ''}>${l.label}</a>`).join('')}
    </nav>
    <div id="search-wrap" class="search-wrap">
      <div class="search-input-wrap">
        <svg class="search-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" stroke-width="1.8"/>
          <path d="M13 13l3.5 3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
        <input id="search-input" class="search-input" type="search" placeholder="Search topics &amp; terms…" autocomplete="off" spellcheck="false" aria-label="Search topics and terms" />
      </div>
      <div id="search-dropdown" class="search-dropdown" role="listbox"></div>
    </div>
    <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation">&#9776;</button>
  </div>
</header>`;

  const footerHTML = `
<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-brand">
      <img class="footer-mark" src="${ROOT}resources/crhLogoTrnsprnt.png" alt="" width="120" height="120" />
      <div>
        <div class="brand-name">Computing Revision Hub</div>
        <p>National 5 Computing Revision</p>
      </div>
    </div>
    <div class="footer-links">
      <a href="${ROOT}index.html">Home</a>
      <a href="${ROOT}sdd/index.html">Software Design &amp; Development</a>
      <a href="${ROOT}cs/index.html">Computer Systems</a>
      <a href="${ROOT}ddd/index.html">Database Design &amp; Development</a>
      <a href="${ROOT}resources/index.html">Additional Resources</a>
    </div>
  </div>
  <div class="footer-bottom">
    &copy; ${new Date().getFullYear()} Computing Revision Hub &mdash; For educational use
  </div>
</footer>`;

  // Collapse a block behind a coloured banner so pages are less cluttered.
  // The block's existing .q-label becomes the banner text, and any nested
  // reveal (Suggested answer / Marking Instructions) stays collapsed
  // independently inside. If this never runs, blocks simply render fully
  // expanded as before. Used for worked examples (gold) and self-test
  // practice questions (green).
  function collapseBlocks(className, kicker, icon) {
    document.querySelectorAll('div.' + className).forEach(function (q) {
      const label = q.querySelector(':scope > .q-label');
      if (!label) return;

      const details = document.createElement('details');
      details.className = className;

      const summary = document.createElement('summary');
      summary.innerHTML =
        '<span class="pq-icon" aria-hidden="true">' + icon + '</span>' +
        '<span class="pq-text">' +
          '<span class="pq-kicker">' + kicker + '</span>' +
          '<span class="pq-label"></span>' +
        '</span>' +
        '<span class="pq-chevron" aria-hidden="true"></span>';
      summary.querySelector('.pq-label').textContent = label.textContent.trim();

      const body = document.createElement('div');
      body.className = 'pq-body';

      label.remove();
      while (q.firstChild) body.appendChild(q.firstChild);

      details.appendChild(summary);
      details.appendChild(body);
      q.replaceWith(details);
    });
  }

  function init() {
    // Favicon — the gold hexagon mark. Kept to the hexagon plus monogram
    // only: finer detail is illegible at 16px.
    if (!document.querySelector('link[rel="icon"]')) {
      const fav = document.createElement('link');
      fav.rel = 'icon';
      fav.href = 'data:image/svg+xml,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
        '<rect width="64" height="64" fill="#002D1C"/>' +
        '<polygon points="62,32 47,58 17,58 2,32 17,6 47,6" fill="#C9A227"/>' +
        '<text x="32" y="40" font-family="Consolas,Menlo,monospace" font-size="17" font-weight="bold" ' +
        'text-anchor="middle" fill="#002D1C" textLength="32" lengthAdjust="spacingAndGlyphs">CRH</text>' +
        '</svg>');
      document.head.appendChild(fav);
    }

    document.body.insertAdjacentHTML('afterbegin', navHTML);
    document.body.insertAdjacentHTML('afterbegin', bannerHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    collapseBlocks('worked-example', 'Worked Example', '✏️');
    collapseBlocks('practice-question', 'Practice Question', '❓');

    // Expose zoomable diagrams to the keyboard and to assistive tech.
    document.querySelectorAll('img.zoomable').forEach(function (img) {
      img.setAttribute('tabindex', '0');
      img.setAttribute('role', 'button');
      img.setAttribute('title', 'Click to enlarge');
    });

    // Mobile nav toggle
    document.getElementById('nav-toggle').addEventListener('click', function () {
      document.getElementById('site-nav').classList.toggle('open');
    });

    // Dynamically load search.js
    const s = document.createElement('script');
    s.src = ROOT + 'js/search.js';
    document.head.appendChild(s);

    // Dynamically load the code-block syntax highlighter
    const h = document.createElement('script');
    h.src = ROOT + 'js/highlight.js';
    document.head.appendChild(h);
  }

  // Click-to-enlarge for diagrams marked with .zoomable. Opens the image in a
  // full-screen overlay; closes on the button, a click outside the image, or
  // Escape, restoring focus to whatever was clicked.
  let lastZoomTrigger = null;

  function closeLightbox() {
    const box = document.querySelector('.img-lightbox');
    if (!box) return;
    box.remove();
    document.body.style.overflow = '';
    if (lastZoomTrigger) { lastZoomTrigger.focus(); lastZoomTrigger = null; }
  }

  function openLightbox(img) {
    closeLightbox();
    lastZoomTrigger = img;

    const box = document.createElement('div');
    box.className = 'img-lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', img.alt ? 'Enlarged diagram: ' + img.alt.split('.')[0] : 'Enlarged diagram');

    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'lb-close';
    close.textContent = 'Close ✕';

    const big = document.createElement('img');
    big.src = img.currentSrc || img.src;
    big.alt = img.alt || '';

    box.appendChild(close);
    box.appendChild(big);
    document.body.appendChild(box);
    document.body.style.overflow = 'hidden';
    close.focus();
  }

  document.addEventListener('click', function (e) {
    const img = e.target.closest('img.zoomable');
    if (img) { openLightbox(img); return; }
    const box = e.target.closest('.img-lightbox');
    // Clicking the overlay (but not the image itself) closes it.
    if (box && e.target.tagName !== 'IMG') closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeLightbox(); return; }
    // Images are not focusable by default, so make the enlarge action
    // reachable by keyboard as well as by mouse.
    const img = e.target.closest && e.target.closest('img.zoomable');
    if (img && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      openLightbox(img);
    }
  });

  // Some embedded iframes auto-focus themselves once they finish loading,
  // which makes the browser scroll the page down to reveal them. Until the
  // user has actively interacted with the page, snap back to the top if an
  // iframe steals focus. Deep links (#anchor) are respected.
  if (!location.hash) {
    let interacted = false;
    ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach(function (evt) {
      window.addEventListener(evt, function () { interacted = true; }, { passive: true, once: true });
    });
    window.addEventListener('focusin', function (e) {
      if (!interacted && e.target && e.target.tagName === 'IFRAME') {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    });
  }

  // Let an embedded page (e.g. the interactive visualisers) grow its iframe to
  // fit its own content, so there is no scrollbar inside the frame — the page
  // scrolls normally instead. The embedded page posts {type:'embed-height',
  // height} and we size whichever iframe it came from to match.
  window.addEventListener('message', function (e) {
    const d = e.data;
    if (!d || d.type !== 'embed-height' || typeof d.height !== 'number') return;
    const frames = document.getElementsByTagName('iframe');
    for (let i = 0; i < frames.length; i++) {
      if (frames[i].contentWindow === e.source) {
        frames[i].style.height = Math.ceil(d.height) + 'px';
        break;
      }
    }
  });

  // Wait until the full body is parsed so the footer is appended at the very
  // end of the page (otherwise it lands directly after this script tag).
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
