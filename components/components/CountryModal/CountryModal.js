import React, { useState } from 'react'
import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal'
import { View, Text, StyleSheet } from 'react-native'

export default function CountryModal({ countryCode, setCountryCode, country, setCountry }) {
  //   const [countryCode, setCountryCode] = useState('FR')
  //   const [country, setCountry] = useState(null)
  //   const [withCountryNameButton, setWithCountryNameButton] = useState(false)
  //   const [withFlag, setWithFlag] = useState(true)
  //   const [withEmoji, setWithEmoji] = useState(true)
  //   const [withFilter, setWithFilter] = useState(true)
  //   const [withAlphaFilter, setWithAlphaFilter] = useState(false)
  //   const [withCallingCode, setWithCallingCode] = useState(false)
  //   const onSelect = (country) => {
  //     setCountryCode(country.cca2)
  //     setCountry(country)
  //   }
  const onSelect = (country) => {
    setCountryCode(country.cca2)
    setCountry(country.name)
  }
  return (
    <View style={styles.container}>
      <CountryPicker
        withFilter={true}
        withFlag={true}
        // withCountryNameButton={true}
        // withEmoji={true}
        countryCode={countryCode}
        onSelect={onSelect}

        containerButtonStyle={{
        }}
        textInputStyle={{
          color:'#919191'
        }}
      />
      <Text style={styles.inputStyle}>{country}</Text>
    </View>
  )
}

const styles=StyleSheet.create({
  container:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    borderBottomWidth:1,
    borderBottomColor:'#CBCBCB', 
    paddingTop:1,
    paddingBottom:4,
    marginBottom:10
  },
  inputStyle:{
    fontSize:14,
    color:'#919191'
  }
})
