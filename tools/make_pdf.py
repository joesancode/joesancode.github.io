"""Build assets/Joe_San_CV.pdf from the site itself, so the download always matches.

One page per view (Profile, References, Cover letter), light theme, at desktop width.
Run from the repo root:  python3 tools/make_pdf.py
Needs: pip install playwright pypdf  &&  python3 -m playwright install chromium
"""
import asyncio, io, pathlib, sys
from playwright.async_api import async_playwright
from pypdf import PdfReader, PdfWriter

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "Joe_San_CV.pdf"
WIDTH = 1440
VIEWS = ["profile", "references", "inbox"]

# Let every scroll area grow to full height and hide anything interactive or visitor-specific.
PRINT_CSS = """
  html,body{height:auto!important;overflow:visible!important}
  .topbar,.section-head{-webkit-backdrop-filter:none!important;backdrop-filter:none!important}
  .section-head{background:var(--bg)!important}
  .app,.main,.content,.panel,.content.inbox-mode,#view-inbox.active,.inbox,
  .content.inbox-mode .inbox,.mail-list,.reader{height:auto!important;max-height:none!important;overflow:visible!important}
  .app{min-height:0!important}
  .toast,.search-pop,.menu,.notifs,.settings,.panel-notes,.q-key,#search-btn,.rec-tools,.radar-pop,.m-fab,.sh-id{display:none!important}
  *{animation:none!important;transition:none!important}
"""


async def render(page, view):
    await page.goto((ROOT / "index.html").as_uri() + "#" + view)
    await page.evaluate("document.documentElement.setAttribute('data-theme','light')")
    await page.add_style_tag(content=PRINT_CSS)
    await page.evaluate("document.fonts.ready")
    await page.wait_for_timeout(300)
    height = await page.evaluate("Math.ceil(document.documentElement.scrollHeight)")
    return await page.pdf(width=f"{WIDTH}px", height=f"{height + 2}px",
                          print_background=True, page_ranges="1")


async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={"width": WIDTH, "height": 900},
                                        reduced_motion="reduce")
        page = await ctx.new_page()
        await page.emulate_media(media="screen", reduced_motion="reduce")
        writer = PdfWriter()
        for view in VIEWS:
            for pg in PdfReader(io.BytesIO(await render(page, view))).pages:
                writer.add_page(pg)
        writer.add_metadata({"/Title": "Joe San · Product Management & Brand Design",
                             "/Author": "Joe San"})
        with open(OUT, "wb") as f:
            writer.write(f)
        await browser.close()
    print(f"Wrote {OUT.relative_to(ROOT)} ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
