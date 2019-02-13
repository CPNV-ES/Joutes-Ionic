# Joutes Ionic

Author : Benjamin Delacombaz

Last modification : 27.11.2018 14:15

Version : 1.0.0

## Build android APK

This documentation will explain how to build the apk for android.

* Install Android SDK
* Install Java JDK
* Add Android platform
```bash
ionic cordova platform add android
```
* Build APK
```bash
ionic cordova build android --prod
```

If you have some errors, check if you have correctly added the path to the SDK and Java in your environment variables.
