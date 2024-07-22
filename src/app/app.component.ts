import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { ImageLoaderConfig } from "ionic-image-loader";

@Component({
  templateUrl: "app.html",
})
export class MyApp {
  rootPage: any = "LoginPage";

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private imageLoaderConfig: ImageLoaderConfig
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.overlaysWebView(false);
      this.imageLoaderConfig.enableSpinner(true);
      this.imageLoaderConfig.setFileNameCachedWithExtension(true);
      //statusBar.hide();
      // splashScreen.hide();
    });
  }
}
