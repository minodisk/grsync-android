import {
  CameraRoll,
} from 'react-native'
import {
  eventChannel,
  END,
} from 'redux-saga'
import {
  call,
  put,
  take,
  takeEvery,
  takeLatest,
  cancelled,
} from 'redux-saga/effects'

import {
  PING,
  RELOAD,
  SYNC,

  WIFIS_LOAD,
  loadingWifis,
  loadedWifis,
  cantBeLoadedWifis,

  WIFI_CONNECT,
  connectedWifi,
  cantBeConnectedWifi,

  reloaded,
  reloadFailed,
  synced,
  syncing,
  syncFailed,
  loading,
} from '../actions'
import * as apis from '../apis'

function* loadWifis(action) {
  yield put(loadingWifis(true))
  try {
    const payload = yield call(apis.loadWifis)
    yield put(loadedWifis(payload))
  } catch (err) {
    yield put(cantBeLoadedWifis(err))
  }
  yield put(loadingWifis(false))
}

function* connectWifi(action) {
  const {ssid, password} = action.payload
  try {
    const prevWifi = yield call(apis.currentWifi)
    console.log('sagas connectWifi prev:', wifi)
    yield call(apis.connectWifi, ssid, password)
    const wifi = yield call(apis.currentWifi)
    console.log('sagas connectWifi current:', wifi)
    yield put(connectedWifi(wifi))
  } catch (err) {
    yield put(cantBeConnectedWifi(err))
  }
}

function* reload(action) {
  yield put(loading(true))
  try {
    const payload = yield call(apis.dirs)
    yield put(reloaded(payload))
  } catch (err) {
    yield put(reloadFailed(err))
  }
  yield put(loading(false))
}

function* sync(action) {
  const photos = action.payload
  if (photos.length === 0) {
    return
  }

  try {
    // const chan = yield call(apis.sync, photos)
    const chan = yield call(createEventChannel(apis.sync), photos)
    while (true) {
      const progress = yield take(chan)
      yield put(syncing(progress))
    }
  } catch (err) {
    yield put(syncFailed(err))
  } finally {
    if (yield cancelled()) {
      chan.close()
    }
    yield put(synced())
  }
}

function createEventChannel(fn) {
  return (...args) => {
    return eventChannel((emit) => {
      const ret = fn(...args, emit)
      let {promise, cancel} = ret
      if (promise == null && cancel == null) {
        promise = ret
        cancel = () => {}
      }
      promise.then(() => emit(END))
      return cancel
    })
  }
}

export default function *sagas() {
  yield takeEvery(WIFIS_LOAD, loadWifis)
  yield takeEvery(WIFI_CONNECT, connectWifi)
  yield takeEvery(RELOAD, reload)
  yield takeEvery(SYNC, sync)
}
