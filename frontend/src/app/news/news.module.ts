import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewsComponent } from './news.component';
import {RouterModule} from "@angular/router";
import {ExploreContainerComponentModule} from "../explore-container/explore-container.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: NewsComponent }])
  ],
  declarations: [NewsComponent]
})
export class NewsComponentModule {}