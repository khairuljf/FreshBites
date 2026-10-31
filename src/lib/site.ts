// Shop details — edit these to update the whole site.
export const SITE = {
	name: 'freshBites',
	url: 'https://fresshbites.shop',
	tagline: 'Pure, natural food for your family',
	// Words people type into Google — used in the home page title.
	seoTitle: 'freshBites — Pure Honey, Achar, Lal Atta & Talbina in Bangladesh',
	slogan: ['Pure', 'Natural', 'Delicious'],
	logo: '/images/logo.png',
	description:
		'freshBites brings you pure, natural food — pure honey, home-style pickles, red atta, talbina and traditional sweets like naru and date-nut borfi. Cash on delivery all over Bangladesh — order easily on WhatsApp.',
	phone: '01758062614',
	phoneIntl: '+8801758062614',
	whatsapp: '8801758062614',
	email: 'support@fresshbites.shop',
	address: 'Dhaka, Bangladesh',
	city: 'Dhaka',
	countryCode: 'BD',
	hours: 'Every day, 8:00 AM – 10:00 PM',
	currency: '৳',
	// Notice needed for products marked `madeToOrder` (home-cooked food).
	leadTime: '24 hours',
	facebook: 'https://www.facebook.com/FreshBitesShop',
	youtube: 'https://www.youtube.com/@FresshBites',
	// Microsoft Clarity project (clarity.microsoft.com) — visitor recordings and heatmaps.
	clarityId: 'z19iv8r9a7',
	// Google Analytics 4 measurement ID (analytics.google.com → Admin → Data streams).
	gaId: 'G-FWSDMS21PM',
};

export const NAV = [
	{ href: '/', label: 'Home' },
	{ href: '/products', label: 'Products' },
	{ href: '/about-us', label: 'About Us' },
	{ href: '/contact-us', label: 'Contact Us' },
];

export const CATEGORY_SLUGS = ['honey', 'pickles', 'grains', 'sweets'] as const;
export type TCategorySlug = (typeof CATEGORY_SLUGS)[number];

export type TCategory = { slug: TCategorySlug; name: string; emoji: string; bg: string };

export const CATEGORIES: TCategory[] = [
	{ slug: 'honey', name: 'Honey · মধু', emoji: '🍯', bg: 'bg-accent-100' },
	{ slug: 'pickles', name: 'Pickles · আচার', emoji: '🫙', bg: 'bg-leaf-100' },
	{ slug: 'grains', name: 'Atta & Grains · আটা ও শস্য', emoji: '🌾', bg: 'bg-earth-100' },
	{ slug: 'sweets', name: 'Sweets · মিষ্টি', emoji: '🥥', bg: 'bg-earth-50' },
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
