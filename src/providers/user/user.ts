import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import firebase from "firebase";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserProvider {
  firedata = firebase.database().ref("/chatusers");
  constructor(public afireauth: AngularFireAuth) {}

  adduser(newuser) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth
        .createUserWithEmailAndPassword(newuser.email, newuser.password)
        .then(() => {
          this.afireauth.auth.currentUser
            .updateProfile({
              displayName: newuser.displayName,
              photoURL: newuser.photoURL,
              tolerance: 0.7,
              id: newuser.id,
            })
            .then(() => {
              this.firedata
                .child(this.afireauth.auth.currentUser.uid)
                .set({
                  uid: this.afireauth.auth.currentUser.uid,
                  displayName: newuser.displayName,
                  photoURL: newuser.photoURL,
                  tolerance: 0.7,
                  id: newuser.id,
                  type: newuser.type,
                })
                .then(() => {
                  resolve({ success: true });
                })
                .catch((err) => {
                  reject(err);
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

  passwordreset(email) {
    var promise = new Promise((resolve, reject) => {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          resolve({ success: true });
        })
        .catch((err) => {
          reject(err);
        });
    });
    return promise;
  }

  getuserdetails() {
    var promise = new Promise((resolve, reject) => {
      this.firedata
        .child(firebase.auth().currentUser.uid)
        .once("value", (snapshot) => {
          resolve(snapshot.val());
        })
        .catch((err) => {
          reject(err);
        });
    });
    return promise;
  }

  // Function updated so it doesn't crash.
  updateimage(imageurl) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.currentUser
        .updateProfile({
          photoURL: imageurl,
        })
        .then(() => {
          firebase
            .database()
            .ref("/users/" + firebase.auth().currentUser.uid)
            .update({
              photoURL: imageurl,
            })
            .then(() => {
              resolve({ success: true });
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

  updatedisplayname(newname) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.currentUser
        .updateProfile({
          displayName: newname,
        })
        .then(() => {
          this.firedata
            .child(firebase.auth().currentUser.uid)
            .update({
              displayName: newname,
            })
            .then(() => {
              resolve({ success: true });
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

  // updateavatar(newphoto) {
  //   var promise = new Promise((resolve, reject) => {
  //     this.afireauth.auth.currentUser
  //       .updateProfile({
  //         displayName: this.afireauth.auth.currentUser.displayName,
  //         photoURL: newphoto,
  //         tolerance: this.afireauth.auth.currentUser.tolerance,
  //       })
  //       .then(() => {
  //         this.firedata
  //           .child(firebase.auth().currentUser.uid)
  //           .update({
  //             displayName: this.afireauth.auth.currentUser.displayName,
  //             photoURL: newphoto,
  //             tolerance: this.afireauth.auth.currentUser.tolerance,
  //             uid: this.afireauth.auth.currentUser.uid,
  //           })
  //           .then(() => {
  //             resolve({ success: true });
  //           })
  //           .catch((err) => {
  //             reject(err);
  //           });
  //       })
  //       .catch((err) => {
  //         reject(err);
  //       });
  //   });
  //   return promise;
  // }

  updatetolerance(tolerance) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.currentUser
        .updateProfile({
          tolerance: tolerance,
        })
        .then(() => {
          this.firedata
            .child(firebase.auth().currentUser.uid)
            .update({
              tolerance: tolerance,
            })
            .then(() => {
              resolve({ success: true });
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

  getallusers() {
    var promise = new Promise((resolve, reject) => {
      this.firedata
        .orderByChild("uid")
        .once("value", (snapshot) => {
          let userdata = snapshot.val();
          let temparr = [];
          for (var key in userdata) {
            temparr.push(userdata[key]);
          }
          resolve(temparr);
        })
        .catch((err) => {
          reject(err);
        });
    });
    return promise;
  }
}
