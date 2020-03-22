import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SummaryPage } from './summary.page';
import { RouterModule } from "@angular/router";
import {LatestCardsModule} from "../latest-cards/latest-cards.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{path: '', component: SummaryPage}]),
    LatestCardsModule
  ],
  declarations: [SummaryPage]
})
export class SummaryPageModule {}
