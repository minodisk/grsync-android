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
