import React, {
  Component
} from 'react'
import {
  View,
  ActivityIndicator,
} from 'react-native'
import {
  connect,
} from 'react-redux'
import Alert from 'Alert'

import ProgressIndicator from '../components/progress_indicator'
import Files from './files'
import Toolbar from './toolbar'

class Root extends Component {
  render() {
    const {loading, syncing, error} = this.props
    if (error != null) {
      Alert.alert(error.message)
    }
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <Toolbar />
        <View
          style={{
            flex: 1,
          }}
        >
          <Files />
          {
            syncing.progress != null ? <ProgressIndicator
              ratio={syncing.progress}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            /> : null
          }
          {
            loading ? <ActivityIndicator
              size='large'
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                // backgroundColor: 'rgba(0, 0, 0, 0.2)',
              }}
            /> : null
          }
        </View>
      </View>
    )
  }
}

export default connect((state) => {
  console.log('Root.connect:', state)
  return {
    loading: state.loading,
    syncing: state.syncing,
    error: state.error,
  }
}, (dispatch) => {
  return {
  }
})(Root)
