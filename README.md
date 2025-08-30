# Huntersville Rock Art — Static Site

A GitHub Pages–ready Jekyll site for a spirit-rock painting business, including gallery, pricing, booking, contact form, Stripe links, and optional Static CMS.

Quick Links
- Live site (after deploy): https://ethancboone.github.io/huntersville-rock-painting/
- Admin (Static CMS): /admin

Requirements
- Ruby 3.x (recommended)
- Bundler and Jekyll (or use GitHub Actions only)

Local Setup
1. Install Jekyll and plugins: `gem install bundler jekyll jekyll-sitemap jekyll-seo-tag`
2. Serve locally: `jekyll serve` then open http://127.0.0.1:4000/huntersville-rock-painting/

Content Model
- Gallery items: `_gallery/*.md` with front matter (title, date, tags, image, alt, caption)
- Packages: `_packages/*.md` with front matter (name, price, short, includes, stripe_link)
- Testimonials: `_testimonials/*.md` with front matter (author, quote)

Gallery at scale (hundreds of photos)
- Store images under `assets/gallery/<year>/` with descriptive names, e.g., `assets/gallery/2025/alex-10-birthday.jpg`.
- Avoid Git LFS for Pages. Commit optimized JPEGs (1500–2000px wide, ~200–400KB).
- Use enriched fields for filtering: `location` (string), `style` (list), `theme` (list), plus `tags` as needed.
- Example `_gallery` item:

  ---
  title: "School Spirit – Wildcats"
  date: 2025-03-04
  location: "Cornelius"
  style: [mascot, bold]
  theme: [school]
  image: /assets/gallery/2025/wildcats.jpg
  alt: "Wildcats mascot in blue and gold"
  caption: "School colors and mascot lettering."
  ---

- The Gallery page supports filtering by Location, Style, and Theme (single-select per group). Add the fields above to new items for filterability.
- Optional: host originals on an image CDN (Cloudinary/ImageKit) and reference CDN URLs in `image` for automatic resizing/caching.

Editing Options
- Edit directly via GitHub’s web UI
- Or use Static CMS at `/admin` (requires GitHub OAuth app for production auth)

Configure Before Launch
- `_config.yml`: `title`, `description`, `url`
- `admin/config.yml`: set `repo: yourname/yourrepo`
- Replace Formspree endpoint in `contact.md`
- Replace Calendly URL in `book.md`
- Add Stripe Payment Links in `_packages/*.md`
- Upload real images to `assets/gallery/` and update `image` paths
- (Optional) Add `/assets/og.jpg` and analytics snippet in `_layouts/default.html`
  - For rich link previews (iMessage, Messages/RCS, Facebook, etc.), ensure a real `assets/og.jpg` image exists. `jekyll-seo-tag` outputs Open Graph/Twitter meta tags using `page.image` or `site.image`.

Deploy (GitHub Pages)
1. Push to `main`
2. Pages deploys via GitHub Actions workflow at `.github/workflows/build.yml`
3. After the first run, visit the live URL above

Acceptance Checks
- Navigation works on mobile/desktop
- Gallery grid is responsive and shows latest items
- Contact form submits to Formspree inbox
- Calendly widget loads on `/book`
- Stripe Payment Links open checkout
- CMS can create a gallery item that appears on `/gallery`

Notes
- Collections output at: `/gallery/:name/`, `/services/:name/`, `/testimonials/:name/`
- For CMS GitHub auth, set up a GitHub OAuth app or host CMS via Netlify Git Gateway.
