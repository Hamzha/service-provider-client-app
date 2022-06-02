import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import * as Location from 'expo-location';
import DateTimePicker from '@react-native-community/datetimepicker';
import DownArrow from '../../assets/icons/DownArrow'
import CheckBox from '../../components/components/CheckBox/CheckBox';
import locationImage from '../../assets/images/location.png'
import BackArrow from '../../assets/icons/BackArrow'
import LocationIcon from '../../assets/icons/Location'
// Components
import LocationSelector from '../../components/components/LocationSelector/LocationSelector';
import PageContainer from '../../components/containers/PageContainer';
import BellIcon from '../../assets/icons/Bell'
import ErrorField from '../../components/components/ErrorField/ErrorField';
import { storeData } from '../../Utility/HelperFunction/LocalStorage/localStorage'
import { LOCATION_DATA_STORAGE_KEY } from '../../Utility/HelperFunction/LocalStorage/constants'
import { VendorSearchApi } from '../../Utility/APIS/index';
import Button from '../../components/components/Button/Button';
import Button2 from '../../components/components/Button/Button2'
import { clearData } from '../../Utility/HelperFunction/LocalStorage/localStorage';
import { LOGIN_DATA_STORAGE_KEY } from '../../Utility/HelperFunction/LocalStorage/constants'
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/Actions/index'
// Axios


function SearchDetail(props) {
    const [global_error, set_global_error] = useState('');
    const [loader, setLoader] = useState(false)
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [isUrgent, setIsUrgent] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const updateLocation = async () => {
        setLoader(true)
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            set_global_error("Please Provide Access To Location")
            setLoader(false)
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        let response = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        });
        setLoader(false)
        const result = {
            coords: location.coords,
            detail: response[0]
        }
        props.set_location(result)
        storeData(LOCATION_DATA_STORAGE_KEY, result)
    }
    const shouldSearch = () => {
        if (props.location)
            return true
        return false
    }
    const searchVendor = async () => {
        setLoader(true)
        const response = await VendorSearchApi({
            urgent: isUrgent,
            service_category: props.route.params.service.id,
            lat: props.location.coords.latitude,
            lng: props.location.coords.longitude,
            date_time: date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + ' ' + ("0" + date.getHours()).slice(-2) + ':' + ("0" + date.getMinutes()).slice(-2) + ':' + ("0" + date.getSeconds()).slice(-2),
        }, props.access_token)
        setLoader(false)
        set_global_error("")
        if (response.status == 200) {
            props.navigation.navigate('VendorList', { prevScreen: props.route.name, vendors: response.data,service_category:props.route.params.service,urgent:isUrgent })
        }
        else if (response.status == 401) {
            props.set_state({ token_expired_error: response.data })
            props.login(null, null, null)
            clearData(LOGIN_DATA_STORAGE_KEY);
        }
        else {
            set_global_error(response.data)
        }
    }
    return (
        <PageContainer shouldShowBackArrow={false} withScrollView={true} route={props.route} pageLoading={loader} navigation={props.navigation}>
            {/* Location Header */}
            <View style={styles.HeaderIconContainer}>
                <LocationSelector updateLocation={updateLocation} location={props.location} />
                <TouchableOpacity><BellIcon /></TouchableOpacity>
            </View>
            {/* Error */}
            <ErrorField style={{ marginTop: 10 }} error={global_error} />
            {/* Service Selected */}
            <Button2 direction="left" textStyle={{ color: '#000000' }} icon={<TouchableOpacity onPress={() => props.navigation.goBack()}><BackArrow /></TouchableOpacity>}>{props.route.params.service.subCategory}</Button2>
            {/* Location Picker */}
            <Button2 direction="right" icon={<LocationIcon />} onPress={updateLocation}>{props.location && props.location.detail ? props.location.detail.district : 'Where do you want your service'}</Button2>
            {/* Location */}
            <View style={[styles.imageContainerStyle]}>
                <Image
                    style={{ width: '100%', borderRadius: 30 }}
                    source={locationImage}
                />
            </View>
            {/* Date and time piciker */}
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                />
            )}
            <Button2 onPress={showDatepicker} direction="right" icon={<DownArrow />} >{date ? date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() : "Select Date"}</Button2>
            <Button2 onPress={showTimepicker} direction="right" icon={<DownArrow />} >{date ? date.getHours() + " - " + date.getMinutes() : "Select Time"}</Button2>
            {/* Urgent Selector */}
            <View style={{ marginTop: 26, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <CheckBox isSelected={isUrgent} setSelected={() => setIsUrgent(!isUrgent)} />
                <Text style={{ marginLeft: 14, color: '#262B2E', fontSize: 14 }}>URGENT SERVICE</Text>
                <View style={{ marginLeft: 12, transform: [{ rotate: '-20deg' }] }}><BellIcon /></View>
            </View>
            {/* Search */}
            <Button isDisabled={!shouldSearch()} style={{ marginTop: 50 }} onPress={searchVendor}>Search</Button>
        </PageContainer>
    )
}
const styles = StyleSheet.create({
    HeaderIconContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imageContainerStyle: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
        marginTop: 18,
        borderRadius: 100
    }
})

const mapStateToProps = state => {
    return {
        location: state.userReducer.location,
        access_token: state.userReducer.access_token,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        set_location: (data) => dispatch(actions.update_location(data)),
        login: (access_token, refresh_token, time_added) => dispatch(actions.login(access_token, refresh_token, time_added)),
        set_state: (data) => dispatch(actions.set_state(data)),
    };
};
export default connect(
    mapStateToProps, mapDispatchToProps
)(SearchDetail);
