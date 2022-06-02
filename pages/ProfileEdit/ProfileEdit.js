import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import InputField from '../../components/components/InputField/InputField';
import CountryModal from '../../components/components/CountryModal/CountryModal';
import Button from '../../components/components/Button/Button';
import ErrorField from '../../components/components/ErrorField/ErrorField';
import { getAllCountries } from 'react-native-country-picker-modal'
import { clearData } from '../../Utility/HelperFunction/LocalStorage/localStorage';
import { LOGIN_DATA_STORAGE_KEY } from '../../Utility/HelperFunction/LocalStorage/constants'
// Redux
import { connect } from 'react-redux';
import PageContainer from '../../components/containers/PageContainer';
import * as actions from '../../store/Actions/index'
import { useFocusEffect } from '@react-navigation/native';
import { updateUser } from '../../Utility/APIS/index'
import { update_profile_validation } from '../../Utility/HelperFunction/validation'

const Profile = (props) => {
    const [loader, setLoader] = useState(false)
    const [form_errors, set_form_error] = useState({});
    const [global_error, set_global_error] = useState('');

    const [first_name, setFirstName] = useState(props.user_data.first_name);
    const [last_name, setLastName] = useState(props.user_data.last_name);
    const [home_address, setHomeAddress] = useState(props.user_data.home_address);
    const [street_address, setStreetAddress] = useState(props.user_data.street_address);
    const [countryCode, setCountryCode] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState(props.user_data.state);
    const [city, setCity] = useState(props.user_data.city);
    const [zipcode, setZipCode] = useState(props.user_data.zipcode)

    useEffect(() => {
        const asyncHandler = async () => {
            const all_countries = await getAllCountries()
            const filtered_data = all_countries.filter((country) => country.name == props.user_data.country)
            if (filtered_data.length > 0) {
                setCountryCode(filtered_data[0].cca2)
                setCountry(filtered_data[0].name)
            }
        }
        asyncHandler()
    }, [])

    const is_data_changed = () => {
        if (
            props.user_data.first_name == first_name &&
            props.user_data.last_name == last_name &&
            props.user_data.home_address == home_address &&
            props.user_data.street_address == street_address &&
            props.user_data.state == state &&
            props.user_data.city == city &&
            props.user_data.zipcode == zipcode
        )
            return false
        return true
    }
    const profile_update = async () => {
        const validation_response = update_profile_validation({ first_name, last_name, home_address, street_address, state, city, zipcode })
        if (validation_response.has_error) {
            set_form_error(validation_response);
            set_global_error('');
            return
        }

        set_form_error({});
        set_global_error('');

        setLoader(true)
        const reseponse = await updateUser({ first_name, last_name, home_address, street_address, state, city, zipcode }, props.access_token)
        setLoader(false)
        if (reseponse.status == 200) {
            props.set_user_data(reseponse.data)
        }
        else if (reseponse.status == 401) {
            props.set_state({ token_expired_error: reseponse.data })
            props.login(null, null, null)
            clearData(LOGIN_DATA_STORAGE_KEY);
        }
        else {
            set_global_error(reseponse.data)
        }

    }
    return (
        <PageContainer pageLoading={loader} title="Edit Profile" route={props.route} navigation={props.navigation}>
            <View style={{ paddingTop: 60 }}>
                <ErrorField error={global_error} />
                <InputField
                    placeholder='First Name'
                    onChangeText={setFirstName}
                    value={first_name}
                    error={form_errors.first_name ? form_errors.first_name : ''}
                />
                <InputField
                    placeholder='Last Name'
                    onChangeText={setLastName}
                    value={last_name}
                    error={form_errors.last_name ? form_errors.last_name : ''}
                />
                <InputField
                    placeholder='Home Address'
                    onChangeText={setHomeAddress}
                    value={home_address}
                    error={form_errors.home_address ? form_errors.home_address : ''}
                />
                <InputField
                    placeholder='Street Address'
                    onChangeText={setStreetAddress}
                    value={street_address}
                    error={form_errors.street_address ? form_errors.street_address : ''}
                />
                <CountryModal countryCode={countryCode} setCountryCode={setCountryCode} country={country} setCountry={setCountry} />
                <InputField
                    placeholder='State'
                    onChangeText={setState}
                    value={state}
                    error={form_errors.state ? form_errors.state : ''}
                />
                <InputField
                    placeholder='City'
                    onChangeText={setCity}
                    value={city}
                    error={form_errors.city ? form_errors.city : ''}
                />
                <InputField
                    placeholder='Zipcode'
                    onChangeText={setZipCode}
                    isNumeric={true}
                    value={zipcode}
                    error={form_errors.zipcode ? form_errors.zipcode : ''}
                />
                <Button isDisabled={!is_data_changed()} onPress={profile_update}>Submit</Button>
            </View>
        </PageContainer>
    )
}



const styles = StyleSheet.create({

})
const mapStateToProps = state => {
    return {
        user_data: state.userReducer.user_data,
        access_token: state.userReducer.access_token
    };
};
const mapDispatchToProps = dispatch => {
    return {
        login: (access_token, refresh_token, time_added) => dispatch(actions.login(access_token, refresh_token, time_added)),
        set_user_data: (user_data) => dispatch(actions.user_data(user_data)),
        set_state: (data) => dispatch(actions.set_state(data))
    };
};
export default connect(
    mapStateToProps, mapDispatchToProps
)(Profile);