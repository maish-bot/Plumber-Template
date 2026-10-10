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
- `--navy` – header, dark sections, headings
- `--accent` – the Call buttons (amber by default)
- `--blue` – links and small highlights
Fonts: `--font-display` and `--font-body` (also update the Google Fonts link in index.html).

## 3. Photos
See `PUT-PHOTOS-HERE.txt`.

## 4. Text and prices (in index.html)
Search for these headings to find each section:
- "What we can help with" – the 3 main services and the "also" list
- "Clear prices, no surprises" – price cards and the common jobs list
- "Hi, I’m Johnny" – about the plumber, qualifications
- "What local customers say" – reviews (copy a block to add one)
- "Common questions" – FAQ
- "Type of job" – options in the quote form

## 5. Google listing info
Update the `application/ld+json` block in the `<head>` of index.html
(name, phone, email, areas). This is what Google reads.
Also update the `<title>` and `description` at the top.
