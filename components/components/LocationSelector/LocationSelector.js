import React, { useState } from 'react'
import { Menu, MenuItem } from 'react-native-material-menu';
import LocationIcon from '../../../assets/icons/Destination'
import DownArrow from '../../../assets/icons/DownArrow'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function LocationSelector(props) {
    const [visible, setVisible] = useState(false);
    const menueHandler = () => {
        setVisible(!visible)
    }
    const updateLocation = async () => {
        setVisible(!visible)
        props.updateLocation()
    }
    return (
        <View style={styles.locationIConContainer}>
            <LocationIcon />
            <View style={styles.locationTextContainer}>
                <Text style={styles.locationLabelStyle}>Current Location</Text>
                <View style={styles.locationContainer}>
                    <Menu
                        visible={visible}
                        anchor={<TouchableOpacity onPress={menueHandler}><Text style={styles.locationStyle}>{props.location && props.location.detail ? props.location.detail.district : 'Update Location'}</Text></TouchableOpacity>}
                        onRequestClose={menueHandler}
                        style={{ marginTop: 20 }}
                    >
                        <MenuItem onPress={updateLocation}>Update Location</MenuItem>
                    </Menu>
                    <DownArrow />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    locationIConContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    locationTextContainer: {
        marginLeft: 14
    },
    locationLabelStyle: {
        color: '#818085',
        fontSize: 12,
        fontWeight: '500',
        marginBottom: 3
    },
    locationContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    locationStyle: {
        color: '#000000',
        fontSize: 14,
        marginRight: 5
    }
})
