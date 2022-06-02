import { View, Text, StyleSheet, TouchableOpacity, VirtualizedScrollView, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Location from 'expo-location';
// Components
import SearchInput from '../../components/components/SearchInput/SearchInput';
import LocationSelector from '../../components/components/LocationSelector/LocationSelector';
import PageContainer from '../../components/containers/PageContainer';
import BellIcon from '../../assets/icons/Bell'
import ErrorField from '../../components/components/ErrorField/ErrorField';
import { clearData } from '../../Utility/HelperFunction/LocalStorage/localStorage';
import { LOGIN_DATA_STORAGE_KEY } from '../../Utility/HelperFunction/LocalStorage/constants'
import { storeData } from '../../Utility/HelperFunction/LocalStorage/localStorage'
import { LOCATION_DATA_STORAGE_KEY } from '../../Utility/HelperFunction/LocalStorage/constants'
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/Actions/index'
// Axios
import { getAllServiceCategory } from '../../Utility/APIS/index'

function SearchService(props) {
    const [searchText, setSearchText] = useState('')
    const [global_error, set_global_error] = useState('');
    const [loader, setLoader] = useState(false)
    const [filteredSearchText, setFilteredSearchText] = useState(null)

    const onTextChangeHandler = (text) => {
        const new_Data = props.services.filter(item => item.subCategory.toLowerCase().includes(text.toLowerCase()))
        setFilteredSearchText(new_Data)
        setSearchText(text)
    }
    useEffect(() => {
        const asyncHandler = async () => {
            setLoader(true)
            const response = await getAllServiceCategory(props.access_token)
            setLoader(false)
            if (response.status == 200) {
                setFilteredSearchText(response.data)
                props.set_services(response.data)
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
        if (!props.services)
            asyncHandler()
        else
            setFilteredSearchText(props.services)
    }, [])

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
        <PageContainer  withScrollView={false} route={props.route} pageLoading={loader} navigation={props.navigation}>
            {/* Location Header */}
            <View style={styles.HeaderIconContainer}>
                <LocationSelector updateLocation={updateLocation} location={props.location} />
                <TouchableOpacity><BellIcon /></TouchableOpacity>
            </View>
            {/* Error */}
            <ErrorField error={global_error} />
            {/* Search Bar */}
            <SearchInput value={searchText} onChangeText={onTextChangeHandler} onClose={() => props.navigation.goBack()} />
            {/* Search Result */}
            {
                filteredSearchText &&
                <FlatList
                    data={filteredSearchText}
                    style={{flex: 1}}
                    nestedScrollEnabled
                    scrollEnabled={true}
                    renderItem={({ item }) => <TouchableOpacity onPress={() => props.navigation.navigate("ServiceDetail", { prevScreen: props.route.name, service: item })} style={styles.listStyle} key={item.id}><Text style={styles.listTextStyle}>{item.subCategory}</Text></TouchableOpacity>}
                />
            }
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
    listStyle: {
        borderBottomColor: '#ECECEC',
        borderBottomWidth: 1,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 5
    },
    listTextStyle: {
        color: '#646464',
        fontSize: 16,
        fontWeight: '500'
    }
})

const mapStateToProps = state => {
    return {
        location: state.userReducer.location,
        access_token: state.userReducer.access_token,
        services: state.serviceCategoryReducer.serviceCategories
    };
};
const mapDispatchToProps = dispatch => {
    return {
        set_location: (data) => dispatch(actions.update_location(data)),
        login: (access_token, refresh_token, time_added) => dispatch(actions.login(access_token, refresh_token, time_added)),
        set_state: (data) => dispatch(actions.set_state(data)),
        set_services: (data) => dispatch(actions.update_service_Category(data))
    };
};
export default connect(
    mapStateToProps, mapDispatchToProps
)(SearchService);
