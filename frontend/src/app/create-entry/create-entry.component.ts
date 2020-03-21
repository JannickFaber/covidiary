import { Component, OnInit } from '@angular/core';
import { ProcessSteps } from './process-steps-enum';

@Component({
  selector: 'app-create-entry',
  templateUrl: './create-entry.component.html',
  styleUrls: ['./create-entry.component.scss'],
})
export class CreateEntryComponent implements OnInit {

  processSteps = ProcessSteps;
  activeProcessStep = ProcessSteps.STEP1;
  private outside: boolean = false;

  persons: string[] = [];
  places: string[] = [];

  constructor() { }

  ngOnInit() { }

  setPersons(persons: string[]) {
    this.persons = persons;
  }

  setPlaces(places: string[]) {
    this.places = places;
  }

  wasOutside(outside: boolean) {
    this.activeProcessStep = outside ? ProcessSteps.STEP2 : ProcessSteps.STEP3;
    this.outside = outside;
    if(!outside) {
      this.places = [];
    }
  }

  hadContact(contact: boolean) {
    if (contact) {
      this.activeProcessStep = ProcessSteps.STEP4;
    } else {
      this.persons = [];
      this.endProcess();
    }
  }

  nextStep(goNext: boolean) {
    if (goNext) {
      switch (this.activeProcessStep) {
        case ProcessSteps.STEP2: this.activeProcessStep = ProcessSteps.STEP3;
          break;
        case ProcessSteps.STEP4: this.endProcess();
          break;
      }
    } else {
      switch (this.activeProcessStep) {
        case ProcessSteps.STEP2: this.activeProcessStep = ProcessSteps.STEP1;
          break;
        case ProcessSteps.STEP3: this.activeProcessStep = this.outside ? ProcessSteps.STEP2 : ProcessSteps.STEP1;
          break;
        case ProcessSteps.STEP4: this.activeProcessStep = ProcessSteps.STEP3;
          break;
      }
    }
  }

  endProcess() {
    this.activeProcessStep = ProcessSteps.STEP5;
  }

}
