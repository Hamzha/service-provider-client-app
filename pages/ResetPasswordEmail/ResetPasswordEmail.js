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
import {resetPasswordRequest} from '../../Utility/APIS/index'
import {resetPasswordRequestValidation} from '../../Utility/HelperFunction/validation'

const ResetPasswordEmail = (props) => {
    const [loader, setLoader] = useState(false);
    const [email, onEmailChange] = useState('');
    const [form_errors, set_form_error] = useState({});
    const [global_error, set_global_error] = useState('');
    const sendOtpHandler = async () => {
        const error_result=resetPasswordRequestValidation({email})
        if (error_result.has_error)
        {
            set_form_error(error_result)
            set_global_error("")
            return
        }

        setLoader(true)
        const api_response=await resetPasswordRequest({email})
        setLoader(false)
        if(api_response.status==200)
        {
            props.navigation.navigate("ResetPasswordNewPassword",{prevScreen: props.route.name,email:email})
        }
        else
        {
            set_form_error({})
            set_global_error(api_response.data)
        }
    }
    return (
        <PageContainer pageLoading={loader} route={props.route} navigation={props.navigation}>
            <View style={{ paddingTop: 60 }}>
                <Text style={styles.headingStyle}>Reset Password</Text>
                <ErrorField error={global_error} />
                <InputField
                    placeholder='Email Address'
                    onChangeText={onEmailChange}
                    value={email}
                    type='emailAddress'
                    error={form_errors.email ? form_errors.email : ''}
                />
                <Button onPress={sendOtpHandler}>Confirm</Button>
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
)(ResetPasswordEmail);