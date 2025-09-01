# Project Brief — Rock Painting Artist Website (Secure, Modern, Mobile-First)

## Hosting & Deploy
- Platform: GitHub Pages (static)
- Deployment: GitHub Actions (hardened) from main
- Architecture: Pure static assets (HTML/CSS/JS), no custom backend
- Mobile/Performance: Responsive layout, lazy-loaded, responsive images, compressed assets

## Design Goals
- Very modern, clean, accessible (WCAG AA)
- Grid layout with large imagery and ample whitespace
- System/Google font stack with safe fallbacks
- Keyboard-friendly navigation, focus states visible

## Information Architecture
- Home
  - Hero image of a finished rock
  - Tagline: “Custom Painted Rocks by [Artist’s Name] in Huntersville, NC.”
  - Primary CTA → Book a Project (Calendly)
  - Secondary CTA → Gallery
- Gallery (Portfolio Hub)
  - Category tiles with counts
  - Categories (subfolders): birthdays/, house-numbers/, yard-art/, memorials/, inspirational-quotes/, seasonal/ (extensible)
  - Category page → grid of images (lightbox or optional item page)
  - Optional item details: larger image, caption, size, city, “Request a commission” CTA
- About the Artist
  - Short bio: story, inspiration, style, service area (Huntersville/Charlotte)
- Book a Project
  - Embedded Calendly widget (primary)
  - Fallback link to Calendly page
- Contact
  - Phone, email, social links, Google Business Profile link

## Gallery Content Model

Folder structure (under `/assets/gallery/`):

```
assets/
  gallery/
    birthdays/
      2025-08-birthday-balloons-johnson-01.jpg
      2025-08-birthday-balloons-johnson-01@2x.jpg
      meta.json
    house-numbers/
      2025-07-house-num-1283-slate-01.jpg
      meta.json
    yard-art/
    memorials/
    inspirational-quotes/
    seasonal/
```

Per-category `meta.json` (optional overrides):

```
{
  "category": "birthdays",
  "title": "Birthday Rocks",
  "description": "Custom birthday-themed rock paintings in Huntersville & Charlotte.",
  "items": [
    {
      "file": "2025-08-birthday-balloons-johnson-01.jpg",
      "title": "Birthday Balloons",
      "alt": "custom rock painting in Huntersville NC — birthday balloons",
      "caption": "Vibrant balloons for a 10th birthday.",
      "city": "Huntersville, NC",
      "size_inches": "18x12",
      "tags": ["birthday", "balloons", "kids"],
      "featured": true
    }
  ]
}
```

### File naming convention
- `YYYY-MM-keywords-clientOrPlace-##.jpg` (lowercase, hyphenated). Include `@2x` for high-DPI.

### Performance rules
- Generate responsive variants (e.g., 480/768/1200/1600) and use `srcset` + `sizes`.
- `loading="lazy"` for images; defer non-critical JS.
- Strip EXIF metadata; compress JPEG ~80 quality; provide WebP/AVIF with JPEG fallback.

### Accessibility
- Descriptive alt text per image (category + motif + locale).
- Captions/figcaptions where needed.
- Keyboard and screen-reader friendly lightbox.

## SEO Requirements
- Target keywords:
  - “custom painted rocks Huntersville NC”
  - “hand-painted yard art Charlotte NC”
  - “memorial rock painter North Carolina”
- Alt text pattern: “custom rock painting in Huntersville NC — {category/motif}”.
- Technical SEO: unique `<title>`, meta description per page; canonical URLs; JSON-LD LocalBusiness; `sitemap.xml`; `robots.txt`.
- Content SEO (blog topics):
  - “Why Painted Rocks Make Unique Home & Garden Art”
  - “Custom Painted Rocks: A Local Art Trend in Charlotte NC”

## Calendly Integration
- Embed Calendly on Book a Project page.
- Place Calendly link in social bios with CTA “Commission Your Rock Today”.
- Add Calendly booking link to Google Business Profile to show “Book Online”.

## Security & Privacy (Static Site Best Practices)

### GitHub Actions hardening
- Minimal permissions and pinned actions.
- No plaintext secrets (static site; if any API keys are ever needed, do not store client-side).
- Require PR reviews and branch protection for main.
- Enable Dependabot, CodeQL, and secret scanning.

### Headers & CSP
- GitHub Pages doesn’t let you set server headers directly. Options:

1) Use a privacy-friendly meta CSP (limited but helpful):

```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self';
               img-src 'self' https: data:;
               script-src 'self';
               style-src 'self' 'unsafe-inline';
               font-src 'self' https: data:;
               connect-src 'self';
               frame-src https://calendly.com;
               base-uri 'self';
               form-action 'self' https://calendly.com;">
```

- If your CSS is bundled, you can later tighten `style-src` to remove `'unsafe-inline'`.

2) Put the site behind Cloudflare (CNAME) and add strict headers (CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy).

### 3rd-party content
- Only load Calendly from official domains; avoid unknown CDNs.
- Subresource Integrity (SRI) if any external scripts are ever used.

### Privacy
- No PII stored on the site; Calendly handles scheduling data.
- EXIF stripped from images to avoid accidental location metadata.
- Analytics (if any): use a lightweight, cookie-less tool (e.g., Plausible/GoatCounter) or omit entirely.

### File/Repo hygiene
- `.gitignore` for local caches and image source files.
- No API keys or tokens committed—ever.

### Availability
- Enable GitHub Pages HTTPS.
- Optionally add custom domain + Cloudflare proxy for caching/DDoS mitigation.

### Security checklist (pre-publish)
- Branch protection & required reviews on main.
- Actions permissions set minimally.
- Actions pinned by commit SHA.
- Dependabot & CodeQL enabled.
- Secrets scanning enabled.
- Meta CSP present (or Cloudflare headers configured).
- Images compressed, EXIF removed.
- No secrets in repo, no PII in content.

## GitHub Actions — Deployment (Reference Text Only)

This is reference text you can keep in docs; it’s not site code and won’t run until you create the workflow file.

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ "main" ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@1d96c772d19495a3b5c517cd2bc0cb401ea0529f  # v4 pinned

      # If you use Node tooling for building/minifying images:
      - name: Setup Node
        uses: actions/setup-node@60edb5dd545a775178f52524783378180af0d1f8  # v4 pinned
        with:
          node-version: '20'

      - name: Install deps
        run: npm ci
      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@f00f1b4373a3d0e49f9f2c943f2c2c6b2f9a8c1b  # v3 pinned
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to Pages
        id: deployment
        uses: actions/deploy-pages@d6d3b2b9f6f2f2b0cf9c1a5e64a7278bdbf7f9e1  # v4 pinned
```

If you aren’t using Node (e.g., pure HTML/CSS), replace the install/build steps with a direct upload of your static folder.

## JSON Spec (for automation / Codex)

```json
{
  "project": "rock-painting-artist-site",
  "hosting": {
    "platform": "github-pages",
    "deploy": "github-actions",
    "branch": "main",
    "https": true
  },
  "design": {
    "style": "modern-clean",
    "accessibility": "WCAG-AA",
    "responsive": true,
    "lightbox": true,
    "grid_layout": true
  },
  "pages": [
    {
      "id": "home",
      "path": "/",
      "hero_image": "assets/hero/featured-rock.jpg",
      "tagline": "Custom Painted Rocks by [Artist’s Name] in Huntersville, NC.",
      "primary_cta": { "text": "Book a Project", "href": "/book" },
      "secondary_cta": { "text": "View Gallery", "href": "/gallery" }
    },
    {
      "id": "gallery",
      "path": "/gallery",
      "type": "hub",
      "source_dir": "assets/gallery",
      "categories": [
        "birthdays",
        "house-numbers",
        "yard-art",
        "memorials",
        "inspirational-quotes",
        "seasonal"
      ],
      "item_page": "optional"
    },
    {
      "id": "about",
      "path": "/about",
      "sections": ["story", "inspiration", "style", "service-area"]
    },
    {
      "id": "book",
      "path": "/book",
      "calendly": {
        "embed": true,
        "url": "https://calendly.com/your-handle/commission",
        "fallback_link": true,
        "frame_src_allow": ["https://calendly.com"]
      }
    },
    {
      "id": "contact",
      "path": "/contact",
      "fields": ["phone", "email", "social", "google-business-profile"]
    }
  ],
  "seo": {
    "keywords": [
      "custom painted rocks Huntersville NC",
      "hand-painted yard art Charlotte NC",
      "memorial rock painter North Carolina"
    ],
    "image_alt_suffix": "custom rock painting in Huntersville NC",
    "structured_data": ["LocalBusiness"],
    "sitemap": true,
    "robots": true,
    "blog_topics": [
      "Why Painted Rocks Make Unique Home & Garden Art",
      "Custom Painted Rocks: A Local Art Trend in Charlotte NC"
    ],
    "canonical": true
  },
  "gallery_model": {
    "taxonomy": "category->items",
    "categories_dir": "assets/gallery",
    "category_meta": "meta.json",
    "fields": [
      "file",
      "title",
      "alt",
      "caption",
      "city",
      "size_inches",
      "tags",
      "featured"
    ],
    "naming_convention": "YYYY-MM-keywords-clientOrPlace-##.jpg",
    "responsive_images": [480, 768, 1200, 1600],
    "strip_exif": true,
    "compress_quality": 80,
    "formats": ["jpg", "webp", "avif"]
  },
  "security": {
    "actions": {
      "branch_protection": true,
      "require_reviews": true,
      "pinned_actions": true,
      "permissions_minimized": true,
      "dependabot": true,
      "codeql": true,
      "secret_scanning": true
    },
    "headers": {
      "meta_csp": "default-src 'self'; img-src 'self' https: data:; script-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self' https: data:; connect-src 'self'; frame-src https://calendly.com; base-uri 'self'; form-action 'self' https://calendly.com",
      "hsts_recommended": true,
      "proxy_option": "cloudflare-for-headers"
    },
    "privacy": {
      "no_pii": true,
      "exif_stripped": true,
      "analytics": "none_or_privacy_friendly"
    }
  },
  "gmb": {
    "booking_link": true,
    "service_area": ["Huntersville, NC", "Charlotte, NC"]
  }
}
```

## Optional: Security Notes You Can Keep in Docs
- If you later add any external scripts, use Subresource Integrity (SRI) and restrict `script-src` to only those origins.
- If you adopt a CSS-in-JS library or inline styles, refactor to hashed class names so you can safely remove `'unsafe-inline'` from `style-src`.
- With a Cloudflare front, enable:
  - `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY` (or `SAMEORIGIN` if you must embed your own pages)
  - `Referrer-Policy: no-referrer-when-downgrade` (or stricter)
  - `Permissions-Policy` limiting camera/mic/geolocation to `()` (none)

---

## Specification — Rock Painting Artist Website (Concise)

### Hosting & Deployment
- Host as a static site on GitHub Pages.
- Deploy automatically with GitHub Actions from the main branch.
- Enforce HTTPS and ensure all assets are delivered securely.

### Design
- Apply a very modern, clean, mobile-first layout.
- Use responsive grids, large imagery, and whitespace.
- Ensure accessibility compliance (WCAG AA).
- Provide keyboard-friendly navigation and visible focus states.

### Pages
1. Home
   - Hero image of a finished rock.
   - Tagline: “Custom Painted Rocks by [Artist’s Name] in Huntersville, NC.”
   - Primary call-to-action: Book a Project.
   - Secondary call-to-action: View Gallery.
2. Gallery (Portfolio Hub)
   - Display category tiles with counts.
   - Categories: birthdays, house numbers, yard art, memorials, inspirational quotes, seasonal.
   - Each category has its own subpage showing images in that subfolder.
   - Allow optional item detail view with caption, size, location, and booking link.
3. About the Artist
   - Present story, inspiration, style, and service area.
4. Book a Project
   - Embed Calendly widget for commissions.
   - Provide fallback link to Calendly booking page.
5. Contact
   - Include phone, email, social links, and Google Business Profile link.

### Gallery Structure
- Organize gallery assets into subfolders by category.
- Each category contains images and a metadata file describing title, alt text, caption, city, size, tags, and featured flag.
- Apply a consistent file-naming convention: `YYYY-MM-keywords-clientOrPlace-##.jpg`.
- Generate responsive image variants and lazy load.
- Strip EXIF metadata, compress for performance, and provide modern formats (WebP, AVIF) with fallbacks.

### SEO Requirements
- Optimize titles, meta descriptions, and canonical URLs.
- Add structured data for LocalBusiness with address and service area.
- Provide `sitemap.xml` and `robots.txt`.
- Apply descriptive alt text for every image, ending with “custom rock painting in Huntersville NC.”
- Target keywords:
  - “custom painted rocks Huntersville NC”
  - “hand-painted yard art Charlotte NC”
  - “memorial rock painter North Carolina”
- Include blog posts for long-term SEO:
  - “Why Painted Rocks Make Unique Home & Garden Art”
  - “Custom Painted Rocks: A Local Art Trend in Charlotte NC”

### Calendly Integration
- Embed Calendly scheduling on the booking page.
- Place Calendly link in social media profiles with the call to action “Commission Your Rock Today.”
- Add Calendly booking link to the Google Business Profile to surface “Book Online.”

### Security and Privacy
- Configure GitHub Actions with minimal permissions and pinned action versions.
- Require branch protection and pull request reviews before merging to main.
- Enable Dependabot, CodeQL scanning, and secret scanning.
- Do not store personal information or API keys in the repository.
- Strip EXIF data from all images to prevent leaking location data.
- Restrict external scripts to trusted domains only.
- Add a content security policy, HSTS, and standard security headers.
- If proxied through a CDN, configure additional headers for X-Content-Type-Options, X-Frame-Options, Referrer-Policy, and Permissions-Policy.

### Publishing Checklist
- Branch protection rules active on main.
- All GitHub Actions pinned and reviewed.
- Security scans enabled.
- HTTPS enforced on GitHub Pages.
- Sitemap and robots files present.
- SEO metadata validated.
- All images optimized, responsive, and privacy-safe.

