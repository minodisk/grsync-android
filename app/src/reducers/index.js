import {
  combineReducers
} from 'redux'

import {
  LOADING,
  RELOADED,
  RELOAD_FAILED,
  SYNCED,
  SYNCING,
  SYNC_FAILED,
  SELECTED_CHANGED,
  SELECT_ALL,
  UNSELECT_ALL,
} from '../actions'

function loading(loading = false, action) {
  switch (action.type) {
  case LOADING:
    return action.payload
  }
  return loading
}

function syncing(syncing = {}, action) {
  switch (action.type) {
  case SYNCING:
    return action.payload
  case SYNCED:
    return {}
  }
  return syncing
}

function error(error = null, action) {
  switch (action.type) {
  case RELOAD_FAILED:
  case SYNC_FAILED:
    return error
  }
  return error
}

function files(files = [], action) {
  switch (action.type) {
  case RELOADED:
    return Array.prototype.concat.apply([], action.payload.map((dir) => dir.files))
  case SELECTED_CHANGED:
    const {file, selected} = action.payload
    const id = file.id
    return files.map((f) => {
      if (f.id !== id) {
        return f
      }
      f = f.clone()
      f.selected = selected
      return f
    })
  case SELECT_ALL:
    return files.map((file) => {
      file = file.clone()
      file.selected = true
      return file
    })
    return files
  case UNSELECT_ALL:
    return files.map((file) => {
      file = file.clone()
      file.selected = false
      return file
    })
    return files
  }
  return files
}

export default combineReducers({
  loading,
  syncing,
  error,
  files,
})
