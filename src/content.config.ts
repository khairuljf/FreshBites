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
		category: z.enum(CATEGORY_SLUGS),
		summary: z.string(),
		// Shown when there is no image. Put real photos in public/images/products/ and set `image`.
		emoji: z.string(),
		image: z.string().optional(),
		// Leave `price` out on a size to show "Ask for Price".
		sizes: z.array(z.object({ label: z.string(), price: z.number().optional() })).min(1),
		// Extra search words, e.g. Bangla names.
		tags: z.array(z.string()).default([]),
		featured: z.boolean().default(false),
		inStock: z.boolean().default(true),
	}),
});

export const collections = { products };
