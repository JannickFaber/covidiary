import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {INews} from "./news";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private _url: string ="http://newsapi.org/v2/top-headlines?country=de&category=health&apiKey=4d6381250b7243df9fa889a380113343"

  constructor(private http: HttpClient) { }

  getNews(): Observable<INews> {
    return this.http.get<INews>(this._url);
  }
}
