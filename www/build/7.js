webpackJsonp([7],{

/***/ 711:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BuddychatPageModule", function() { return BuddychatPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__buddychat__ = __webpack_require__(720);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BuddychatPageModule = /** @class */ (function () {
    function BuddychatPageModule() {
    }
    BuddychatPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_2__buddychat__["a" /* BuddychatPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__buddychat__["a" /* BuddychatPage */])]
        })
    ], BuddychatPageModule);
    return BuddychatPageModule;
}());

//# sourceMappingURL=buddychat.module.js.map

/***/ }),

/***/ 720:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuddychatPage; });
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
 * Generated class for the BuddychatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var BuddychatPage = /** @class */ (function () {
    function BuddychatPage(navCtrl, navParams, chatservice, events, userservice, zone, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.chatservice = chatservice;
        this.events = events;
        this.userservice = userservice;
        this.zone = zone;
        this.alertCtrl = alertCtrl;
        this.allmessages = [];
        this.toxicflag = false;
        this.toxic = true;
        this.flag = true;
        this.userservice.getuserdetails().then(function (res) {
            _this.tolerance = res.tolerance;
        });
        this.buddy = this.chatservice.buddy;
        this.receiveravatar = this.buddy.photoURL;
        this.scrollto();
        this.events.subscribe("newmessage", function () {
            _this.allmessages = [];
            _this.zone.run(function () {
                _this.allmessages = _this.chatservice.buddymessages;
                for (var msg in _this.allmessages) {
                    if (_this.allmessages[msg].toxicity >= _this.tolerance && _this.flag) {
                        _this.flag = false;
                        var toxicalert = _this.alertCtrl.create({
                            title: "Toxic Content Detected",
                            subTitle: "Message contains toxic content, do you want it to be hidden?",
                            buttons: [
                                {
                                    text: "Yes",
                                    role: "cancel",
                                    handler: function () {
                                        _this.toxic = true;
                                    },
                                },
                                {
                                    text: "No",
                                    handler: function () {
                                        _this.toxic = false;
                                    },
                                },
                            ],
                        });
                        toxicalert.present();
                    }
                }
            });
        });
    }
    BuddychatPage.prototype.ionViewWillEnter = function () {
        this.loaduserdetails();
    };
    BuddychatPage.prototype.loaduserdetails = function () {
        var _this = this;
        this.userservice.getuserdetails().then(function (res) {
            _this.zone.run(function () {
                _this.senderavatar = res.photoURL;
            });
        });
    };
    BuddychatPage.prototype.addmessage = function () {
        var _this = this;
        this.chatservice.addnewmessage(this.newmessage, this.tolerance).then(function () {
            _this.content.scrollToBottom();
            _this.newmessage = "";
        });
    };
    BuddychatPage.prototype.showtoxic = function () {
        if (!this.toxicflag) {
            this.toxicflag = true;
        }
        else {
            this.toxicflag = false;
        }
    };
    BuddychatPage.prototype.ionViewDidEnter = function () {
        this.chatservice.getbuddymessages();
    };
    BuddychatPage.prototype.scrollto = function () {
        var _this = this;
        setTimeout(function () {
            _this.content.scrollToBottom();
        }, 1000);
    };
    BuddychatPage.prototype.buddyprofile = function () {
        this.navCtrl.push("BuddyprofilePage");
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])("content"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
    ], BuddychatPage.prototype, "content", void 0);
    BuddychatPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-buddychat",template:/*ion-inline-start:"/Users/shohilkishore/Desktop/Work/Old/Johnny Chan/cyberbully-checker (latest working ios version)/src/pages/buddychat/buddychat.html"*/'<!--\n  Generated template for the BuddychatPage page.\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="hcolor">\n    <ion-title>{{buddy.displayName}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content #content>\n  <div class="chatwindow">\n    <ion-list no-lines>\n      <!-- Changed ion-item to div with ion-item attribute as ion-item was not clickable. -->\n      <!--  -->\n      <div ion-item *ngFor="let item of allmessages; let i = index" text-wrap>\n        <ion-avatar item-right *ngIf="item.sentby === buddy.uid">\n          <img src="{{receiveravatar}}"  (click)="buddyprofile(item)"/>\n        </ion-avatar>\n        <div\n          class="bubble me"\n          *ngIf="item.sentby === buddy.uid"\n          (click)="showtoxic()"\n        >\n          <h3 *ngIf="item.toxicity >= tolerance && !toxicflag && toxic">\n            Toxic message\n          </h3>\n          <h3 *ngIf="(item.toxicity < tolerance || !toxic) && !toxicflag">\n            {{item.message}}\n          </h3>\n          <h3 class="toxicmsg" *ngIf="item.toxicity >= tolerance && toxicflag">\n            {{item.message}}\n          </h3>\n          <h3\n            class="strongmsg"\n            *ngIf="item.toxicity >= tolerance/2 && item.toxicity < tolerance && toxicflag"\n          >\n            {{item.message}}\n          </h3>\n          <h3 class="cleanmsg" *ngIf="item.toxicity < tolerance/2 && toxicflag">\n            {{item.message}}\n          </h3>\n          <h3 class="toxicmsg" *ngIf="item.toxicity >= tolerance && toxicflag">\n            Toxicity: {{(item.toxicity * 100).toFixed(0)}}%\n          </h3>\n          <h3\n            class="strongmsg"\n            *ngIf="item.toxicity >= tolerance/2 && item.toxicity < tolerance && toxicflag"\n          >\n            Toxicity: {{(item.toxicity * 100).toFixed(0)}}%\n          </h3>\n          <h3 class="cleanmsg" *ngIf="item.toxicity < tolerance/2 && toxicflag">\n            Toxicity: {{(item.toxicity * 100).toFixed(0)}}%\n          </h3>\n        </div>\n        <ion-avatar item-left *ngIf="item.sentby != buddy.uid">\n          <img src="{{senderavatar}}" />\n        </ion-avatar>\n        <div\n          class="bubble you"\n          *ngIf="item.sentby != buddy.uid"\n          (click)="showtoxic()"\n        >\n          <h3 *ngIf="item.toxicity >= tolerance && !toxicflag && toxic">\n            Toxic message\n          </h3>\n          <h3 *ngIf="(item.toxicity < tolerance || !toxic) && !toxicflag">\n            {{item.message}}\n          </h3>\n          <!-- <h3\n            class="toxicmsg"\n            *ngIf="item.toxicity >= tolerance && toxicflag && toxic"\n          >\n            {{item.message}}\n          </h3> -->\n          <h3 class="toxicmsg" *ngIf="item.toxicity >= tolerance && toxicflag">\n            {{item.message}}\n          </h3>\n          <h3\n            class="strongmsg"\n            *ngIf="item.toxicity >= tolerance/2 && item.toxicity < tolerance && toxicflag"\n          >\n            {{item.message}}\n          </h3>\n          <h3 class="cleanmsg" *ngIf="item.toxicity < tolerance/2 && toxicflag">\n            {{item.message}}\n          </h3>\n          <h3 class="toxicmsg" *ngIf="item.toxicity >= tolerance && toxicflag">\n            Toxicity: {{(item.toxicity * 100).toFixed(0)}}%\n          </h3>\n          <h3\n            class="strongmsg"\n            *ngIf="item.toxicity >= tolerance/2 && item.toxicity < tolerance && toxicflag"\n          >\n            Toxicity: {{(item.toxicity * 100).toFixed(0)}}%\n          </h3>\n          <h3 class="cleanmsg" *ngIf="item.toxicity < tolerance/2 && toxicflag">\n            Toxicity: {{(item.toxicity * 100).toFixed(0)}}%\n          </h3>\n        </div>\n      </div>\n    </ion-list>\n  </div>\n</ion-content>\n<ion-footer ion-fixed>\n  <ion-toolbar class="no-border" color="white">\n    <ion-input\n      [(ngModel)]="newmessage"\n      placeholder="Write your message..."\n    ></ion-input>\n    <ion-buttons end>\n      <button ion-button (click)="addmessage()">\n        <ion-icon name="md-send" color="primary"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/Users/shohilkishore/Desktop/Work/Old/Johnny Chan/cyberbully-checker (latest working ios version)/src/pages/buddychat/buddychat.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_chat_chat__["a" /* ChatProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_3__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], BuddychatPage);
    return BuddychatPage;
}());

//# sourceMappingURL=buddychat.js.map

/***/ })

});
//# sourceMappingURL=7.js.map