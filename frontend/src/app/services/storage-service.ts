import { Injectable } from '@angular/core';
import {DiaryEntry} from "../model/diary-entry";

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

    public setDiaryEntries(diaryEntries: DiaryEntry[]) {
        localStorage.setItem('diaryEntries', JSON.stringify(diaryEntries));
    }

    public setUserId(userId: string) {
        localStorage.setItem('userId', userId);
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

    public getDiaryEntries(): DiaryEntry[] {
        return JSON.parse(localStorage.getItem('diaryEntries'));
    }

    public getUserId(): string {
        return localStorage.getItem('userId');
    }

    public updateDiaryEntry(diaryEntry: DiaryEntry) {
        const diaryEntries = this.getDiaryEntries() ? this.getDiaryEntries() : [];
        let shouldInclude = -1;
        diaryEntries.forEach((entry, index) => {
            if (entry.date === diaryEntry.date) {
                shouldInclude = index;
            }
        });
        if (shouldInclude >= 0) {
            diaryEntries[shouldInclude] = diaryEntry;
        } else {
            diaryEntries.push(diaryEntry);
        }
        this.setDiaryEntries(diaryEntries);
    }

    public getEntryByDate(date: string): DiaryEntry {
        if (this.getDiaryEntries()) {
            return this.getDiaryEntries().find(entry => entry.date === date);
        }
        return null;
    }
}
