import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EntryModalComponent } from './entry-modal/entry-modal.component';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit, OnChanges {

  persons: string[] = [];
  places: string[] = [];

  @Input()
  isLocation: boolean = true;

  @Input()
  personList: string[];

  @Input()
  placeList: string[];

  @Output()
  nextStepEmitter: EventEmitter<boolean> = new EventEmitter();

  @Output()
  personEmitter: EventEmitter<string[]> = new EventEmitter();

  @Output()
  placesEmitter: EventEmitter<string[]> = new EventEmitter();

  constructor(public modalController: ModalController) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
      const personChange: SimpleChange = changes['personList'];
      const placeChange: SimpleChange = changes['placeList'];

      if(personChange.currentValue) {
        this.persons = personChange.currentValue;
      }

      if(placeChange.currentValue) {
        this.places = placeChange.currentValue;
      }

  }
  removePlace(index: number) {
    this.places.splice(index, 1);
  }

  removePerson(index: number) {
    this.persons.splice(index, 1);
  }

  nextStep(step: boolean) {
    this.nextStepEmitter.emit(step);
    this.personEmitter.emit(this.persons);
    this.placesEmitter.emit(this.places);
  }

  async addModal() {
    const modal = await this.modalController.create({
      component: EntryModalComponent,
      componentProps: {
        'location': this.isLocation,
        'modalCtrl': this.modalController
      }
    });
    await modal.present();
    const entryData = await (await modal.onWillDismiss());
    const newString: string = entryData.data.entryString;

    if(newString.length > 0 && !this.isLocation) {
    this.persons.push(newString);
    } else if(newString.length > 0 && this.isLocation) {
      this.places.push(newString);
    }
  }

}
