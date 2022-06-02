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
import Button from '../../components/components/Button/Button';
// Importin utilities
import { storeData } from '../../Utility/HelperFunction/LocalStorage/localStorage';
import { LOGIN_DATA_STORAGE_KEY } from '../../Utility/HelperFunction/LocalStorage/constants';
import { signup_validation } from '../../Utility/HelperFunction/validation';
import { isValidNumber } from "react-native-phone-number-input";
import { validateIfUserExist } from '../../Utility/APIS/index';
import ErrorField from '../../components/components/ErrorField/ErrorField';
const Signup = (props) => {
    const [show, setShow] = useState(false);
    const [loader, setLoader] = useState(false);
    const [form_errors, set_form_error] = useState({});
    const [global_error, set_global_error] = useState('');

    const [email, onEmailChange] = useState(props.registeration_data.email);
    const [password, onPasswordChange] = useState(props.registeration_data.password);
    const [password2, onPassword2Change] = useState(props.registeration_data.password);
    const [phone_number, setPhoneNumber] = useState(props.registeration_data.phone_number);
    const [with_out_code_phone_number, setWithOutCodePhoneNumber] = useState(props.registeration_data.with_out_code_phone_number);

    const signupHandler = async () => {
        const validation_response = signup_validation({ email, password, password2, phone_number, type: 'client' }, isValidNumber)
        if (validation_response.has_error) {
            set_form_error(validation_response);
            set_global_error('');
            return
        }

        setLoader(true);
        const response = await validateIfUserExist({ email, phone_number })
        if (response.status == 200) {
            props.register_user({ email, password, password2, phone_number, with_out_code_phone_number })
            setLoader(false);
            set_form_error({})
            set_global_error(response.data);
            props.navigation.navigate('SignupProfile', { prevScreen: props.route.name });
        }
        else {
            setLoader(false)
            set_form_error({})
            set_global_error(response.data);
        }
    }

    return (
        <PageContainer pageLoading={loader} route={props.route} navigation={props.navigation}>
            <Modal show={show} close={setShow}></Modal>
            <View style={{ paddingTop: 60 }}>
                <Text style={styles.headingStyle}>Signup</Text>
                <ErrorField error={global_error} />
                <InputField
                    placeholder='Email Address'
                    onChangeText={onEmailChange}
                    value={email}
                    type='emailAddress'
                    error={form_errors.email ? form_errors.email : ''}
                />
                <InputField
                    placeholder='Password'
                    onChangeText={onPasswordChange}
                    value={password}
                    type='password'
                    secure={true}
                    error={form_errors.password ? form_errors.password : ''}
                />
                <InputField
                    placeholder='New Password'
                    onChangeText={onPassword2Change}
                    value={password2}
                    type='password'
                    secure={true}
                    error={form_errors.password2 ? form_errors.password2 : ''}
                />
                <ContactField
                    formattedValue={phone_number}
                    setFormattedValue={setPhoneNumber}
                    value={with_out_code_phone_number}
                    setValue={setWithOutCodePhoneNumber}
                    error={form_errors.phone_number ? form_errors.phone_number : ''}
                />
                <Button onPress={signupHandler}>Signup</Button>
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
        login: (access_token, refresh_token, time_added) => dispatch(actions.login(access_token, refresh_token, time_added)),
        register_user: (data) => dispatch(actions.register_user(data))
    };
};
export default connect(
    mapStateToProps, mapDispatchToProps
)(Signup);
