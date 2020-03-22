import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProcessSteps } from './process-steps-enum';
import {ActivatedRoute, Router} from '@angular/router';
import {DiaryEntry} from "../model/diary-entry";
import {StorageService} from "../services/storage-service";
import * as moment from "moment";

@Component({
  selector: 'app-create-entry',
  templateUrl: './create-entry.component.html',
  styleUrls: ['./create-entry.component.scss']
})
export class CreateEntryComponent implements OnInit, AfterViewInit {
  processSteps = ProcessSteps;
  activeProcessStep = ProcessSteps.STEP1;
  diaryEntry: DiaryEntry;
  date: moment.Moment;

  persons: string[] = [];
  places: string[] = [];

  constructor(private router: Router, private storageService: StorageService, private route: ActivatedRoute) {}

  ngAfterViewInit(): void {
    document.getElementById('entry').style.height =
        window.innerHeight - 100 + 'px';
  }

  ngOnInit() {
    this.route.queryParams.subscribe(event => {
      this.date = moment(event.day);
      this.diaryEntry = this.storageService.getEntryByDate(event.day)
    });
  }

  setPersons(persons: string[]) {
    this.persons = persons;
    console.log(persons);
    this.diaryEntry.persons = persons;
  }

  setPlaces(places: string[]) {
    this.places = places;
    console.log(places);
    this.diaryEntry.locations = places;
  }

  wasOutside(outside: boolean) {
    this.activeProcessStep = outside ? ProcessSteps.STEP2 : ProcessSteps.STEP3;
    if (!outside) {
      this.places = [];
    }
  }

  hadContact(contact: boolean) {
    if (contact) {
      this.activeProcessStep = ProcessSteps.STEP4;
    } else {
      this.persons = [];
      this.activeProcessStep = ProcessSteps.STEP5;
    }
  }

  nextStep(goNext: boolean) {
    if (goNext) {
      switch (this.activeProcessStep) {
        case ProcessSteps.STEP2:
          this.activeProcessStep = ProcessSteps.STEP3;
          break;
        case ProcessSteps.STEP4:
          this.activeProcessStep = ProcessSteps.STEP5;
          break;
        case ProcessSteps.STEP5:
          this.endProcess();
          if (!this.diaryEntry.persons) {
            this.diaryEntry.persons = [];
          }
          if (!this.diaryEntry.locations) {
            this.diaryEntry.locations = [];
          }
          console.log(this.diaryEntry);
          this.diaryEntry.date = this.date.format('YYYY-MM-DD');
          this.storageService.updateDiaryEntry(this.diaryEntry);
          console.log(this.date);
          console.log(this.storageService.getDiaryEntries());
          // console.log(this.storageService.getEntryByDate(this.date.format('YYYY-MM-DD')));
          break;
      }
    } else {
      switch (this.activeProcessStep) {
        case ProcessSteps.STEP2:
          this.activeProcessStep = ProcessSteps.STEP1;
          break;
        case ProcessSteps.STEP3:
          this.activeProcessStep =
            this.places.length === 0 ? ProcessSteps.STEP1 : ProcessSteps.STEP2;
          break;
        case ProcessSteps.STEP4:
          this.activeProcessStep = ProcessSteps.STEP3;
          break;
        case ProcessSteps.STEP5:
          this.activeProcessStep =
            this.persons.length === 0 ? ProcessSteps.STEP3 : ProcessSteps.STEP4;
          break;
      }
    }
  }

  endProcess() {
    this.router.navigate(['']);
  }
}
