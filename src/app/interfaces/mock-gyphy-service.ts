import { GyphyAPI } from '../services/giphy.service';
import { Gyphy } from './gyphy';

export const fakeResponse: GyphyAPI = {
	data: [
		{ id: 'id', url: 'url', images: { fixed_width: { url: 'fixed_width_url' } } },
		{ id: 'id2', url: 'url2', images: { fixed_width: { url: 'fixed_width_url2' } } }
	],
	pagination: { total_count: 99 },
	meta: { status: 200, msg: 'Ok' }
};

export const fakeTransformed: Gyphy = {
	count: 99,
	gyphyItems: [
		{ id: 'id', viewUrl: 'fixed_width_url', originalUrl: 'url' },
		{ id: 'id2', viewUrl: 'fixed_width_url2', originalUrl: 'url2' }
	]
};
