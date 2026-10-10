# Plumber template – how to customise

Plain HTML and CSS. No build tools: edit, upload, done.

**Keep all files in the same folder and don't rename** `index.html`, `styles.css`,
`config.js` or `main.js`. If one is renamed or missing the site breaks.

## 1. Business details (5 minutes)
Open **config.js** and change:
- business name, phone, WhatsApp, email
- `town` (shown in the main heading) and `areas` (the areas-covered list and map)
- `gasSafe` number (leave "" to hide every Gas Safe mention)
- `emergency247` – set to `false` if you don't do 24/7 call-outs; the emergency
  section and 24/7 badges disappear automatically
- office hours (the "Taking calls now" label uses these)
- Google rating and review count (rating "" hides them)
- `formEndpoint` – free link from formspree.io so quote requests reach your inbox.
  Leave "" and the form opens the visitor's email app instead.

## 2. Colours and fonts (2 minutes)
Top of **styles.css** (`:root`):
- `--copper` – the Call buttons and highlights
- `--ink` – text, lines and dark sections
- `--paper` / `--paper-2` – the cream backgrounds
Fonts: `--font-display` (big condensed headings), `--font-body` (text) and
`--font-mono` (prices, labels). If you change fonts, also update the Google Fonts
link in index.html.

## 3. Photos
See `PUT-PHOTOS-HERE.txt`.

## 4. Text and prices (in index.html)
Search for these headings to find each section:
- "What I fix" – the 3 main services and the "also" list
- "Prices" – the price sheet (each row is one `<tr>`)
- "Hi, I’m Johnny" – about the plumber, qualifications
- "What customers said" – reviews (copy a block to add one)
- "Questions people ask" – FAQ
- "Type of job" – options in the quote form

## 5. Google listing info
Update the `application/ld+json` block in the `<head>` of index.html
(name, phone, email, areas). This is what Google reads.
Also update the `<title>` and `description` at the top.

## 6. Writing style
The text is written in first person ("I", "me") as a sole trader. If it's a
team, find & replace "I’ll" → "we’ll", "I’m" → "we’re", "me" → "us".
