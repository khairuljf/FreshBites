import { getCollection } from 'astro:content';

import { getCategory, priceLabel } from '../lib/site';
import type { TSearchItem } from '../scripts/search';

// Built once at build time into dist/search-index.json — the browser searches this file.
export async function GET() {
	const products = await getCollection('products');
	const index: TSearchItem[] = products.map(p => ({
		category: getCategory(p.data.category).name,
		image: p.data.image,
		name: p.data.name,
		price: priceLabel(p.data.sizes),
		summary: p.data.summary,
		tags: p.data.tags,
		url: `/products/${p.id}`,
	}));
	return new Response(JSON.stringify(index), { headers: { 'Content-Type': 'application/json' } });
}
