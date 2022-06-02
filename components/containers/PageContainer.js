import React, { useEffect } from 'react'
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Text } from 'react-native'
// Importing Icons
import Loader from '../components/Loader/Loader'
import BackArrow from '../../assets/icons/BackArrow'


export const Wrapper = (props) => {
    return (
        <SafeAreaView style={[styles.saveArea, props.has_padding ? styles.padding : {}, { flex: 1 }]}>
            {
                props.withScrollView ?
                    <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps='handled'>
                        <View style={{ flex: 1 }}>
                            {props.children}
                        </View>
                    </ScrollView> :
                    props.children
            }
        </SafeAreaView>
    )
}
export default function PageContainer(props) {
    const {loader_text="", has_padding = true, pageLoading = false, route, navigation, title = '', withScrollView = true, shouldShowBackArrow = true, sideComponent = null } = props;
    return (
        <Wrapper has_padding={has_padding} withScrollView={withScrollView}>
            <Loader text={loader_text} loading={pageLoading} />
            <View style={styles.mainContainer}>
                <View style={[{ display: 'flex', flexDirection: 'row', alignItems: 'center' }, has_padding?null:styles.padding]}>
                    {shouldShowBackArrow && route.params && route.params.prevScreen ? <TouchableOpacity onPress={() => navigation.goBack()}><BackArrow /></TouchableOpacity> : null}
                    {title == '' ? null : <Text style={styles.titleStyle}>{title}</Text>}
                    {sideComponent}
                </View>
                <View style={{ flex: 1 }}>
                    {props.children}
                </View>
            </View>
        </Wrapper>
    )
}


const styles = StyleSheet.create({
    saveArea: {
        flex: 1,
        flexGrow: 1,
        height: '100%'
    },
    mainContainer: {
        marginTop: 50,
        flex: 1,
        flexGrow: 1,
        height: '100%'
    },
    padding: {
        paddingLeft: 15,
        paddingRight: 15
    },
    titleStyle: {
        fontSize: 16,
        color: '#000000',
        marginLeft: 30
    },
    title: {

    }
})