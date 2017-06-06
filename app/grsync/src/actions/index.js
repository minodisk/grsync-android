import { createAction } from 'redux-actions'

export const LOADING = 'LOADING'
export const PING = 'PING'
export const RELOAD = 'RELOAD'
export const RELOAD_FAILED = 'RELOAD_FAILED'
export const RELOADED = 'RELOADED'
export const SELECT_ALL = 'SELECT_ALL'
export const UNSELECT_ALL = 'UNSELECT_ALL'
export const SYNC = 'SYNC'
export const SYNCED = 'SYNCED'
export const SYNC_FAILED = 'SYNC_FAILED'
export const SELECTED_CHANGED = 'SELECTED_CHANGED'
export const SYNCING = 'SYNCING'

export const WIFI_CONNECT = 'WIFI_CONNECT'
export const WIFI_CONNECTED = 'WIFI_CONNECTED'
export const WIFI_CANTBE_CONNECTED = 'WIFI_CANTBE_CONNECTED'

export const WIFIS_LOAD = 'WIFIS_LOAD'
export const WIFIS_LOADING = 'WIFIS_LOADING'
export const WIFIS_LOADED = 'WIFIS_LOADED'
export const WIFIS_CANTBE_LOADED = 'WIFIS_CANTBE_LOADED'

export const loading = createAction(LOADING, (loading) => loading)
export const ping = createAction(PING)
export const reload = createAction(RELOAD)
export const reloaded = createAction(RELOADED)
export const reloadFailed = createAction(RELOAD_FAILED, (err) => err)
export const selectAll = createAction(SELECT_ALL)
export const unselectAll = createAction(UNSELECT_ALL)
export const sync = createAction(SYNC, (files) => {
  return files
})
export const syncing = createAction(SYNCING, (ratio) => ratio)
export const synced =  createAction(SYNCED)
export const syncFailed =  createAction(SYNC_FAILED, (err) => err)
export const selectedChanged = createAction(SELECTED_CHANGED, (file, selected) => {
  return {file, selected}
})

export const connectWifi = createAction(WIFI_CONNECT, (wifi, password) => wifi)
export const connectedWifi = createAction(WIFI_CONNECTED)
export const cantBeConnectedWifi = createAction(WIFI_CANTBE_CONNECTED)

export const loadWifis = createAction(WIFIS_LOAD)
export const loadingWifis = createAction(WIFIS_LOADING)
export const loadedWifis = createAction(WIFIS_LOADED, (wifis) => wifis)
export const cantBeLoadedWifis = createAction(WIFIS_CANTBE_LOADED)
