import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Modal,
    Dimensions,
    TouchableOpacity,
    Text
} from 'react-native';
import CrossIcon from '../../../assets/icons/Cross.js';



const Model = (props) => {
    return (
        <Modal
            visible={props.show}
            transparent={true}
        >
            <TouchableOpacity activeOpacity={1} onPress={() => props.close(false)} style={styles.container}></TouchableOpacity>
            <View style={styles.mainContainer}>
                <TouchableOpacity onPress={() => props.close(false)} style={styles.iconContainer}>
                    <CrossIcon fill="#FFFFFF" />
                </TouchableOpacity>
                <View style={{ height: '90%' }}>
                    {props.children}

                </View>
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
        padding: 50,
        opacity: 0.3
    },
    mainContainer: {
        backgroundColor: "#FFFFFF",
        width: '80%',
        height: '80%',
        position: 'absolute',
        top: 0,
        marginTop: 75,
        alignSelf: 'center',
    },
    iconContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginTop: 10,
        marginRight: 10,
        paddingBottom: 20
    }
});
export default Model;