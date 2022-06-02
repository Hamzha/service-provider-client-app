import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/Actions/index'
// Importing components
import PageContainer from '../../components/containers/PageContainer';
import Modal from '../../components/components/Modal/Modal';
import InputField from '../../components/components/InputField/InputField';
import ContactField from '../../components/components/ContactField/ContactField';
// Importin utilities
import { storeData } from '../../Utility/HelperFunction/LocalStorage/localStorage';
import { LOGIN_DATA_STORAGE_KEY } from '../../Utility/HelperFunction/LocalStorage/constants';
import { signup_validation } from '../../Utility/HelperFunction/validation';
import { isValidNumber } from "react-native-phone-number-input";
import { registerUser, login, validateOtp } from '../../Utility/APIS';
import Button from '../../components/components/Button/Button';
import ErrorField from '../../components/components/ErrorField/ErrorField';
const SignupOtp = (props) => {
    const [show, setShow] = useState(false);
    const [loader, setLoader] = useState(false);
    const [form_errors, set_form_error] = useState({});
    const [global_error, set_global_error] = useState('');
    const [otp, setOtp] = useState('');

    const confirmOtp = async () => {
        if (otp == '') {
            set_form_error({ zip_code: 'Please enter zip code' })
            return
        }

        setLoader(true)
        // VAlidating Otp
        const otp_response = await validateOtp({ email: props.registeration_data.email, otp: parseInt(otp) })
        if (otp_response.status == 200) {

            // Registering user
            const register_response = await registerUser(props.registeration_data)
            if (register_response.status == 200) {
                const auth_data = { password: props.registeration_data.password, email: props.registeration_data.email }
                const login_response = await login(auth_data)
                if (login_response.status == 200) {
                    setLoader(false)
                    set_global_error("")
                    set_form_error({})
                    const d = new Date();
                    storeData(LOGIN_DATA_STORAGE_KEY, { access_token: login_response.data.access, refresh_token: login_response.data.refresh, time_added: d.getTime() })
                    props.login(login_response.data.access, login_response.data.refresh, d.getTime());

                }
                else {
                    setLoader(false)
                    set_global_error("")
                    set_form_error({})
                    props.navigation.navigate('Signin', { prevScreen: props.route.name })
                }

            }
            else // When registering user failed
            {
                setLoader(false)
                set_global_error(register_response.data)
                set_form_error({})
            }
        }
        else // When Otp Validation failed
        {
            setLoader(false)
            set_global_error(otp_response.data)
            set_form_error({})
        }

    }

    return (
        <PageContainer pageLoading={loader} route={props.route} navigation={props.navigation}>
            <Modal show={show} close={setShow}></Modal>
            <View style={{ paddingTop: 60 }}>
                <Text style={styles.headingStyle}>OTP Verification</Text>
                <ErrorField error={global_error} />
                <InputField
                    placeholder='Otp'
                    onChangeText={setOtp}
                    isNumeric={true}
                    value={otp}
                    error={form_errors.zip_code ? form_errors.zip_code : ''}
                />
                <Button onPress={confirmOtp}>Confirm OTP</Button>
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
        registeration_data: state.userReducer.registeration_data,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        login: (access_token, refresh_token, time_added) => dispatch(actions.login(access_token, refresh_token, time_added))
    };
};
export default connect(
    mapStateToProps, mapDispatchToProps
)(SignupOtp);