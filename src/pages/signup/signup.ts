import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  ToastController,
  AlertController,
} from "ionic-angular";
import { UserProvider } from "../../providers/user/user";
/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html",
})
export class SignupPage {
  newuser = {
    email: "",
    password: "",
    displayName: "",
    photoURL: "",
    id: "",
    tolerance: 0.7,
    type: ""
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userservice: UserProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController
  ) {}

  signup() {
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: "bottom",
    });
    if (
      this.newuser.email == "" ||
      this.newuser.password == "" ||
      this.newuser.displayName == "" ||
      this.newuser.type == "" ||
      this.newuser.photoURL == ""
    ) {
      toaster.setMessage("Please complete all fields.");
      toaster.present();
    } else if (this.newuser.password.length < 7) {
      toaster.setMessage(
        "Password is not strong enough. Try entering more than six characters."
      );
      toaster.present();
    } else {
      let loader = this.loadingCtrl.create({
        content: "Please wait.",
      });
      loader.present();
      var str = new Date().toISOString()
      str = str.replace(/\D/g,'');
      str=str.slice(2)
      this.newuser.id = str;
      this.newuser.tolerance = 0.7;
      this.userservice
        .adduser(this.newuser)
        .then((res: any) => {
          loader.dismiss();
          if (res.success) this.navCtrl.push("LoginPage");
          else alert("Error" + res);
        })
        .catch((err) => {
          let erroralert = this.alertCtrl.create({
            title: "Error",
            subTitle: err,
            buttons: ["Okay"],
          });
          loader.dismiss();
          erroralert.present();
        });
    }
  }
  avatar(icon) {
    document.getElementById("avatar1").setAttribute("class", "avatar");
    document.getElementById("avatar2").setAttribute("class", "avatar");
    document.getElementById("avatar3").setAttribute("class", "avatar");
    document.getElementById("avatar4").setAttribute("class", "avatar");
    if (icon === 1) {
      this.newuser.photoURL =
        "https://firebasestorage.googleapis.com/v0/b/cleanchat-92927.appspot.com/o/female1.png?alt=media&token=ade7a9e5-27d3-4071-a0a5-134e10ae522b";
      document.getElementById("avatar1").setAttribute("class", "avatarclicked");
    } else if (icon === 2) {
      this.newuser.photoURL =
        "https://firebasestorage.googleapis.com/v0/b/cleanchat-92927.appspot.com/o/male1.png?alt=media&token=fdbf5f6f-7fb9-4856-b413-22bff8eb95bb";
      document.getElementById("avatar2").setAttribute("class", "avatarclicked");
    } else if (icon === 3) {
      this.newuser.photoURL =
        "https://firebasestorage.googleapis.com/v0/b/cleanchat-92927.appspot.com/o/female2.png?alt=media&token=e98ca823-6ca2-4185-a1d6-27ae3bce6b17";
      document.getElementById("avatar3").setAttribute("class", "avatarclicked");
    } else {
      this.newuser.photoURL =
        "https://firebasestorage.googleapis.com/v0/b/cleanchat-92927.appspot.com/o/male2.png?alt=media&token=67952413-3f51-42ca-897f-e765e044acc5";
      document.getElementById("avatar4").setAttribute("class", "avatarclicked");
    }
  }

  goback() {
    this.navCtrl.setRoot("LoginPage");
  }
}
