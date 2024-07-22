webpackJsonp([6],{

/***/ 712:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BuddyprofilePageModule", function() { return BuddyprofilePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__buddyprofile__ = __webpack_require__(721);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BuddyprofilePageModule = /** @class */ (function () {
    function BuddyprofilePageModule() {
    }
    BuddyprofilePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__buddyprofile__["a" /* BuddyprofilePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__buddyprofile__["a" /* BuddyprofilePage */]),
            ],
        })
    ], BuddyprofilePageModule);
    return BuddyprofilePageModule;
}());

//# sourceMappingURL=buddyprofile.module.js.map

/***/ }),

/***/ 721:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuddyprofilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_chat_chat__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_user__ = __webpack_require__(91);
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
 * Generated class for the BuddyprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BuddyprofilePage = /** @class */ (function () {
    function BuddyprofilePage(navCtrl, navParams, userservice, chatservice, zone, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userservice = userservice;
        this.chatservice = chatservice;
        this.zone = zone;
        this.alertCtrl = alertCtrl;
    }
    BuddyprofilePage.prototype.ionViewWillEnter = function () {
        this.loaduserdetails();
    };
    BuddyprofilePage.prototype.loaduserdetails = function () {
        var _this = this;
        this.userservice.getuserdetails().then(function (res) {
            _this.buddy = _this.chatservice.buddy;
            _this.uid = _this.buddy.uid.substring(0, 7);
            _this.displayName = _this.buddy.displayName;
            _this.tolerance = _this.buddy.tolerance;
            _this.saturation = _this.buddy.tolerance * 100;
            _this.id = _this.buddy.id;
            _this.zone.run(function () {
                _this.avatar = _this.buddy.photoURL;
            });
        });
    };
    BuddyprofilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-buddyprofile',template:/*ion-inline-start:"/Users/shohilkishore/Desktop/Work/Old/Johnny Chan/cyberbully-checker (latest working ios version)/src/pages/buddyprofile/buddyprofile.html"*/'<!--\n  Generated template for the ProfilePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-header>\n  <ion-navbar color="hcolor">\n    <ion-buttons end>\n      <button ion-button icon-only>\n        <ion-icon name="md-add-circle"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding class="background text-col">\n  <!-- <ion-card>\n    <ion-card-content> -->\n  <div class="profile-image">\n    <img src="{{avatar}}" />\n  </div>\n  <div class="spacer" style="height: 10px;"></div>\n  <div>\n    <h2>{{displayName}}</h2>\n    <p style="color:grey;">#{{id}}</p>\n  </div>\n  <div>\n  </div>\n  <div>\n    <!--<h2 (click)="edittolerance()">{{tolerance}}</h2>-->\n  </div>\n  <!--  <div>\n    <ion-item>\n      <ion-range\n        pin="true"\n        min="0"\n        max="100"\n        [(ngModel)]="saturation"\n        color="dark"\n        (ionBlur)="updatetolerance($event)"\n      >\n        <ion-label range-left>0%</ion-label>\n        <ion-label range-right>100%</ion-label>\n      </ion-range>\n    </ion-item>\n    <!--  <p>Toxicity Tolerance: {{tolerance * 100}}%</p>\n    Tap on your pic or nick name to change it.\n  </div>-->\n  <div class="spacer" style="height: 10px;"></div>\n  <ion-row center>\n    <ion-col>\n    </ion-col>\n    <!-- <ion-col>\n      <button\n        class="text-1x"\n        ion-button\n        icon-start\n        block\n        color="primary"\n        tappable\n        (click)="editimage(\'https://firebasestorage.googleapis.com/v0/b/cleanchat-92927.appspot.com/o/female1.png?alt=media&token=ade7a9e5-27d3-4071-a0a5-134e10ae522b\')"\n      >\n        Edit Avatar\n      </button>\n    </ion-col> -->\n    <ion-col>\n    </ion-col>\n  </ion-row>\n  <!-- </ion-card-content>\n  </ion-card> -->\n</ion-content>\n'/*ion-inline-end:"/Users/shohilkishore/Desktop/Work/Old/Johnny Chan/cyberbully-checker (latest working ios version)/src/pages/buddyprofile/buddyprofile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_chat_chat__["a" /* ChatProvider */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], BuddyprofilePage);
    return BuddyprofilePage;
}());

//# sourceMappingURL=buddyprofile.js.map

/***/ })

});
//# sourceMappingURL=6.js.map