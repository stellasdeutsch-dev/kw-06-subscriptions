/* Сборщик страницы: читает window.SITE (его вписывает build.py из content.en.json / content.tr.json) и рисует блоки.
   Страница: <body data-page="full"> (с рекламой) или data-page="lesson" (без рекламы). */
(function () {
  var S = window.SITE, D = document;
  var PAGE = D.body.getAttribute('data-page') || 'full';
  var BASE = D.body.getAttribute('data-base') || '';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- иконки (свой набор, stroke 1.8) ---------- */
  var P = {
    telegram: '<path d="M21 4 3 11l6 2 2 6 3-4 5 4 2-15Z"/><path d="m9 13 8-6"/>',
    whatsapp: '<path d="M4 20l1.2-4A8 8 0 1 1 8 19Z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.6-2-1-1 .8a4 4 0 0 1-2.2-2.2l.8-1-1-2Z"/>',
    fire: '<path d="M12 21c-3.3 0-6-2.4-6-5.6 0-2.6 1.6-4.3 3-5.8.4 1.6 1.3 2.6 2.4 3C11 9 12.5 5.6 15 3c.2 3 2.2 4.6 3 6.8.5 1.3 0 2.7 0 2.7 0 4.6-2.8 8.5-6 8.5Z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    burger: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    headphones: '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>',
    cards: '<rect x="7" y="4" width="12" height="15" rx="2"/><path d="M5 7v11a2 2 0 0 0 2 2h9"/>',
    plane: '<path d="M3 11 21 4l-6 17-3.5-7.5Z"/><path d="m11.5 13.5 4-4"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M6 11a6 6 0 0 0 12 0M12 17v4M9 21h6"/>',
    cap: '<path d="m2 9 10-5 10 5-10 5Z"/><path d="M6 11v5c3 2 9 2 12 0v-5M22 9v5"/>',
    pen: '<path d="M4 20h4L19 9l-4-4L4 16Z"/><path d="m13.5 6.5 4 4"/>',
    chat: '<path d="M4 5h16v11H9l-5 4Z"/><path d="M8 10h8"/>',
    book: '<path d="M4 5c3-1.3 5.5-1.3 8 0v15c-2.5-1.3-5-1.3-8 0Z"/><path d="M12 5c2.5-1.3 5-1.3 8 0v15c-3-1.3-5.5-1.3-8 0"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    arrow: '<path d="M7 4c5 1 9 3 6 6s-6 2-3 5 5 2 3 5"/><path d="m9.5 18 3.5 2.5 1-4"/>'
  };
  function ic(n, cls) { return '<svg class="ic ic-' + n + ' ' + (cls || '') + '" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + (P[n] || '') + '</svg>'; }
  var STAR = '<svg class="star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0c.9 6.4 5.6 11.1 12 12-6.4.9-11.1 5.6-12 12-.9-6.4-5.6-11.1-12-12C6.4 11.1 11.1 6.4 12 0Z" fill="currentColor"/></svg>';

  /* ---------- утилиты ---------- */
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function md(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>'); }
  function src(p) { return /^https?:/.test(p) ? p : BASE + p; }
  function img(o, cls, eager) {
    return '<img class="' + (cls || '') + '" src="' + src(o.src) + '"' + (o.w ? ' width="' + o.w + '" height="' + o.h + '"' : '') +
      ' alt="' + esc(o.alt || '') + '"' + (eager ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async">';
  }
  function link(k) { return S.links[k] || k; }
  function ext(href) { return /^https?:/.test(href) ? ' target="_blank" rel="noopener"' : ''; }
  function btn(label, href, cls) {
    return '<a class="btn ' + (cls || '') + '" href="' + esc(href) + '"' + ext(href) + '><span class="btn__glow" aria-hidden="true"></span><span class="btn__t">' + esc(label) + '</span>' + ic('fire', 'btn__ic') + '</a>';
  }
  function head(script, title, cls) {
    return '<div class="sh ' + (cls || '') + '"><p class="script sh__script">' + esc(script) + '</p><h2 class="metal sh__title">' + esc(title) + '</h2></div>';
  }
  function visible(b) { return !b.only || b.only === PAGE; }

  /* ---------- блоки ---------- */
  var R = {};

  R.header = function () {
    var nav = S.nav.filter(visible).map(function (n) { return '<a href="' + n.href + '">' + esc(n.label) + '</a>'; }).join('');
    var soc = S.social.filter(function (x) { return x.href; }).map(function (x) {
      return '<a class="hdr__soc" href="' + esc(x.href) + '"' + ext(x.href) + ' aria-label="' + esc(x.label) + '">' + ic(x.icon) + '</a>';
    }).join('');
    return '<header class="hdr"><div class="wrap hdr__in">' +
      '<a class="logo" href="#top" aria-label="' + esc(S.brand.name) + '"><span class="logo__name">' + esc(S.brand.name) + '</span><span class="logo__badge">' + esc(S.brand.badge) + '</span></a>' +
      '<nav class="hdr__nav" aria-label="Разделы">' + nav + '</nav>' +
      '<div class="hdr__right">' + soc + '<button class="hdr__burger" type="button" aria-label="Открыть меню" aria-expanded="false">' + ic('burger') + '</button></div>' +
      '</div>' +
      '<div class="menu" hidden><button class="menu__close" type="button" aria-label="Закрыть меню">' + ic('close') + '</button><nav>' + nav + '</nav><div class="menu__soc">' + soc + '</div></div>' +
      '</header>';
  };

  R.hero = function (b) {
    function side(o, cls) {
      return '<div class="hero__side ' + cls + '"><p class="script hero__script">' + esc(o.script) + '</p><h1 class="metal hero__title">' +
        o.title.map(function (l) { return '<span>' + esc(l) + '</span>'; }).join('') + '</h1></div>';
    }
    return '<section class="hero" id="' + b.id + '">' +
      '<div class="hero__bg" style="background-image:url(' + src(b.bg) + ')" aria-hidden="true"></div>' +
      '<div class="wrap hero__in">' +
      '<div class="hero__mtitle metal" aria-hidden="true">' + b.left.title.concat(b.right.title).map(function (l) { return '<span>' + esc(l) + '</span>'; }).join('') + '</div>' +
      side(b.left, 'hero__side--l') + side(b.right, 'hero__side--r') +
      '<div class="hero__person">' + img(b.person, '', true) + '</div>' +
      R.marquee({ hero: true }) +
      '<p class="hero__text">' + md(b.text) + '</p>' +
      '<div class="hero__cta">' + btn(b.cta.label, b.cta.href, 'btn--xl') + '</div>' +
      '</div></section>';
  };

  R.marquee = function (b) {
    function row(items, cls) {
      var one = items.map(function (x) { return '<span class="mq__it mq__it--' + x.s + '">' + esc(x.t) + '</span>'; }).join('');
      return '<div class="mq__row ' + cls + '"><div class="mq__track">' + one + one + '</div></div>';
    }
    return '<div class="mq' + (b.footer ? ' mq--footer' : '') + (b.hero ? ' mq--hero' : '') + '" aria-hidden="true">' + row(S.marquee.rowA, 'mq__row--a') + row(S.marquee.rowB, 'mq__row--b') + '</div>';
  };

  function bentoCard(c) {
    if (c.kind === 'accent') {
      return '<div class="bc bc--accent"><p class="bc__big metal-warm">' + esc(c.big) + '</p><p class="bc__t">' + md(c.text) + '</p><p class="bc__s">' + esc(c.small) + '</p></div>';
    }
    return '<div class="bc bc--img' + (c.tall ? ' bc--tall' : '') + '"><div class="bc__pic"><img src="' + src(c.img) + '" width="388" height="275" alt="" loading="lazy" decoding="async"><span class="bc__badge">' + ic(c.icon) + '</span></div><p class="bc__txt">' + md(c.text) + '</p></div>';
  }
  R.bento = function (b) {
    return '<section class="sec bento" id="' + b.id + '"><div class="wrap">' + head(b.script, b.title) +
      '<div class="bento__grid">' + b.columns.map(function (col) { return '<div class="bento__col">' + col.map(bentoCard).join('') + '</div>'; }).join('') + '</div>' +
      '</div><img class="decor decor--leaf" src="' + src('media/decor-leaf.webp') + '" width="426" height="304" alt="" loading="lazy"></section>';
  };

  function notchCard(inner, cls) { return '<div class="notch ' + (cls || '') + '"><span class="notch__tab" aria-hidden="true"></span>' + inner + '</div>'; }

  R.check = function (b) {
    var fields = b.fields.map(function (f, i) {
      return '<label class="field">' + ic(f.icon) + '<span class="sr">' + esc(f.label) + '</span><input type="text" name="q' + i + '" placeholder="' + esc(f.label) + '" autocomplete="off" spellcheck="false"></label>';
    }).join('');
    var left = '<div class="check__media" aria-hidden="false">' +
      b.phones.map(function (p, i) { return '<div class="phone phone--' + (i + 1) + '"><img src="' + src(p.src) + '" alt="' + esc(p.alt) + '" loading="lazy" decoding="async" width="540" height="1169"></div>'; }).join('') +
      img(b.person, 'check__person') + '</div>';
    var right = '<form class="check__form" novalidate><h2 class="metal check__title">' + b.title.map(function (l) { return '<span>' + esc(l) + '</span>'; }).join('') + '</h2>' +
      '<p class="script check__script">' + esc(b.script) + '</p><p class="check__text">' + md(b.text) + '</p>' + fields +
      '<button class="btn btn--block" type="submit"><span class="btn__glow" aria-hidden="true"></span><span class="btn__t">' + esc(b.button) + '</span>' + ic('fire', 'btn__ic') + '</button>' +
      '<p class="check__note" aria-live="polite">' + md(b.note) + '</p></form>';
    return '<section class="sec check" id="' + b.id + '"><div class="check__bg" style="background-image:url(' + src(b.bg) + ')" aria-hidden="true"></div><div class="wrap">' +
      notchCard('<div class="check__grid">' + left + right + '</div>', 'check__card') +
      '</div><img class="decor decor--gem" src="' + src('media/decor-gem.webp') + '" width="430" height="330" alt="" loading="lazy"></section>';
  };

  function tiles() {
    var L = 'AÜŞWÇĞQÖİTHÉ', out = '';
    for (var i = 0; i < 72; i++) out += '<span>' + L[(i * 7) % L.length] + '</span>';
    return out;
  }
  R.rules = function (b) {
    function col(arr, cls) { return '<ul class="rules__col ' + cls + '">' + arr.map(function (t) { return '<li>' + STAR + '<span>' + md(t) + '</span></li>'; }).join('') + '</ul>'; }
    return '<section class="sec rules" id="' + b.id + '"><div class="rules__tiles" aria-hidden="true">' + tiles() + '</div><div class="wrap">' + head(b.script, b.title) +
      '<p class="lead">' + md(b.text) + '</p>' +
      '<div class="rules__stage">' + col(b.left, 'rules__col--l') +
      '<div class="ring"><div class="ring__in">' + img(b.img) + '</div></div>' + col(b.right, 'rules__col--r') + '</div>' +
      '<div class="rules__cta">' + btn(b.cta.label, b.cta.href) + '</div>' +
      '</div><img class="decor decor--key" src="' + src('media/decor-key.webp') + '" width="422" height="282" alt="" loading="lazy"></section>';
  };

  R.faq = function (b) {
    var items = b.items.map(function (it, i) {
      return '<div class="qa' + (i === 1 ? ' is-open' : '') + '"><button class="qa__q" type="button" aria-expanded="' + (i === 1) + '"><span>' + esc(it.q) + '</span>' +
        '<span class="qa__ic">' + ic('plus', 'qa__plus') + ic('minus', 'qa__minus') + '</span></button><div class="qa__a"><div><p>' + md(it.a) + '</p></div></div></div>';
    }).join('');
    return '<section class="sec faq" id="' + b.id + '"><div class="wrap">' + head(b.script, b.title) +
      '<div class="faq__grid"><div class="faq__list">' + items + '</div><div class="faq__person">' + img(b.person) + '</div></div>' +
      '</div><img class="decor decor--scroll" src="' + src('media/decor-scroll.webp') + '" width="540" height="301" alt="" loading="lazy"></section>';
  };

  R.band = function (b) {
    var w = '<span class="script band__w">' + esc(b.script) + '</span>';
    var row = new Array(6).join(w);
    return '<section class="band" id="' + b.id + '"><div class="band__row" aria-hidden="true"><div class="band__track">' + row + row + '</div></div>' +
      '<h2 class="band__title">' + STAR + '<span class="metal">' + esc(b.title) + '</span>' + STAR + '</h2><div class="wrap"><p class="lead band__lead">' + md(b.text) + '</p></div></section>';
  };

  R.author = function (b) {
    var icons = b.button.icons.map(function (n) { return ic(n); }).join('');
    return '<section class="sec author' + (b.flip ? ' author--flip' : '') + '"><div class="wrap"><div class="acard">' +
      '<span class="acard__tab" aria-hidden="true"></span>' +
      '<div class="acard__photo">' + img(b.photo) + '</div>' +
      '<div class="acard__body"><h2 class="metal acard__title">' + b.title.map(function (l) { return '<span>' + esc(l) + '</span>'; }).join('') + '</h2>' +
      b.paras.map(function (p) { return '<p>' + md(p) + '</p>'; }).join('') +
      '<div class="acard__row"><a class="pillbtn" href="' + esc(link(b.button.link)) + '" target="_blank" rel="noopener"><span class="btn__glow" aria-hidden="true"></span><span class="pillbtn__icons">' + icons + '</span><span class="pillbtn__t">' + esc(b.button.label) + '</span></a>' +
      '<p class="acard__side">' + esc(b.side) + ic('arrow') + '</p></div></div>' +
      '</div></div><img class="decor decor--scroll2" src="' + src('media/decor-scroll.webp') + '" width="540" height="301" alt="" loading="lazy"></section>';
  };

  R.task = function (b) {
    return '<section class="sec task"><div class="wrap task__grid">' +
      notchCard('<h2 class="metal task__title">' + esc(b.label) + STAR + '</h2><p>' + md(b.text) + '</p><p class="task__after">' + md(b.after) + '</p>', 'task__card') +
      '<div class="task__shot"><div class="phone phone--tilt">' + img(b.shot) + '</div></div>' +
      '</div></section>';
  };

  R.solution = function (b) {
    return '<section class="sec solution"><div class="wrap solution__grid">' +
      '<div class="collage">' + b.shots.map(function (s, i) { return '<div class="collage__it collage__it--' + (i + 1) + '">' + img(s) + '</div>'; }).join('') +
      '<img class="collage__gem" src="' + src('media/decor-gem.webp') + '" width="430" height="330" alt="" loading="lazy"><img class="collage__scroll" src="' + src('media/decor-scroll.webp') + '" width="540" height="301" alt="" loading="lazy"></div>' +
      notchCard('<h2 class="metal task__title">' + STAR + esc(b.label) + '</h2><p class="solution__pain">' + md(b.pain) + '</p><p>' + md(b.text) + '</p>', 'task__card') +
      '</div></section>';
  };

  R.shots = function (b) {
    var items = b.items.map(function (s) {
      var cls = 'shot' + (s.big ? ' shot--big' : '') + (s.phone ? ' shot--phone' : '');
      return '<figure class="' + cls + '"><div class="shot__pic">' + img({ src: s.src, w: s.w, h: s.h, alt: s.cap.replace(/\*\*/g, '') }) + '</div><figcaption>' + md(s.cap) + '</figcaption></figure>';
    }).join('');
    var stats = b.stats.map(function (c) { return '<div class="bc bc--accent bc--stat"><p class="bc__big metal-warm" data-count="' + esc(c.big) + '">' + esc(c.big) + '</p><p class="bc__t">' + md(c.text) + '</p><p class="bc__s">' + esc(c.small) + '</p></div>'; }).join('');
    return '<section class="sec shots"><div class="wrap">' + head(b.script, b.title) +
      '<div class="shots__grid">' + items + '</div><div class="stats stats--' + b.stats.length + '">' + stats + '</div>' +
      '<div class="shots__cta">' + btn(b.cta.label, link(b.cta.link)) + '</div></div></section>';
  };

  R.levels = function (b) {
    return '<section class="sec levels"><div class="wrap">' + head(b.script, b.title) + '<div class="levels__grid levels__grid--' + b.items.length + '">' +
      b.items.map(function (it) { return '<div class="lvl"><span class="lvl__tag">' + esc(it.tag) + '</span><h3 class="lvl__title">' + esc(it.title) + '</h3><p>' + md(it.text) + '</p></div>'; }).join('') +
      '</div></div></section>';
  };

  R.calc = function (b) {
    var list = b.counters.map(function (c) { return '<li><span class="calc__n metal-warm" data-count="' + c.n + c.suf + '">' + c.n + c.suf + '</span><span class="calc__t">' + esc(c.text) + '</span></li>'; }).join('');
    return '<section class="sec calc"><div class="wrap">' + head(b.script, b.title) + '<div class="calc__grid">' +
      '<div class="calc__ring"><div class="calc__in" style="background-image:url(' + src('media/cinema.webp') + ')"><p class="calc__big">' + esc(b.circle.big) + '</p><p class="calc__cap">' + esc(b.circle.text) + '</p></div></div>' +
      notchCard('<ul class="calc__list">' + list + '</ul><p class="calc__formula">' + md(b.formula) + '</p>' + btn(b.cta.label, link(b.cta.link), 'btn--block'), 'calc__card') +
      '</div></div><img class="decor decor--leaf2" src="' + src('media/decor-leaf.webp') + '" width="426" height="304" alt="" loading="lazy"></section>';
  };

  R.price = function (b) {
    var cards = b.cards.map(function (c) {
      return notchCard('<h3 class="metal price__name">' + esc(c.name) + '</h3><p class="price__sum metal-warm">' + esc(c.price) + '</p><p class="price__sub">' + esc(c.sub) + '</p>' +
        '<ul class="price__list">' + c.list.map(function (t) { return '<li>' + ic('check') + '<span>' + esc(t) + '</span></li>'; }).join('') + '</ul>' +
        btn(c.button.label, link(c.button.link), 'btn--block') +
        (c.extra ? '<a class="ghost" href="' + esc(link(c.extra.link)) + '" target="_blank" rel="noopener">' + ic('whatsapp') + esc(c.extra.label) + '</a>' : '') +
        '<p class="price__note">' + md(c.note) + '</p>', 'price__card');
    }).join('');
    return '<section class="sec price"><div class="price__bg" style="background-image:url(' + src('media/cinema.webp') + ')" aria-hidden="true"></div><div class="wrap">' + head(b.script, b.title) + '<div class="price__grid">' + cards + '</div></div></section>';
  };

  R.end = function (b) {
    return '<section class="sec end"><div class="wrap">' + notchCard('<h2 class="metal end__title">' + b.title.map(function (l) { return '<span>' + esc(l) + '</span>'; }).join(' ') + '</h2><p>' + md(b.text) + '</p>' + btn(b.button.label, b.button.href), 'end__card') + '</div></section>';
  };

  /* ---------- сборка ---------- */
  D.documentElement.lang = S.lang;
  var html = R.header() + '<main>' + S.blocks.filter(visible).map(function (b) { return R[b.type] ? R[b.type](b) : ''; }).join('') + '</main>' +
    '<footer class="ftr"><div class="wrap">' + esc(S.footer) + '</div></footer>';
  D.getElementById('app').innerHTML = html;

  /* ---------- меню на телефоне ---------- */
  var menu = D.querySelector('.menu'), burger = D.querySelector('.hdr__burger');
  function setMenu(open) {
    menu.hidden = !open; burger.setAttribute('aria-expanded', open); D.body.classList.toggle('no-scroll', open);
    if (open) menu.querySelector('.menu__close').focus();
  }
  burger.addEventListener('click', function () { setMenu(true); });
  menu.addEventListener('click', function (e) { if (e.target.closest('.menu__close') || e.target.closest('a')) setMenu(false); });
  D.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); burger.focus(); } });

  /* ---------- шапка при прокрутке ---------- */
  var hdr = D.querySelector('.hdr');
  function onScroll() { hdr.classList.toggle('is-scrolled', scrollY > 30); }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- FAQ ---------- */
  D.querySelectorAll('.qa__q').forEach(function (q) {
    q.addEventListener('click', function () {
      var it = q.parentNode, open = !it.classList.contains('is-open');
      it.classList.toggle('is-open', open); q.setAttribute('aria-expanded', open);
    });
  });

  /* ---------- Проверь себя ---------- */
  var chk = S.blocks.filter(function (b) { return b.type === 'check'; })[0];
  var form = D.querySelector('.check__form');
  if (form && chk) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = 0, right = [];
    chk.fields.forEach(function (f, i) {
      var inp = form.querySelector('[name=q' + i + ']'), v = inp.value.trim().toLowerCase().replace(/[.!?]+$/, '');
      var good = f.answers.some(function (a) { return a.toLowerCase() === v; });
      inp.parentNode.classList.toggle('is-ok', good); inp.parentNode.classList.toggle('is-bad', !good);
      if (good) ok++; right.push(f.answers.slice(0, 2).join(' / '));
    });
    var r = chk.results, note = form.querySelector('.check__note');
    note.innerHTML = ok === chk.fields.length ? md(r.all) : md(ok ? r.some : r.none) + esc(right.join('; '));
  });

  /* ---------- счётчики ---------- */
  var nums = D.querySelectorAll('[data-count]');
  function runCount(el) {
    var m = String(el.getAttribute('data-count')).match(/^(\d+)(.*)$/); if (!m) return;
    var to = +m[1], suf = m[2], t0 = null, dur = 1300;
    function step(t) { if (!t0) t0 = t; var k = Math.min(1, (t - t0) / dur); k = 1 - Math.pow(1 - k, 3); el.textContent = Math.round(to * k) + suf; if (k < 1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }
  if (!reduce && 'IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { runCount(x.target); cio.unobserve(x.target); } }); }, { threshold: .6 });
    nums.forEach(function (el) { cio.observe(el); });
  }

  /* ---------- появление при прокрутке ---------- */
  if (!reduce && 'IntersectionObserver' in window) {
    var els = D.querySelectorAll('.sh, .bc, .notch, .acard, .shot, .lvl, .ring, .calc__ring, .rules__col li, .qa, .faq__person, .collage__it');
    els.forEach(function (el) { el.classList.add('rv'); });
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }
})();
