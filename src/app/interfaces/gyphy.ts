export interface Gyphy {
	count: number;
	gyphyItems: GyphyItem[];
}

export interface GyphyItem {
	id: string;
	viewUrl: string;
	originalUrl: string;
}

export type GyphyType = 'gifs' | 'stickers';
