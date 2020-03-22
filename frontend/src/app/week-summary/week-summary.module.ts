import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { WeekSummaryComponent } from './week-summary.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule],
    declarations: [WeekSummaryComponent],
    exports: [WeekSummaryComponent]
})
export class WeekSummaryComponentModule { }
