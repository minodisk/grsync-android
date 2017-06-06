import React, {
  Component
} from 'react'
import {
  Text,
  View,
  ActivityIndicator,
  ListView,
  ToolbarAndroid,
  Modal,
} from 'react-native'
import {
  connect,
} from 'react-redux'

import ProgressIndicator from '../components/progress_indicator'
import Files from './files'
import Toolbar from './toolbar'
import {
  loadWifis,
  connectWifi,
} from '../actions'
import {
  Wifi,
  Password,
} from '../components'

class Wifis extends Component {
  constructor() {
    super()
    this.state = {
      visible: false,
    }
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (prev, next) => prev.SSID !== next.SSID,
    })
  }

  render() {
    const {
      wifiLoading,
      loadWifis,
      cancel,
      wifi,
      wifis,
      connectWifi,
    } = this.props
    const {
      visible,
      selectedWifi,
    } = this.state
    if (wifis.length === 0) {
      this.props.loadWifis()
    }

    wifis.sort((a, b) => {
      if (a.SSID.toLowerCase().indexOf('ricoh') === 0) {
        return -1
      }
      if (b.SSID.toLowerCase().indexOf('ricoh') === 0) {
        return 1
      }
      return b.level - a.level
    })

    const actions = [
      {
        title: 'Refresh',
        action: loadWifis,
      },
      {
        title: 'Cancel',
        cation: cancel,
      }
    ]

    return (
      <Modal
        visible={visible}
        onRequestClose={() => this.setState({visible: false})}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <ToolbarAndroid
            title="Select GR Wi-Fi"
            titleColor="#333333"
            actions={actions}
            style={{
              backgroundColor: '#FFFFFF',
              height: 48,
              shadowOffset:{
                width: 10,
                height: 10,
              },
              elevation: 2,
            }}
            onActionSelected={(pos) => actions[pos].action()}
            enableEmptySections={true}
          />
          <View
            style={{
              flex: 1,
            }}
          >
            <ListView
              dataSource={this.dataSource.cloneWithRows(wifis)}
              renderRow={(wifi, sectionID, rowID) => {
                return (
                  <Wifi
                    data={wifi}
                    onSelected={(selectedWifi) => {
                      this.setState({selectedWifi})
                    }}
                  />
                )
              }}
              enableEmptySections={true}
            />
            {
              wifiLoading ? <ActivityIndicator
                size='large'
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                }}
              /> : null
            }
          </View>
          <Password
            wifi={selectedWifi}
            onCancelled={() => {
              this.setState({selectedWifi: null})
            }}
            onInputted={(password) => {
              connectWifi(selectedWifi.SSID, password)
              this.setState({selectedWifi: null})
            }}
          />
        </View>
      </Modal>
    )
  }
}

export default connect((state) => {
  return {
    wifiLoading: state.wifiLoading,
    wifis: state.wifis,
    wifi: state.wifi,
  }
}, (dispatch) => {
  return {
    loadWifis: () => dispatch(loadWifis()),
    connectWifi: (ssid, password) => dispatch(connectWifi({ssid, password})),
  }
})(Wifis)
