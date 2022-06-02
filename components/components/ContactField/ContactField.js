import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";

const ContactField = (props) => {
  const { value, setValue, formattedValue, setFormattedValue, error = '' } = props;
  return (
    <>
      {/* <StatusBar barStyle="dark-content" /> */}
      <View>
        {error == '' ? null : <Text style={styles.error}>{error}</Text>}
        <SafeAreaView>
          <PhoneInput
            defaultValue={value}
            defaultCode="DM"
            layout="first"
            onChangeText={(text) => {setValue(text);}}
            onChangeFormattedText={(text) => {setFormattedValue(text);}}

            containerStyle={{
              backgroundColor:'transparent',
              width:'auto',
              height:'auto',
              justifyContent:'flex-start',
              padding:0,
              paddingRight:0,
              paddingLeft:0,
              paddingBottom:0,
              borderBottomColor:'#CBCBCB',
              borderBottomWidth:1
            }}


            flagButtonStyle={{
              margin:0,
              width:'auto',
              backgroundColor:'transparent',
              padding:0,
              paddingTop:10,
              paddingRight:0,
              paddingLeft:0,
              paddingBottom:0,
            }}
            countryPickerButtonStyle={{
              margin:0,
              width:'auto',
              backgroundColor:'transparent',
              padding:0,
              paddingRight:0,
              paddingLeft:0,
              paddingBottom:0,
            }}


            textContainerStyle={{
              width:'auto',
              height:'auto',
              backgroundColor:'transparent',
              justifyContent:'flex-end',
              padding:0,
              paddingLeft:0,
              paddingRight:0,
              paddingLeft:0,
              paddingBottom:5
            }}
            // textInputProps={{padding:0, margin:0, width:'auto', height:'auto', backgroundColor:'green'}}
            codeTextStyle={{
              margin:0,
              width:'auto',
              left:0,
              height:'auto',
              right:0,
              padding:0,
              paddingRight:0,
              paddingLeft:0
            }}
            
            disableArrowIcon={true}
            // renderDropdownImage={()=><View style={{display:'none',padding:0,margin:0,width:0,paddingRight:0,paddingLeft:0}}></View>}
          />
        </SafeAreaView>
      </View>
    </>
  );
};
const styles=StyleSheet.create({
  inputStyle:{
    borderBottomWidth:1,
    borderBottomColor:'#CBCBCB',
    marginBottom:10,
    paddingTop:1,
    paddingBottom:2,
    paddingLeft:5,
    fontSize:14,
    color:'#919191'
  },
  error:{
    color:'#ce5a5a',
    fontSize:12,
    paddingLeft:5,
  }
})
export default ContactField