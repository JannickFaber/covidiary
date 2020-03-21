import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit {

  @Input()
  isLocation: boolean = true;

  @Output()
  nextStepEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  nextStep(step: boolean) {
    this.nextStepEmitter.emit(step);
  }

}
