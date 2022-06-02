import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Dimensions,
  ActivityIndicator,
  Text
} from 'react-native';


const Loader = (props) => {
  return (
    <Modal
      visible={props.loading}
      transparent={true}
    >
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        {props.text?<Text>{props.text}</Text>:null}
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CCCCCC',
    height: Dimensions.get('window').height,
    padding: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
    width: '100%',
    paddingTop: 50,
    opacity: 0.4
  }
});
export default Loader;