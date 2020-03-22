import {Component, Input, OnInit} from '@angular/core';
import * as moment from "moment";
import {DiaryEntry} from "../../model/diary-entry";
import {Router} from "@angular/router";

@Component({
  selector: 'app-day-entry',
  templateUrl: './day-entry.component.html',
  styleUrls: ['./day-entry.component.scss'],
})
export class DayEntryComponent implements OnInit {

  @Input() day: DiaryEntry;
  weekday: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.weekday = moment(this.day.date).format('dddd');
  }

  createEntry() {
    this.router.navigate(['create-entry'], {queryParams: {day: this.day.date}});
  }

}
