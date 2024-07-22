import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { HttpClientModule } from "@angular/common/http";

import { config } from "./app.firebaseconfig";

import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireModule } from "angularfire2";

import { MyApp } from "./app.component";
import { AuthProvider } from "../providers/auth/auth";
import { UserProvider } from "../providers/user/user";
import { RequestsProvider } from "../providers/requests/requests";
import { ChatProvider } from "../providers/chat/chat";
import { IonicImageLoader } from "ionic-image-loader";

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, { tabsPlacement: "top", preloadModules: true }),
    AngularFireModule.initializeApp(config),
    HttpClientModule,
    IonicImageLoader.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    AngularFireAuth,
    UserProvider,
    RequestsProvider,
    ChatProvider,
    ChatProvider,
  ],
})
export class AppModule {}
