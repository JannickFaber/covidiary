import {Component} from '@angular/core';
import * as moment from "moment";
import {DiaryEntry} from "../model/diary-entry";
import {StorageService} from "../services/storage-service";
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs/operators";
import {BackendService} from "../services/backend-service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  date = moment();
  diaryEntries: DiaryEntry[];
  locationScore = 0;
  contactScore = 0;

  constructor(private router: Router, private storageService: StorageService, private backendService: BackendService) {
    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
    ).subscribe((route: NavigationEnd) => {
      this.initData();
    });
  }

  private initData() {
    this.locationScore = 0;
    this.contactScore = 0;
    this.diaryEntries = [];
    let divideContactBy = 0, divideLocationBy = 0;
    for (let i = 1; i < 8; i++) {
      let day = moment().startOf('isoWeek').day(i);
      if (this.storageService.getEntryByDate(day.format('YYYY-MM-DD'))) {
        const entry = this.storageService.getEntryByDate(day.format('YYYY-MM-DD'));
        this.diaryEntries.push(entry);
      } else {
        const entry = {
          date: day.format('YYYY-MM-DD'),
          persons: null,
          locations: null
        };
        this.diaryEntries.push(entry);
        this.storageService.updateDiaryEntry(entry);
      }
    }
    this.diaryEntries.forEach(entry => {
      if (entry.locations) {
        this.locationScore += entry.locations.length;
        divideLocationBy++;
      }
      if (entry.persons) {
        this.contactScore += entry.persons.length;
        divideContactBy++;
      }
    });
    this.locationScore = Math.round((divideLocationBy === 0 ? 0 : this.locationScore / divideLocationBy) * 100) / 100;
    this.contactScore = Math.round((divideContactBy === 0 ? 0 : this.contactScore / divideContactBy) * 100) / 100;

    if (this.storageService.getUserId()) {
      this.backendService.saveWeeklyScore(this.storageService.getUserId(), this.locationScore, this.contactScore);
    } else {
      this.backendService.saveWeeklyScore(null, this.locationScore, this.contactScore).then(response => {
        this.storageService.setUserId(response.body.objectId);
      }).catch(e => {
        console.error('An error happened during server synchronization:');
        console.error(e);
      })
    }
  }
}
