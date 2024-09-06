webpackJsonp([9],{

/***/ 174:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 174;

/***/ }),

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/buddies/buddies.module": [
		711,
		8
	],
	"../pages/buddychat/buddychat.module": [
		710,
		7
	],
	"../pages/buddyprofile/buddyprofile.module": [
		715,
		6
	],
	"../pages/chats/chats.module": [
		712,
		5
	],
	"../pages/login/login.module": [
		713,
		4
	],
	"../pages/passwordreset/passwordreset.module": [
		714,
		3
	],
	"../pages/profile/profile.module": [
		716,
		2
	],
	"../pages/signup/signup.module": [
		717,
		1
	],
	"../pages/tabs/tabs.module": [
		718,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 218;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_user__ = __webpack_require__(91);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the ChatProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var ChatProvider = /** @class */ (function () {
    function ChatProvider(events, http, alertCtrl, userservice) {
        var _this = this;
        this.events = events;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.userservice = userservice;
        this.firebuddychats = __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.database().ref("/buddychats");
        this.buddymessages = [];
        this.ignore = false;
        this.url = "https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze" +
            "?key=AIzaSyDqLLJeJgVpERW-ccwqCipy5JdEX0kKXjQ";
        this.userservice.getuserdetails().then(function (res) {
            _this.tolerance = res.tolerance;
        });
    }
    ChatProvider.prototype.initializebuddy = function (buddy) {
        this.buddy = buddy;
    };
    ChatProvider.prototype.addnewmessage = function (msg, tolerance) {
        var _this = this;
        if (this.buddy) {
            var promise = new Promise(function (resolve, reject) {
                _this.http
                    .post(_this.url, {
                    comment: { text: msg },
                    languages: ["en"],
                    requestedAttributes: { TOXICITY: {} },
                })
                    .subscribe(function (response) {
                    if (response.attributeScores.TOXICITY.summaryScore.value >=
                        _this.tolerance) {
                        var toxicalert = _this.alertCtrl.create({
                            title: "Toxic Content Detected",
                            subTitle: "Your message contains toxic content.\n Do you still want to send it?",
                            /*
                              Updated so that alerts present yes on the left hand side and this alert
                              prevents the user from clicking yes until a three second delay using
                              querySelector. This method is not specific to Ionic, it's JS, so don't
                              look for documentation for the disabled attribute.
                              */
                            buttons: [
                                {
                                    text: "Yes",
                                    handler: function () {
                                        var that = _this;
                                        that.ignore = true;
                                        that.firebuddychats
                                            .child(__WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().currentUser.uid)
                                            .child(that.buddy.uid)
                                            .push({
                                            sentby: __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().currentUser.uid,
                                            message: msg,
                                            toxicity: response.attributeScores.TOXICITY.summaryScore
                                                .value,
                                            timestamp: __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.database.ServerValue.TIMESTAMP,
                                        })
                                            .then(function () {
                                            that.firebuddychats
                                                .child(that.buddy.uid)
                                                .child(__WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().currentUser.uid)
                                                .push({
                                                sentby: __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().currentUser.uid,
                                                message: msg,
                                                toxicity: response.attributeScores.TOXICITY.summaryScore
                                                    .value,
                                                timestamp: __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.database.ServerValue.TIMESTAMP,
                                            })
                                                .then(function () {
                                                resolve(true);
                                            })
                                                .catch(function (err) {
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
                        toxicalert.present().then(function () {
                            document
                                .querySelector("ion-alert div.alert-button-group button:nth-of-type(1)")
                                .setAttribute("disabled", "true");
                            setTimeout(function () {
                                document
                                    .querySelector("ion-alert div.alert-button-group button:nth-of-type(1)")
                                    .removeAttribute("disabled");
                            }, 2000);
                        });
                    }
                    else {
                        _this.firebuddychats
                            .child(__WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().currentUser.uid)
                            .child(_this.buddy.uid)
                            .push({
                            sentby: __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().currentUser.uid,
                            message: msg,
                            toxicity: response.attributeScores.TOXICITY.summaryScore.value,
                            timestamp: __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.database.ServerValue.TIMESTAMP,
                        })
                            .then(function () {
                            _this.firebuddychats
                                .child(_this.buddy.uid)
                                .child(__WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().currentUser.uid)
                                .push({
                                sentby: __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().currentUser.uid,
                                message: msg,
                                toxicity: response.attributeScores.TOXICITY.summaryScore.value,
                                timestamp: __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.database.ServerValue.TIMESTAMP,
                            })
                                .then(function () {
                                resolve(true);
                            })
                                .catch(function (err) {
                                reject(err);
                            });
                        });
                    }
                });
            });
            return promise;
        }
    };
    ChatProvider.prototype.getbuddymessages = function () {
        var _this = this;
        var temp;
        this.firebuddychats
            .child(__WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().currentUser.uid)
            .child(this.buddy.uid)
            .on("value", function (snapshot) {
            _this.buddymessages = [];
            temp = snapshot.val();
            for (var tempkey in temp) {
                _this.buddymessages.push(temp[tempkey]);
            }
            _this.events.publish("newmessage");
        });
    };
    ChatProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4__user_user__["a" /* UserProvider */]])
    ], ChatProvider);
    return ChatProvider;
}());

//# sourceMappingURL=chat.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_user__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the RequestsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var RequestsProvider = /** @class */ (function () {
    function RequestsProvider(userservice, events) {
        this.userservice = userservice;
        this.events = events;
        this.firereq = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref("/requests");
        this.firefriends = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref("/friends");
    }
    // This function returns an array of IDs, this must be moved over to buddies.ts.
    // From there, another loop is required to remove anyone that has been added in the past.
    RequestsProvider.prototype.log = function () {
        var allrequests;
        var myrequests = [];
        this.firereq
            .child(__WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().currentUser.uid)
            .on("value", function (snapshot) {
            allrequests = snapshot.val();
            myrequests = [];
            for (var i in allrequests) {
                myrequests.push(allrequests[i].sender);
            }
        });
        return myrequests;
    };
    RequestsProvider.prototype.getallrequests = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.firereq
                .once("value", function (snapshot) {
                var userdata = snapshot.val();
                var temparr = [];
                for (var i in userdata) {
                    for (var j in i) {
                        temparr.push(userdata[j]);
                    }
                }
                console.log(temparr);
                resolve(temparr);
            })
                .catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    RequestsProvider.prototype.sendrequest = function (req) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            console.log("RECIP " + req.recipient);
            console.log("Sender " + req.sender);
            _this.firereq
                .child(req.recipient)
                .push({
                sender: req.sender,
            })
                .then(function () {
                resolve({ success: true });
            })
                .catch(function (err) {
                resolve(err);
            });
        });
        return promise;
    };
    RequestsProvider.prototype.getmyrequests = function () {
        var _this = this;
        var allmyrequests;
        var myrequests = [];
        this.firereq
            .child(__WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().currentUser.uid)
            .on("value", function (snapshot) {
            allmyrequests = snapshot.val();
            myrequests = [];
            for (var i in allmyrequests) {
                myrequests.push(allmyrequests[i].sender);
            }
            // console.log(myrequests);
            _this.userservice.getallusers().then(function (res) {
                var allusers = res;
                _this.userdetails = [];
                for (var j in myrequests)
                    for (var key in allusers) {
                        if (myrequests[j] === allusers[key].uid) {
                            _this.userdetails.push(allusers[key]);
                        }
                    }
                _this.events.publish("gotrequests");
            });
        });
    };
    RequestsProvider.prototype.acceptrequest = function (buddy) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.myfriends = [];
            _this.firefriends
                .child(__WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().currentUser.uid)
                .push({
                uid: buddy.uid,
            })
                .then(function () {
                _this.firefriends
                    .child(buddy.uid)
                    .push({
                    uid: __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().currentUser.uid,
                })
                    .then(function () {
                    _this.deleterequest(buddy).then(function () {
                        resolve(true);
                    });
                })
                    .catch(function (err) {
                    reject(err);
                });
            })
                .catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    RequestsProvider.prototype.deleterequest = function (buddy) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.firereq
                .child(__WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().currentUser.uid)
                .orderByChild("sender")
                .equalTo(buddy.uid)
                .once("value", function (snapshot) {
                var somekey;
                for (var key in snapshot.val())
                    somekey = key;
                _this.firereq
                    .child(__WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().currentUser.uid)
                    .child(somekey)
                    .remove()
                    .then(function () {
                    resolve(true);
                });
            })
                .then(function () { })
                .catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    RequestsProvider.prototype.getmyfriends = function () {
        var _this = this;
        var friendsuid = [];
        this.firefriends
            .child(__WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().currentUser.uid)
            .on("value", function (snapshot) {
            var allfriends = snapshot.val();
            _this.myfriends = [];
            for (var i in allfriends)
                friendsuid.push(allfriends[i].uid);
            // console.log("All " + friendsuid);
            _this.userservice
                .getallusers()
                .then(function (users) {
                _this.myfriends = [];
                for (var j in friendsuid)
                    for (var key in users) {
                        if (friendsuid[j] === users[key].uid) {
                            _this.myfriends.push(users[key]);
                        }
                    }
                _this.events.publish("friends");
            })
                .catch(function (err) {
                alert(err);
            });
        });
    };
    RequestsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__user_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]])
    ], RequestsProvider);
    return RequestsProvider;
}());

//# sourceMappingURL=requests.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var AuthProvider = /** @class */ (function () {
    function AuthProvider(afireauth) {
        this.afireauth = afireauth;
    }
    /*
        For logging in a particular user. Called from the login.ts file.
    
    */
    AuthProvider.prototype.login = function (credentials) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.afireauth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then(function () {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    AuthProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["AngularFireAuth"]])
    ], AuthProvider);
    return AuthProvider;
}());

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(368);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_firebaseconfig__ = __webpack_require__(707);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2__ = __webpack_require__(708);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_angularfire2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__(709);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_auth_auth__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_user_user__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_requests_requests__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_chat_chat__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_ionic_image_loader__ = __webpack_require__(163);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */]],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */], { tabsPlacement: "top", preloadModules: true }, {
                    links: [
                        { loadChildren: '../pages/buddychat/buddychat.module#BuddychatPageModule', name: 'BuddychatPage', segment: 'buddychat', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/buddies/buddies.module#BuddiesPageModule', name: 'BuddiesPage', segment: 'buddies', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/chats/chats.module#ChatsPageModule', name: 'ChatsPage', segment: 'chats', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/passwordreset/passwordreset.module#PasswordresetPageModule', name: 'PasswordresetPage', segment: 'passwordreset', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/buddyprofile/buddyprofile.module#BuddyprofilePageModule', name: 'BuddyprofilePage', segment: 'buddyprofile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/profile/profile.module#ProfilePageModule', name: 'ProfilePage', segment: 'profile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/signup/signup.module#SignupPageModule', name: 'SignupPage', segment: 'signup', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tabs/tabs.module#TabsPageModule', name: 'TabsPage', segment: 'tabs', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_8_angularfire2__["AngularFireModule"].initializeApp(__WEBPACK_IMPORTED_MODULE_6__app_firebaseconfig__["a" /* config */]),
                __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_14_ionic_image_loader__["b" /* IonicImageLoader */].forRoot(),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */]],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_10__providers_auth_auth__["a" /* AuthProvider */],
                __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__["AngularFireAuth"],
                __WEBPACK_IMPORTED_MODULE_11__providers_user_user__["a" /* UserProvider */],
                __WEBPACK_IMPORTED_MODULE_12__providers_requests_requests__["a" /* RequestsProvider */],
                __WEBPACK_IMPORTED_MODULE_13__providers_chat_chat__["a" /* ChatProvider */],
                __WEBPACK_IMPORTED_MODULE_13__providers_chat_chat__["a" /* ChatProvider */],
            ],
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 707:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return config; });
var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
};
//# sourceMappingURL=app.firebaseconfig.js.map

/***/ }),

/***/ 709:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_image_loader__ = __webpack_require__(163);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, imageLoaderConfig) {
        var _this = this;
        this.imageLoaderConfig = imageLoaderConfig;
        this.rootPage = "LoginPage";
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.overlaysWebView(false);
            _this.imageLoaderConfig.enableSpinner(true);
            _this.imageLoaderConfig.setFileNameCachedWithExtension(true);
            //statusBar.hide();
            // splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/shohilkishore/Desktop/Work/Johnny/serenity/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/shohilkishore/Desktop/Work/Johnny/serenity/src/app/app.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_image_loader__["a" /* ImageLoaderConfig */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var UserProvider = /** @class */ (function () {
    function UserProvider(afireauth) {
        this.afireauth = afireauth;
        this.firedata = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref("/chatusers");
    }
    UserProvider.prototype.adduser = function (newuser) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.afireauth.auth
                .createUserWithEmailAndPassword(newuser.email, newuser.password)
                .then(function () {
                _this.afireauth.auth.currentUser
                    .updateProfile({
                    displayName: newuser.displayName,
                    photoURL: newuser.photoURL,
                    tolerance: 0.7,
                    id: newuser.id,
                })
                    .then(function () {
                    _this.firedata
                        .child(_this.afireauth.auth.currentUser.uid)
                        .set({
                        uid: _this.afireauth.auth.currentUser.uid,
                        displayName: newuser.displayName,
                        photoURL: newuser.photoURL,
                        tolerance: 0.7,
                        id: newuser.id,
                        type: newuser.type,
                    })
                        .then(function () {
                        resolve({ success: true });
                    })
                        .catch(function (err) {
                        reject(err);
                    });
                })
                    .catch(function (err) {
                    reject(err);
                });
            })
                .catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    UserProvider.prototype.passwordreset = function (email) {
        var promise = new Promise(function (resolve, reject) {
            __WEBPACK_IMPORTED_MODULE_2_firebase___default.a
                .auth()
                .sendPasswordResetEmail(email)
                .then(function () {
                resolve({ success: true });
            })
                .catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    UserProvider.prototype.getuserdetails = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.firedata
                .child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid)
                .once("value", function (snapshot) {
                resolve(snapshot.val());
            })
                .catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    // Function updated so it doesn't crash.
    UserProvider.prototype.updateimage = function (imageurl) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.afireauth.auth.currentUser
                .updateProfile({
                photoURL: imageurl,
            })
                .then(function () {
                __WEBPACK_IMPORTED_MODULE_2_firebase___default.a
                    .database()
                    .ref("/users/" + __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid)
                    .update({
                    photoURL: imageurl,
                })
                    .then(function () {
                    resolve({ success: true });
                })
                    .catch(function (err) {
                    reject(err);
                });
            })
                .catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    UserProvider.prototype.updatedisplayname = function (newname) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.afireauth.auth.currentUser
                .updateProfile({
                displayName: newname,
            })
                .then(function () {
                _this.firedata
                    .child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid)
                    .update({
                    displayName: newname,
                })
                    .then(function () {
                    resolve({ success: true });
                })
                    .catch(function (err) {
                    reject(err);
                });
            })
                .catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
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
    UserProvider.prototype.updatetolerance = function (tolerance) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.afireauth.auth.currentUser
                .updateProfile({
                tolerance: tolerance,
            })
                .then(function () {
                _this.firedata
                    .child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid)
                    .update({
                    tolerance: tolerance,
                })
                    .then(function () {
                    resolve({ success: true });
                })
                    .catch(function (err) {
                    reject(err);
                });
            })
                .catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    UserProvider.prototype.getallusers = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.firedata
                .orderByChild("uid")
                .once("value", function (snapshot) {
                var userdata = snapshot.val();
                var temparr = [];
                for (var key in userdata) {
                    temparr.push(userdata[key]);
                }
                resolve(temparr);
            })
                .catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    var _a;
    UserProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["AngularFireAuth"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["AngularFireAuth"]) === "function" ? _a : Object])
    ], UserProvider);
    return UserProvider;
}());

//# sourceMappingURL=user.js.map

/***/ })

},[363]);
//# sourceMappingURL=main.js.map