import { Component, OnInit } from '@angular/core';
import {BackendService} from "../services/backend-service";
import {StorageService} from "../services/storage-service";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {

  timeToSummarize = new Date(new Date().getTime() - 1209600000).toISOString();
  contactScore: number;
  globalContactScore: number;
  locationScore: number;
  globalLocationScore: number;

  constructor(private backendService: BackendService, private storageService: StorageService) {}

  ngOnInit() {
    // TODO get contactScore from storage
    this.contactScore = 4;
    this.backendService.getGlobalContactScore().then((response) => {
      this.globalContactScore = response.body;
    });
    // TODO get locationScore from storage
    this.locationScore = 3;
    this.backendService.getGlobalLocationScore().then(response => {
      this.globalLocationScore = response.body;
    }).catch(e => {
      console.error('There was an error querying the global data:');
      console.error(e);
      this.globalLocationScore = -1;
    });
  }
}
