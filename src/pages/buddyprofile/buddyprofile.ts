import { Component, NgZone } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
} from "ionic-angular";
import { ChatProvider } from "../../providers/chat/chat";
import { UserProvider } from "../../providers/user/user";
import firebase from "firebase";

/**
 * Generated class for the BuddyprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buddyprofile',
  templateUrl: 'buddyprofile.html',
})
export class BuddyprofilePage {
  avatar: string;
  displayName: string;
  tolerance: number;
  saturation: number;
  id: string;
  uid: string;
  buddy: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userservice: UserProvider,
    public chatservice: ChatProvider,
    public zone: NgZone,
    public alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    this.loaduserdetails();
  }

  loaduserdetails() {
    this.userservice.getuserdetails().then((res: any) => {
      this.buddy = this.chatservice.buddy;
      this.uid = this.buddy.uid.substring(0, 7);
      this.displayName = this.buddy.displayName;
      this.tolerance = this.buddy.tolerance;
      this.saturation = this.buddy.tolerance * 100;
      this.id = this.buddy.id;
      this.zone.run(() => {
        this.avatar = this.buddy.photoURL;
      });
    });
  }

}
