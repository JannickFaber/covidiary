import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-latest-places-card',
  templateUrl: './latest-places-card.component.html',
  styleUrls: ['./latest-places-card.component.scss'],
})
export class LatestPlacesCardComponent implements OnInit {

  @Input() startDate: Date;
  places = [];

  constructor() { }

  ngOnInit() {
    // TODO get all places from storage service
    this.places.push({name: 'place 1', visitedAt: new Date('2020-03-15')});
    this.places.push({name: 'place 2', visitedAt: new Date('2020-03-12')});
    this.places.push({name: 'place 3', visitedAt: new Date('2020-03-18')});
    this.places.push({name: 'place 4', visitedAt: new Date('2020-03-12')});
    this.places.push({name: 'place 5', visitedAt: new Date('2020-03-11')});
  }

}
