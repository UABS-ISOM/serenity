import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { BuddiesPage } from "./buddies";
import { IonicImageLoader } from "ionic-image-loader";

@NgModule({
  declarations: [BuddiesPage],
  imports: [IonicPageModule.forChild(BuddiesPage), IonicImageLoader],
})
export class BuddiesPageModule {}
