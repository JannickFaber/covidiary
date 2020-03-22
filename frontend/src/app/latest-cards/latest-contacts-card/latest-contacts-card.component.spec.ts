import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LatestContactsCardComponent } from './latest-contacts-card.component';

describe('LatestContactsCardComponent', () => {
  let component: LatestContactsCardComponent;
  let fixture: ComponentFixture<LatestContactsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestContactsCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LatestContactsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
