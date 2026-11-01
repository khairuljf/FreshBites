import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

import { CATEGORY_SLUGS } from './lib/site';

// Each product is one Markdown file in src/content/products/.
// The file name becomes the URL: mango-himsagar.md -> /products/mango-himsagar
const products = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
	schema: z.object({
		name: z.string(),
		// English / romanised name, e.g. "Raw Comb Honey (Chaker Modhu)" — shown under the
		// Bangla name and added to the Google title so English searches find the product too.
		nameEn: z.string().optional(),
		category: z.enum(CATEGORY_SLUGS),
		summary: z.string(),
		// Main photo, e.g. /images/products/talbina.jpg (file in public/images/products/).
		// Without one, the shop logo is shown as a placeholder.
		image: z.string().optional(),
		// Extra photos, shown as thumbnails on the product page after `image`.
		gallery: z.array(z.string()).default([]),
		// Leave `price` out on a size to show "Ask for Price".
		sizes: z.array(z.object({ label: z.string(), price: z.number().optional() })).min(1),
		// Extra search words, e.g. Bangla names.
		tags: z.array(z.string()).default([]),
		featured: z.boolean().default(false),
		// Display position — lower numbers show first (home favourites and Products page).
		// Products without one keep alphabetical order after the numbered ones.
		order: z.number().default(100),
		inStock: z.boolean().default(true),
		// Cooked/baked after the order comes in — shows the SITE.leadTime notice.
		madeToOrder: z.boolean().default(false),
	}),
});

export const collections = { products };
