import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function ErrorField(props) {
  const { style = {} } = props
  return (
    <View style={[style]}>
      <Text style={styles.error}>{props.error}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  error: {
    color: '#ce5a5a',
    fontSize: 12,
    paddingLeft: 5,
  }
})