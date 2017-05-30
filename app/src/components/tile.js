import React, {
  Component
} from 'react'
import {
  Image,
  View,
  Text,
} from 'react-native'

import Checkbox from './checkbox'

export default class Tile extends Component {
  render() {
    const {
      size,
      style,
      imageStyle,
      checkboxStyle,
      checkboxContentStyle,
      data,
      onSelectedChanged,
    } = this.props
    return (
      <View
        style={Object.assign({
          position: 'relative',
          width: size,
          height: size,
        }, style)}
      >
        {(data == null || data.url == null) ? null : (
          <Image
            style={Object.assign({
              width: size,
              height: size,
              resizeMode: 'cover',
              backgroundColor: '#999999',
            }, imageStyle)}
            source={{
              uri: data.url
            }}
          />
        )}
        {(data == null || data.selected == null) ? null : (
          <Checkbox
            style={Object.assign({
              position: 'absolute',
              width: size,
              height: size,
            }, checkboxStyle)}
            contentStyle={Object.assign({
              position: 'absolute',
              top: 5,
              left: 5,
            }, checkboxContentStyle)}
            color='rgb(52, 152, 219)'
            rippleColor='rgba(37, 108, 156, 0.3)'
            selected={data.selected}
            onSelectedChanged={onSelectedChanged}
          />
        )}
        {(data == null || data.label == null) ? null : (
          <View style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            // width: '100%',
            paddingTop: 2,
            paddingBottom: 2,
            paddingLeft: 5,
            paddingRight: 5,
            // backgroundColor: 'rgba(255, 255, 255, 0.5)',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          }}>
          <Text style={{
            color: 'rgb(255, 255, 255)',
            fontSize: 10,
          }}>{data.label}</Text>
          </View>
        )}
      </View>
    )
  }
}
