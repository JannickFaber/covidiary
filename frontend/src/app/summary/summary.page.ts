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

  backendEnabled = false;
  timeToSummarize = moment().days(-14).toISOString();
  contactScore = 0;
  globalContactScore = 0;
  locationScore = 0;
  globalLocationScore = 0;

  constructor(private backendService: BackendService, private storageService: StorageService) {}

  ngOnInit() {
    let divideContactBy = 0, divideLocationBy = 0;
    this.storageService.getDiaryEntries().forEach(entry => {
      if (entry.locations) {
        this.locationScore += entry.locations.length;
        divideLocationBy++;
      }
      if (entry.persons) {
        this.contactScore += entry.persons.length;
        divideContactBy++;
      }
    });
    this.locationScore = (divideLocationBy === 0 ? 0 : this.locationScore / divideLocationBy);
    this.contactScore = (divideContactBy === 0 ? 0 : this.contactScore / divideContactBy);
    this.backendEnabled = this.storageService.getBackendEnabled();

    if (this.backendEnabled) {
      this.backendService.getGlobalScore().then((response) => {
        this.globalContactScore = response.body.contactScore;
        this.globalLocationScore = response.body.locationScore;
      }).catch(e => {
        console.error('There was an error querying the global data:');
        console.error(e);
        this.globalLocationScore = -1;
      });
    }
  }
}
