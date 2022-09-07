import { TestBed } from '@angular/core/testing';

import { GiphyService } from './giphy.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeResponse, fakeTransformed } from '../interfaces/mock-gyphy-service';
import { environment } from '../../environments/environment';

describe('GiphyService', () => {
	let service: GiphyService;
	let httpController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule]
		});
		service = TestBed.inject(GiphyService);
		httpController = TestBed.inject(HttpTestingController);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should transform API', () => {
		expect((service as any)['transformGyphy'](fakeResponse)).toEqual(fakeTransformed);
	});

	it('should return expected transformed images (HttpClient called once)', () => {
		const expectedUrl = `${environment.giphyAPI.url}gifs/search?q=str&api_key=${environment.giphyAPI.key}&offset=0&limit=9`;

		service.getImages('str', 'gifs', 1).subscribe((images) => {
			expect(images).toEqual(fakeTransformed);
		});

		const req = httpController.expectOne({
			method: 'GET',
			url: expectedUrl
		});

		req.flush(fakeResponse);
	});
});
