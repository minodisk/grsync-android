import React, {
  Component
} from 'react'
import {
  Text,
  View,
} from 'react-native'

export default class SectionHeader extends Component {
  render() {
    const {style, textStyle, children} = this.props
    return (
      <View
        style={style}
      >
        <Text
          style={textStyle}
        >{children}</Text>
      </View>
    )
  }
}
