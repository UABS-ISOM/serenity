import { Injectable } from "@angular/core";
import firebase from "firebase";
import { Events, AlertController } from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { UserProvider } from "..//user/user";

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ChatProvider {
  firebuddychats = firebase.database().ref("/buddychats");
  buddy: any;
  buddymessages = [];
  ignore = false;
  tolerance;
  url =
    "https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze" +
    "?key=AIzaSyDqLLJeJgVpERW-ccwqCipy5JdEX0kKXjQ";
  constructor(
    public events: Events,
    private http: HttpClient,
    public alertCtrl: AlertController,
    public userservice: UserProvider
  ) {
    this.userservice.getuserdetails().then((res: any) => {
      this.tolerance = res.tolerance;
    });
  }

  initializebuddy(buddy) {
    this.buddy = buddy;
  }

  addnewmessage(msg, tolerance) {
    if (this.buddy) {
      var promise = new Promise((resolve, reject) => {
        this.http
          .post(this.url, {
            comment: { text: msg },
            languages: ["en"],
            requestedAttributes: { TOXICITY: {} },
          })
          .subscribe((response) => {
            if (
              (response as any).attributeScores.TOXICITY.summaryScore.value >=
              this.tolerance
            ) {
              let toxicalert = this.alertCtrl.create({
                title: "Toxic Content Detected",
                subTitle:
                  "Your message contains toxic content.\n Do you still want to send it?",

                /*
                  Updated so that alerts present yes on the left hand side and this alert
                  prevents the user from clicking yes until a three second delay using
                  querySelector. This method is not specific to Ionic, it's JS, so don't
                  look for documentation for the disabled attribute.
                  */
                buttons: [
                  {
                    text: "Yes",
                    handler: () => {
                      var that = this;
                      that.ignore = true;
                      that.firebuddychats
                        .child(firebase.auth().currentUser.uid)
                        .child(that.buddy.uid)
                        .push({
                          sentby: firebase.auth().currentUser.uid,
                          message: msg,
                          toxicity:
                            (response as any).attributeScores.TOXICITY.summaryScore
                              .value,
                          timestamp: firebase.database.ServerValue.TIMESTAMP,
                        })
                        .then(() => {
                          that.firebuddychats
                            .child(that.buddy.uid)
                            .child(firebase.auth().currentUser.uid)
                            .push({
                              sentby: firebase.auth().currentUser.uid,
                              message: msg,
                              toxicity:
                                (response as any).attributeScores.TOXICITY.summaryScore
                                  .value,
                              timestamp:
                                firebase.database.ServerValue.TIMESTAMP,
                            })
                            .then(() => {
                              resolve(true);
                            })
                            .catch((err) => {
                              reject(err);
                            });
                        });
                    },
                  },
                  {
                    text: "No",
                    role: "cancel",
                    cssClass: "alertInput",
                  },
                ],
              });
              toxicalert.present().then(() => {
                document
                  .querySelector(
                    "ion-alert div.alert-button-group button:nth-of-type(1)"
                  )
                  .setAttribute("disabled", "true");
                setTimeout(() => {
                  document
                    .querySelector(
                      "ion-alert div.alert-button-group button:nth-of-type(1)"
                    )
                    .removeAttribute("disabled");
                }, 2000);
              });
            } else {
              this.firebuddychats
                .child(firebase.auth().currentUser.uid)
                .child(this.buddy.uid)
                .push({
                  sentby: firebase.auth().currentUser.uid,
                  message: msg,
                  toxicity:
                    (response as any).attributeScores.TOXICITY.summaryScore.value,
                  timestamp: firebase.database.ServerValue.TIMESTAMP,
                })
                .then(() => {
                  this.firebuddychats
                    .child(this.buddy.uid)
                    .child(firebase.auth().currentUser.uid)
                    .push({
                      sentby: firebase.auth().currentUser.uid,
                      message: msg,
                      toxicity:
                        (response as any).attributeScores.TOXICITY.summaryScore.value,
                      timestamp: firebase.database.ServerValue.TIMESTAMP,
                    })
                    .then(() => {
                      resolve(true);
                    })
                    .catch((err) => {
                      reject(err);
                    });
                });
            }
          });
      });
      return promise;
    }
  }

  getbuddymessages() {
    let temp;
    this.firebuddychats
      .child(firebase.auth().currentUser.uid)
      .child(this.buddy.uid)
      .on("value", (snapshot) => {
        this.buddymessages = [];
        temp = snapshot.val();
        for (var tempkey in temp) {
          this.buddymessages.push(temp[tempkey]);
        }
        this.events.publish("newmessage");
      });
  }
}
