import {Component, Input, OnInit} from '@angular/core';
import {StorageService} from "../../services/storage-service";

@Component({
  selector: 'app-latest-contacts-card',
  templateUrl: './latest-contacts-card.component.html',
  styleUrls: ['./latest-contacts-card.component.scss'],
})
export class LatestContactsCardComponent implements OnInit {

  @Input() startDate: Date;
  contacts = [];

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    // TODO get all contacts from storage service
    this.contacts = [];
    this.storageService.getDiaryEntries().forEach(entry => {
      if (new Date(entry.date).getTime() > new Date(this.startDate).getTime() && entry.persons && entry.persons.length > 0) {
        entry.persons.forEach(person => {
          this.contacts.push({
            name: person,
            visitedAt: new Date(entry.date)
          })
        });
      }
    });
  }
}
