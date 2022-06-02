import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import * as Location from 'expo-location';
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/Actions/index'
import SearchIcon from '../../assets/icons/Search'
import Button2 from '../../components/components/Button/Button2';
// Components
import PageContainer from '../../components/containers/PageContainer';
import BellIcon from '../../assets/icons/Bell'
import { storeData } from '../../Utility/HelperFunction/LocalStorage/localStorage'
import { LOCATION_DATA_STORAGE_KEY } from '../../Utility/HelperFunction/LocalStorage/constants'
import SearchInput from '../../components/components/SearchInput/SearchInput';
import LocationSelector from '../../components/components/LocationSelector/LocationSelector';


const Home = (props) => {
    const updateLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        let response = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        });
        const result = {
            coords: location.coords,
            detail: response[0]
        }
        props.set_location(result)
        storeData(LOCATION_DATA_STORAGE_KEY, result)
    }
    return (
        <PageContainer route={props.route} navigation={props.navigation}>
            {/* Location Header */}
            <View style={styles.HeaderIconContainer}>
                <LocationSelector updateLocation={updateLocation} location={props.location} />
                <TouchableOpacity><BellIcon /></TouchableOpacity>
            </View>
            {/* Search Bar */}
            <Button2 onPress={() => props.navigation.navigate('SearchService')} direction="left" icon={<SearchIcon />}>House Cleaning, Health Theraphy</Button2>
        </PageContainer>
    )
}


const styles = StyleSheet.create({
    HeaderIconContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
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
    },
    padding: {
        paddingLeft: 15,
        paddingRight: 15
    },
})

const mapStateToProps = state => {
    return {
        location: state.userReducer.location
    };
};
const mapDispatchToProps = dispatch => {
    return {
        set_location: (data) => dispatch(actions.update_location(data))
    };
};
export default connect(
    mapStateToProps, mapDispatchToProps
)(Home);