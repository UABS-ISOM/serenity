import { Injectable } from "@angular/core";
import { Events } from "ionic-angular";
import { connreq } from "../../models/interfaces/request";
import { UserProvider } from "../user/user";
import firebase from "firebase";

/*
  Generated class for the RequestsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RequestsProvider {
  firereq = firebase.database().ref("/requests");
  firefriends = firebase.database().ref("/friends");

  userdetails;
  myfriends;
  constructor(public userservice: UserProvider, public events: Events) {}

  // This function returns an array of IDs, this must be moved over to buddies.ts.
  // From there, another loop is required to remove anyone that has been added in the past.
  log() {
    let allrequests;
    var myrequests = [];
    this.firereq
      .child(firebase.auth().currentUser.uid)
      .on("value", (snapshot) => {
        allrequests = snapshot.val();
        myrequests = [];
        for (var i in allrequests) {
          myrequests.push(allrequests[i].sender);
        }
      });
    return myrequests;
  }

  getallrequests() {
    var promise = new Promise((resolve, reject) => {
      this.firereq
        .once("value", (snapshot) => {
          let userdata = snapshot.val();
          let temparr = [];

          for (var i in userdata) {
            for (var j in (i as any)) {
              temparr.push(userdata[j]);
            }
          }
          console.log(temparr);
          resolve(temparr);
        })
        .catch((err) => {
          reject(err);
        });
    });
    return promise;
  }

  sendrequest(req: connreq) {
    var promise = new Promise((resolve, reject) => {
      console.log("RECIP " + req.recipient);
      console.log("Sender " + req.sender);

      this.firereq
        .child(req.recipient)
        .push({
          sender: req.sender,
        })
        .then(() => {
          resolve({ success: true });
        })
        .catch((err) => {
          resolve(err);
        });
    });
    return promise;
  }

  getmyrequests() {
    let allmyrequests;
    var myrequests = [];
    this.firereq
      .child(firebase.auth().currentUser.uid)
      .on("value", (snapshot) => {
        allmyrequests = snapshot.val();
        myrequests = [];
        for (var i in allmyrequests) {
          myrequests.push(allmyrequests[i].sender);
        }
        // console.log(myrequests);
        this.userservice.getallusers().then((res) => {
          var allusers = res;
          this.userdetails = [];
          for (var j in myrequests)
            for (var key in (allusers as any)) {
              if (myrequests[j] === allusers[key].uid) {
                this.userdetails.push(allusers[key]);
              }
            }
          this.events.publish("gotrequests");
        });
      });
  }

  acceptrequest(buddy) {
    var promise = new Promise((resolve, reject) => {
      this.myfriends = [];
      this.firefriends
        .child(firebase.auth().currentUser.uid)
        .push({
          uid: buddy.uid,
        })
        .then(() => {
          this.firefriends
            .child(buddy.uid)
            .push({
              uid: firebase.auth().currentUser.uid,
            })
            .then(() => {
              this.deleterequest(buddy).then(() => {
                resolve(true);
              });
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
    return promise;
  }

  deleterequest(buddy) {
    var promise = new Promise((resolve, reject) => {
      this.firereq
        .child(firebase.auth().currentUser.uid)
        .orderByChild("sender")
        .equalTo(buddy.uid)
        .once("value", (snapshot) => {
          let somekey;
          for (var key in snapshot.val()) somekey = key;
          this.firereq
            .child(firebase.auth().currentUser.uid)
            .child(somekey)
            .remove()
            .then(() => {
              resolve(true);
            });
        })
        .then(() => {})
        .catch((err) => {
          reject(err);
        });
    });
    return promise;
  }

  getmyfriends() {
    let friendsuid = [];
    this.firefriends
      .child(firebase.auth().currentUser.uid)
      .on("value", (snapshot) => {
        let allfriends = snapshot.val();
        this.myfriends = [];
        for (var i in allfriends) friendsuid.push(allfriends[i].uid);
        // console.log("All " + friendsuid);
        this.userservice
          .getallusers()
          .then((users) => {
            this.myfriends = [];
            for (var j in friendsuid)
              for (var key in (users as any)) {
                if (friendsuid[j] === users[key].uid) {
                  this.myfriends.push(users[key]);
                }
              }
            this.events.publish("friends");
          })
          .catch((err) => {
            alert(err);
          });
      });
  }
}
