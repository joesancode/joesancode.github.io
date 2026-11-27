# joesancode.github.io

Personal CV site for Joe San, live at **https://joesancode.github.io**. It is styled as a fictional recruiting app, *Punctum* (Talent Intelligence), where the visitor keeps finding Joe at the center of everything.

## Files
- `index.html`: the whole site, with styles and script inline. Three views switched by URL hash: `#profile` (default), `#references`, `#inbox`.
- `assets/`: portrait, reference avatars, logos, `fonts/` (self-hosted DM Sans, SIL OFL 1.1) and `Joe_San_CV.pdf`.
- `assets/i18n.js`: Spanish, Italian and German translations. Each row is `[English, Español, Italiano, Deutsch]`, keyed by the exact English text on the page. **When you add or change English copy, add or update its row**, or it will stay in English in the other languages. Business and tech terms are localized (e.g. marketing → mercadotecnia / mercatologia / Vermarktung).
- `tools/make_pdf.py`: builds `assets/Joe_San_CV.pdf` from the site itself (Profile, References and Cover letter, one page each).
- `.github/workflows/pdf.yml`: reruns `make_pdf.py` on every push to `main` and commits the PDF if it changed, so the download always matches the site.

## Working on it
1. Edit `index.html`. Use the CSS variables (`--ink`, `--surface`, `--muted`, `--accent`…) for every color so light and dark mode both work.
2. Check desktop, phone (390px) and dark mode.
3. Push to `main`. GitHub Pages redeploys in a minute or two, and the PDF workflow adds a "Rebuild CV PDF from site" commit. Pull it before your next push.

To build the PDF locally:

```
pip install playwright pypdf
python -m playwright install chromium
python tools/make_pdf.py
```
