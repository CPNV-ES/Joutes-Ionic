# Joutes Ionic
Author : Kevin Jordil & Benjamin Delacombaz

Last modification : 13.03.2019

Version 1.0.0

## Build app

`ionic cordova build android --prod --release`

## Generate keystore file

`keytool -genkey -v -keystore joutes.keystore -alias joutes -keyalg RSA -keysize 2048 -validity 10000`

## Sign apk

`jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore joutes.keystore Joutes.apk joutes`

## Optimize APK

`path/to/android/sdk/build-tools/version/zipalign.exe -v 4 Joutes.apk FinalJoutes.apk`

## Ionic documentation

[Publishing your app](https://ionicframework.com/docs/v1/guide/publishing.html)
