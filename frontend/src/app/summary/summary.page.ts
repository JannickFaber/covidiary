import { Component, OnInit } from '@angular/core';
import {BackendService} from "../services/backend-service";
import {StorageService} from "../services/storage-service";
import * as moment from "moment";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {

  timeToSummarize = moment().days(-14).toISOString();
  contactScore: number;
  globalContactScore: number;
  locationScore: number;
  globalLocationScore: number;

  constructor(private backendService: BackendService, private storageService: StorageService) {}

  ngOnInit() {
    const entries = this.storageService.getDiaryEntries();
    entries.forEach(entry => {
      this.contactScore += entry.persons.length;
      this.locationScore += entry.locations.length;
    });

    this.contactScore = this.contactScore / entries.length;
    this.backendService.getGlobalContactScore().then((response) => {
      this.globalContactScore = response.body;
    }).catch(e => {
      console.error('There was an error querying the global data:');
      console.error(e);
      this.globalLocationScore = -1;
    });

    this.locationScore = this.locationScore / entries.length;
    this.backendService.getGlobalLocationScore().then(response => {
      this.globalLocationScore = response.body;
    }).catch(e => {
      console.error('There was an error querying the global data:');
      console.error(e);
      this.globalLocationScore = -1;
    });
  }
}
