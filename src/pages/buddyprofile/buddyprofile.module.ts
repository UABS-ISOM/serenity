import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuddyprofilePage } from './buddyprofile';

@NgModule({
  declarations: [
    BuddyprofilePage,
  ],
  imports: [
    IonicPageModule.forChild(BuddyprofilePage),
  ],
})
export class BuddyprofilePageModule {}
