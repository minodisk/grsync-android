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
  reloaded,
  reloadFailed,
  synced,
  syncing,
  syncFailed,
  loading,
} from '../actions'
import * as apis from '../apis'

// CameraRoll
//   .getPhotos({first: 25})
//   .then((photos) => console.log(photos))

// function* ping(action) {
//   try {
//     const dirs = yield call(ping)
//     yield put(reloaded(dirs))
//   } catch (err) {
//     yield put(reloadFailed(err)))
//   }
// }

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
  yield takeEvery(RELOAD, reload)
  yield takeEvery(SYNC, sync)
}
