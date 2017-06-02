import React, {
  Component
} from 'react'
import {
  Text,
  View,
} from 'react-native'
import TouchableNativeFeedback from 'TouchableNativeFeedback'

export default class Wifi extends Component {
  render() {
    const {data, onSelected} = this.props
    return (
      <TouchableNativeFeedback
        onPress={() => onSelected(data)}
      >
        <View
          style={{
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 10,
            paddingRight: 10,
            borderBottomColor: '#999999',
            borderBottomWidth: 0.5,
          }}
        >
          <Text>{data.SSID}</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
}
