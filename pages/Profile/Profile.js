import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { clearData } from '../../Utility/HelperFunction/LocalStorage/localStorage';
import { LOGIN_DATA_STORAGE_KEY } from '../../Utility/HelperFunction/LocalStorage/constants'
import Button from '../../components/components/Button/Button'
import ErrorField from '../../components/components/ErrorField/ErrorField';
// assets
import Camera from '../../assets/icons/camera.js';
import ForwardArrow from '../../assets/icons/forwardArrow';
// Redux
import { connect } from 'react-redux';
import PageContainer from '../../components/containers/PageContainer';
import * as actions from '../../store/Actions/index'


// utilities
import {getUser} from '../../Utility/APIS/User/user';

const Profile = (props) => {
    const [loader,setLoader]=useState(false)
    const [form_errors, set_form_error] = useState({});
    const [global_error, set_global_error] = useState('');

    useEffect(()=>{
        const asyncHandler=async ()=>{
            setLoader(true)
            const reseponse =await getUser(props.access_token)
            setLoader(false)
            if(reseponse.status==200)
            {
                props.set_user_data(reseponse.data)
            }
            else if(reseponse.status==401)
            {
                props.set_state({token_expired_error:reseponse.data})
                props.login(null,null,null)
                clearData(LOGIN_DATA_STORAGE_KEY);
            }
            else
            {
                set_global_error(reseponse.data)
            }
        }
        if(!props.user_data)
            asyncHandler()
    },[])
    const logout_handler = () => {
        props.login(null, null, null);
        clearData(LOGIN_DATA_STORAGE_KEY);
    }

    return (
        <PageContainer pageLoading={loader} title="Account" route={props.route}  navigation={props.navigation}>
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <View style={styles.camerContainer}>
                        <TouchableOpacity>
                            <View style={styles.cameraBackground}>
                                <Camera />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.nameStyle}>{props.user_data?props.user_data.first_name:''}</Text>
                        <Text style={styles.emailStyle}>{props.user_data?props.user_data.email:''}</Text>
                    </View>
                    <View>
                        <ErrorField  error={global_error}/>
                    </View>
                    <View style={styles.optionsContainer}>
                        <TouchableOpacity disable={!props.user_data} onPress={()=>props.navigation.navigate("ProfileEdit",{prevScreen: props.route.name})}>
                            <View style={styles.optionContainerStyle}>
                                <Text style={styles.optionTextStyle}>Edit Profile</Text>
                                <ForwardArrow />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{marginTop:50}}>
                    <Button onPress={logout_handler}>Logout</Button>
                </View>
            </View>
        </PageContainer>
    )
}



const styles=StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'column',
        flex:1,
        height:'100%'
    },
    contentContainer:{
        flex:1,
        flexGrow:1,
    },
    camerContainer:{
        display:'flex',
        justifyContent:'center',
        flexDirection:'row',
        marginTop:21
    },
    cameraBackground:{
        backgroundColor:'#D6D6D6',
        padding:20,
        borderRadius:50,
        opacity:0.5,
    },
    nameStyle:{
        fontSize:16,
        color:'#000000',
        fontWeight:'500',
        textAlign:'center',
        marginTop:21
    },
    emailStyle:{
        fontSize:16,
        marginTop:4,
        color:'#000000',
        textAlign:'center',
        fontWeight:'700'
    },
    optionsContainer:{
        marginTop:45
    },
    optionContainerStyle:{
        borderTopColor:'#ECECEC',
        borderTopWidth:2,
        borderBottomColor:'#ECECEC',
        borderBottomWidth:2,
        paddingTop:14,
        paddingBottom:14,
        paddingLeft:10,
        paddingRight:10,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    optionTextStyle:{
        fontSize:16,
        color:'#646464',
        fontWeight:'500'
    }
})
const mapStateToProps = state => {
    return {
        access_token: state.userReducer.access_token,
        user_data: state.userReducer.user_data
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