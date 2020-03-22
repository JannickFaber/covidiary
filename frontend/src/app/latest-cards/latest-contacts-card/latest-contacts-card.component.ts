import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-latest-contacts-card',
  templateUrl: './latest-contacts-card.component.html',
  styleUrls: ['./latest-contacts-card.component.scss'],
})
export class LatestContactsCardComponent implements OnInit {

  @Input() startDate: Date;
  contacts = [];

  constructor() { }

  ngOnInit() {
    // TODO get all contacts from storage service
    this.contacts.push({name: 'person 1', visitedAt: new Date('2020-03-15')});
    this.contacts.push({name: 'person 2', visitedAt: new Date('2020-03-12')});
    this.contacts.push({name: 'person 3', visitedAt: new Date('2020-03-18')});
    this.contacts.push({name: 'person 4', visitedAt: new Date('2020-03-12')});
    this.contacts.push({name: 'person 5', visitedAt: new Date('2020-03-11')});
  }
}
