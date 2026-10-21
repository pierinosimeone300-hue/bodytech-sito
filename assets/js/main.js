/* =========================================================
   Bodytech — script condiviso
   - header e footer comuni a tutte le pagine
   - renderer dei blocchi dinamici (data-render="...")
   ========================================================= */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const C = BT.company;
  const page = document.body.dataset.page;
  /* Le pagine in sottocartella (categoria/, prodotto/) dichiarano data-root="../" */
  const ROOT = document.body.dataset.root || "";
  let io; // osservatore dell'animazione di comparsa (usato anche dai renderer qui sotto)
  const L = h => ROOT + h;
  const link = x => (x.href ? L(x.href) : BT.old(x.url));

  const ICON = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    help: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14M12 17.5v.01"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m5 12 5 5L20 7"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4v16l13-8z"/></svg>',
    tool: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h10"/></svg>',
    video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    hand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 11V6a2 2 0 1 1 4 0v5M11 10V4a2 2 0 1 1 4 0v6M15 10V6a2 2 0 1 1 4 0v8a7 7 0 0 1-7 7h-1a7 7 0 0 1-6-3.5L3 14a2 2 0 0 1 3.4-2L7 13"/></svg>',
    cap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8.5a.5.5 0 0 1 .5-.5z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg>',
    yt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .4-3.8 31 31 0 0 0-.4-3.8zM10 15V9l5.2 3z"/></svg>',
    in: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.5 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM3 9h3v12H3zM9 9h3v1.7c.5-.9 1.7-1.9 3.5-1.9 3.4 0 4 2.2 4 5.1V21h-3v-6.2c0-1.5 0-3.4-2-3.4s-2.4 1.6-2.4 3.3V21H9z"/></svg>'
  };
  BT.ICON = ICON;

  /* ---------- HEADER ---------- */
  const NAV = [
    ["prodotti", "Prodotti", "prodotti.html"],
    ["marchi", "Marchi", "marchi.html"],
    ["academy", "Academy", "academy.html"],
    ["supporto", "Supporto", "supporto.html"],
    ["novita", "Novità", "novita.html"],
    ["azienda", "Azienda", "azienda.html"],
    ["contatti", "Contatti", "contatti.html"]
  ];
  const cur = id => (page === id || (page === "moduli" && id === "supporto") ? ' aria-current="page"' : "");
  const mega = `<div class="mega" id="mega-prodotti">
      ${BT.productMenu.map(col => `<div><h4>${col.title}</h4><ul>${col.items.map(([n, h]) => `<li><a href="${L(h)}">${n}</a></li>`).join("")}</ul></div>`).join("")}
      <div class="mega__all"><a class="btn btn--primary" href="${L("prodotti.html")}">Tutto il catalogo</a><a class="link-arrow" href="${L("marchi.html")}">Tutti i marchi</a></div>
    </div>`;
  const navLinks = NAV.map(([id, label, href]) => id === "prodotti"
    ? `<div class="nav-item has-mega"><a href="${L(href)}"${cur(id)}>${label}</a><button class="mega-toggle" aria-expanded="false" aria-controls="mega-prodotti" aria-label="Apri menu prodotti">▾</button>${mega}</div>`
    : `<a href="${L(href)}"${cur(id)}>${label}</a>`).join("");

  $("#site-header").outerHTML = `
    <a class="skip" href="#main">Salta al contenuto</a>
    <header class="header"><div class="container">
      <a class="logo" href="${L("index.html")}" aria-label="Bodytech — home">
        <img src="${BT.logo}" srcset="${BT.logo} 1x, ${BT.logoRetina} 2x" alt="Bodytech" width="215" height="34">
      </a>
      <nav class="nav" id="nav" aria-label="Principale">${navLinks}
        <div class="nav-extra">
          <a href="${C.phoneHref}">${C.phone}</a>
          <a href="${L("rivenditori.html")}">Trova un rivenditore</a>
          <a href="${L("moduli-ordine.html")}">Moduli d’ordine</a>
        </div>
      </nav>
      <div class="header__cta">
        <a class="btn btn--ghost" href="${L("moduli-ordine.html")}">Moduli d’ordine</a>
        <a class="btn btn--primary" href="${L("contatti.html#newsletter")}">Newsletter</a>
        <button class="menu-btn" aria-label="Apri menu" aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span></button>
      </div>
    </div></header>`;

  const mb = $(".menu-btn"), nav = $("#nav");
  mb.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    mb.setAttribute("aria-expanded", open);
  });
  const mt = $(".mega-toggle"), hm = $(".has-mega");
  mt.addEventListener("click", () => mt.setAttribute("aria-expanded", hm.classList.toggle("open")));
  document.addEventListener("keydown", e => { if (e.key === "Escape") { hm.classList.remove("open"); mt.setAttribute("aria-expanded", false); } });

  /* ---------- FOOTER ---------- */
  const catLinks = [["Carrozzine", "categoria/carrozzine.html"], ["Sistemi di seduta", "categoria/sistemi-di-seduta.html"],
    ["Posizionamento", "categoria/posizionamento.html"], ["Propulsori", "categoria/propulsori.html"], ["Tutto il catalogo", "prodotti.html"]]
    .map(([n, h]) => `<li><a href="${L(h)}">${n}</a></li>`).join("");
  $("#site-footer").outerHTML = `
    <footer class="footer"><div class="container">
      <div class="footer__grid">
        <div>
          <img src="${BT.logo}" alt="Bodytech" height="30" style="height:30px;width:auto">
          <div class="footer__company">${C.legal.join("<br>")}</div>
          <div class="socials">
            <a href="${BT.social.facebook}" aria-label="Facebook" target="_blank" rel="noopener">${ICON.fb}</a>
            <a href="${BT.social.instagram}" aria-label="Instagram" target="_blank" rel="noopener">${ICON.ig}</a>
            <a href="${BT.social.youtube}" aria-label="YouTube" target="_blank" rel="noopener">${ICON.yt}</a>
            <a href="${BT.social.linkedin}" aria-label="LinkedIn" target="_blank" rel="noopener">${ICON.in}</a>
          </div>
        </div>
        <div><h4>Prodotti</h4><ul>${catLinks}<li><a href="${L("marchi.html")}">Tutti i marchi</a></li></ul></div>
        <div><h4>Servizi</h4><ul>
          <li><a href="${L("supporto.html")}">Supporto</a></li>
          <li><a href="${L("moduli-ordine.html")}">Moduli d’ordine</a></li>
          <li><a href="${L("academy.html")}">Bodytech Academy</a></li>
          <li><a href="${L("novita.html")}">Novità</a></li>
        </ul></div>
        <div><h4>Contatti</h4><ul>
          <li>${C.address}</li>
          <li><a href="${C.phoneHref}">${C.phone}</a></li>
          <li><a href="mailto:${C.email}">${C.email}</a></li>
          <li><a href="${L("rivenditori.html")}">Trova un rivenditore</a></li>
          <li><a href="${L("forza-vendita.html")}">Forza vendita</a></li>
          <li><a href="${L("pagine/lavora-con-noi.html")}">Lavora con noi</a></li>
        </ul></div>
      </div>
      <div class="footer__legal">
        <span>© 2012–${new Date().getFullYear()} Bodytech S.r.l.</span>
        <nav aria-label="Note legali">
          <a href="${L("pagine/condizioni-generali-di-vendita.html")}">Condizioni generali di vendita</a>
          <a href="${L("pagine/note-legali.html")}">Note legali</a>
          <a href="${L("pagine/privacy-policy.html")}">Privacy</a>
          <a href="${L("pagine/cookie-policy.html")}">Cookie</a>
          <a href="${L("pagine/policy-sui-social-media.html")}">Social media policy</a>
          <button type="button" class="linklike" data-cookie-prefs>Preferenze cookie</button>
        </nav>
      </div>
    </div></footer>`;

  /* ---------- RENDERER ---------- */
  /* foto pulita della categoria (copertina originale, senza scritte) se il catalogo è caricato */
  const catPhoto = c => {
    const K = window.CATALOGO; if (!K) return c.img && BT.img(c.img);
    const m = (c.href || "").match(/categoria\/([\w-]+)\.html/), p = (c.href || "").match(/prodotto\/([\w-]+)\.html/);
    return (m && K.cats[m[1]]?.thumb) || (p && K.prods[p[1]]?.img) || (c.img && BT.img(c.img));
  };
  const catCard = c => {
    const src = catPhoto(c);
    const media = src ? `<img src="${src}" alt="" loading="lazy">` : c.name;
    return `<a class="cat-card${c.img ? "" : " cat-card--noimg"} reveal" href="${link(c)}">
      <div class="cat-card__media">${media}</div>
      <div class="cat-card__body"><div><span>${BT.groups.find(g => g.id === c.group).name}</span><h3>${c.name}</h3></div></div></a>`;
  };

  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const prodCard = (slug, p) => `<a class="prod-card reveal" href="${L("prodotto/" + slug + ".html")}">
      <div class="prod-card__img"><img src="${esc(p.img)}" alt="${esc(p.name)}" loading="lazy"></div>
      <div class="prod-card__body">${p.brand ? `<span class="tag">${esc(p.brand)}</span>` : ""}<h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p><span class="link-arrow">Dettagli prodotto</span></div></a>`;

  /* Articoli: dal blog importato (blog.js) se presente, altrimenti dall'elenco breve in data.js */
  const fmtDate = iso => new Date(iso).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" });
  const POSTS = window.BLOG
    ? BLOG.map(b => ({ href: L("articoli/" + b.slug + ".html"), img: b.img, cats: b.cats, catSlugs: b.catSlugs, title: b.title, date: fmtDate(b.date), author: b.author, excerpt: b.excerpt }))
    : BT.news.map(n => ({ href: BT.old(n.url), img: BT.img(n.img), cats: n.cats, catSlugs: [], title: n.title, date: n.date, author: n.author, excerpt: "" }));
  const newsCard = n => `
    <a class="news-card reveal" href="${n.href}">
      ${n.img ? `<img src="${esc(n.img)}" alt="" loading="lazy">` : `<div class="news-card__ph"></div>`}
      <div class="news-card__body">
        <span class="tag">${esc(n.cats[0] || "Novità")}</span>
        <h3>${esc(n.title)}</h3>
        ${n.excerpt ? `<p class="news-card__ex">${esc(n.excerpt)}</p>` : ""}
        <span class="news-card__meta">${n.date}${n.author ? " · " + esc(n.author) : ""}</span>
      </div>
    </a>`;

  const R = {
    /* Home: categorie principali (8) */
    "home-cats"(el) {
      const pick = ["Carrozzine superleggere", "Carrozzine elettroniche", "Stabilizzatori di statica elettrici", "Carrozzine basculanti",
        "Cuscini", "Schienali", "Propulsori", "Linea pediatrica"];
      el.innerHTML = pick.map(n => catCard(BT.categories.find(c => c.name === n))).join("");
    },

    /* Catalogo completo con filtri e ricerca */
    catalog(el) {
      const q = new URLSearchParams(location.search).get("q") || "";
      const input = $("#cat-search"), chips = $("#cat-chips");
      input.value = q;
      let active = location.hash.slice(1) || "all";
      chips.innerHTML = [["all", "Tutte"], ...BT.groups.map(g => [g.id, g.name])]
        .map(([id, n]) => `<button class="chip" data-g="${id}" aria-pressed="${id === active}">${n}</button>`).join("");

      const draw = () => {
        const term = input.value.trim().toLowerCase();
        const html = BT.groups.filter(g => active === "all" || g.id === active).map(g => {
          const items = BT.categories.filter(c => c.group === g.id && c.name.toLowerCase().includes(term));
          if (!items.length) return "";
          return `<section id="${g.id}" style="margin-bottom:64px">
            <div class="section-head"><div><span class="eyebrow">${g.name}</span><h2 style="margin:0">${g.desc}</h2></div></div>
            <div class="grid grid-4">${items.map(catCard).join("")}</div></section>`;
        }).join("");
        // prodotti che corrispondono alla ricerca (nome, marchio, descrizione, categoria)
        let prodHtml = "";
        if (term && window.CATALOGO) {
          const K = CATALOGO;
          const hits = Object.entries(K.prods).filter(([, p]) =>
            [p.name, p.brand, p.desc, K.cats[p.cat]?.name].join(" ").toLowerCase().includes(term));
          if (hits.length) prodHtml = `<section style="margin-bottom:64px">
            <div class="section-head"><div><span class="eyebrow">Prodotti</span><h2 style="margin:0">${hits.length} prodott${hits.length > 1 ? "i" : "o"} per “${esc(input.value)}”</h2></div></div>
            <div class="grid grid-3">${hits.map(([s, p]) => prodCard(s, p)).join("")}</div></section>`;
        }
        el.innerHTML = prodHtml + html || `<div class="empty">Nessun risultato per “${esc(input.value)}”. <a class="link-arrow" href="${L("contatti.html")}">Chiedi a un esperto</a></div>`;
        observe();
      };
      chips.addEventListener("click", e => {
        const b = e.target.closest("button"); if (!b) return;
        active = b.dataset.g;
        $$(".chip", chips).forEach(c => c.setAttribute("aria-pressed", c === b));
        history.replaceState(null, "", active === "all" ? location.pathname + location.search : "#" + active);
        draw();
      });
      input.addEventListener("input", draw);
      draw();
    },

    brands(el) {
      el.innerHTML = BT.brands.map(b =>
        `<a class="brand" href="${link(b)}" title="${b.name}"><img src="${BT.img(b.img)}" alt="${b.name}" loading="lazy"></a>`).join("");
    },

    "news-latest"(el) { el.innerHTML = POSTS.slice(0, 3).map(newsCard).join(""); },

    /* Blog: filtro per argomento, ricerca e "Mostra altri" */
    "news-all"(el) {
      const chips = $("#news-chips"), input = $("#news-search"), more = $("#news-more"), count = $("#news-count");
      const counts = {};
      POSTS.forEach(p => p.cats.forEach(c => counts[c] = (counts[c] || 0) + 1));
      const cats = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
      const slugOf = name => { const p = POSTS.find(x => x.cats.includes(name)); return p ? p.catSlugs[p.cats.indexOf(name)] : ""; };
      const want = new URLSearchParams(location.search).get("cat");
      let active = cats.find(c => slugOf(c) === want) || "Tutte", shown = 12;
      chips.innerHTML = ["Tutte", ...cats].map(c => `<button class="chip" aria-pressed="${c === active}">${esc(c)}${c === "Tutte" ? "" : ` <small>${counts[c]}</small>`}</button>`).join("");
      const draw = () => {
        const t = (input?.value || "").trim().toLowerCase();
        const list = POSTS.filter(n => (active === "Tutte" || n.cats.includes(active)) && (!t || (n.title + " " + n.excerpt).toLowerCase().includes(t)));
        el.innerHTML = list.slice(0, shown).map(newsCard).join("") || `<div class="empty" style="grid-column:1/-1">Nessun articolo trovato.</div>`;
        if (count) count.textContent = `${list.length} articol${list.length === 1 ? "o" : "i"}`;
        if (more) more.hidden = list.length <= shown;
        observe();
      };
      chips.addEventListener("click", e => {
        const b = e.target.closest("button"); if (!b) return;
        active = b.firstChild.textContent.trim(); shown = 12;
        $$(".chip", chips).forEach(c => c.setAttribute("aria-pressed", c === b));
        draw();
      });
      input && input.addEventListener("input", () => { shown = 12; draw(); });
      more && more.addEventListener("click", () => { shown += 12; draw(); });
      draw();
    },

    /* Slider prodotti in evidenza con video YouTube caricato al click */
    featured(el) {
      let i = 0;
      const F = BT.featured;
      const draw = () => {
        const f = F[i];
        const media = f.video
          ? `<img src="https://i.ytimg.com/vi/${f.video}/hqdefault.jpg" alt=""><button class="feature__play" aria-label="Guarda il video ${f.title}"><span>${ICON.play}</span></button>`
          : `<img src="${BT.img(f.img)}" alt="">`;
        el.innerHTML = `
          <div class="feature__media">${media}</div>
          <div class="feature__body">
            <span class="eyebrow">${f.kicker}</span>
            <h2>${f.title}</h2>
            <p>${f.text}</p>
            <div><a class="btn btn--light" href="${link(f)}">Scopri di più</a></div>
            <div class="feature__nav">
              <button data-d="-1" aria-label="Precedente">←</button><button data-d="1" aria-label="Successivo">→</button>
              <div class="feature__dots">${F.map((_, k) => `<i class="${k === i ? "on" : ""}"></i>`).join("")}</div>
            </div>
          </div>`;
        const play = $(".feature__play", el);
        if (play) play.addEventListener("click", () => {
          $(".feature__media", el).innerHTML =
            `<iframe src="https://www.youtube-nocookie.com/embed/${f.video}?autoplay=1&rel=0" title="${f.title}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
        });
      };
      el.addEventListener("click", e => {
        const b = e.target.closest("[data-d]"); if (!b) return;
        i = (i + Number(b.dataset.d) + F.length) % F.length; draw();
      });
      draw();
    },

    /* Moduli d'ordine: accordion + ricerca */
    "order-forms"(el) {
      const input = $("#forms-search");
      const draw = () => {
        const t = input.value.trim().toLowerCase();
        const html = BT.orderForms.map(g => {
          const items = g.items.filter(([n]) => !t || n.toLowerCase().includes(t) || g.cat.toLowerCase().includes(t));
          if (!items.length) return "";
          return `<details class="acc-item"${t ? " open" : ""}>
            <summary>${g.cat}<span class="count">${items.length} modul${items.length > 1 ? "i" : "o"}</span></summary>
            <ul class="doc-list">${items.map(([n, rev, upd]) =>
              `<li><a href="${BT.old("moduli-dordine/")}"><span class="pdf">PDF</span><span><b>${n}</b><br><small style="color:var(--muted)">${rev}</small></span>${upd ? '<span class="badge-upd">In aggiornamento</span>' : ""}</a></li>`).join("")}
            </ul></details>`;
        }).join("");
        el.innerHTML = html || `<div class="empty">Nessun modulo trovato.</div>`;
      };
      input.addEventListener("input", draw);
      draw();
    },

    course(el) {
      const c = BT.academy.course;
      el.innerHTML = `
        <div>
          <span class="level">${c.code} · ${c.level}</span>
          <h3 style="font-size:1.6rem">${c.title}</h3>
          <p>${c.text}</p>
          <p><b>Destinatari:</b> ${c.audience}</p>
          <a class="link-arrow" href="${BT.old("bodytech-academy/")}">Scarica il programma</a>
        </div>
        <div>
          <h4>Calendario 2026</h4>
          <ul class="dates">${c.dates.map(d => `<li>${d}</li>`).join("")}</ul>
          <a class="btn btn--primary" href="contatti.html?oggetto=academy#form">Richiedi di partecipare</a>
        </div>`;
    },

    benefits(el) {
      el.innerHTML = BT.academy.benefits.map(b => `<li class="reveal">${ICON.check}<span>${b}</span></li>`).join("");
    }
  };

  $$("[data-render]").forEach(el => R[el.dataset.render] && R[el.dataset.render](el));

  /* Tab (pagina Supporto) */
  $$("[role=tablist]").forEach(list => {
    const tabs = $$("[role=tab]", list);
    const select = t => tabs.forEach(x => {
      const on = x === t;
      x.setAttribute("aria-selected", on);
      x.tabIndex = on ? 0 : -1;
      $("#" + x.getAttribute("aria-controls")).hidden = !on;
    });
    tabs.forEach(t => t.addEventListener("click", () => select(t)));
    list.addEventListener("keydown", e => {
      const k = tabs.indexOf(document.activeElement);
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const n = tabs[(k + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
        n.focus(); select(n);
      }
    });
    const pre = new URLSearchParams(location.search).get("per");
    const start = tabs.find(t => t.dataset.key === pre) || tabs[0];
    select(start);
  });

  /* Filtri nelle pagine categoria (stessi filtri del sito originale:
     un valore per gruppo, il prodotto deve soddisfarli tutti) */
  const fBox = $("[data-filters]");
  if (fBox) {
    const cards = $$("[data-products] > [data-tags]");
    const count = $("[data-count]"), empty = $("[data-empty]"), reset = $(".filter-reset", fBox);
    const sel = {};
    const apply = () => {
      let n = 0;
      cards.forEach(c => {
        const tags = c.dataset.tags.split(" ");
        const ok = Object.values(sel).every(v => tags.includes(v));
        c.hidden = !ok; if (ok) n++;
      });
      count.textContent = n + (n === 1 ? " prodotto" : " prodotti");
      empty.hidden = n > 0;
      reset.hidden = !Object.keys(sel).length;
    };
    fBox.addEventListener("click", e => {
      const b = e.target.closest(".chip");
      if (b) {
        const g = b.dataset.group, on = b.getAttribute("aria-pressed") !== "true";
        $$(`.chip[data-group="${CSS.escape(g)}"]`, fBox).forEach(x => x.setAttribute("aria-pressed", "false"));
        if (on) { b.setAttribute("aria-pressed", "true"); sel[g] = b.dataset.value; } else delete sel[g];
        apply();
      }
      if (e.target.closest(".filter-reset")) {
        Object.keys(sel).forEach(k => delete sel[k]);
        $$(".chip", fBox).forEach(x => x.setAttribute("aria-pressed", "false"));
        apply();
      }
    });
  }

  /* Scheda prodotto: indice delle sezioni generato dai titoli */
  const pBody = $("[data-prod-body]");
  if (pBody) {
    const used = {};
    const heads = $$("section > .p-col > h2:first-child, section > .p-cols > .p-col > h2:first-child", pBody)
      .filter(h => h.textContent.trim().length < 40);
    heads.forEach(h => {
      let id = h.textContent.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      if (/documentaz|download/.test(id)) id = "documentazione";
      if (used[id]) id += "-" + ++used[id]; else used[id] = 1;
      h.closest("section").id = id;
    });
    const toc = $("[data-toc]");   // indice presente solo nelle schede prodotto
    if (toc) {
      if (heads.length > 1) toc.innerHTML = heads.map(h => `<a href="#${h.closest("section").id}">${esc(h.textContent.trim())}</a>`).join("");
      else toc.parentElement.remove();
    }
    const docBtn = $("[data-doc-link]");
    if (docBtn && $("#documentazione")) docBtn.hidden = false;
    // i link ai PDF diventano una lista di documenti
    $$("a.doc-link", pBody).forEach(a => a.insertAdjacentHTML("afterbegin", '<span class="pdf">PDF</span>'));
  }

  /* Figure consecutive (es. catalogo accessori con codice e descrizione) → griglia */
  $$(".prose, .p-col").forEach(box => {
    let run = [];
    const flush = () => {
      if (run.length > 1) {
        const grid = document.createElement("div");
        grid.className = "fig-grid";
        run[0].before(grid);
        run.forEach(f => grid.append(f));
      }
      run = [];
    };
    [...box.children].forEach(el => (el.tagName === "FIGURE" ? run.push(el) : flush()));
    flush();
  });

  /* Gallerie foto: immagine grande + miniature */
  $$("[data-gallery]").forEach(g => {
    const srcs = $$("img", g).map(i => i.getAttribute("src"));
    if (srcs.length < 2) return;
    let k = 0;
    g.innerHTML = `
      <div class="gallery__stage">
        <img src="${srcs[0]}" alt="Foto 1 di ${srcs.length}">
        <button class="gallery__nav prev" aria-label="Foto precedente">‹</button>
        <button class="gallery__nav next" aria-label="Foto successiva">›</button>
        <span class="gallery__count">1 / ${srcs.length}</span>
      </div>
      <div class="gallery__thumbs">${srcs.map((s, i) => `<button aria-label="Foto ${i + 1}"${i ? "" : ' aria-current="true"'}><img src="${s}" alt="" loading="lazy"></button>`).join("")}</div>`;
    const main = $(".gallery__stage img", g), cnt = $(".gallery__count", g), th = $$(".gallery__thumbs button", g);
    const show = i => {
      k = (i + srcs.length) % srcs.length;
      main.src = srcs[k]; main.alt = `Foto ${k + 1} di ${srcs.length}`;
      cnt.textContent = `${k + 1} / ${srcs.length}`;
      th.forEach((b, j) => b.toggleAttribute("aria-current", j === k));
      th[k].scrollIntoView({ block: "nearest", inline: "nearest" });
    };
    $(".prev", g).addEventListener("click", () => show(k - 1));
    $(".next", g).addEventListener("click", () => show(k + 1));
    th.forEach((b, j) => b.addEventListener("click", () => show(j)));
  });

  /* Contatti: precompila la richiesta di prova con il nome del prodotto */
  const prodQ = new URLSearchParams(location.search).get("prodotto");
  const msg = $("textarea[name=messaggio]");
  if (prodQ && msg) msg.value = `Vorrei richiedere una prova gratuita di: ${prodQ}`;

  /* Ricerca rapida in home → catalogo */
  const hs = $("#home-search");
  if (hs) hs.addEventListener("submit", e => {
    e.preventDefault();
    location.href = "prodotti.html?q=" + encodeURIComponent($("input", hs).value);
  });

  /* ---------- MODULI: senza server, preparano un'email pronta da inviare ----------
     Quando il sito avrà un servizio di invio, basta sostituire questa funzione. */
  const SUBJECTS = { info: "Informazioni generali", prova: "Richiesta di prova prodotto", cliente: "Diventare cliente Bodytech",
    presentazione: "Richiesta presentazione prodotti", assistenza: "Assistenza tecnica", academy: "Bodytech Academy" };
  $$("form[data-demo], form[data-mailto]").forEach(f => f.addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(f);
    const isNews = !!f.closest("#newsletter");
    const sel = data.get("oggetto");
    const subject = isNews ? "Iscrizione alla newsletter" : (f.dataset.subject || SUBJECTS[sel] || "Richiesta dal sito");
    const labels = { nome: "Nome", cognome: "Cognome", email: "Email", telefono: "Telefono", comune: "Comune / Ortopedia", messaggio: "Messaggio" };
    let body = "";
    for (const [k, v] of data.entries()) if (v && typeof v === "string" && k !== "oggetto" && k !== "newsletter") body += `${labels[k] || k}: ${v}\n`;
    if (isNews) body = `Vorrei iscrivermi alla newsletter Bodytech.\n${body}`;
    if (data.get("newsletter")) body += "\nDesidero ricevere la newsletter Bodytech.";
    location.href = `mailto:${C.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const note = $(".form-note", f);
    if (note) { note.textContent = "Si è aperto il tuo programma di posta con il messaggio pronto: premi “Invia” per spedirlo. Se non si apre, scrivici a " + C.email + "."; note.classList.add("show"); }
  }));
  const ogg = new URLSearchParams(location.search).get("oggetto");
  if (ogg && $("#subject")) $("#subject").value = ogg;

  /* ---------- COOKIE: banner di consenso e contenuti esterni ----------
     Senza consenso, video YouTube e mappe si caricano solo con un clic. */
  const CONSENT_KEY = "bt-consent";
  const getConsent = () => { try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; } };
  const setConsent = v => { try { localStorage.setItem(CONSENT_KEY, v); } catch (e) {} };
  const loadEmbeds = () => {
    $$("[data-yt]:not(.is-loaded)").forEach(playVideo);
    $$("iframe[data-src]").forEach(f => { f.src = f.dataset.src; f.removeAttribute("data-src"); f.closest(".consent-box")?.classList.add("is-loaded"); });
    document.dispatchEvent(new Event("bt-consent-all"));
  };
  function playVideo(v, autoplay) {
    v.classList.add("is-loaded");
    v.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${v.dataset.yt}?rel=0${autoplay ? "&autoplay=1" : ""}" title="Video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  }
  document.addEventListener("click", e => {
    const v = e.target.closest("[data-yt]:not(.is-loaded)");
    if (v) playVideo(v, true);
    const b = e.target.closest("[data-load-embed]");
    if (b) { const f = b.closest(".consent-box")?.querySelector("iframe[data-src]"); if (f) { f.src = f.dataset.src; f.removeAttribute("data-src"); b.closest(".consent-box").classList.add("is-loaded"); } }
  });
  const banner = () => {
    if ($(".cookie-banner")) return;
    document.body.insertAdjacentHTML("beforeend", `
      <div class="cookie-banner" role="dialog" aria-label="Preferenze cookie">
        <p><strong>Questo sito usa cookie.</strong> Usiamo cookie tecnici necessari al funzionamento e, solo con il tuo consenso, contenuti di terze parti (video YouTube e mappe). <a href="${L("pagine/cookie-policy.html")}">Cookie policy</a></p>
        <div class="cookie-banner__actions">
          <button class="btn btn--ghost" data-consent="necessary">Solo necessari</button>
          <button class="btn btn--primary" data-consent="all">Accetta tutti</button>
        </div>
      </div>`);
    $(".cookie-banner").addEventListener("click", e => {
      const b = e.target.closest("[data-consent]"); if (!b) return;
      setConsent(b.dataset.consent);
      $(".cookie-banner").remove();
      if (b.dataset.consent === "all") loadEmbeds();
    });
  };
  if (!getConsent()) banner(); else if (getConsent() === "all") loadEmbeds();
  $$("[data-cookie-prefs]").forEach(b => b.addEventListener("click", banner));

  /* ---------- Ricerca nei documenti (moduli d'ordine, cataloghi, manuali…) ---------- */
  const df = $("[data-doc-filter]");
  if (df) df.addEventListener("input", () => {
    const t = df.value.trim().toLowerCase();
    $$("[data-doc-search] a.doc-link").forEach(a => { (a.closest("li") || a).hidden = t && !a.textContent.toLowerCase().includes(t); });
    $$("[data-doc-search] section").forEach(s => { const links = $$("a.doc-link", s); if (links.length) s.hidden = t && links.every(a => (a.closest("li") || a).hidden); });
  });

  /* ---------- FAQ: ricerca e filtro per argomento ---------- */
  const ff = $("[data-faq-filter]");
  if (ff) {
    let grp = "";
    const apply = () => {
      const t = ff.value.trim().toLowerCase(); let n = 0;
      $$(".faq-group").forEach(g => {
        let vis = 0;
        $$(".acc-item", g).forEach(i => { const ok = (!grp || g.dataset.group === grp) && (!t || i.textContent.toLowerCase().includes(t)); i.hidden = !ok; if (ok) vis++; if (t && ok) i.open = true; });
        g.hidden = !vis; n += vis;
      });
      $("[data-faq-empty]").hidden = n > 0;
    };
    ff.addEventListener("input", apply);
    $("[data-faq-chips]").addEventListener("click", e => {
      const b = e.target.closest(".chip"); if (!b) return;
      grp = b.dataset.g; $$("[data-faq-chips] .chip").forEach(c => c.setAttribute("aria-pressed", c === b)); apply();
    });
  }

  /* ---------- RIVENDITORI: elenco filtrabile + mappa (OpenStreetMap) ---------- */
  const dl = $("[data-dealers]");
  if (dl && window.RIVENDITORI) {
    const RV = RIVENDITORI, PR = BT.provinces || {};
    const LV = { premium: "Premium Dealer", specialist: "Specialist Dealer", dealer: "Dealer" };
    const q = $("#dl-search"), reg = $("#dl-region"), cat = $("#dl-cat"), lvBox = $("#dl-levels"), count = $("#dl-count");
    const regions = [...new Set(RV.stores.map(s => PR[s.p]).filter(Boolean))].sort((a, b) => a.localeCompare(b, "it"));
    reg.innerHTML = `<option value="">Tutte le regioni</option>` + regions.map(r => `<option>${r}</option>`).join("");
    cat.innerHTML = `<option value="">Tutti i prodotti</option>` + Object.entries(RV.cats).sort((a, b) => a[1].localeCompare(b[1], "it")).map(([id, n]) => `<option value="${id}">${esc(n)}</option>`).join("");
    const lvls = new Set(["premium", "specialist", "dealer"]);
    let map, layer, markers = [];
    const card = s => `<li class="dealer" data-i="${RV.stores.indexOf(s)}">
        <span class="dealer__lvl dealer__lvl--${s.l}">${LV[s.l]}</span>
        <h3>${esc(s.n)}</h3>
        <p>${esc(s.a)}<br>${esc(s.cap)} ${esc(s.c)} (${esc(s.p)})${PR[s.p] ? " · " + PR[s.p] : ""}</p>
        <div class="dealer__links">
          ${s.t ? `<a href="tel:${s.t.replace(/[^\d+]/g, "")}">${esc(s.t)}</a>` : ""}
          ${s.e ? `<a href="mailto:${esc(s.e)}">Email</a>` : ""}
          ${s.w ? `<a href="${esc(/^https?:/.test(s.w) ? s.w : "http://" + s.w)}" target="_blank" rel="noopener">Sito web</a>` : ""}
          <a href="https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}" target="_blank" rel="noopener">Indicazioni</a>
        </div></li>`;
    const filtered = () => {
      const t = q.value.trim().toLowerCase();
      return RV.stores.filter(s => lvls.has(s.l) && (!reg.value || PR[s.p] === reg.value) && (!cat.value || s.k.includes(cat.value)) &&
        (!t || [s.n, s.c, s.p, s.cap, s.a, PR[s.p] || ""].join(" ").toLowerCase().includes(t)));
    };
    const draw = () => {
      const list = filtered().sort((a, b) => ({ premium: 0, specialist: 1, dealer: 2 }[a.l] - { premium: 0, specialist: 1, dealer: 2 }[b.l]) || a.c.localeCompare(b.c, "it"));
      count.textContent = `${list.length} rivenditor${list.length === 1 ? "e" : "i"}`;
      dl.innerHTML = list.map(card).join("") || `<li class="empty">Nessun rivenditore trovato. Prova a cambiare i filtri o <a href="${L("contatti.html")}">contattaci</a>.</li>`;
      if (map && window.L) {
        layer.clearLayers(); markers = [];
        list.forEach(s => { const m = window.L.circleMarker([s.lat, s.lng], { radius: s.l === "premium" ? 9 : 7, color: "#fff", weight: 2, fillColor: s.l === "premium" ? "#e30613" : s.l === "specialist" ? "#16181d" : "#8a8f98", fillOpacity: 1 })
          .bindPopup(`<strong>${esc(s.n)}</strong><br>${esc(s.a)}, ${esc(s.c)}<br>${s.t ? esc(s.t) : ""}`); m.addTo(layer); markers[RV.stores.indexOf(s)] = m; });
        if (list.length) map.fitBounds(window.L.latLngBounds(list.map(s => [s.lat, s.lng])).pad(0.1), { maxZoom: 12 });
      }
    };
    [q, reg, cat].forEach(x => x.addEventListener("input", draw));
    lvBox.addEventListener("click", e => {
      const b = e.target.closest(".chip"); if (!b) return;
      const on = b.getAttribute("aria-pressed") !== "true"; b.setAttribute("aria-pressed", on);
      on ? lvls.add(b.dataset.l) : lvls.delete(b.dataset.l); draw();
    });
    dl.addEventListener("click", e => {
      const li = e.target.closest(".dealer"); if (!li || e.target.closest("a") || !map) return;
      const s = RV.stores[+li.dataset.i]; map.setView([s.lat, s.lng], 14); markers[+li.dataset.i]?.openPopup();
      $("#dl-map").scrollIntoView({ behavior: "smooth", block: "center" });
    });
    // la mappa usa OpenStreetMap: si carica con il consenso o con un clic
    const startMap = () => {
      if (map) return;
      const box = $("#dl-map");
      const css = document.createElement("link"); css.rel = "stylesheet"; css.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"; document.head.append(css);
      const js = document.createElement("script"); js.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
      js.onload = () => {
        box.innerHTML = ""; box.classList.add("is-loaded");
        map = window.L.map(box, { scrollWheelZoom: false }).setView([42.3, 12.6], 6);
        window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, attribution: "© OpenStreetMap" }).addTo(map);
        layer = window.L.layerGroup().addTo(map); draw();
      };
      document.head.append(js);
    };
    $("#dl-map [data-load-map]")?.addEventListener("click", startMap);
    if (getConsent() === "all") startMap();
    document.addEventListener("bt-consent-all", startMap);
    const pq = new URLSearchParams(location.search).get("q"); if (pq) q.value = pq;
    draw();
  }

  /* ---------- FORZA VENDITA: referenti per regione ---------- */
  const ag = $("[data-agents]");
  if (ag && window.AGENTI) {
    const sel = $("#ag-region");
    sel.innerHTML = `<option value="">Seleziona la tua regione…</option>` + AGENTI.map(r => `<option value="${r.slug}">${esc(r.regione)}</option>`).join("");
    const person = a => `<div class="agent">
        ${a.foto ? `<img src="${esc(a.foto)}" alt="" loading="lazy">` : ""}
        <div><span class="tag">${esc(a.ruolo)}</span><h3>${esc(a.nome)}</h3>
        <div class="agent__links">${a.tel ? `<a href="tel:${a.tel.replace(/[^\d+]/g, "")}">${esc(a.tel)}</a>` : ""}
        ${a.email ? `<a href="mailto:${esc(a.email)}${a.cc ? "?cc=" + esc(a.cc) : ""}">Contattami</a>` : ""}</div></div></div>`;
    const draw = () => {
      const r = AGENTI.find(x => x.slug === sel.value);
      // province con gli stessi referenti: un solo gruppo ("Genova, Imperia, La Spezia")
      const groups = [];
      (r ? r.zone : []).forEach(z => {
        const key = z.agenti.map(a => a.nome + a.ruolo).join("|");
        const g = groups.find(x => x.key === key);
        g ? g.zone.push(z.zona) : groups.push({ key, zone: [z.zona], agenti: z.agenti });
      });
      ag.innerHTML = !r ? `<div class="empty">Scegli una regione per vedere i referenti della tua zona.</div>`
        : groups.map(g => `<div class="agent-zone"><h2>${esc(g.zone.filter(Boolean).join(", ") || r.regione)}</h2><div class="agent-grid">${g.agenti.map(person).join("")}</div></div>`).join("")
          || `<div class="empty">Per questa regione contatta direttamente l’ufficio commerciale: <a href="tel:${C.phoneHref.slice(4)}">${C.phone}</a>.</div>`;
      if (r) history.replaceState(null, "", "?regione=" + r.slug);
    };
    sel.addEventListener("change", draw);
    const pre = new URLSearchParams(location.search).get("regione"); if (pre) sel.value = pre;
    draw();
  }

  /* Animazione in ingresso */
  function observe() {
    if (!("IntersectionObserver" in window)) { $$(".reveal").forEach(r => r.classList.add("in")); return; }
    io = io || new IntersectionObserver(es => es.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    }), { rootMargin: "0px 0px 120px 0px" });
    $$(".reveal:not(.in)").forEach(r => io.observe(r));
    // sicurezza: dopo poco tutto il contenuto è comunque visibile (niente pagine "vuote")
    clearTimeout(observe.t);
    observe.t = setTimeout(() => $$(".reveal:not(.in)").forEach(r => r.classList.add("in")), 900);
  }
  observe();
})();
