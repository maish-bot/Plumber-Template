/* Site behaviour. You shouldn't need to edit this file —
   business details live in config.js. */
(function () {
  var S = window.SITE || {};
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  document.documentElement.classList.add('js');

  /* ---------- Fill in business details from config.js ---------- */
  var links = {
    tel: S.phoneLink ? 'tel:' + S.phoneLink : '',
    whatsapp: S.whatsapp ? 'https://wa.me/' + S.whatsapp : '',
    email: S.email ? 'mailto:' + S.email : '',
    facebook: S.facebook, instagram: S.instagram, google: S.google
  };
  var text = {
    name: S.name, phone: S.phone, email: S.email, town: S.town,
    gasSafe: S.gasSafe, rating: S.rating, reviewCount: S.reviewCount,
    year: String(new Date().getFullYear())
  };
  $$('[data-site]').forEach(function (el) { var v = text[el.dataset.site]; if (v) el.textContent = v; });
  $$('[data-link]').forEach(function (el) {
    var v = links[el.dataset.link];
    if (v) { el.href = v; if (/^https?:/.test(v)) { el.target = '_blank'; el.rel = 'noopener'; } }
    else if (el.hasAttribute('data-hide-empty')) (el.closest('[data-hide-group]') || el).remove();
  });
  if (!S.rating) $$('[data-needs-rating]').forEach(function (el) { el.remove(); });
  if (!S.gasSafe) $$('[data-needs-gassafe]').forEach(function (el) { el.remove(); });
  if (S.emergency247 === false) $$('[data-needs-247]').forEach(function (el) { el.remove(); });
  if (S.areas && S.areas.length) {
    var pin = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>';
    $$('[data-areas]').forEach(function (ul) {
      ul.innerHTML = S.areas.map(function (a) { return '<li>' + pin + esc(a) + '</li>'; }).join('');
    });
    $$('[data-areas-text]').forEach(function (el) { el.textContent = S.areas.join(', '); });
    $$('[data-map]').forEach(function (f) {
      f.src = 'https://www.google.com/maps?q=' + encodeURIComponent(S.areas[0]) + '&z=11&output=embed';
    });
  }

  /* ---------- Office hours ---------- */
  var now = new Date(), day = now.getDay(), mins = now.getHours() * 60 + now.getMinutes();
  var toMin = function (t) { var p = (t || '').split(':'); return p.length === 2 ? (+p[0]) * 60 + (+p[1]) : null; };
  var fmt = function (t) {
    var m = toMin(t); if (m === null) return '';
    var h = Math.floor(m / 60), mm = m % 60, ap = h >= 12 ? 'pm' : 'am'; h = h % 12 || 12;
    return h + (mm ? ':' + String(mm).padStart(2, '0') : '') + ap;
  };
  var hours = S.hours || [];
  var today = hours.filter(function (h) { return h.days.indexOf(day) > -1; })[0];
  var officeOpen = !!(today && today.open && mins >= toMin(today.open) && mins < toMin(today.close));
  $$('[data-hours]').forEach(function (t) {
    t.innerHTML = hours.map(function (h) {
      var v = h.open ? fmt(h.open) + ' – ' + fmt(h.close) : (S.emergency247 ? 'Emergencies only' : 'Closed');
      return '<tr' + (h === today ? ' class="today"' : '') + '><td>' + esc(h.label) + '</td><td>' + v + '</td></tr>';
    }).join('');
  });
  $$('[data-availability]').forEach(function (el) {
    el.textContent = officeOpen ? 'Taking calls now' : (S.emergency247 ? 'Emergency line open now' : 'Leave a message, we’ll call back');
  });

  /* ---------- Mobile menu ---------- */
  var btn = $('.menu-btn'), nav = $('.mobile-nav');
  if (btn && nav) {
    btn.addEventListener('click', function () { btn.setAttribute('aria-expanded', nav.classList.toggle('open')); });
    $$('a', nav).forEach(function (a) { a.addEventListener('click', function () { nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }); });
  }

  /* ---------- Missing photos: labelled placeholder ---------- */
  $$('img[data-photo]').forEach(function (img) {
    var mark = function () {
      var box = img.parentElement;
      if (box.classList.contains('img-missing')) return;
      box.classList.add('img-missing'); img.style.display = 'none';
      var s = document.createElement('span'); s.textContent = 'Add photo: ' + img.getAttribute('src'); box.appendChild(s);
    };
    if (img.complete && img.naturalWidth === 0) mark();
    img.addEventListener('error', mark);
  });

  /* ---------- "Book" buttons pick the job type in the quote form ---------- */
  var form = $('#quote-form');
  $$('[data-job]').forEach(function (a) {
    a.addEventListener('click', function () { var s = form && $('select[name=job]', form); if (s) s.value = a.dataset.job; });
  });

  /* ---------- Quote form ---------- */
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = new FormData(form), msg = $('.form-msg', form.parentElement), b = $('button[type=submit]', form);
    if (S.formEndpoint) {
      b.disabled = true; b.textContent = 'Sending…';
      fetch(S.formEndpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw 0; form.reset(); msg.textContent = 'Thanks, we’ve got your request and will call you back shortly. For emergencies please ring ' + (S.phone || '') + '.'; msg.classList.add('show'); })
        .catch(function () { msg.textContent = 'Sorry, that didn’t send. Please call ' + (S.phone || '') + '.'; msg.classList.add('show'); })
        .then(function () { b.disabled = false; b.textContent = 'Get my free quote'; });
    } else {
      var body = []; data.forEach(function (v, k) { if (v) body.push(k + ': ' + v); });
      location.href = 'mailto:' + (S.email || '') + '?subject=' + encodeURIComponent('Quote request') + '&body=' + encodeURIComponent(body.join('\n'));
    }
  });

  /* ---------- Fade in on scroll ---------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .1 });
    $$('.reveal').forEach(function (el) { io.observe(el); });
  } else { $$('.reveal').forEach(function (el) { el.classList.add('in'); }); }

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
})();
