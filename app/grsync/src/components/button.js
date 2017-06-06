import React, {
  Component
} from 'react'
import {
  Text,
  View,
  TouchableNativeFeedback,
} from 'react-native'

export default class Button extends Component {
  render() {
    let {
      label,
      onPress,
      rippleColor,
      buttonStyle,
      labelStyle,
    } = this.props
    if (rippleColor == null) {
      rippleColor = 'rgba(0, 0, 0, 0.3)'
    }
    return (
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple(rippleColor, false)}
      >
        <View
          style={[{
            backgroundColor: 'rgb(255, 255, 255)',
            height: 36,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: 'rgba(0, 0, 0, 1)',
            elevation: 2,
          }, buttonStyle]}
        >
          <Text
            style={[{
              paddingLeft: 16,
              paddingRight: 16,
              color: 'rgba(0, 0, 0, 0.87)',
              fontSize: 14,
              fontWeight: '500',
            }, labelStyle]}
          >
            {label}
          </Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
}
