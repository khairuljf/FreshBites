import Fuse from 'fuse.js';

export type TSearchItem = {
	category: string;
	emoji: string;
	image?: string;
	name: string;
	price: string;
	summary: string;
	tags: string[];
	url: string;
};

let fusePromise: Promise<Fuse<TSearchItem>> | undefined;

/** Loads /search-index.json once and builds the Fuse index (cached for the page). */
export function getFuse(): Promise<Fuse<TSearchItem>> {
	fusePromise ??= fetch('/search-index.json')
		.then(res => res.json() as Promise<TSearchItem[]>)
		.then(
			items =>
				new Fuse(items, {
					ignoreLocation: true,
					keys: [
						{ name: 'name', weight: 3 },
						{ name: 'tags', weight: 2 },
						{ name: 'category', weight: 1.5 },
						{ name: 'summary', weight: 1 },
					],
					threshold: 0.35,
				}),
		);
	return fusePromise;
}

export async function searchProducts(query: string, limit = 50): Promise<TSearchItem[]> {
	const q = query.trim();
	if (!q) return [];
	const fuse = await getFuse();
	return fuse.search(q, { limit }).map(r => r.item);
}

export function escapeHtml(value: string): string {
	return value.replace(/[&<>"']/g, ch => `&#${ch.charCodeAt(0)};`);
}

export function thumbHtml(item: TSearchItem, size: string): string {
	return item.image
		? `<img src="${escapeHtml(item.image)}" alt="" class="${size} rounded-lg object-cover" />`
		: `<span class="${size} flex items-center justify-center rounded-lg bg-brand-50 text-2xl" aria-hidden="true">${escapeHtml(item.emoji)}</span>`;
}
