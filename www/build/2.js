webpackJsonp([2],{

/***/ 716:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePageModule", function() { return ProfilePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile__ = __webpack_require__(725);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ProfilePageModule = /** @class */ (function () {
    function ProfilePageModule() {
    }
    ProfilePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__profile__["a" /* ProfilePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__profile__["a" /* ProfilePage */]),
            ],
        })
    ], ProfilePageModule);
    return ProfilePageModule;
}());

//# sourceMappingURL=profile.module.js.map

/***/ }),

/***/ 725:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_user__ = __webpack_require__(91);
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




/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ProfilePage = /** @class */ (function () {
    function ProfilePage(navCtrl, navParams, userservice, zone, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userservice = userservice;
        this.zone = zone;
        this.alertCtrl = alertCtrl;
    }
    ProfilePage.prototype.ionViewWillEnter = function () {
        this.loaduserdetails();
    };
    ProfilePage.prototype.loaduserdetails = function () {
        var _this = this;
        this.userservice.getuserdetails().then(function (res) {
            _this.uid = res.uid.substring(0, 7);
            _this.displayName = res.displayName;
            _this.tolerance = res.tolerance;
            _this.saturation = res.tolerance * 100;
            _this.id = res.id;
            _this.zone.run(function () {
                _this.avatar = res.photoURL;
            });
        });
    };
    // Function updated to prevent bugs/crash.
    ProfilePage.prototype.editname = function () {
        var _this = this;
        var statusalert = this.alertCtrl.create({
            buttons: ["Okay"],
        });
        var alert = this.alertCtrl.create({
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
                    handler: function (data) { },
                },
                {
                    text: "Edit",
                    handler: function (data) {
                        if (data.nickname) {
                            _this.userservice
                                .updatedisplayname(data.nickname)
                                .then(function (res) {
                                if (res.success) {
                                    statusalert.setTitle("Success!");
                                    statusalert.setSubTitle("Your nickname has been updated successfully.");
                                    statusalert.present();
                                    _this.zone.run(function () {
                                        _this.displayName = data.nickname;
                                    });
                                }
                                else {
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
    };
    ProfilePage.prototype.editimage = function () {
        var _this = this;
        var statusalert = this.alertCtrl.create({
            buttons: ["Okay"],
        });
        var alert = this.alertCtrl.create({
            title: "Edit Avatar",
            message: "<img src =\"https://firebasestorage.googleapis.com/v0/b/cleanchat-92927.appspot.com/o/female1.png?alt=media&token=ade7a9e5-27d3-4071-a0a5-134e10ae522b\" alt=\"g-maps\" style=\"border-radius: 2px\">",
            inputs: [
                {
                    name: "radio1",
                    type: "radio",
                    value: "https://firebasestorage.googleapis.com/v0/b/cleanchat-92927.appspot.com/o/female1.png?alt=media&token=ade7a9e5-27d3-4071-a0a5-134e10ae522b",
                },
            ],
            buttons: [
                {
                    text: "Cancel",
                    role: "cancel",
                    handler: function (data) { },
                },
                {
                    text: "Edit",
                    handler: function (data) {
                        _this.userservice.updateimage(data.value).then(function (res) {
                            if (res.success) {
                                statusalert.setTitle("Success!");
                                statusalert.setSubTitle("Your avatar has been updated successfully.");
                                statusalert.present();
                                _this.zone.run(function () {
                                    _this.avatar = data.value;
                                });
                            }
                            else {
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
    };
    ProfilePage.prototype.edittolerance = function () {
        var _this = this;
        var statusalert = this.alertCtrl.create({
            buttons: ["Okay"],
        });
        var alert = this.alertCtrl.create({
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
                    handler: function (data) { },
                },
                {
                    text: "Edit",
                    handler: function (data) {
                        if (data.tolerance) {
                            _this.userservice
                                .updatetolerance(data.tolerance)
                                .then(function (res) {
                                if (res.success) {
                                    statusalert.setTitle("Success!");
                                    statusalert.setSubTitle("Your tolerance has been updated successfully.");
                                    statusalert.present();
                                    _this.zone.run(function () {
                                        _this.tolerance = data.tolerance;
                                    });
                                }
                                else {
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
    };
    ProfilePage.prototype.updatetolerance = function (rangeValue) {
        var _this = this;
        var statusalert = this.alertCtrl.create({
            buttons: ["Okay"],
        });
        this.userservice
            .updatetolerance(rangeValue.value / 100)
            .then(function (res) {
            if (res.success) {
                statusalert.setTitle("Success!");
                statusalert.setSubTitle("Your tolerance has been updated successfully.");
                statusalert.present();
                _this.zone.run(function () {
                    _this.tolerance = rangeValue.value / 100;
                    _this.saturation = _this.tolerance * 100;
                    console.log(_this.tolerance);
                });
            }
            else {
                statusalert.setTitle("Error");
                statusalert.setSubTitle("Please try again.");
                statusalert.present();
            }
        });
    };
    ProfilePage.prototype.logout = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_3_firebase___default.a
            .auth()
            .signOut()
            .then(function () {
            _this.navCtrl.parent.parent.setRoot("LoginPage");
        });
    };
    ProfilePage.prototype.addbuddy = function () {
        this.navCtrl.push("BuddiesPage");
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-profile",template:/*ion-inline-start:"/Users/shohilkishore/Desktop/Work/Old/Johnny Chan/cyberbully-checker (latest working ios version)/src/pages/profile/profile.html"*/'<!--\n  Generated template for the ProfilePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-header>\n  <ion-navbar color="hcolor">\n    <ion-buttons end>\n      <button ion-button icon-only (click)="addbuddy()">\n        <ion-icon name="md-add-circle"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding class="background text-col">\n  <!-- <ion-card>\n    <ion-card-content> -->\n  <div class="profile-image">\n    <img src="{{avatar}}" />\n  </div>\n  <div class="spacer" style="height: 10px;"></div>\n  <div>\n    <h2>{{displayName}}</h2>\n    <p style="color:grey;">#{{id}}</p>\n  </div>\n  <div>\n  </div>\n  <div>\n    <!--<h2 (click)="edittolerance()">{{tolerance}}</h2>-->\n  </div>\n  <div>\n    <ion-item>\n      <ion-range\n        pin="true"\n        min="0"\n        max="100"\n        [(ngModel)]="saturation"\n        color="dark"\n        (ionBlur)="updatetolerance($event)"\n      >\n        <ion-label range-left>0%</ion-label>\n        <ion-label range-right>100%</ion-label>\n      </ion-range>\n    </ion-item>\n    <p>Toxicity Tolerance: {{tolerance * 100}}%</p>\n    <!--  Tap on your pic or nick name to change it.-->\n  </div>\n  <div class="spacer" style="height: 10px;"></div>\n  <ion-row center>\n    <ion-col>\n      <button\n        class="text-1x"\n        ion-button\n        icon-start\n        block\n        color="primary"\n        tappable\n        (click)="editname()"\n      >\n        Edit Name\n      </button>\n    </ion-col>\n    <!-- <ion-col>\n      <button\n        class="text-1x"\n        ion-button\n        icon-start\n        block\n        color="primary"\n        tappable\n        (click)="editimage(\'https://firebasestorage.googleapis.com/v0/b/cleanchat-92927.appspot.com/o/female1.png?alt=media&token=ade7a9e5-27d3-4071-a0a5-134e10ae522b\')"\n      >\n        Edit Avatar\n      </button>\n    </ion-col> -->\n    <ion-col>\n      <button\n        class="text-1x"\n        ion-button\n        icon-start\n        block\n        color="primary"\n        tappable\n        (click)="logout()"\n      >\n        Logout\n      </button>\n    </ion-col>\n  </ion-row>\n  <!-- </ion-card-content>\n  </ion-card> -->\n</ion-content>\n'/*ion-inline-end:"/Users/shohilkishore/Desktop/Work/Old/Johnny Chan/cyberbully-checker (latest working ios version)/src/pages/profile/profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ })

});
//# sourceMappingURL=2.js.map