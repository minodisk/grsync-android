import React, {
  Component
} from 'react'
import {
  Text,
  View,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native'

import Button from './button'

export default class Password extends Component {
  render() {
    const {
      wifi,
      onCancelled,
      onInputted,
    } = this.props
    const visible = wifi != null
    return (
      <Modal
        animationType='fade'
        transparent={true}
        visible={visible}
        onRequestClose={onCancelled}
      >
        {!visible ? null : (
          <TouchableWithoutFeedback
            onPress={onCancelled}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  backgroundColor: 'rgb(255, 255, 255)',
                  width: '80%',
                  padding: 20,
                }}
              >
                <Text
                  style={{
                    color: 'rgb(33, 33, 33)',
                    fontSize: 18,
                  }}
                >
                  {wifi.SSID}
                </Text>
                <View
                  style={{
                    marginTop: 20,
                  }}
                >
                  <Text
                    style={{
                      color: 'rgb(99, 99, 99)',
                      fontSize: 12,
                    }}
                  >Password</Text>
                  <TextInput
                    style={{
                    }}
                    autoFocus={true}
                    keyboardType='numbers-and-punctuation'
                    multiline={false}
                    returnKeyType='done'
                    secureTextEntry={true}
                    onChangeText={(value) => this.setState({value})}
                    onEndEditing={onInputted}
                  />
                </View>
                <View
                  style={{
                    marginTop: 20,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Button
                    label='Cancel'
                    onPress={onCancelled}
                  />
                  <Button
                    label='Connect'
                    onPress={() => onInputted(this.state.value)}
                    buttonStyle={{
                      marginLeft: 5,
                    }}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      </Modal>
    )
  }
}
