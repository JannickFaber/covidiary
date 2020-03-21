import {Component, OnInit} from '@angular/core';
import {INews} from "./news";
import {NewsService} from "./news.service";

@Component({
  selector: 'app-news',
  templateUrl: 'news.component.html',
  styleUrls: ['news.component.scss']
})
export class NewsComponent implements OnInit {

  public news: INews;

  constructor(private _newsService: NewsService) {}

  ngOnInit(): void {
    this._newsService.getNews()
        .subscribe(data => this.news = data);
  }
}
