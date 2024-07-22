import { Component, NgZone } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Events,
  AlertController,
} from "ionic-angular";
import { UserProvider } from "../../providers/user/user";
import { RequestsProvider } from "../../providers/requests/requests";
import { connreq } from "../../models/interfaces/request";
import firebase from "firebase";
/**
 * Generated class for the BuddiesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-buddies",
  templateUrl: "buddies.html",
})
export class BuddiesPage {
  newrequest = {} as connreq;
  temparr = [];
  myfriends;
  userID;
  unfilteredusers = [];
  filteredusers = [];
  currentuserid;
  recipients = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userservice: UserProvider,
    public events: Events,
    public alertCtrl: AlertController,
    public requestservice: RequestsProvider,
    public zone: NgZone
  ) {
    this.userservice.getallusers().then((res: any) => {
      this.unfilteredusers = res;
      this.temparr = res;
    });
  }

  ionViewWillEnter() {
    this.requestservice.getmyfriends();
    this.myfriends = [];
    this.events.subscribe("friends", () => {
      this.myfriends = [];
      this.myfriends = this.requestservice.myfriends;
    });
    this.loaduserdetails();
  }

  ionViewDidLeave() {
    this.events.unsubscribe("friends");
  }

  // ionViewDidLoad() {}
  ionViewDidEnter() {
    this.filterusers(this.unfilteredusers, this.myfriends);
    // this.requestservice.log();
  }

  filterusers(users, friends) {
    // var friendrequests = this.requestservice.log();
    for (var i = users.length - 1; i >= 0; i--) {
      for (var j = 0; j < friends.length; j++) {
        if (users[i].uid === this.userID) {
          users.splice(i, 1);
        } else if (users[i].uid === friends[j].uid) {
          users.splice(i, 1);
        }
      }
    }
    this.filteredusers = users;
  }

  loaduserdetails() {
    this.userservice.getuserdetails().then((res: any) => {
      this.zone.run(() => {
        this.userID = res.uid;
        console.log(this.userID);
      });
    });
  }

  searchuser(searchbar) {
    this.filteredusers = this.temparr;
    var q = searchbar.target.value;
    if (q.trim() == "") {
      return;
    }

    this.filteredusers = this.filteredusers.filter((v) => {
      if (v.id.indexOf(q) > -1) {
        return true;
      }
      return false;
    });
  }

  sendreq(recipient) {
    this.newrequest.sender = firebase.auth().currentUser.uid;
    this.newrequest.recipient = recipient.uid;
    if (this.newrequest.sender === this.newrequest.recipient)
      alert("You can't add yourself!");
    else {
      let successalert = this.alertCtrl.create({
        title: "Request Sent!",
        subTitle: "Your request was sent to " + recipient.displayName + ".",
        buttons: ["Okay"],
      });

      this.requestservice
        .sendrequest(this.newrequest)
        .then((res: any) => {
          if (res.success) {
            successalert.present();
            let sentuser = this.filteredusers.indexOf(recipient);
            this.filteredusers.splice(sentuser, 1);
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  }
}
