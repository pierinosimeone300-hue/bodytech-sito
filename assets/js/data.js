/* =========================================================
   Bodytech — contenuti del sito (unica fonte dei dati)
   Per aggiornare prodotti, marchi, news o moduli d'ordine
   modifica solo questo file.
   ========================================================= */

const UP = "https://www.bodytech.it/wp-content/uploads/";
const OLD = "https://www.bodytech.it/";

window.BT = {
  logo: UP + "2020/10/bodytech-logo-small-pc.png",
  logoRetina: UP + "2020/10/bodytech-logo-retina-mobile.png",

  company: {
    name: "Bodytech S.r.l.",
    address: "Via Pratolino, SNC — 19037 Santo Stefano di Magra (SP)",
    phone: "+39 0187 940142",
    phoneHref: "tel:+390187940142",
    email: "info@bodytechitalia.it",
    emailAdmin: "amministrazione@bodytechitalia.it",
    emailAcademy: "formazione@bodytechitalia.it",
    hours: "Lun–Ven 9:00–13:00 · 14:00–18:00",
    legal: [
      "BODYTECH Srl – Società unipersonale",
      "Unico socio OMNIA SAS di Mario Mori",
      "P. IVA 01216490456 · C.F. 91032440454",
      "Capitale sociale € 100.000 i.v.",
      "Registro Imprese di La Spezia – N° 118191"
    ]
  },

  /* Catalogo: le categorie sono raggruppate in 3 aree chiare */
  groups: [
    { id: "mobilita", name: "Mobilità", desc: "Carrozzine, propulsori e sistemi per muoversi in autonomia." },
    { id: "seduta", name: "Seduta e postura", desc: "Cuscini, schienali e supporti per il posizionamento." },
    { id: "speciali", name: "Soluzioni speciali", desc: "Linea pediatrica, sedie ergonomiche e valutazione clinica." }
  ],

  categories: [
    { group: "mobilita", name: "Carrozzine superleggere", img: "2021/11/01_carrozine_superleggere_b-600x613.jpg", href: "categoria/carrozzine-superleggere.html" },
    { group: "mobilita", name: "Superleggere su misura", img: "2024/03/carrozzine-superleggere-su-misura-600x613.jpg", href: "categoria/carrozzine-superleggere-su-misura.html" },
    { group: "mobilita", name: "Carrozzine elettroniche", img: "2024/12/carrozzine_elettroniche-600x613.jpg", href: "categoria/carrozzine-elettroniche.html" },
    { group: "mobilita", name: "Carrozzine basculanti", img: "2021/04/02_carrozine_basculanti-600x613.jpg", href: "categoria/carrozzine-basculanti.html" },
    { group: "mobilita", name: "Stabilizzatori di statica elettrici", img: "2024/12/stabilizzatori-di-statica-bodytech.jpg", href: "categoria/stabilizzatori-di-statica.html" },
    { group: "mobilita", name: "Propulsori", img: "2021/04/03_propulsori-600x613.jpg", href: "categoria/propulsori.html" },
    { group: "mobilita", name: "Ruote ammortizzate", img: "2021/04/08B_ruote_ammortizzate-600x613.jpg", href: "categoria/ruote-ammortizzate.html" },
    { group: "mobilita", name: "Scooter", img: "2026/04/robooter-scooter-q40.webp", href: "categoria/scooter.html" },
    { group: "seduta", name: "Cuscini", img: "2021/04/09_cuscini-600x613.jpg", href: "categoria/cuscini.html" },
    { group: "seduta", name: "Schienali", img: "2021/04/11B_schienali_carrozzina-600x613.jpg", href: "categoria/schienali.html" },
    { group: "seduta", name: "Posizionamento", img: "2021/04/10_posizionamento_carrozzina-600x613.jpg", href: "categoria/posizionamento.html" },
    { group: "seduta", name: "Parte superiore del corpo", img: "2020/10/parte-superiore-del-corpo-cover.jpg", href: "categoria/parte-superiore-del-corpo.html" },
    { group: "speciali", name: "Sedie ergonomiche", img: "2021/11/sedie-ergonomiche-02-600x613.jpg", href: "categoria/sedie-ergonomiche.html" },
    { group: "speciali", name: "Linea pediatrica", img: "2021/11/linea-pediatrica-2-600x613.jpg", href: "categoria/linea-pediatrica.html" },
    { group: "speciali", name: "Rilevamento pressioni", img: "2021/04/06_rilevamento_pressioni-600x613.jpg", href: "prodotto/foresite-ss-x4.html" }
  ],

  brands: [
    { name: "ADI", img: "2021/02/adi.png", href: "marchio/adi.html" },
    { name: "Blake Medical", img: "2024/04/BLAKE-MEDICAL.png", href: "marchio/blake-medical.html" },
    { name: "Bodypoint", img: "2021/02/bodypoint.png", href: "marchio/bodypoint.html" },
    { name: "Dietz Power", img: "2021/02/dietz.png", href: "marchio/dietz-power.html" },
    { name: "Klaxon", img: "2022/07/klaxon.png", href: "marchio/klaxon.html" },
    { name: "Loopwheels", img: "2021/02/loopwheels.png", href: "marchio/loopwheels.html" },
    { name: "Leggero", img: "2021/12/leggero.jpg", href: "marchio/leggero.html" },
    { name: "Motion Composites", img: "2021/02/motion.png", href: "marchio/motion-composites.html" },
    { name: "Newton", img: "2023/01/Newton-Blk.png", href: "categoria/opzioni-per-carrozzine-superleggere.html" },
    { name: "PDG Mobility", img: "2022/01/pdg-mobility-logo-400x103.png", href: "marchio/pdg-mobility.html" },
    { name: "Ride Designs", img: "2021/02/02ride.png", href: "marchio/ride.html" },
    { name: "Robooter", img: "2024/04/ROBOOTER.png", href: "marchio/robooter.html" },
    { name: "Stealth Products", img: "2021/02/stealth.png", href: "marchio/stealth-products.html" },
    { name: "Symmetric Designs", img: "2024/04/SYMMETRIC-DESIGNS.png", href: "marchio/symmetric-designs.html" },
    { name: "VELA", img: "2021/11/VELA-logo.png", href: "marchio/vela.html" },
    { name: "Wolturnus", img: "2020/10/logo-wolturnus.png", href: "marchio/wolturnus.html" },
    { name: "XSENSOR", img: "2021/07/XSENSOR_Colour_Logo-400x60.png", href: "prodotto/foresite-ss-x4.html" }
  ],

  /* Prodotti in evidenza (ex slider della home) */
  featured: [
    { kicker: "Stabilizzatore di statica elettrico", title: "Robooter Xz-Droid Smart", text: "Stare in piedi e muoversi in autonomia, dentro e fuori casa.", img: "2026/02/Header-Xzdroid_2.png", href: "categoria/stabilizzatori-di-statica.html" },
    { kicker: "Klick", title: "Gamma propulsori 2025", text: "Propulsori per trasformare la carrozzina manuale in un mezzo elettrico.", video: "pVAW5zy-t_M", href: "categoria/propulsori.html" },
    { kicker: "Sedie ergonomiche", title: "VELA Tango 700E", text: "Con ruote motorizzate Power Wheels.", video: "2MGq8HGPYec", href: "categoria/sedie-ergonomiche.html" },
    { kicker: "Cuscini", title: "Cuscini Geo-Matrix™", text: "Il gel che non deforma, non si fora e non ha perdite.", video: "ORHOGeK_Qak", href: "categoria/cuscini.html" }
  ],

  news: [
    { title: "Una sedia da lavoro ideale per la disabilità sul posto di lavoro", date: "7 aprile 2025", cats: ["Accessibilità", "Testimonianze", "Vita attiva"], author: "Elena Mori", img: "2025/03/velachair-700e-office-chair-1800x1400_old-llimage-s900x700-q80-fwebp-700x441.webp", url: "una-sedia-da-lavoro-ideale-per-la-disabilita-sul-posto-di-lavoro/" },
    { title: "Personalizzazione del montaggio del joystick per carrozzine elettroniche: la storia di Todd e il Tri-Lock", date: "26 marzo 2025", cats: ["Bodytech Academy", "Caso clinico"], author: "Elena Mori", img: "2025/03/Case_foto_771-700x441.jpg", url: "personalizzazione-del-montaggio-del-joystick-per-carrozzine-elettroniche-la-storia-di-todd-e-il-tri-lock/" },
    { title: "Quale cuscino antidecubito scegliere? La gestione della pressione", date: "21 gennaio 2025", cats: ["Bodytech Academy"], author: "Barend ter Haar", img: "2025/01/Quale-cuscino-antidecubito-scegliere-La-gestione-della-pressione-700x441.png", url: "quale-cuscino-antidecubito-scegliere-la-gestione-della-pressione/" },
    { title: "Pressione, frizione e taglio: un triangolo di rischi per la pelle", date: "15 gennaio 2025", cats: ["Bodytech Academy"], author: "Barend ter Haar", img: "2025/01/Pressione-Frizione-e-Taglio-700x441.png", url: "pressione-frizione-e-taglio-un-triangolo-di-rischi-per-la-pelle/" }
  ],

  /* Moduli d'ordine — i link puntano alla pagina originale finché i PDF non vengono migrati */
  orderForms: [
    { cat: "Carrozzine superleggere", items: [
      ["APEX Aluminum & Carbon", "Rev. 4 del 01-01-2026"], ["VELOCE", "Rev. 3 del 01-01-2026"],
      ["HELIO C2", "Rev. 3 del 01-01-2026"], ["HELIO A6", "Rev. 0 del 01-01-2026"], ["MOVE", "Rev. 6.1 del 01-02-2026"] ] },
    { cat: "Carrozzine superleggere su misura", items: [
      ["Wolturnus W5 · Tukan · Dalton", "Winter 2026 V16.2"] ] },
    { cat: "Carrozzine elettroniche", items: [
      ["ROBOOTER X40", "Rev. 0 del 01-04-2024"], ["ROBOOTER E60 A", "Rev. 0 del 01-04-2024"],
      ["ROBOOTER E60 PRO A", "Rev. 0 del 01-04-2024"], ["ROBOOTER E40S", "Rev. 0 del 01-02-2026"],
      ["ROBOOTER E80", "Rev. 1 del 01-08-2026"], ["SANGO ADVANCED", "Rev. 4.1 del 01-01-2026"],
      ["SANGO SLIMLINE", "Rev. 5.1 del 01-01-2026"], ["SANGO JUNIOR", "Rev. 3 del 01-02-2024", true],
      ["SANBA", "Rev. 0 del 01-04-2026"] ] },
    { cat: "Stabilizzatori di statica elettrici", items: [
      ["XZDROID SMART", "Rev. 2 del 01-08-2026"], ["XZDROID SMART KIDS", "Rev. 1 del 01-06-2026"] ] },
    { cat: "Carrozzine basculanti", items: [
      ["Bentley LT R", "Rev. 0 del 01-02-2024", true], ["FUZE T50", "Rev. 8 del 01-02-2024", true],
      ["FUZE T50 NARROW", "Rev. 1 del 01-02-2024", true], ["FUZE T50 JUNIOR", "Rev. 6 del 01-02-2024", true],
      ["ENZO", "Rev. 6 del 01-02-2023", true] ] },
    { cat: "Sedie ergonomiche", items: [
      ["Listino e configurazione VELA TANGO 700E", "Rev. 3 del 01-02-2024", true],
      ["Listino e configurazione VELA TANGO 700", "Rev. 3 del 01-02-2024", true] ] },
    { cat: "Cuscini", items: [
      ["GEO-MATRIX componenti", "Rev. 1 del 15-07-2025"], ["FORWARD", "Rev. 4 del 01-02-2023"],
      ["JAVA cuscino", "Rev. 3 del 01-02-2023"], ["SOLUTION", "Rev. 2 del 01-02-2023"],
      ["Cuscini BLAKE GEO-MATRIX", "Rev. 0 del 15-07-2025"] ] },
    { cat: "Schienali", items: [
      ["ADI alluminio", "Rev. 3.2 del 01-02-2024"], ["ADI carbonio", "Rev. 3.2 del 01-02-2024"],
      ["RESPIRA COMFORT", "Rev. 0 del 01-11-2024"], ["RESPIRA SPORT", "Rev. 0 del 01-11-2024"],
      ["JAVA schienale posturale attivo", "Rev. 2.1 del 10-03-2023"],
      ["JAVA schienale posturale avvolgente", "Rev. 2 del 01-02-2023"], ["DECAF", "Rev. 3.1 del 10-03-2023"] ] },
    { cat: "Posizionamento", items: [
      ["Supporti per il posizionamento BODYPOINT", "Rev. 7 del 01-01-2025", true],
      ["Dynamic Arm Support", "Rev. 0 del 01-01-2025"] ] },
    { cat: "Appoggiatesta", items: [
      ["HEADMASTER COLLAR", "Rev. 0 del 01-04-2024"], ["Poggiatesta APEX", "Rev. 0 del 01-04-2024"],
      ["COMFORT PLUS", "Rev. 3 del 01-02-2023"], ["COMFORT PLUS regolabile", "Rev. 2 del 01-02-2023"],
      ["SAVANT", "Rev. 0 del 01-04-2024"], ["ULTRA", "Rev. 1 del 01-02-2023"], ["i2i", "Rev. 2 del 01-02-2023"] ] }
  ],

  academy: {
    course: {
      code: "B PRO",
      title: "Ausili per la mobilità e il posizionamento",
      level: "Livello intermedio",
      text: "Una panoramica completa sulle migliori pratiche e tecnologie nell’ambito del posizionamento e della mobilità assistita per persone con disabilità motoria, con un approccio teorico-pratico che tiene in considerazione sia gli aspetti clinici che tecnici.",
      audience: "Fisioterapisti, medici specializzati in fisiatria, terapisti della riabilitazione, tecnici ortopedici, terapisti occupazionali.",
      dates: ["19–20 marzo 2026", "7–8 maggio 2026", "8–9 ottobre 2026"]
    },
    benefits: [
      "Una vasta gamma di ausili di cui apprendere benefici e funzionalità",
      "Attestato per dimostrare le tue competenze",
      "Confronto e networking con altri professionisti",
      "Domande e risposte con i nostri docenti",
      "Materiale didattico per ripassare quando e dove vuoi",
      "Prove tecniche e pratiche"
    ]
  }
};

/* Menu "Prodotti": stessa struttura del menu del sito originale */
BT.productMenu = [
  { title: "Carrozzine", items: [
    ["Superleggere", "categoria/carrozzine-superleggere.html"],
    ["Ruote ammortizzate", "categoria/ruote-ammortizzate.html"],
    ["Superleggere su misura", "categoria/carrozzine-superleggere-su-misura.html"],
    ["Elettroniche", "categoria/carrozzine-elettroniche.html"],
    ["Scooter", "categoria/scooter.html"],
    ["Basculanti", "categoria/carrozzine-basculanti.html"] ] },
  { title: "Sistemi di seduta", items: [
    ["Cuscini", "categoria/cuscini.html"],
    ["Schienali", "categoria/schienali.html"],
    ["Posizionamento", "categoria/posizionamento.html"],
    ["Parte superiore del corpo", "categoria/parte-superiore-del-corpo.html"] ] },
  { title: "Altre soluzioni", items: [
    ["Sedie ergonomiche", "categoria/sedie-ergonomiche.html"],
    ["Stabilizzatore di statica elettrico", "categoria/stabilizzatori-di-statica.html"],
    ["Propulsori", "categoria/propulsori.html"],
    ["Linea pediatrica", "categoria/linea-pediatrica.html"],
    ["Rilevamento pressioni", "prodotto/foresite-ss-x4.html"] ] }
];

BT.social = {
  facebook: "https://www.facebook.com/bodytechitalia",
  instagram: "https://www.instagram.com/bodytechitalia/",
  youtube: "https://www.youtube.com/c/BodytechItalia",
  linkedin: "https://www.linkedin.com/company/bodytech-srl"
};

/* Sigla provincia → regione (per filtrare i rivenditori) */
BT.provinces = (() => {
  const R = {
    "Abruzzo": "AQ CH PE TE", "Basilicata": "MT PZ", "Calabria": "CZ CS KR RC VV", "Campania": "AV BN CE NA SA",
    "Emilia-Romagna": "BO FE FC MO PR PC RA RE RN", "Friuli-Venezia Giulia": "GO PN TS UD", "Lazio": "FR LT RI RM VT",
    "Liguria": "GE IM SP SV", "Lombardia": "BG BS CO CR LC LO MN MI MB PV SO VA", "Marche": "AN AP FM MC PU PS",
    "Molise": "CB IS", "Piemonte": "AL AT BI CN NO TO VB VC", "Puglia": "BA BT BR FG LE TA",
    "Sardegna": "CA NU OR SS SU CI VS OG OT", "Sicilia": "AG CL CT EN ME PA RG SR TP",
    "Toscana": "AR FI GR LI LU MS PI PT PO SI", "Trentino-Alto Adige": "BZ TN", "Umbria": "PG TR",
    "Valle d'Aosta": "AO", "Veneto": "BL PD RO TV VE VR VI", "San Marino": "SM RSM"
  };
  const m = {};
  for (const [reg, list] of Object.entries(R)) list.split(" ").forEach(p => m[p] = reg);
  return m;
})();

/* Helper: URL completi */
BT.img = (p) => (p.startsWith("http") ? p : UP + p);
BT.old = (p) => (p.startsWith("http") ? p : OLD + p);
