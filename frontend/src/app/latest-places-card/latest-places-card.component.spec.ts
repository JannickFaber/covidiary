import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LatestPlacesCardComponent } from './latest-places-card.component';

describe('LatestPlacesCardComponent', () => {
  let component: LatestPlacesCardComponent;
  let fixture: ComponentFixture<LatestPlacesCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestPlacesCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LatestPlacesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
