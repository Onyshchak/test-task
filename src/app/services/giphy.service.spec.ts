import { TestBed } from '@angular/core/testing';

import { GiphyService } from './giphy.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GiphyService', () => {
	let service: GiphyService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule]
		});
		service = TestBed.inject(GiphyService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
