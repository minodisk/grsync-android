import {
  applyMiddleware,
  createStore,
} from 'redux'
import createSaga from 'redux-saga'
import {
  createLogger,
} from 'redux-logger'

import reducers from './reducers'
import sagas from './sagas'

export default function configureStore(initialState) {
  const saga = createSaga()
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(
      saga,
      // createLogger(),
    ),
  )
  saga.run(sagas)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
