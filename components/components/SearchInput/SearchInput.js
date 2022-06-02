import React from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import SearchIcon from '../../../assets/icons/Search'

export default function SearchInput(props) {
    const { editable = true, value = '', onChangeText = null, onClose = null, style = {}, textStyle = {} } = props
    return (
        <View style={[styles.mainContainer, style]}>
            <View style={styles.searchContainer}>
                <SearchIcon />
                <TextInput
                    editable={editable}
                    value={value}
                    onChangeText={onChangeText}
                    style={[styles.textStyle, textStyle]}
                    placeholder="House Cleaning, Health Therapy"
                />
            </View>
            {onClose ? <TouchableOpacity style={{ marginLeft: 7, marginTop: 10 }} onPress={onClose}>
                <Text style={styles.cancelText}>CANCEL</Text>
            </TouchableOpacity> : null}
        </View>
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
        paddingLeft: 16,
        borderRadius: 4,
        marginTop: 15,
        flex: 1
    },
    textStyle: {
        height: 50,
        flex: 1,
        marginLeft: 10
    },
    cancelText: {
        color: '#262B2E',
        fontSize: 14,
        fontWeight: '400'
    }
})
