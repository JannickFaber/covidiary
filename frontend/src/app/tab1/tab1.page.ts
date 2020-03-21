import { Component } from '@angular/core';
import {
  IonFab,
  IonFabButton,
  IonIcon
} from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  isToday: boolean;
  eventSource = [
    {
      title: '2 🏠 4 😷',
      startTime: new Date(Date.UTC(2020, 3, 16)),
      endTime: new Date(Date.UTC(2020, 3, 22)),
      allDay: true
    }
  ];
  calendar = {
    mode: 'week',
    currentDate: new Date(),
  };

  constructor() {}

  changeMode(mode: string) {
    this.calendar.mode = mode;
  }

  today() {
    this.calendar.currentDate = new Date();
  }

}
