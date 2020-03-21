import { Component, OnInit } from '@angular/core';
import { ProcessSteps } from './process-steps-enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-entry',
  templateUrl: './create-entry.component.html',
  styleUrls: ['./create-entry.component.scss'],
})
export class CreateEntryComponent implements OnInit {

  processSteps = ProcessSteps;
  activeProcessStep = ProcessSteps.STEP1;

  persons: string[] = [];
  places: string[] = [];

  constructor(private router: Router) { }

  ngOnInit() { }

  setPersons(persons: string[]) {
    this.persons = persons;
  }

  setPlaces(places: string[]) {
    this.places = places;
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
        case ProcessSteps.STEP2: this.activeProcessStep = ProcessSteps.STEP3;
          break;
        case ProcessSteps.STEP4: this.activeProcessStep = ProcessSteps.STEP5;
          break;
        case ProcessSteps.STEP5: this.endProcess();
          break;
      }
    } else {
      switch (this.activeProcessStep) {
        case ProcessSteps.STEP2: this.activeProcessStep = ProcessSteps.STEP1;
          break;
        case ProcessSteps.STEP3: this.activeProcessStep = this.places.length === 0 ? ProcessSteps.STEP1 : ProcessSteps.STEP2;
          break;
        case ProcessSteps.STEP4: this.activeProcessStep = ProcessSteps.STEP3;
          break;
        case ProcessSteps.STEP5: this.activeProcessStep = this.persons.length === 0 ? ProcessSteps.STEP3 : ProcessSteps.STEP4;
          break;
      }
    }
  }

  endProcess() {
    this.router.navigate(['']);
  }

}
