// Shop details — edit these to update the whole site.
export const SITE = {
	name: 'freshBites',
	tagline: 'Pure, natural food for your family',
	slogan: ['Pure', 'Natural', 'Delicious'],
	logo: '/images/logo.png',
	description:
		'freshBites brings you pure, natural food — home-made cakes and snacks, plus everyday essentials like atta, oil, fruits and more. Cash on delivery all over Bangladesh — order easily on WhatsApp.',
	phone: '01758062614',
	phoneIntl: '+8801758062614',
	whatsapp: '8801758062614',
	email: 'khairuljf@gmail.com',
	address: 'Dhaka, Bangladesh',
	hours: 'Every day, 8:00 AM – 10:00 PM',
	currency: '৳',
	// Notice needed for products marked `madeToOrder` (cakes, home-cooked food).
	leadTime: '24 hours',
	facebook: 'https://www.facebook.com/FreshBitesShop',
};

export const NAV = [
	{ href: '/', label: 'Home' },
	{ href: '/products', label: 'Products' },
	{ href: '/about-us', label: 'About Us' },
	{ href: '/contact-us', label: 'Contact Us' },
];

export const CATEGORY_SLUGS = ['grocery', 'fruits', 'vegetables', 'bakery', 'snacks', 'dairy', 'beverages'] as const;
export type TCategorySlug = (typeof CATEGORY_SLUGS)[number];

export type TCategory = { slug: TCategorySlug; name: string; emoji: string; bg: string };

export const CATEGORIES: TCategory[] = [
	{ slug: 'grocery', name: 'Grocery & Essentials', emoji: '🛒', bg: 'bg-earth-100' },
	{ slug: 'fruits', name: 'Fruits', emoji: '🍎', bg: 'bg-accent-50' },
	{ slug: 'vegetables', name: 'Vegetables', emoji: '🥦', bg: 'bg-brand-50' },
	{ slug: 'bakery', name: 'Bakery', emoji: '🥐', bg: 'bg-earth-50' },
	{ slug: 'snacks', name: 'Snacks', emoji: '🍪', bg: 'bg-accent-100' },
	{ slug: 'dairy', name: 'Dairy & Eggs', emoji: '🥛', bg: 'bg-sky-50' },
	{ slug: 'beverages', name: 'Beverages', emoji: '🧃', bg: 'bg-leaf-100' },
];

export function getCategory(slug: TCategorySlug): TCategory {
	return CATEGORIES.find(c => c.slug === slug) ?? CATEGORIES[0];
}

export function formatPrice(amount: number): string {
	return `${SITE.currency}${amount.toLocaleString('en-US')}`;
}

/** Lowest price across sizes, or undefined when every size is "Ask for Price". */
export function getStartingPrice(sizes: { price?: number }[]): number | undefined {
	const prices = sizes.map(s => s.price).filter((p): p is number => typeof p === 'number');
	return prices.length ? Math.min(...prices) : undefined;
}

export function priceLabel(sizes: { price?: number }[]): string {
	const start = getStartingPrice(sizes);
	if (start === undefined) return 'Ask for Price';
	return sizes.length > 1 ? `From ${formatPrice(start)}` : formatPrice(start);
}

export function waLink(text: string): string {
	return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}
