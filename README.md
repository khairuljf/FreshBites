# freshBites

Static product catalogue + WhatsApp ordering. Built with Astro, Tailwind CSS and Fuse.js.
No database and no server, so it runs on Cloudflare's free plan.

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321
```

## Edit the shop

| What | Where |
|---|---|
| Shop name, phone, WhatsApp, email, address, hours | `src/lib/site.ts` |
| Categories | `CATEGORIES` in `src/lib/site.ts` (and `CATEGORY_SLUGS`) |
| Products | One `.md` file per product in `src/content/products/` |
| Product photos | Put them in `public/images/products/` and set `image: /images/products/name.webp` |
| Colours | `@theme` in `src/styles/global.css` |

Leave `price` out of a size to show **Ask for Price**. Set `inStock: false` to show **Out of stock**.
Set `featured: true` to show a product on the home page. Add Bangla names to `tags` so search finds them.

## Deploy to Cloudflare (free)

**From the terminal:**

```bash
npx wrangler login
npm run build
npx wrangler deploy
```

**Or auto-deploy from GitHub:** push this folder to a GitHub repo, then in the Cloudflare dashboard go to
Workers & Pages → Create → Import a repository. Build command `npm run build`, deploy command `npx wrangler deploy`.
Every push redeploys the site.
