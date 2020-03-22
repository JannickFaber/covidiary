import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {

  timeToSummarize = new Date(new Date().getTime() - 1209600000).toISOString();
  contactScore: number;
  globalContactScore: number;

  constructor() {}

  ngOnInit() {
    // TODO get contactScore from storage
    // TODO get globalContactScore from backend

    this.contactScore = 4.1;
    this.globalContactScore = 3.6;
  }

  public changeSummarizeDate() {

  }
}
