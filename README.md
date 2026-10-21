# Bodytech — nuovo sito (prototipo)

Restyling di [bodytech.it](https://www.bodytech.it): stessi contenuti e stesso logo, grafica moderna e sezioni riorganizzate.
Sito statico (solo HTML, CSS e JavaScript): non serve nessun server o database.

- 70 schede prodotto e 23 categorie, 21 marchi
- 79 articoli del blog, 186 FAQ
- 234 rivenditori su mappa, forza vendita per regione
- documentazione, moduli d’ordine, pagine legali, banner cookie

## Vederlo online con GitHub Pages

1. Nel repository: **Settings → Pages**.
2. In *Build and deployment* scegli **Source: Deploy from a branch**, poi **Branch: `main`** e cartella **`/ (root)`** → **Save**.
3. Dopo 1–2 minuti il sito è su `https://<tuo-utente>.github.io/<nome-repository>/`.

Tutti i collegamenti sono relativi, quindi il sito funziona anche dentro la sottocartella di GitHub Pages.

## Struttura

```
index.html            Home
prodotti.html         Catalogo e ricerca
categoria/  prodotto/ marchio/  articoli/  pagine/
novita.html  faq.html  moduli-ordine.html  rivenditori.html  forza-vendita.html
supporto.html  academy.html  azienda.html  contatti.html  marchi.html
404.html              Pagina "non trovata"
robots.txt            Esclude il prototipo dai motori di ricerca
assets/css/style.css  Stile
assets/js/            main.js (funzioni), data.js (contenuti), catalogo/blog/rivenditori/agenti.js (dati)
```

## Note

- **Prototipo:** `robots.txt` chiede ai motori di ricerca di non indicizzarlo, per non fare concorrenza al sito ufficiale.
  Quando andrà online sul dominio ufficiale, cambiare `robots.txt` come indicato al suo interno.
- **Immagini, video e PDF** sono ancora caricati da bodytech.it.
- **Moduli** (contatti, prova, newsletter): aprono il programma di posta con un’email già pronta per info@bodytechitalia.it.
- Per aggiornare le pagine dopo una modifica a CSS/JS, cambiare il numero `?v=` nei link (evita file vecchi nella cache dei browser).
