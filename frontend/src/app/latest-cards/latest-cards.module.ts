import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {LatestPlacesCardComponent} from "./latest-places-card/latest-places-card.component";
import {LatestContactsCardComponent} from "./latest-contacts-card/latest-contacts-card.component";

@NgModule({
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        LatestContactsCardComponent,
        LatestPlacesCardComponent
    ],
    declarations: [LatestPlacesCardComponent, LatestContactsCardComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LatestCardsModule {}