// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	// Live domain — used for canonical URLs, social previews and the sitemap.
	site: 'https://fresshbites.shop',
	// Build /about-us.html (not /about-us/index.html) so Cloudflare serves /about-us directly
	// instead of redirecting every link to /about-us/ — one clean URL per page for Google.
	build: { format: 'file' },
	trailingSlash: 'never',
	// Old product URLs that were renamed — keeps shared links working.
	// (public/_redirects makes Cloudflare send a real 301 for these too.)
	redirects: {
		'/products/talbina': '/products/jober-chatu',
	},
	integrations: [
		sitemap({
			// Search results and the 404 page shouldn't appear in Google.
			filter: page => !/\/(search|404)$/.test(page.replace(/\/$/, '')),
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
