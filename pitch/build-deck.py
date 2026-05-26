"""
Build the Klydo rebrand pitch deck PDF.

Run from /Users/zop.dev/Downloads/klydo redesign/pitch/:
    python3 build-deck.py
"""

import os
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.colors import HexColor, Color
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader

HERE = os.path.dirname(os.path.abspath(__file__))
SHOTS = os.path.join(HERE, "screenshots")
OUT = os.path.join(HERE, "klydo-rebrand.pdf")

# Brand palette
C = {
    "paper": HexColor("#FAF7F2"),
    "paper_soft": HexColor("#F0EDE7"),
    "paper_line": Color(0.06, 0.06, 0.06, 0.08),
    "ink": HexColor("#0E0E0E"),
    "ink_soft": HexColor("#2A2A2A"),
    "ink_quiet": HexColor("#7A7A7A"),
    "lime": HexColor("#D8FF3D"),
    "lime_deep": HexColor("#B5E600"),
    "pink": HexColor("#FF3D7F"),
    "cobalt": HexColor("#2D6EFF"),
    "sunset": HexColor("#FF6B35"),
    "clay": HexColor("#C2452D"),
}

PAGE_W, PAGE_H = landscape(A4)  # 842 x 595


def fill(c, color):
    c.setFillColor(color)


def stroke_off(c):
    c.setStrokeColor(C["paper"])  # placeholder, we set stroke=0 on calls


# ---------------------------------------------------------------------------
# Reusable elements
# ---------------------------------------------------------------------------

def page_bg(c, color):
    c.setFillColor(color)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)


def lime_square(c, x, y, size=10):
    c.setFillColor(C["lime"])
    c.rect(x, y, size, size, fill=1, stroke=0)


def wordmark(c, x, y, on_ink=False):
    """klydo wordmark (lime square + bold sans label)."""
    lime_square(c, x, y, 10)
    c.setFillColor(C["paper"] if on_ink else C["ink"])
    c.setFont("Helvetica-Bold", 16)
    c.drawString(x + 16, y + 1, "klydo")


def label(c, x, y, text, color=None):
    c.setFillColor(color or C["ink_quiet"])
    c.setFont("Helvetica-Bold", 9)
    c.drawString(x, y, text.upper())


def slide_meta(c, num, total, on_ink=False):
    """Bottom-strip with klydo wordmark, slide number, page chrome."""
    fg = C["paper"] if on_ink else C["ink"]
    quiet = Color(1, 1, 1, 0.45) if on_ink else C["ink_quiet"]

    # Hairline above the strip
    c.setStrokeColor(Color(1, 1, 1, 0.18) if on_ink else C["paper_line"])
    c.setLineWidth(0.5)
    c.line(50, 50, PAGE_W - 50, 50)

    # Klydo signature bottom-left
    wordmark(c, 50, 28, on_ink=on_ink)

    # Slide number bottom-right
    c.setFillColor(quiet)
    c.setFont("Courier", 9)
    c.drawRightString(PAGE_W - 50, 32, f"{num:02d} / {total:02d}")


def display(c, x, y, lines, size=64, color=None, leading=None, font="Helvetica-Bold"):
    """Draw multi-line big-display text with tight tracking."""
    color = color or C["ink"]
    leading = leading or int(size * 0.92)
    c.setFillColor(color)
    c.setFont(font, size)
    for i, line in enumerate(lines):
        c.drawString(x, y - i * leading, line)


def paragraph(c, x, y, text, width, size=12, color=None, leading=None):
    """Word-wrap a paragraph into a fixed width."""
    color = color or C["ink_soft"]
    leading = leading or int(size * 1.45)
    c.setFillColor(color)
    c.setFont("Helvetica", size)

    words = text.split()
    line = []
    cur_y = y
    for w in words:
        trial = " ".join(line + [w])
        w_width = c.stringWidth(trial, "Helvetica", size)
        if w_width > width and line:
            c.drawString(x, cur_y, " ".join(line))
            cur_y -= leading
            line = [w]
        else:
            line.append(w)
    if line:
        c.drawString(x, cur_y, " ".join(line))
    return cur_y  # last drawn y


def fitted_image(c, img_path, x, y, max_w, max_h):
    """Draw an image preserving aspect, fitted into a max box."""
    if not os.path.exists(img_path):
        # Empty placeholder
        c.setStrokeColor(C["paper_line"])
        c.setLineWidth(0.5)
        c.rect(x, y, max_w, max_h, fill=0, stroke=1)
        c.setFillColor(C["ink_quiet"])
        c.setFont("Helvetica", 9)
        c.drawCentredString(x + max_w / 2, y + max_h / 2, "(image missing)")
        return
    img = ImageReader(img_path)
    iw, ih = img.getSize()
    scale = min(max_w / iw, max_h / ih)
    w, h = iw * scale, ih * scale
    cx = x + (max_w - w) / 2
    cy = y + (max_h - h) / 2
    c.drawImage(img, cx, cy, width=w, height=h, mask="auto",
                preserveAspectRatio=True, anchor="c")


# ---------------------------------------------------------------------------
# Slide builders
# ---------------------------------------------------------------------------

TOTAL = 22  # placeholder; we'll count at the end


def slide_cover(c, n):
    page_bg(c, C["lime"])

    # Tiny meta strip top-left
    c.setFillColor(C["ink"])
    c.setFont("Helvetica-Bold", 9)
    c.drawString(50, PAGE_H - 50, "A SPECULATIVE REBRAND · BENGALURU · 2026")

    # Pink dot (live)
    c.setFillColor(C["pink"])
    c.circle(PAGE_W - 65, PAGE_H - 55, 3, fill=1, stroke=0)
    c.setFillColor(C["ink"])
    c.setFont("Helvetica-Bold", 9)
    c.drawRightString(PAGE_W - 75, PAGE_H - 50, "LIVE NOW")

    # Massive klydo with pink stop
    display(c, 50, PAGE_H - 180, ["klydo"], size=200, color=C["ink"])
    # The pink stop (approximate position)
    k_width = c.stringWidth("klydo", "Helvetica-Bold", 200)
    c.setFillColor(C["pink"])
    c.circle(50 + k_width + 16, PAGE_H - 180 + 10, 16, fill=1, stroke=0)

    # Tagline
    display(c, 50, PAGE_H - 280, ["fashion in thirty."], size=44, color=C["ink"])

    # Body line
    paragraph(c, 50, 200,
              "A reimagined brand identity, a klydo.in landing page, "
              "and a 32-route mobile app prototype. Live, clickable, and unsolicited.",
              width=560, size=14, color=C["ink"])

    # Footer
    slide_meta(c, n, TOTAL, on_ink=False)
    c.showPage()


def slide_why(c, n):
    page_bg(c, C["paper"])
    label(c, 50, PAGE_H - 65, "why this exists")
    display(c, 50, PAGE_H - 130, [
        "I'm a user. I love",
        "the product. I felt",
        "the brand wasn't",
        "doing it justice."
    ], size=42, color=C["ink"], leading=46)

    # Pink period
    c.setFillColor(C["pink"])
    c.circle(560, PAGE_H - 130 - 3 * 46 + 6, 6, fill=1, stroke=0)

    paragraph(c, 50, 230,
              "30-minute fashion in India is the rarest unfair advantage in e-commerce. "
              "But the klydo.in landing was a placeholder, the brand identity felt generic, "
              "and the app didn't read as fashion. So I built the speculative version myself.",
              width=560, size=13, color=C["ink_soft"])

    paragraph(c, 50, 130,
              "No client. No brief. No retainer. Built because I wanted Klydo to win.",
              width=560, size=13, color=C["ink"])
    slide_meta(c, n, TOTAL)
    c.showPage()


def slide_audit(c, n):
    page_bg(c, C["paper"])
    label(c, 50, PAGE_H - 65, "the audit")
    display(c, 50, PAGE_H - 130, ["where klydo is", "today."], size=42, color=C["ink"])

    # Two-column data
    facts_left = [
        ("WORKING", C["ink"]),
        ("30-min delivery in Bengaluru", C["ink_soft"]),
        ("Try-before-pay verb", C["ink_soft"]),
        ("200+ verified brands", C["ink_soft"]),
        ("Daily curated drops", C["ink_soft"]),
        ("Original products, no fakes", C["ink_soft"]),
    ]
    facts_right = [
        ("LEAKING VALUE", C["clay"]),
        ("klydo.in is a download wall", C["ink_soft"]),
        ("Brand identity reads generic SaaS", C["ink_soft"]),
        ("No public design language", C["ink_soft"]),
        ("Voice swings between editorial and Sale", C["ink_soft"]),
        ("No web shopping (kills WhatsApp share)", C["ink_soft"]),
    ]

    y0 = 270
    for items, x0 in [(facts_left, 50), (facts_right, 440)]:
        for i, (text, col) in enumerate(items):
            c.setFillColor(col)
            c.setFont("Helvetica-Bold" if i == 0 else "Helvetica", 11 if i == 0 else 12)
            if i == 0:
                c.drawString(x0, y0, text)
                # Hairline under header
                c.setStrokeColor(C["paper_line"])
                c.setLineWidth(0.5)
                c.line(x0, y0 - 6, x0 + 320, y0 - 6)
            else:
                c.drawString(x0, y0 - i * 22 - 6, "· " + text)

    slide_meta(c, n, TOTAL)
    c.showPage()


def slide_competitive(c, n):
    page_bg(c, C["paper"])
    label(c, 50, PAGE_H - 65, "competitive set")
    display(c, 50, PAGE_H - 130,
            ["the slop tax."], size=42, color=C["ink"])
    paragraph(c, 50, PAGE_H - 175,
              "How the Indian fashion-app shelf has trained the customer.",
              width=600, size=12, color=C["ink_quiet"])

    competitors = [
        ("MYNTRA", "mass-market", "coupon hunt, banner stacks"),
        ("AJIO", "reliance mid", "premium-ish, still a catalog"),
        ("NYKAA FASHION", "beauty-led", "curated, then busy"),
        ("MEESHO", "value play", "cheap, buy 3 return 2"),
        ("SNITCH", "fast fashion", "IG-tight, slow ship"),
        ("BEWAKOOF / URBANIC", "gen-z casual", "trend-led, modal-heavy"),
        ("SLIKK", "the direct rival", "60-min fashion, building"),
    ]

    y = PAGE_H - 230
    for brand, pos, line in competitors:
        c.setFillColor(C["ink"])
        c.setFont("Helvetica-Bold", 11)
        c.drawString(50, y, brand)
        c.setFillColor(C["ink_quiet"])
        c.setFont("Helvetica", 10)
        c.drawString(190, y, pos)
        c.setFillColor(C["ink_soft"])
        c.setFont("Helvetica-Oblique", 11)
        c.drawString(330, y, line)
        c.setStrokeColor(C["paper_line"])
        c.setLineWidth(0.5)
        c.line(50, y - 6, PAGE_W - 50, y - 6)
        y -= 26

    slide_meta(c, n, TOTAL)
    c.showPage()


def slide_wedge(c, n):
    page_bg(c, C["ink"])
    label(c, 50, PAGE_H - 65, "the wedge", color=Color(1, 1, 1, 0.55))
    display(c, 50, PAGE_H - 130,
            ["three things,"], size=42, color=C["paper"])
    display(c, 50, PAGE_H - 175,
            ["nothing more."], size=42, color=C["paper"])
    # Pink stop
    last_w = c.stringWidth("nothing more", "Helvetica-Bold", 42)
    c.setFillColor(C["pink"])
    c.circle(50 + last_w + 8, PAGE_H - 175 + 6, 8, fill=1, stroke=0)

    cards = [
        ("01", "SPEED", "30-minute fashion in Bengaluru. Nobody else can.", C["lime"], C["ink"]),
        ("02", "TRY.", "Pay only for what stays on. Eliminates the size-fit risk.", C["pink"], C["ink"]),
        ("03", "CURATE", "Eight pieces, daily, hand-picked. Not endless catalog.", C["cobalt"], C["paper"]),
    ]

    card_w = (PAGE_W - 100 - 30) / 3
    for i, (idx, title, body, bg, fg) in enumerate(cards):
        x = 50 + i * (card_w + 15)
        y = 90
        c.setFillColor(bg)
        c.rect(x, y, card_w, 220, fill=1, stroke=0)

        c.setFillColor(fg)
        c.setFont("Courier-Bold", 12)
        c.drawString(x + 18, y + 220 - 24, idx + " / 03")
        c.setFont("Helvetica-Bold", 36)
        c.drawString(x + 18, y + 110, title)

        # Wrap body inside the card
        prev_fill = fg
        c.setFillColor(prev_fill)
        c.setFont("Helvetica", 11)
        words = body.split()
        line = []
        cy = y + 75
        for w in words:
            t = " ".join(line + [w])
            if c.stringWidth(t, "Helvetica", 11) > card_w - 36 and line:
                c.drawString(x + 18, cy, " ".join(line))
                cy -= 14
                line = [w]
            else:
                line.append(w)
        if line:
            c.drawString(x + 18, cy, " ".join(line))

    slide_meta(c, n, TOTAL, on_ink=True)
    c.showPage()


def slide_principles(c, n):
    page_bg(c, C["paper"])
    label(c, 50, PAGE_H - 65, "design principles")
    display(c, 50, PAGE_H - 130, ["ten rules. ranked."], size=42, color=C["ink"])
    paragraph(c, 50, PAGE_H - 175,
              "Lower-numbered wins when two conflict. The full text is in docs/02-PRINCIPLES.md.",
              width=600, size=11, color=C["ink_quiet"])

    principles = [
        "feed-native, not grid-native.",
        "graphic-poster taste, quick-commerce speed.",
        "speed is the brand. surface on every screen.",
        "try-before-pay is the hero verb.",
        "one thumb. everything within reach.",
        "india built in, not retrofitted.",
        "motion must mean something.",
        "restraint over feature creep.",
        "show the product, not the chrome.",
        "the price is the price.",
    ]
    y0 = PAGE_H - 230
    for i, p in enumerate(principles):
        col = 0 if i < 5 else 1
        row = i % 5
        x = 50 + col * 380
        y = y0 - row * 36

        # Mono number
        c.setFillColor(C["ink_quiet"])
        c.setFont("Courier-Bold", 12)
        c.drawString(x, y, f"{i+1:02d}")

        # Principle
        c.setFillColor(C["ink"])
        c.setFont("Helvetica-Bold", 13)
        c.drawString(x + 28, y, p)

    slide_meta(c, n, TOTAL)
    c.showPage()


def slide_brand_colors(c, n):
    page_bg(c, C["paper"])
    label(c, 50, PAGE_H - 65, "brand system · color")
    display(c, 50, PAGE_H - 130, ["committed", "multi-accent."], size=42, color=C["ink"], leading=46)
    paragraph(c, 50, PAGE_H - 230,
              "Two surfaces anchor the canvas. Each accent owns a role and never bleeds. "
              "Sections fully commit to one color-block at a time. Never sprinkled.",
              width=380, size=11, color=C["ink_soft"])

    swatches = [
        ("PAPER", "#FAF7F2", "warm canvas", C["paper"], C["ink"]),
        ("INK", "#0E0E0E", "text, dark panels", C["ink"], C["paper"]),
        ("LIME", "#D8FF3D", "primary cta, brand", C["lime"], C["ink"]),
        ("PINK", "#FF3D7F", "signature accent", C["pink"], C["ink"]),
        ("COBALT", "#2D6EFF", "interactive", C["cobalt"], C["paper"]),
        ("SUNSET", "#FF6B35", "occasional", C["sunset"], C["ink"]),
        ("CLAY", "#C2452D", "secondary urgency", C["clay"], C["paper"]),
    ]
    # 7 swatches across the right column, single column
    sx = PAGE_W - 380
    sy = PAGE_H - 95
    sw, sh = 320, 38
    gap = 8
    for i, (name, hex_, role, bg, fg) in enumerate(swatches):
        y = sy - i * (sh + gap)
        c.setFillColor(bg)
        c.rect(sx, y - sh, sw, sh, fill=1, stroke=0)
        # Border for paper
        if name == "PAPER":
            c.setStrokeColor(C["paper_line"])
            c.setLineWidth(0.5)
            c.rect(sx, y - sh, sw, sh, fill=0, stroke=1)
        c.setFillColor(fg)
        c.setFont("Helvetica-Bold", 11)
        c.drawString(sx + 14, y - 16, name)
        c.setFont("Courier", 10)
        c.drawString(sx + 90, y - 16, hex_)
        c.setFont("Helvetica", 10)
        c.drawString(sx + 180, y - 16, role)

    slide_meta(c, n, TOTAL)
    c.showPage()


def slide_brand_type(c, n):
    page_bg(c, C["paper"])
    label(c, 50, PAGE_H - 65, "brand system · typography")
    display(c, 50, PAGE_H - 130, ["chunky bold sans.", "lowercase voice."], size=42, color=C["ink"], leading=46)

    rows = [
        ("DISPLAY", "Bricolage Grotesque", "800w, -0.04em. Poster sizes for hero, drop names, section heads.",
         "fits, in thirty.", 64),
        ("UI / BODY", "Inter Variable", "400-600w. Body, buttons, navigation, labels.",
         "Drops at 7. Delivered by 7:30. Try at the door.", 18),
        ("MONO", "JetBrains Mono", "Prices, timers, addresses, order IDs. Numbers want monospace.",
         "20:46:32  ·  ₹1,299  ·  #klyd-3829", 18),
    ]

    y = PAGE_H - 250
    for label_text, family, body, sample, sample_size in rows:
        # Label + family
        c.setFillColor(C["ink_quiet"])
        c.setFont("Helvetica-Bold", 9)
        c.drawString(50, y, label_text)
        c.setFillColor(C["ink"])
        c.setFont("Helvetica-Bold", 14)
        c.drawString(110, y, family)
        # Body
        paragraph(c, 50, y - 16, body, width=350, size=10, color=C["ink_soft"])
        # Sample
        c.setFillColor(C["ink"])
        font = "Helvetica-Bold" if label_text != "MONO" else "Courier-Bold"
        c.setFont(font, sample_size)
        c.drawString(420, y - 8, sample)
        # Divider
        c.setStrokeColor(C["paper_line"])
        c.setLineWidth(0.5)
        c.line(50, y - 60, PAGE_W - 50, y - 60)
        y -= 90

    slide_meta(c, n, TOTAL)
    c.showPage()


def slide_brand_voice(c, n):
    page_bg(c, C["ink"])
    label(c, 50, PAGE_H - 65, "brand system · voice", color=Color(1, 1, 1, 0.55))
    display(c, 50, PAGE_H - 130, ["short.", "lowercase."], size=42, color=C["paper"], leading=46)
    display(c, 50, PAGE_H - 220, ["direct."], size=42, color=C["lime"])

    # Sample copy
    samples = [
        ("PUSH", "7pm drop. eight pieces. they go fast."),
        ("EMPTY CART", "nothing in your bag yet. tonight's drop is in 2h 14m."),
        ("TRY-ON", "trying at 6:42pm. pay only for what you keep."),
        ("RETURN", "all five going back. refund hits your upi by morning."),
        ("HERO", "fits, in thirty."),
    ]
    x = 440
    y = PAGE_H - 95
    for tag, copy in samples:
        c.setFillColor(Color(1, 1, 1, 0.55))
        c.setFont("Helvetica-Bold", 9)
        c.drawString(x, y, tag)
        c.setFillColor(C["paper"])
        c.setFont("Helvetica-Bold", 14)
        c.drawString(x, y - 18, copy)
        c.setStrokeColor(Color(1, 1, 1, 0.18))
        c.setLineWidth(0.5)
        c.line(x, y - 32, x + 350, y - 32)
        y -= 52

    slide_meta(c, n, TOTAL, on_ink=True)
    c.showPage()


def slide_overview(c, n):
    page_bg(c, C["paper"])
    label(c, 50, PAGE_H - 65, "what shipped")
    display(c, 50, PAGE_H - 130, ["32 routes.", "one design system."], size=42, color=C["ink"], leading=46)

    counts = [
        ("01", "LANDING PAGE", "5 sections", "klydo.in", C["lime"]),
        ("14", "APP ROUTES", "home + flow", "/app/*", C["ink"]),
        ("08", "PRODUCT PAGES", "auto-generated", "/app/p/[slug]", C["pink"]),
        ("07", "BRAND PROFILES", "auto-generated", "/app/b/[brand]", C["cobalt"]),
        ("02", "DYNAMIC ROUTES", "tracking + checkout", "/app/orders, /try", C["sunset"]),
    ]
    y = PAGE_H - 230
    for i, (n_, title, sub, route, accent) in enumerate(counts):
        # Big number with accent
        c.setFillColor(accent)
        c.setFont("Helvetica-Bold", 56)
        c.drawString(50, y - 40, n_)
        # Title + subtitle
        c.setFillColor(C["ink"])
        c.setFont("Helvetica-Bold", 12)
        c.drawString(150, y - 14, title)
        c.setFillColor(C["ink_quiet"])
        c.setFont("Helvetica", 11)
        c.drawString(150, y - 30, sub)
        # Route mono
        c.setFillColor(C["ink_quiet"])
        c.setFont("Courier", 11)
        c.drawString(420, y - 22, route)
        # Hairline
        c.setStrokeColor(C["paper_line"])
        c.setLineWidth(0.5)
        c.line(50, y - 56, PAGE_W - 50, y - 56)
        y -= 70

    slide_meta(c, n, TOTAL)
    c.showPage()


def slide_screen(c, n, title_top, title_main, body, image_file, accent="pink", on_ink=False):
    """A generic screen showcase slide. Text left, image right."""
    bg = C["ink"] if on_ink else C["paper"]
    page_bg(c, bg)

    label_color = Color(1, 1, 1, 0.55) if on_ink else C["ink_quiet"]
    title_color = C["paper"] if on_ink else C["ink"]
    body_color = Color(1, 1, 1, 0.7) if on_ink else C["ink_soft"]
    accent_color = C[accent] if accent in C else C["pink"]

    label(c, 50, PAGE_H - 65, title_top, color=label_color)

    # Title can be multi-line
    if isinstance(title_main, str):
        title_main = [title_main]
    display(c, 50, PAGE_H - 130, title_main, size=38, color=title_color, leading=42)

    # Pink (or accent) period after last title line
    last = title_main[-1]
    last_w = c.stringWidth(last, "Helvetica-Bold", 38)
    period_y = PAGE_H - 130 - (len(title_main) - 1) * 42 + 4
    c.setFillColor(accent_color)
    c.circle(50 + last_w + 6, period_y, 5, fill=1, stroke=0)

    # Body paragraph
    paragraph(c, 50, PAGE_H - 130 - len(title_main) * 42 - 30, body,
              width=340, size=12, color=body_color)

    # Image right
    img_path = os.path.join(SHOTS, image_file)
    fitted_image(c, img_path, 410, 75, max_w=380, max_h=470)

    slide_meta(c, n, TOTAL, on_ink=on_ink)
    c.showPage()


def slide_screen_full(c, n, title_top, title_main, body, image_file, on_ink=False):
    """Full-width screenshot slide with title overlay at top-left."""
    bg = C["ink"] if on_ink else C["paper"]
    page_bg(c, bg)

    label_color = Color(1, 1, 1, 0.55) if on_ink else C["ink_quiet"]
    title_color = C["paper"] if on_ink else C["ink"]
    body_color = Color(1, 1, 1, 0.7) if on_ink else C["ink_soft"]

    # Title row at top
    label(c, 50, PAGE_H - 55, title_top, color=label_color)
    display(c, 50, PAGE_H - 110, [title_main], size=32, color=title_color)
    paragraph(c, 50, PAGE_H - 140, body, width=PAGE_W - 100, size=11, color=body_color)

    # Centered full image
    img_path = os.path.join(SHOTS, image_file)
    fitted_image(c, img_path, 60, 70, max_w=PAGE_W - 120, max_h=PAGE_H - 220)

    slide_meta(c, n, TOTAL, on_ink=on_ink)
    c.showPage()


def slide_roadmap(c, n):
    page_bg(c, C["paper"])
    label(c, 50, PAGE_H - 65, "roadmap")
    display(c, 50, PAGE_H - 130, ["foundation done.", "engineering next."], size=38, color=C["ink"], leading=42)

    phases = [
        ("PHASE 0", "foundation", "audit · principles · IA · brand · roadmap", "shipped", C["lime"]),
        ("PHASE 1", "code bootstrap", "next.js + tailwind + brand tokens", "shipped", C["lime"]),
        ("PHASE 2", "landing page", "klydo.in v2 (5 sections, real photography)", "shipped", C["lime"]),
        ("PHASE 3", "mobile app", "32 routes, full clickable prototype", "shipped", C["lime"]),
        ("PHASE 4", "real backend", "wire APIs, auth, payments, fulfillment", "engineering", C["paper_soft"]),
        ("PHASE 5", "polish + a11y", "reduced-motion, a11y AA, perf budget, store assets", "engineering", C["paper_soft"]),
    ]
    y = PAGE_H - 250
    for label_text, name, scope, status, accent in phases:
        # Phase chip
        c.setFillColor(accent)
        c.rect(50, y - 4, 80, 22, fill=1, stroke=0)
        c.setFillColor(C["ink"])
        c.setFont("Helvetica-Bold", 9)
        c.drawString(60, y + 4, label_text)
        # Name
        c.setFillColor(C["ink"])
        c.setFont("Helvetica-Bold", 13)
        c.drawString(150, y + 4, name)
        # Scope
        c.setFillColor(C["ink_soft"])
        c.setFont("Helvetica", 11)
        c.drawString(290, y + 4, scope)
        # Status
        c.setFillColor(C["ink_quiet"])
        c.setFont("Helvetica-Bold", 9)
        c.drawRightString(PAGE_W - 50, y + 4, status.upper())
        # Hairline
        c.setStrokeColor(C["paper_line"])
        c.setLineWidth(0.5)
        c.line(50, y - 8, PAGE_W - 50, y - 8)
        y -= 36

    slide_meta(c, n, TOTAL)
    c.showPage()


def slide_ask(c, n):
    page_bg(c, C["lime"])

    label(c, 50, PAGE_H - 65, "the ask", color=C["ink"])
    display(c, 50, PAGE_H - 165,
            ["no ask.", "it's yours."], size=64, color=C["ink"], leading=72)
    # Pink stop
    last_w = c.stringWidth("it's yours", "Helvetica-Bold", 64)
    c.setFillColor(C["pink"])
    c.circle(50 + last_w + 10, PAGE_H - 165 - 72 + 12, 11, fill=1, stroke=0)

    paragraph(c, 50, PAGE_H - 290,
              "If any of this is useful, take it. The code is on GitHub. "
              "The live demo is on Vercel. The brand system, the principles, "
              "the screens — all yours.",
              width=560, size=14, color=C["ink"])

    paragraph(c, 50, PAGE_H - 360,
              "If you'd like to chat about the choices I made — or didn't make — I'd love to.",
              width=560, size=14, color=C["ink"])

    # CTA links
    c.setFillColor(C["ink"])
    c.setFont("Helvetica-Bold", 13)
    c.drawString(50, 140, "LIVE DEMO")
    c.setFont("Courier", 12)
    c.drawString(180, 140, "[your-vercel-url]")

    c.setFont("Helvetica-Bold", 13)
    c.drawString(50, 115, "CODE")
    c.setFont("Courier", 12)
    c.drawString(180, 115, "[your-github-url]")

    c.setFont("Helvetica-Bold", 13)
    c.drawString(50, 90, "ME")
    c.setFont("Courier", 12)
    c.drawString(180, 90, "[your name · email · phone]")

    slide_meta(c, n, TOTAL)
    c.showPage()


def slide_back_cover(c, n):
    page_bg(c, C["ink"])
    # Big wordmark
    display(c, 50, PAGE_H - 220, ["klydo"], size=180, color=C["paper"])
    k_width = c.stringWidth("klydo", "Helvetica-Bold", 180)
    c.setFillColor(C["lime"])
    c.circle(50 + k_width + 14, PAGE_H - 220 + 10, 14, fill=1, stroke=0)

    display(c, 50, PAGE_H - 320, ["fashion in thirty."], size=36, color=Color(1, 1, 1, 0.7))

    c.setFillColor(Color(1, 1, 1, 0.45))
    c.setFont("Helvetica", 11)
    c.drawString(50, 90, "MADE IN BENGALURU · 7PM DAILY · 200+ BRANDS · TRY AT THE DOOR")
    c.drawString(50, 70, "klydo.in")

    slide_meta(c, n, TOTAL, on_ink=True)
    c.showPage()


# ---------------------------------------------------------------------------
# Build the deck
# ---------------------------------------------------------------------------

def build():
    c = canvas.Canvas(OUT, pagesize=landscape(A4))
    c.setTitle("Klydo — a speculative rebrand")
    c.setAuthor("a klydo user")
    c.setSubject("Brand + product redesign of klydo.in and the Klydo app")

    # Slides
    slides = []

    # 01 Cover
    slides.append(slide_cover)
    # 02 Why
    slides.append(slide_why)
    # 03 Audit
    slides.append(slide_audit)
    # 04 Competitive
    slides.append(slide_competitive)
    # 05 Wedge
    slides.append(slide_wedge)
    # 06 Principles
    slides.append(slide_principles)
    # 07 Brand colors
    slides.append(slide_brand_colors)
    # 08 Brand type
    slides.append(slide_brand_type)
    # 09 Brand voice
    slides.append(slide_brand_voice)
    # 10 Overview / counts
    slides.append(slide_overview)

    # 11-19 Screen showcase
    screens = [
        ("klydo.in", "kill the placeholder.",
         "5 sections of editorial brand statement. Marquee ticker, color-block split hero, "
         "live drop countdown, today's drop grid, brands marquee, how-it-works.",
         "01-landing-hero.png", "lime", False),

        ("the homepage", "the portal.",
         "Inspired by Slikk's curated ethos and Myntra's section discipline, stripped "
         "of the banner-stack slop. Drop hero with timer, color quick-actions, categories, "
         "personalized 'for your vibe', featured brand, worn-in-bengaluru, past drops.",
         "10-app-home.png", "pink", False),

        ("the feed", "tiktok grammar.",
         "Vertical scroll-snap, one product per viewport. Full-bleed photo with subtle "
         "color shift. Brand + name + price + lime 'try it on' pill. The next card peeks at "
         "viewport bottom as a scroll affordance.",
         "11-app-feed.png", "lime", True),

        ("today's drop", "the listing.",
         "All 8 pieces of tonight's edit, browseable as a color-blocked grid. Live filter "
         "chips (tops, bottoms, co-ords, price bands) that actually filter. Empty state "
         "if nothing matches.",
         "12-app-drops.png", "lime", True),

        ("product detail", "show the product.",
         "Multi-image gallery with swipe + dots, 4 photos per piece. Brand + name + ETA, "
         "size chips with selected state, color swatches, why-people-kept-it tags, "
         "lime 'try it on by 6:42pm' sticky CTA.",
         "13-app-product-detail.png", "pink", False),

        ("try-on session", "the magic moment.",
         "When the courier arrives. Ink-black canvas. Real 15:00 countdown timer. "
         "Three items, each with send-back / keep toggle. Running total auto-computes. "
         "Lime checkout CTA only enabled once all decisions are made.",
         "15-app-try-on.png", "lime", True),

        ("checkout", "pay for what stays on.",
         "UPI / COD / Card method picker (UPI default for India). Address confirm. "
         "Total breakdown. Pay → 1.5s simulated processing → full-lime 'done.' success "
         "screen with what stays on + refund timeline.",
         "16-app-checkout.png", "lime", False),

        ("order tracking", "speed is the brand.",
         "Live 8-minute countdown to door. Real courier card with photo, name, "
         "rating, and WhatsApp button. 5-stage progress timeline with pink-pulse "
         "on current stage. 2.4 km away. Three pieces, ₹2,997 on hold.",
         "17-app-order-tracking.png", "pink", False),

        ("onboarding", "first launch.",
         "5-step flow on ink. Splash + lime 'start here' CTA. Three-card intro carousel "
         "(speed, try-buy, curation) with dot indicators. +91 phone OTP. Auto-advance "
         "4-digit code. Style quiz: pick at least 3 from 9 vibe tiles.",
         "18-app-onboarding.png", "lime", True),

        ("brand profile", "verified, direct.",
         "One page per brand. Bespoke metadata (founded year, ships-from, tagline, about, "
         "rating, keep rate). Stats trio. Tonight's drops from this brand. What-people-kept "
         "tags. 7 brand pages auto-generated.",
         "19-app-brand-profile.png", "lime", True),

        ("notifications", "live ticker.",
         "Grouped by time (today / yesterday / earlier this week). Mix of product-thumb "
         "and icon-block notifications. Pink unread dots. Push-notification mock at the "
         "bottom showing how OS-level notifications look.",
         "20-app-notifications.png", "pink", False),

        ("empty states", "still on-brand.",
         "Every screen has a designed empty state with display headline + body + primary + "
         "secondary CTA. Even nothing is an editorial moment. Demo-able via ?empty=1 on "
         "bag, saved, orders.",
         "25-app-bag-empty.png", "pink", False),
    ]
    for top, main, body, img, accent, on_ink in screens:
        slides.append(lambda c, n, top=top, main=main, body=body, img=img, accent=accent, on_ink=on_ink:
                      slide_screen(c, n, top, main, body, img, accent=accent, on_ink=on_ink))

    # Roadmap + Ask + Back cover
    slides.append(slide_roadmap)
    slides.append(slide_ask)
    slides.append(slide_back_cover)

    # Update total count
    global TOTAL
    TOTAL = len(slides)

    for i, fn in enumerate(slides, start=1):
        fn(c, i)

    c.save()
    print(f"✓ {OUT}")
    print(f"  {TOTAL} pages, brand-color-led, screenshots embedded")


if __name__ == "__main__":
    build()
