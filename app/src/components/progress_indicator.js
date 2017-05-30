import React, {
  Component
} from 'react'
import {
  View,
} from 'react-native'

export default class ProgressIndicator extends Component {
  render() {
    const {style, contentStyle, ratio} = this.props
    return (
      <View
        style={Object.assign({
          width: '100%',
          height: 3,
        }, style)}
      >
        <View
          style={Object.assign({
            width: `${(ratio * 1000 >> 0) / 10}%`,
            height: '100%',
            backgroundColor: 'rgb(0, 0, 255)',
          }, contentStyle)}
        />
      </View>
    )
  }
}
