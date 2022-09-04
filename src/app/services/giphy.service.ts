import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import {  Gyphy, GyphyItem, GyphyType } from '../interfaces/gyphy';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  constructor(
    private http: HttpClient
  ) { }

  getImages(searchStr: string, contentType: GyphyType, page: number): Observable<Gyphy> {
    const queryParams = {
      q: searchStr,
      api_key: environment.giphyAPI.key,
      offset: (page - 1) * environment.giphyAPI.limit,
      limit: environment.giphyAPI.limit
    }
    const url = `${environment.giphyAPI.url}${contentType}/search`

    return this.http.get<GyphyAPI>(url, {params: queryParams}).pipe(
      map(this.transformGyphy)
    );
  }

  private transformGyphy(data: GyphyAPI): Gyphy {
    const items: GyphyItem[] = data.data.map((item: GyphyItemAPI) => {
      return {
        id: item.id,
        viewUrl: item.images.fixed_width.url,
        originalUrl: item.url
      }
    })
    return {
      count: data.pagination.total_count,
      gyphyItems: items
    }
  }
}

interface GyphyAPI {
  data: GyphyItemAPI[];
  pagination: {
    total_count: number;
  }
  meta: {
    status: number;
  }
}

interface GyphyItemAPI {
  id: string;
  url: string;
  images: {
    fixed_width: {
      url: string
    };
  }
}
