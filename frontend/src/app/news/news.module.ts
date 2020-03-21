import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewsComponent } from './news.component';
import {RouterModule} from "@angular/router";
import {Tab2Page} from "../tab2/tab2.page";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: NewsComponent }])
  ],
  declarations: [NewsComponent]
})
export class NewsComponentModule {}