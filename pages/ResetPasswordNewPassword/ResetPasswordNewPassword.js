import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/Actions/index'
// My Components
import PageContainer from '../../components/containers/PageContainer';
import InputField from '../../components/components/InputField/InputField';
import Button from '../../components/components/Button/Button';
import ErrorField from '../../components/components/ErrorField/ErrorField';
// My utilities
import {resetPasswordConfirmValidation} from '../../Utility/HelperFunction/validation'
import {resetPasswordConfirm} from '../../Utility/APIS/ResetPassword/ResetPassword'
import {login} from '../../Utility/APIS/User/user'
import {LOGIN_DATA_STORAGE_KEY} from '../../Utility/HelperFunction/LocalStorage/constants'
import {storeData} from '../../Utility/HelperFunction/LocalStorage/localStorage'

const ResetPasswordNewPassword = (props) => {
    const [loader, setLoader] = useState(false);
    const [otp, setOtp] = useState('');
    const [password, onPasswordChange] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [form_errors, set_form_error] = useState({});
    const [global_error, set_global_error] = useState('');
    const resetPasswordHandler = async () => {
        const validation_response = resetPasswordConfirmValidation({confirmPassword,password,otp});
        if(validation_response.has_error)
        {
            set_form_error(validation_response);
            set_global_error('');
            return;
        }

        setLoader(true)
        const response = await resetPasswordConfirm({otp,password});

        if(response.status == 200)
        {
            const login_response = await login({ email: props.route.params.email, password: password });
            if (login_response.status == 200) {
                setLoader(false)
                set_global_error("")
                set_form_error({})
                const d = new Date();
                storeData(LOGIN_DATA_STORAGE_KEY, { access_token: login_response.data.access, refresh_token: login_response.data.refresh, time_added: d.getTime() })
                props.login(login_response.data.access, login_response.data.refresh, d.getTime());
                return
            }
            else {
                setLoader(false)
                set_global_error("")
                set_form_error({})
                props.navigation.navigate('Signin', { prevScreen: props.route.name });
            }
        }
        else
        {
            setLoader(false);
            set_global_error(response.data);
            set_form_error({})
        }
    }
    return (
        <PageContainer pageLoading={loader} route={props.route} navigation={props.navigation}>
            <View style={{ paddingTop: 60 }}>
                <Text style={styles.headingStyle}>Reset Password</Text>
                <ErrorField error={global_error} />
                <InputField
                    placeholder='OTP'
                    onChangeText={setOtp}
                    value={otp}
                    error={form_errors.otp ? form_errors.otp : ''}
                />
                <InputField
                    placeholder='Password'
                    onChangeText={onPasswordChange}
                    value={password}
                    secure={true}
                    type='password'
                    error={form_errors.password ? form_errors.password : ''}
                />
                <InputField
                    placeholder='Confirm Password'
                    onChangeText={setConfirmPassword}
                    value={confirmPassword}
                    secure={true}
                    type='password'
                    error={form_errors.confirmPassword ? form_errors.confirmPassword : ''}
                />
                <Button onPress={resetPasswordHandler}>Reset Password</Button>
            </View>
        </PageContainer>
    )
}

const styles = StyleSheet.create({
    headingStyle: {
        fontSize: 20,
        color: '#646464',
        fontWeight:'bold'
    },
    error:{
        color:'#ce5a5a',
        fontSize:12,
        paddingLeft:5,
    }
})

const mapStateToProps = state => {
    return {
        user: state.userReducer
    };
};
const mapDispatchToProps = dispatch => {
    return {
        login: (access_token, refresh_token, time_added) => dispatch(actions.login(access_token, refresh_token, time_added))
    };
};
export default connect(
    mapStateToProps, mapDispatchToProps
)(ResetPasswordNewPassword);