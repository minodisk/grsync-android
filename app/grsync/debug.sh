#!/bin/bash

set -e

echo $ANDROID_LICENSE > $ANDROID_HOME/licenses/android-sdk-license
react-native start > /dev/null 2>&1 &
adb reverse tcp:8081 tcp:8081
adb uninstall grsync.com
react-native run-android
tail -f /dev/null
