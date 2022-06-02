import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/Actions/index'
// Importing components
import PageContainer from '../../components/containers/PageContainer';
import Modal from '../../components/components/Modal/Modal';
import InputField from '../../components/components/InputField/InputField';
import CountryModal from '../../components/components/CountryModal/CountryModal';
import Button from '../../components/components/Button/Button';
// Importin utilities
import { signup_profile_validation } from '../../Utility/HelperFunction/validation';
import ErrorField from '../../components/components/ErrorField/ErrorField';
import { generateOtp } from '../../Utility/APIS';
const SignupProfile = (props) => {
    const [show, setShow] = useState(false);
    const [loader, setLoader] = useState(false);
    const [form_errors, set_form_error] = useState({});
    const [global_error, set_global_error] = useState('');

    const [first_name, setFirstName] = useState(props.registeration_data.first_name);
    const [last_name, setLastName] = useState(props.registeration_data.last_name);
    const [home_address, setHomeAddress] = useState(props.registeration_data.home_address);
    const [street_address, setStreetAddress] = useState(props.registeration_data.street_address);
    const [countryCode, setCountryCode] = useState(props.registeration_data.countryCode);
    const [country, setCountry] = useState(props.registeration_data.country);
    const [state, setState] = useState(props.registeration_data.state);
    const [city, setCity] = useState(props.registeration_data.city);
    const [zip_code, setZipCode] = useState(props.registeration_data.zip_code)

    const profile_submit = async () => {
        const validation_response = signup_profile_validation({ first_name, last_name, home_address, street_address, state, city, zip_code })
        if (validation_response.has_error) {
            set_form_error(validation_response);
            set_global_error('');
            return
        }

        set_form_error({});
        set_global_error('');

        // Generating Otp
        setLoader(true)
        const response = await generateOtp({ email: props.registeration_data.email })
        setLoader(false)
        if (response.status == 200) {
            props.register_user({ first_name, last_name, home_address, street_address, state, city, country, countryCode, zip_code })
            props.navigation.navigate('SignupOtp', { prevScreen: props.route.name })
        }
        else {
            set_global_error(response.data);
        }
    }
    return (
        <PageContainer pageLoading={loader} route={props.route} navigation={props.navigation}>
            <Modal show={show} close={setShow}></Modal>

            <View style={{ paddingTop: 60 }}>
                <Text style={styles.headingStyle}>Setup Profile</Text>
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
                    value={zip_code}
                    error={form_errors.zip_code ? form_errors.zip_code : ''}
                />
                <Button onPress={profile_submit}>Submit</Button>
            </View>
        </PageContainer>
    )
}


const styles = StyleSheet.create({
    headingStyle: {
        fontSize: 20,
        color: '#646464',
        fontWeight: 'bold'
    },
})



const mapStateToProps = state => {
    return {
        registeration_data: state.userReducer.registeration_data
    };
};
const mapDispatchToProps = dispatch => {
    return {
        register_user: (data) => dispatch(actions.register_user(data))
    };
};
export default connect(
    mapStateToProps, mapDispatchToProps
)(SignupProfile);
