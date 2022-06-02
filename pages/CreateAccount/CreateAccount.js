import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// Redux
import { connect } from 'react-redux';
// Components
import PageContainer from '../../components/containers/PageContainer';
import Button from '../../components/components/Button/Button';
import { useFocusEffect } from '@react-navigation/native';
import * as actions from '../../store/Actions/index'

const CreateAccount = (props) => {
    useFocusEffect(
        React.useCallback(() => {
          if(props.token_expired_error)
          {
            const error = props.token_expired_error
            props.navigation.replace("Signin",{error:error})
          }
          return () => {};
        }, [])
    );
    return (
        <PageContainer route={props.route}  navigation={props.navigation}>
            <View style={{ paddingTop: 60 }}>
                <Text style={styles.headingStyle}>Create your free account.</Text>
                <Text style={styles.paragraphStyle}>Sign up and start hearing from your nearby customers</Text>
                <View style={styles.termsContainer}>
                    <Text style={styles.paragraph2Style}>
                        By clicking “Sign up with email” and “Phone No.” I agree to the
                        <View style={styles.highlightContainer}>
                            <TouchableOpacity>
                                    <Text style={styles.highlightStyle}>Terms Of Use</Text>
                            </TouchableOpacity>
                        </View>
                        and
                        <View  style={styles.highlightContainer}>
                        <TouchableOpacity style={{}}>
                            <Text style={styles.highlightStyle}>Privacy Policy</Text>
                        </TouchableOpacity>
                        </View>
                    </Text>
                </View>

                <Button style={{ marginTop: 40 }} onPress={() => props.navigation.navigate("Signup",{prevScreen: props.route.name})}>Sign up With Email</Button>
                <View style={styles.orContainer}>
                    <View style={styles.orBorder}></View>
                    <Text style={styles.orStyle}>OR</Text>
                    <View style={styles.orBorder}></View>
                </View>
                <Button style={{ marginTop: 10 }} onPress={() => props.navigation.navigate("Signin",{prevScreen: props.route.name})}>Signin</Button>
            </View>
        </PageContainer>
    )
}


const styles = StyleSheet.create({
    headingStyle: {
        fontSize: 20,
        color: '#2D2D2D',
    },
    paragraphStyle: {
        fontSize: 16,
        color:'#919191',
        marginTop: 30
    },
    termsContainer: {
        marginTop: 14
    },
    paragraph2Style: {
        color: '#2D2D2D',
        fontSize: 14,
    },
    highlightContainer:{
        paddingLeft:5,
        paddingRight:5,
    },
    highlightStyle: {
        color: '#7cd6f9',
        fontWeight: 'bold',
        fontSize: 14
    },
    orContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    orStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#7E7E7E',
        width: 40,
        textAlign: 'center'
    },
    orBorder: {
        backgroundColor: '#7E7E7E',
        height: 1,
        flexGrow: 1,

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
    mapStateToProps,mapDispatchToProps
)(CreateAccount);