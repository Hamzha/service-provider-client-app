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
import { storeData } from '../../Utility/HelperFunction/LocalStorage/localStorage';
import { LOGIN_DATA_STORAGE_KEY } from '../../Utility/HelperFunction/LocalStorage/constants'
import { login } from '../../Utility/APIS/index';
import { login_validation } from '../../Utility/HelperFunction/validation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';

const Signin = (props) => {
    const [loader, setLoader] = useState(false);
    const [email, onEmailChange] = useState('');
    const [password, onPasswordChange] = useState('');
    const [form_errors, set_form_error] = useState({});
    const [global_error, set_global_error] = useState('');
    const loginHandler = async () => {
        const validation_error = login_validation({ email, password })
        if (validation_error.has_error) {
            set_form_error(validation_error);
            set_global_error('');
            return
        }
        setLoader(true)
        const d = new Date();
        const response = await login({ email: email, password: password });
        if (response.status == 200) {
            storeData(LOGIN_DATA_STORAGE_KEY, { access_token: response.data.access, refresh_token: response.data.refresh, time_added: d.getTime() })
            props.login(response.data.access, response.data.refresh, d.getTime());
            return
        }
        else {
            set_form_error({});
            set_global_error(response.data);
            setLoader(false)
        }
    }

    useFocusEffect(
        React.useCallback(() => {
          if(props.route.params.error)
          {
            set_global_error(props.route.params.error)
            const newParams ={...props.route.params}
            newParams.error = undefined
            props.navigation.setParams(newParams);
          }
          return () => {};
        }, [])
    );
   
    return (
        <PageContainer pageLoading={loader} route={props.route} navigation={props.navigation}>
            <View style={{ paddingTop: 60 }}>
                <Text style={styles.headingStyle}>Signin</Text>
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
                    secure={true}
                    type='password'
                    error={form_errors.password ? form_errors.password : ''}
                />
                <TouchableOpacity onPress={()=> props.navigation.navigate("ResetPasswordEmail",{prevScreen: props.route.name})}><Text style={styles.forgetPasswordStyle}>Reset Password</Text></TouchableOpacity>
                <Button onPress={loginHandler}>Signin</Button>
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
    },
    forgetPasswordStyle:{
        color:'#BFBFBF',
        fontSize:11,
        textAlign:'right',
        marginTop:5,
        marginBottom:5
    }
})

const mapStateToProps = state => {
    return {
        user: state.userReducer,
        token_expired_error: state.stateReducer.token_expired_error
    };
};
const mapDispatchToProps = dispatch => {
    return {
        login: (access_token, refresh_token, time_added) => dispatch(actions.login(access_token, refresh_token, time_added)),
        set_state: (data) => dispatch(actions.set_state(data))

    };
};
export default connect(
    mapStateToProps, mapDispatchToProps
)(Signin);