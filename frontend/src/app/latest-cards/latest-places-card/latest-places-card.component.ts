import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {StorageService} from "../../services/storage-service";

@Component({
  selector: 'app-latest-places-card',
  templateUrl: './latest-places-card.component.html',
  styleUrls: ['./latest-places-card.component.scss'],
})
export class LatestPlacesCardComponent implements OnChanges {

  @Input() startDate: Date;
  places = [];

  constructor(private storageService: StorageService) {}

  ngOnChanges() {
    // TODO get all places from storage service
    this.places = [];
    this.storageService.getDiaryEntries().forEach(entry => {
      if (new Date(entry.date).getTime() > new Date(this.startDate).getTime() && entry.locations && entry.locations.length > 0) {
        entry.locations.forEach(person => {
          this.places.push({
            name: person,
            visitedAt: new Date(entry.date)
          })
        });
      }
    });
  }

}
