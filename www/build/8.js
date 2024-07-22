webpackJsonp([8],{

/***/ 710:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BuddiesPageModule", function() { return BuddiesPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__buddies__ = __webpack_require__(719);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_image_loader__ = __webpack_require__(163);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var BuddiesPageModule = /** @class */ (function () {
    function BuddiesPageModule() {
    }
    BuddiesPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_2__buddies__["a" /* BuddiesPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__buddies__["a" /* BuddiesPage */]), __WEBPACK_IMPORTED_MODULE_3_ionic_image_loader__["b" /* IonicImageLoader */]],
        })
    ], BuddiesPageModule);
    return BuddiesPageModule;
}());

//# sourceMappingURL=buddies.module.js.map

/***/ }),

/***/ 719:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuddiesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_user__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_requests_requests__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
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
 * Generated class for the BuddiesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var BuddiesPage = /** @class */ (function () {
    function BuddiesPage(navCtrl, navParams, userservice, events, alertCtrl, requestservice, zone) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userservice = userservice;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.requestservice = requestservice;
        this.zone = zone;
        this.newrequest = {};
        this.temparr = [];
        this.unfilteredusers = [];
        this.filteredusers = [];
        this.recipients = [];
        this.userservice.getallusers().then(function (res) {
            _this.unfilteredusers = res;
            _this.temparr = res;
        });
    }
    BuddiesPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.requestservice.getmyfriends();
        this.myfriends = [];
        this.events.subscribe("friends", function () {
            _this.myfriends = [];
            _this.myfriends = _this.requestservice.myfriends;
        });
        this.loaduserdetails();
    };
    BuddiesPage.prototype.ionViewDidLeave = function () {
        this.events.unsubscribe("friends");
    };
    // ionViewDidLoad() {}
    BuddiesPage.prototype.ionViewDidEnter = function () {
        this.filterusers(this.unfilteredusers, this.myfriends);
        // this.requestservice.log();
    };
    BuddiesPage.prototype.filterusers = function (users, friends) {
        // var friendrequests = this.requestservice.log();
        for (var i = users.length - 1; i >= 0; i--) {
            for (var j = 0; j < friends.length; j++) {
                if (users[i].uid === this.userID) {
                    users.splice(i, 1);
                }
                else if (users[i].uid === friends[j].uid) {
                    users.splice(i, 1);
                }
            }
        }
        this.filteredusers = users;
    };
    BuddiesPage.prototype.loaduserdetails = function () {
        var _this = this;
        this.userservice.getuserdetails().then(function (res) {
            _this.zone.run(function () {
                _this.userID = res.uid;
                console.log(_this.userID);
            });
        });
    };
    BuddiesPage.prototype.searchuser = function (searchbar) {
        this.filteredusers = this.temparr;
        var q = searchbar.target.value;
        if (q.trim() == "") {
            return;
        }
        this.filteredusers = this.filteredusers.filter(function (v) {
            if (v.id.indexOf(q) > -1) {
                return true;
            }
            return false;
        });
    };
    BuddiesPage.prototype.sendreq = function (recipient) {
        var _this = this;
        this.newrequest.sender = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.auth().currentUser.uid;
        this.newrequest.recipient = recipient.uid;
        if (this.newrequest.sender === this.newrequest.recipient)
            alert("You can't add yourself!");
        else {
            var successalert_1 = this.alertCtrl.create({
                title: "Request Sent!",
                subTitle: "Your request was sent to " + recipient.displayName + ".",
                buttons: ["Okay"],
            });
            this.requestservice
                .sendrequest(this.newrequest)
                .then(function (res) {
                if (res.success) {
                    successalert_1.present();
                    var sentuser = _this.filteredusers.indexOf(recipient);
                    _this.filteredusers.splice(sentuser, 1);
                }
            })
                .catch(function (err) {
                alert(err);
            });
        }
    };
    BuddiesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-buddies",template:/*ion-inline-start:"/Users/shohilkishore/Desktop/Work/Old/Johnny Chan/cyberbully-checker (latest working ios version)/src/pages/buddies/buddies.html"*/'<!-- Profile pictures: https://getavataaars.com/ -->\n\n<ion-header>\n  <ion-navbar color="hcolor"> </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-searchbar\n    [(ngModel)]="searchstring"\n    (input)="searchuser($event)"\n    placeholder="Add a new friend by #id"\n  ></ion-searchbar>\n  <ion-row center>\n    <ion-col text-center col-4 *ngFor="let key of filteredusers">\n      <ion-card>\n        <ion-card-header>\n          <ion-avatar item-left>\n            <img-loader src="{{key.photoURL}}" useImg></img-loader>\n          </ion-avatar>\n          <ion-card-title class="font">\n            {{key.displayName}}\n          </ion-card-title>\n        </ion-card-header>\n        <button class="btncolor" icon-only (click)="sendreq(key)">\n          <ion-icon name="md-add-circle"></ion-icon>\n        </button>\n      </ion-card>\n    </ion-col>\n  </ion-row>\n</ion-content>\n'/*ion-inline-end:"/Users/shohilkishore/Desktop/Work/Old/Johnny Chan/cyberbully-checker (latest working ios version)/src/pages/buddies/buddies.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_requests_requests__["a" /* RequestsProvider */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]])
    ], BuddiesPage);
    return BuddiesPage;
}());

//# sourceMappingURL=buddies.js.map

/***/ })

});
//# sourceMappingURL=8.js.map