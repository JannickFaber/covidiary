import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private url = 'http://newsapi.org/v2/top-headlines?country=de&category=health&apiKey=4d6381250b7243df9fa889a380113343';

  constructor(private http: HttpClient) { }

  getNews() {
    return this.http.get(this.url);
  }
}
