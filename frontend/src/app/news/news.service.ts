import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {INews} from "./news";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private _url: string ="http://newsapi.org/v2/top-headlines?country=de&category=health&apiKey=4d6381250b7243df9fa889a380113343"
  private result: INews;

  constructor(private http: HttpClient) { }

  /*getNews(): Observable<INews> {
    return this.http.get<INews>(this._url);
  }*/

  getNews(): INews {
    return this.result;
  }

  loadNews() {
    let promise = new Promise((resolve, reject) => {
      this.http.get(this._url)
          .toPromise()
          .then((res: any) => { //Success
            this.result = res.data;
            console.log(JSON.stringify(res));
          }),
          msg => {
            reject(msg);
          }
    })


    return promise;
  }
}
