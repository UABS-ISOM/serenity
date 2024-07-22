# Serenity
Real-time chat integrated with toxicity filters

## How to run the project?

### Prerequisite
* Install NodeJs and NPM

   For Windows, https://treehouse.github.io/installation-guides/windows/node-windows.html

   For Linux, https://linuxize.com/post/how-to-install-node-js-on-ubuntu-18.04/

* Install Cordova

   For Windows, https://evothings.com/doc/build/cordova-install-windows.html
   
   For Linux, sudo npm install -g cordova

* Install Ionic

   npm install -g ionic (Linux may ask for permission, in this case, use: sudo npm install -g ionic)
   
* Possible Problems

   "[ERROR] ionic-app-scripts has unexpectedly closed (exit code 1)": 
   
   If you encountered this bug, please delete the node_modules folder and then run 'npm install'

### Build Serenity
* Clone this project to your local repository
* Go into the project folder, type: ionic serve
* Follow the instructions in the CMD window and install all the dependencies 

### Test Serenity
* Once the build is completed, the Serenity application will run at https://localhost:8100, and it will pop up in your browser automatically
* For the first time, it will show some errors. To fix this, open any file under src folder in any editor, click save. Then the project
will rebuild and work properly.
* There are two ways to test Serenity in mobile

   In your browser, press f12, then your browser will go into mobile mode automatically
   
   Download Ionic DevApp in your mobile device, and follow https://ionicframework.com/docs/appflow/devapp/ to try Serenity on your device

## Features Covered
* Login and Signup
* Change name and tolerance level
* Add friend
* Chat
* Show the tolerance score of each message
* Filter out any toxic messages based on tolerance level
<<<<<<< HEAD
=======

## Test Script
* A test script between two people is created
* To check the script, either login as youngman@test.com test123 or youngwoman@test.com test123
>>>>>>> e49980ef8b576d2cba9d84d77c87593e36581c09
