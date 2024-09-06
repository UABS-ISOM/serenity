webpackJsonp([3],{

/***/ 714:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordresetPageModule", function() { return PasswordresetPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__passwordreset__ = __webpack_require__(723);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PasswordresetPageModule = /** @class */ (function () {
    function PasswordresetPageModule() {
    }
    PasswordresetPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__passwordreset__["a" /* PasswordresetPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__passwordreset__["a" /* PasswordresetPage */]),
            ],
        })
    ], PasswordresetPageModule);
    return PasswordresetPageModule;
}());

//# sourceMappingURL=passwordreset.module.js.map

/***/ }),

/***/ 723:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasswordresetPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_user__ = __webpack_require__(91);
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
 * Generated class for the PasswordresetPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var PasswordresetPage = /** @class */ (function () {
    function PasswordresetPage(navCtrl, navParams, userservice, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userservice = userservice;
        this.alertCtrl = alertCtrl;
    }
    PasswordresetPage.prototype.ionViewDidLoad = function () {
        // console.log('ionViewDidLoad PasswordresetPage');
    };
    PasswordresetPage.prototype.reset = function () {
        var alert = this.alertCtrl.create({
            buttons: ["Okay"],
        });
        this.userservice
            .passwordreset(this.email)
            .then(function (res) {
            if (res.success) {
                alert.setTitle("Sent");
                alert.setSubTitle("Please follow the instructions in the email to reset your password.");
            }
        })
            .catch(function (err) {
            alert.setTitle("Failed");
            alert.setSubTitle(err);
        });
        alert.present();
    };
    PasswordresetPage.prototype.goback = function () {
        this.navCtrl.setRoot("LoginPage");
    };
    PasswordresetPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-passwordreset",template:/*ion-inline-start:"/Users/shohilkishore/Desktop/Work/Johnny/serenity/src/pages/passwordreset/passwordreset.html"*/'<!-- Remove ion-list to ensure email is tappable. -->\n<ion-content class="animated fadeIn login auth-page background">\n  <div class="login-content">\n    <ion-card>\n      <ion-card-content>\n        <div class="spacer" style="height: 10px;"></div>\n        <ion-item class="text-1x">\n          <ion-input\n            type="email"\n            [(ngModel)]="email"\n            placeholder="Email"\n          ></ion-input>\n          <ion-icon name="mail" item-start class="text-primary"></ion-icon>\n        </ion-item>\n        <button\n          class="text-1x"\n          ion-button\n          icon-start\n          block\n          color="primary"\n          tappable\n          (click)="reset()"\n        >\n          Reset\n        </button>\n        <div text-center margin-top>\n          <span ion-text color="secondary" tappable (click)="goback()"\n            >Back</span\n          >\n        </div>\n      </ion-card-content>\n    </ion-card>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/shohilkishore/Desktop/Work/Johnny/serenity/src/pages/passwordreset/passwordreset.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], PasswordresetPage);
    return PasswordresetPage;
}());

//# sourceMappingURL=passwordreset.js.map

/***/ })

});
//# sourceMappingURL=3.js.map