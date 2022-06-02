import { View, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import DownArrow from '../../../assets/icons/DownArrow'

export default function CheckBox(props) {
    const { style = {} } = props
    return (
        <TouchableOpacity onPress={props.setSelected} style={style}>
            <View style={[styles.checkBoxStyle, props.isSelected ? styles.checkBoxFill : null]}>
                {props.isSelected ? <DownArrow fill="#ffff" /> : null}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    checkBoxStyle: {
        width: 20,
        height: 20,
        borderColor: '#919191',
        borderWidth: 1,
        borderRadius: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkBoxFill: {
        backgroundColor: '#4396CC',
        borderWidth: 0
    }
})

