import { Component, NgZone } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
} from "ionic-angular";
import { UserProvider } from "../../providers/user/user";
import firebase from "firebase";
/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html",
})
export class ProfilePage {
  avatar: string;
  displayName: string;
  tolerance: number;
  saturation: number;
  id: string;
  uid: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userservice: UserProvider,
    public zone: NgZone,
    public alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    this.loaduserdetails();
  }

  loaduserdetails() {
    this.userservice.getuserdetails().then((res: any) => {
      this.uid = res.uid.substring(0, 7);
      this.displayName = res.displayName;
      this.tolerance = res.tolerance;
      this.saturation = res.tolerance * 100;
      this.id = res.id;
      this.zone.run(() => {
        this.avatar = res.photoURL;
      });
    });
  }

  // Function updated to prevent bugs/crash.
  editname() {
    let statusalert = this.alertCtrl.create({
      buttons: ["Okay"],
    });
    let alert = this.alertCtrl.create({
      title: "Edit Nickname",
      inputs: [
        {
          name: "nickname",
          placeholder: "Nickname",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: (data) => {},
        },
        {
          text: "Edit",
          handler: (data) => {
            if (data.nickname) {
              this.userservice
                .updatedisplayname(data.nickname)
                .then((res: any) => {
                  if (res.success) {
                    statusalert.setTitle("Success!");
                    statusalert.setSubTitle(
                      "Your nickname has been updated successfully."
                    );
                    statusalert.present();
                    this.zone.run(() => {
                      this.displayName = data.nickname;
                    });
                  } else {
                    statusalert.setTitle("Error");
                    statusalert.setSubTitle("Please try again.");
                    statusalert.present();
                  }
                });
            }
          },
        },
      ],
    });
    alert.present();
  }

  editimage() {
    let statusalert = this.alertCtrl.create({
      buttons: ["Okay"],
    });
    let alert = this.alertCtrl.create({
      title: "Edit Avatar",
      message: `<img src ="https://firebasestorage.googleapis.com/v0/b/cleanchat-92927.appspot.com/o/female1.png?alt=media&token=ade7a9e5-27d3-4071-a0a5-134e10ae522b" alt="g-maps" style="border-radius: 2px">`,
      inputs: [
        {
          name: "radio1",
          type: "radio",
          value:
            "https://firebasestorage.googleapis.com/v0/b/cleanchat-92927.appspot.com/o/female1.png?alt=media&token=ade7a9e5-27d3-4071-a0a5-134e10ae522b",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: (data) => {},
        },
        {
          text: "Edit",
          handler: (data) => {
            this.userservice.updateimage(data.value).then((res: any) => {
              if (res.success) {
                statusalert.setTitle("Success!");
                statusalert.setSubTitle(
                  "Your avatar has been updated successfully."
                );
                statusalert.present();
                this.zone.run(() => {
                  this.avatar = data.value;
                });
              } else {
                statusalert.setTitle("Error");
                statusalert.setSubTitle("Please try again.");
                statusalert.present();
              }
            });
          },
        },
      ],
    });
    alert.present();
  }

  edittolerance() {
    let statusalert = this.alertCtrl.create({
      buttons: ["Okay"],
    });
    let alert = this.alertCtrl.create({
      title: "Edit Tolerance",
      inputs: [
        {
          name: "tolerance",
          placeholder: "Tolerance",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: (data) => {},
        },
        {
          text: "Edit",
          handler: (data) => {
            if (data.tolerance) {
              this.userservice
                .updatetolerance(data.tolerance)
                .then((res: any) => {
                  if (res.success) {
                    statusalert.setTitle("Success!");
                    statusalert.setSubTitle(
                      "Your tolerance has been updated successfully."
                    );
                    statusalert.present();
                    this.zone.run(() => {
                      this.tolerance = data.tolerance;
                    });
                  } else {
                    statusalert.setTitle("Error");
                    statusalert.setSubTitle("Please try again.");
                    statusalert.present();
                  }
                });
            }
          },
        },
      ],
    });
    alert.present();
  }

  updatetolerance(rangeValue) {
    let statusalert = this.alertCtrl.create({
      buttons: ["Okay"],
    });
    this.userservice
      .updatetolerance(rangeValue.value / 100)
      .then((res: any) => {
        if (res.success) {
          statusalert.setTitle("Success!");
          statusalert.setSubTitle(
            "Your tolerance has been updated successfully."
          );
          statusalert.present();
          this.zone.run(() => {
            this.tolerance = rangeValue.value / 100;
            this.saturation = this.tolerance * 100;
            console.log(this.tolerance);
          });
        } else {
          statusalert.setTitle("Error");
          statusalert.setSubTitle("Please try again.");
          statusalert.present();
        }
      });
  }

  logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.navCtrl.parent.parent.setRoot("LoginPage");
      });
  }
  addbuddy() {
    this.navCtrl.push("BuddiesPage");
  }
}
