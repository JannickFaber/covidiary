import { Component, OnInit } from '@angular/core';
import { IArticle } from './news';
import { NewsService } from './news.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-news',
  templateUrl: 'news.component.html',
  styleUrls: ['news.component.scss'],
  providers: [HttpClient]
})
export class NewsComponent implements OnInit {

  news: IArticle;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.getNews().subscribe((data: any) => {
      this.news = data.articles;
    });
  }
}
