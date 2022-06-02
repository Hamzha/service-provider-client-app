import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-paper'
import React from 'react'

export default function MyButton(props) {
  const {
    onPress,
    style = {},
    isDisabled = false,
    textStyle = {},
    variant = "contained"
  } = props
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.buttonStyle,
        variant == "outline" ? styles.outlineButtonStyle : null,
        isDisabled && variant == "contained" ? styles.buttonDisabledStyle : isDisabled && variant == "outline" ? styles.outlineButtonDisableStyle : {},
        style]}
      disabled={isDisabled}
      activeOpacity={isDisabled ? 1 : 0.8}
    >
      <Text style={[
        styles.textStyle,
        variant == "outline" ? styles.outlineTextStyle : null,
        isDisabled && variant == "outline" ? styles.outlineTextDisableStyle : null,
        textStyle]}
      >
        {props.children}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#469CD3',
    marginBottom: 10,
    marginTop: 10
  },
  textStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    paddingTop: 14,
    paddingBottom: 14,
  },
  buttonDisabledStyle: {
    backgroundColor: 'grey'
  },
  outlineButtonStyle: {
    backgroundColor: 'transparent',
    borderColor: '#469CD3',
    borderWidth: 1
  },
  outlineTextStyle: {
    color: '#469CD3'
  },
  outlineButtonDisableStyle: {
    borderColor: 'grey'
  },
  outlineTextDisableStyle: {
    color: 'grey'
  }
})