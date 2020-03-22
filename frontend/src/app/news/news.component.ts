import {Component, OnDestroy, OnInit} from '@angular/core';
import {INews} from "./news";
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

  news: INews;

  constructor(private _newsService: NewsService) {}

  ngOnInit() {
    this._newsService.loadNews();
    this.news = this._newsService.getNews();
  }

  ngOnDestroy() {
  }
}
