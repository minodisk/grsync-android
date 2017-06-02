import React, {
  Component
} from 'react'
import {
  View,
  TouchableNativeFeedback,
} from 'react-native'

export default class Checkbox extends Component {
  render() {
    const {style, contentStyle, color, rippleColor, selected} = this.props
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(rippleColor, false)}
        onPress={() => this.onPress()}
      >
        <View
          style={style}
        >
          <View
            style={Object.assign({
              width: 20,
              height: 20,
              borderRadius: 9999,
              borderWidth: 2,
              borderColor: selected ? color : 'rgb(100, 100, 100)',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            }, contentStyle)}
          >
            <View
              style={{
                top: 2,
                left: 2,
                width: 12,
                height: 12,
                borderRadius: 9999,
                backgroundColor: selected ? color : null,
              }}
            />
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  }

  onPress() {
    const {selected} = this.props
    if (this.props.onSelectedChanged != null) {
      this.props.onSelectedChanged(!selected)
    }
  }
}
