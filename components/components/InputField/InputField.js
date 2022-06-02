import { View, Text, TextInput,StyleSheet} from 'react-native'
import React from 'react'

export default function InputField(props) {
  const { value, onChangeText, placeholder, isNumeric = false, style = {}, secure = false, type = 'none', error = '',numberOfLines=1 } = props
  return (
    <View>
      {error == '' ? null : <Text style={styles.error}>{error}</Text>}
      <TextInput
        onChangeText={text => onChangeText(text)}
        value={value}
        placeholder={placeholder}
        keyboardType={isNumeric ? 'number-pad' : 'default'}
        style={[styles.inputStyle,style]}
        secureTextEntry={secure}
        type={type}
        multiline={numberOfLines==1?false:true}
        numberOfLines={numberOfLines}
      />
    </View>
  )
}

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