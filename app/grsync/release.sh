#!/bin/bash

set -e

echo $ANDROID_LICENSE > $ANDROID_HOME/licenses/android-sdk-license
cd android
./gradlew assembleRelease
cd -
react-native run-android --variant=release
