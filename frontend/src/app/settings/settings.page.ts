import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage-service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  newMessageNotification = false;
  entryNotification = false;
  timeForNotification = new Date('1990-02-19T20:00+01:00').toISOString();

  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit() {
    this.newMessageNotification = this.storageService.getNewMessageNotification();
    this.entryNotification = this.storageService.getEntryNotification();
    this.timeForNotification = this.storageService.getTimeForNotification().toISOString();
  }

  public save() {
    this.storageService.setEntryNotification(this.entryNotification);
    this.storageService.setNewMessageNotification(this.newMessageNotification);
    this.storageService.setTimeForNotification(new Date(this.timeForNotification));
  }
}
