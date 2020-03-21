import {Component, OnDestroy, OnInit} from '@angular/core';
import {INews} from "./news";
import {NewsService} from "./news.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-news',
  templateUrl: 'news.component.html',
  styleUrls: ['news.component.scss'],
  providers: [HttpClient]
})
export class NewsComponent implements OnInit, OnDestroy {

  public news: INews;

  constructor(private _newsService: NewsService) {}

  ngOnInit() {
    this._newsService.getNews()
        .subscribe(data => this.news = data);
  }

  ngOnDestroy() {
  }
}
