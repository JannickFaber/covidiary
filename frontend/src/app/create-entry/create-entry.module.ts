import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateEntryComponent } from './create-entry.component';
import { ChoicePageComponent } from './choice-page/choice-page.component';
import { ListPageComponent } from './list-page/list-page.component';
import { EntryModalComponent } from './list-page/entry-modal/entry-modal.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: CreateEntryComponent }])
  ],
  entryComponents: [EntryModalComponent],
  declarations: [CreateEntryComponent, ChoicePageComponent, ListPageComponent, EntryModalComponent]
})
export class CreateEntryModule { }
