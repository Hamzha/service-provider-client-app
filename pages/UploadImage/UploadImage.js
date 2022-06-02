import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Bin from '../../assets/icons/bin'
import UploadImageIcon from '../../assets/icons/UploadImage'
export default function UploadImage(props) {
    return (
        <View style={styles.imageContainer}>
            <View style={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}><TouchableOpacity onPress={props.onDeletePress}><Bin size={20} color="#7E7E7E" /></TouchableOpacity></View>
            {props.image.mimeType == "application/pdf" ? <UploadImageIcon width={70} height={70} /> : <Image source={{ uri: props.image.uri }} style={styles.imageStyle} />}
            <Text numberOfLines={1}>{props.image.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
        marginRight: 10
    },
    imageStyle: {
        width: 100,
        height: 100
    }
})