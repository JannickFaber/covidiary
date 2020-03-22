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

  description = '';
  modalString = '';

  constructor(navParams: NavParams) {
    this.description = navParams.get('location') ? 'Trage einen Ort ein.' : 'Trage eine Person ein.';
   }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss({
      entryString: this.modalString
    });
  }
}
