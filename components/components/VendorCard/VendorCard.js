import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import ProfileImage from '../../../assets/images/profile.png'
import Button from '../Button/Button'
import Ratings from '../Ratings/Ratings'

export default function VendorCard(props) {
    return (
        <View style={styles.containerStyle}>
            <View style={[styles.containerFlex, { alignItems: 'center' }]}>
                <View>
                    <Image
                        style={{ borderRadius: 30 }}
                        source={ProfileImage}
                    />
                </View>
                <View style={{ paddingLeft: 10, flex: 1 }}>
                    <Text style={styles.title}>{props.detail.vendor.first_name} {props.detail.vendor.last_name}</Text>
                    <View style={[styles.containerFlex, { marginBottom: 2, flexWrap: 'wrap' }]}>
                        <Ratings style={{ marginRight: 10 }} rating={1} />
                        <Text><Text style={styles.heading}>Response Rate: </Text> <Text style={styles.heading1}>Not Available</Text></Text>
                    </View>
                    <View style={[styles.containerFlex, { marginBottom: 2, flexWrap: 'wrap' }]}>
                        <Text style={{ marginRight: 10 }}><Text style={styles.heading}>Distance:</Text><Text style={styles.heading1}>1 km</Text></Text>
                        <Text><Text style={styles.heading}>Completed Task: </Text><Text style={styles.heading1}>Not Available</Text></Text>
                    </View>
                    <View style={[styles.containerFlex, { marginBottom: 2, flexWrap: 'wrap' }]}>
                        <Text style={{ marginRight: 10 }}><Text style={styles.heading}>Address:</Text> <Text style={styles.heading1}>Not Available</Text></Text>
                        <Text><Text style={styles.heading}>Reviews: </Text><Text style={styles.heading1}>{props.detail.vendor.no_of_reviews}</Text></Text>
                    </View>
                </View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <Button style={{ flex: 1, marginRight: 14, borderRadius: 5 }} variant="outline" onPress={props.onViewProfilePress}>View Profile</Button>
                <Button style={{ flex: 1, borderRadius: 5 }} onPress={props.onChatNowPress}>Chat Now</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        padding: 10,
        marginTop: 19,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.001,
        shadowRadius: 1.41,
        elevation: 1,
        borderBottomColor:'#000'
    },
    containerFlex: {
        display: 'flex',
        flexDirection: 'row',
    },
    title: {
        color: '#312C2C',
        textTransform: 'capitalize',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 11
    },
    heading: {
        color: '#6A6A6A',
        fontWeight: '500',
        fontSize: 14
    },
    heading1: {
        color: '#6A6A6A',
        fontSize: 13
    }
})