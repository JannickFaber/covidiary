import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-choice-page',
  templateUrl: './choice-page.component.html',
  styleUrls: ['./choice-page.component.scss'],
})
export class ChoicePageComponent implements OnInit {

  @Input()
  isLocation: boolean = true;

  @Output()
  outsideEmitter: EventEmitter<boolean> = new EventEmitter();

  @Output()
  contactEmitter: EventEmitter<boolean> = new EventEmitter();

  @Output()
  goBackEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  emitContact(contact: boolean) {
    this.contactEmitter.emit(contact);
  }

  emitOutside(outside: boolean) {
    this.outsideEmitter.emit(outside);
  }

  goBack() {
    this.goBackEmitter.emit(false);
  }

}
