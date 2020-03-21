import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-entry-modal',
  templateUrl: './entry-modal.component.html',
  styleUrls: ['./entry-modal.component.scss'],
})
export class EntryModalComponent implements OnInit {

  @Input() location: boolean;

  @Input() modalCtrl: ModalController;

  description: string = '';
  modalString: string = '';

  constructor(navParams: NavParams) {
    this.description = navParams.get('location') ? 'Gib einen Ort ein, den du besucht hast.' : 'Gib eine Person ein, mit der du Kontakt hattest.';
   }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'entryString': this.modalString
    });
  }
}
