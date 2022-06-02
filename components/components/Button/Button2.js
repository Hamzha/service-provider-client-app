import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Button2(props) {
    const { style = {}, textStyle = {}, icon = null, direction = "right", onPress = null,searchContainer={} } = props
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={onPress?0.5:1}>
            <View style={[styles.mainContainer, style]}>
                <View style={[styles.searchContainer,searchContainer]}>
                    {direction == "left" ? icon : null}
                    <Text style={[styles.textStyle, textStyle]}>{props.children}</Text>
                    {direction == "right" ? icon : null}
                </View>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E4E4E4',
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 4,
        marginTop: 15,
        height: 50,
        flex: 1
    },
    textStyle: {
        flex: 1,
        marginLeft: 10,
        color: '#919191'
    },
    // cancelText: {
    //     color: '#262B2E',
    //     fontSize: 14,
    //     fontWeight: '400'
    // }
})