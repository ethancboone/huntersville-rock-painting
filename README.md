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
