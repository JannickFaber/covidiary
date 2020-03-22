import {Component, OnDestroy, OnInit} from '@angular/core';
import {IArticle, INews} from "./news";
import {NewsService} from "./news.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-news',
  templateUrl: 'news.component.html',
  styleUrls: ['news.component.scss'],
  providers: [HttpClient]
})
export class NewsComponent implements OnInit, OnDestroy {

  news: IArticle;

  constructor(private _newsService: NewsService) {}

  ngOnInit() {
    this._newsService.getNews().subscribe((data)=>{
      console.log(data);
      this.news = data['articles'];
    });
  }

  ngOnDestroy() {
  }
}
