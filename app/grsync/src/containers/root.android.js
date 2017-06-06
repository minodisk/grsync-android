import React, {
  Component
} from 'react'
import {
  connect,
} from 'react-redux'
import {
  Alert,
  View,
} from 'react-native'

import Wifis from './wifis'
import Photos from './photos'

class Root extends Component {
  render() {
    const {wifi, error} = this.props
    if (error != null) {
      Alert.alert(error.message)
    }
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <Photos />
      </View>
    )
        // <Wifis />
  }
}

export default connect((state) => {
  console.log('Root.connect:', state)
  return {
    wifi: state.wifi,
    error: state.error,
  }
}, (dispatch) => {
  return {
  }
})(Root)
