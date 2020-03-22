import { Component, OnInit } from '@angular/core';
import { INews, IArticle } from '../models/news';
import { NewsService } from '../services/news-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-news',
  templateUrl: 'news.page.html',
  styleUrls: ['news.page.scss'],
  providers: [HttpClient]
})
export class NewsPage implements OnInit {

  news: IArticle[];

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.getNews().subscribe((data: INews) => {
      this.news = data.articles;
    });
  }
}
