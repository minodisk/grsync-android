import React, {
  Component
} from 'react'
import {
  Provider,
} from 'react-redux'

import configureStore from '../configureStore'
import Root from './root.android'

const store = configureStore()

export default class Index extends Component {
  render() {
    const {error} = this.props
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    )
  }
}
