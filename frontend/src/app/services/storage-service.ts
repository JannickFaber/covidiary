import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() {
    }

    public setNewMessageNotification(newMessageNotification: boolean) {
        localStorage.setItem('newMessageNotification', `${newMessageNotification}`);
    }

    public getNewMessageNotification(): boolean {
        return localStorage.getItem('newMessageNotification') === 'true';
    }

    public setEntryNotification(entryNotification: boolean) {
        localStorage.setItem('entryNotification', `${entryNotification}`);
    }

    public getEntryNotification(): boolean {
        return localStorage.getItem('entryNotification') === 'true';
    }

    public setTimeForNotification(timeForNotification: Date) {
        localStorage.setItem('timeForNotification', timeForNotification.toISOString());
    }

    public getTimeForNotification(): Date {
        return new Date(localStorage.getItem('timeForNotification'));
    }
}
