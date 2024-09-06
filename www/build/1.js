webpackJsonp([1],{

/***/ 717:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupPageModule", function() { return SignupPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signup__ = __webpack_require__(726);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SignupPageModule = /** @class */ (function () {
    function SignupPageModule() {
    }
    SignupPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__signup__["a" /* SignupPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__signup__["a" /* SignupPage */]),
            ],
        })
    ], SignupPageModule);
    return SignupPageModule;
}());

//# sourceMappingURL=signup.module.js.map

/***/ }),

/***/ 726:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
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
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SignupPage = /** @class */ (function () {
    function SignupPage(navCtrl, navParams, userservice, loadingCtrl, toastCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userservice = userservice;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.newuser = {
            email: "",
            password: "",
            displayName: "",
            photoURL: "",
            id: "",
            tolerance: 0.7,
            type: ""
        };
    }
    SignupPage.prototype.signup = function () {
        var _this = this;
        var toaster = this.toastCtrl.create({
            duration: 3000,
            position: "bottom",
        });
        if (this.newuser.email == "" ||
            this.newuser.password == "" ||
            this.newuser.displayName == "" ||
            this.newuser.type == "" ||
            this.newuser.photoURL == "") {
            toaster.setMessage("Please complete all fields.");
            toaster.present();
        }
        else if (this.newuser.password.length < 7) {
            toaster.setMessage("Password is not strong enough. Try entering more than six characters.");
            toaster.present();
        }
        else {
            var loader_1 = this.loadingCtrl.create({
                content: "Please wait.",
            });
            loader_1.present();
            var str = new Date().toISOString();
            str = str.replace(/\D/g, '');
            str = str.slice(2);
            this.newuser.id = str;
            this.newuser.tolerance = 0.7;
            this.userservice
                .adduser(this.newuser)
                .then(function (res) {
                loader_1.dismiss();
                if (res.success)
                    _this.navCtrl.push("LoginPage");
                else
                    alert("Error" + res);
            })
                .catch(function (err) {
                var erroralert = _this.alertCtrl.create({
                    title: "Error",
                    subTitle: err,
                    buttons: ["Okay"],
                });
                loader_1.dismiss();
                erroralert.present();
            });
        }
    };
    SignupPage.prototype.avatar = function (icon) {
        document.getElementById("avatar1").setAttribute("class", "avatar");
        document.getElementById("avatar2").setAttribute("class", "avatar");
        document.getElementById("avatar3").setAttribute("class", "avatar");
        document.getElementById("avatar4").setAttribute("class", "avatar");
        if (icon === 1) {
            this.newuser.photoURL =
                "https://firebasestorage.googleapis.com/v0/b/cleanchat-92927.appspot.com/o/female1.png?alt=media&token=ade7a9e5-27d3-4071-a0a5-134e10ae522b";
            document.getElementById("avatar1").setAttribute("class", "avatarclicked");
        }
        else if (icon === 2) {
            this.newuser.photoURL =
                "https://firebasestorage.googleapis.com/v0/b/cleanchat-92927.appspot.com/o/male1.png?alt=media&token=fdbf5f6f-7fb9-4856-b413-22bff8eb95bb";
            document.getElementById("avatar2").setAttribute("class", "avatarclicked");
        }
        else if (icon === 3) {
            this.newuser.photoURL =
                "https://firebasestorage.googleapis.com/v0/b/cleanchat-92927.appspot.com/o/female2.png?alt=media&token=e98ca823-6ca2-4185-a1d6-27ae3bce6b17";
            document.getElementById("avatar3").setAttribute("class", "avatarclicked");
        }
        else {
            this.newuser.photoURL =
                "https://firebasestorage.googleapis.com/v0/b/cleanchat-92927.appspot.com/o/male2.png?alt=media&token=67952413-3f51-42ca-897f-e765e044acc5";
            document.getElementById("avatar4").setAttribute("class", "avatarclicked");
        }
    };
    SignupPage.prototype.goback = function () {
        this.navCtrl.setRoot("LoginPage");
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-signup",template:/*ion-inline-start:"/Users/shohilkishore/Desktop/Work/Johnny/serenity/src/pages/signup/signup.html"*/'<!--\n  Generated template for the SignupPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-content class="animated fadeIn login auth-page background">\n  <ion-card>\n    <ion-card-content>\n      <div class="spacer" style="height: 10px;"></div>\n      <ion-item class="text-1x">\n        <ion-input\n          type="email"\n          placeholder="Email"\n          [(ngModel)]="newuser.email"\n        ></ion-input>\n        <ion-icon name="mail" item-start class="text-primary"></ion-icon>\n      </ion-item>\n      <ion-item class="text-1x">\n        <ion-input\n          type="password"\n          placeholder="Password"\n          [(ngModel)]="newuser.password"\n        ></ion-input>\n        <ion-icon name="lock" item-start class="text-primary"></ion-icon>\n      </ion-item>\n      <ion-item class="text-1x">\n        <ion-input\n          type="text"\n          placeholder="Name"\n          [(ngModel)]="newuser.displayName"\n        ></ion-input>\n        <ion-icon name="md-person" item-start class="text-primary"></ion-icon>\n      </ion-item>\n      <ion-item class="text-1x">\n          <ion-select [(ngModel)]="newuser.type" class="myCustomSelect" placeholder="Select Account Type">\n            <ion-option value="ch">Children</ion-option>\n            <ion-option value="p">Parent</ion-option>\n          </ion-select>\n          <ion-icon name="briefcase" item-start class="text-primary"></ion-icon>\n      </ion-item>\n      <ion-row center>\n        <ion-col text-center>\n          <ion-buttons>\n            <button (click)="avatar(1)">\n              <img\n                id="avatar1"\n                class="avatar"\n                src="https://firebasestorage.googleapis.com/v0/b/cleanchat-92927.appspot.com/o/female1.png?alt=media&token=ade7a9e5-27d3-4071-a0a5-134e10ae522b"\n              />\n            </button>\n            <button (click)="avatar(2)">\n              <img\n                id="avatar2"\n                class="avatar"\n                src="https://firebasestorage.googleapis.com/v0/b/cleanchat-92927.appspot.com/o/male1.png?alt=media&token=fdbf5f6f-7fb9-4856-b413-22bff8eb95bb"\n              />\n            </button>\n            <button (click)="avatar(3)">\n              <img\n                id="avatar3"\n                class="avatar"\n                src="https://firebasestorage.googleapis.com/v0/b/cleanchat-92927.appspot.com/o/female2.png?alt=media&token=e98ca823-6ca2-4185-a1d6-27ae3bce6b17"\n              />\n            </button>\n            <button (click)="avatar(4)">\n              <img\n                id="avatar4"\n                class="avatar"\n                src="https://firebasestorage.googleapis.com/v0/b/cleanchat-92927.appspot.com/o/male2.png?alt=media&token=67952413-3f51-42ca-897f-e765e044acc5"\n              />\n            </button>\n          </ion-buttons>\n        </ion-col>\n      </ion-row>\n      <button\n        class="text-1x"\n        ion-button\n        icon-start\n        block\n        color="primary"\n        tappable\n        (click)="signup()"\n      >\n        Register\n      </button>\n      <div text-center margin-top>\n        <span ion-text color="secondary" tappable (click)="goback()">Back</span>\n      </div>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/shohilkishore/Desktop/Work/Johnny/serenity/src/pages/signup/signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ })

});
//# sourceMappingURL=1.js.map