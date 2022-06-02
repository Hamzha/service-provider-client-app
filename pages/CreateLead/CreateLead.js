import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import PageContainer from '../../components/containers/PageContainer';
import ErrorField from '../../components/components/ErrorField/ErrorField';
import { clearData } from '../../Utility/HelperFunction/LocalStorage/localStorage';
// Redux
import { connect } from 'react-redux';
import { Keyboard } from 'react-native'
import * as actions from '../../store/Actions/index'
import InputField from '../../components/components/InputField/InputField'
import Button from '../../components/components/Button/Button'
import UploadImageIcon from '../../assets/icons/UploadImage'
import CameraIcon from '../../assets/icons/camera'
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import UploadImage from '../UploadImage/UploadImage';
import { LOGIN_DATA_STORAGE_KEY } from '../../Utility/HelperFunction/LocalStorage/constants'
import { createLeadApi } from '../../Utility/APIS/Lead/Lead'
import {createDocumentApi} from '../../Utility/APIS/index'
import { Platform } from 'react-native';
function CreateLead(props) {
    const [form_errors, set_form_error] = useState({});
    const [loader, setLoader] = useState(false);
    const [loader_text,setLoaderText]=useState("")
    const [has_lead_generated, setHasLeadGenerated] = useState(false);
    const [global_error, set_global_error] = useState('');
    const [description, onDescriptionChange] = useState('');
    const [images, setImage] = useState([]);
    // const [status, requestPermission] = DocumentPicker.useMediaLibraryPermissions();
    const [camerStatus, requestCameraPermission] = ImagePicker.useCameraPermissions();

    const pickImage = async () => {
        if (images.length === 3)
            return
        // ===== Getting The Permission =====
        let myImage = await DocumentPicker.getDocumentAsync({ type: ["application/pdf", 'image/jpeg', 'image/png'] });
        // ===== Gettting The Data From Server ======
        if (myImage.type == "success") {
            // const manipResult = await ImageManipulator.manipulateAsync(myImage.uri, [{ resize:{height: 394, width: 526} }], {base64:true})
            const prevImage = [...images]
            prevImage.push(myImage)
            setImage(prevImage)
        }
    }

    const takePicture = async () => {
        if (images.length === 3)
            return
        const data = await requestCameraPermission()
        if (data.granted == false) {
            if (data.actions == false) {
                set_global_error('Please Grant Permission to take Picture from your system setting.')
            }
            else {
                set_global_error('Please Grant Permission to take Picture.')
            }
            return
        }
        // Getting The Image
        const imageResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
        })
        // Doing Search By Image
        if (!imageResult.cancelled) {
            // const manipResult = await ImageManipulator.manipulateAsync(imageResult.uri, [{ resize:{height: 394, width: 526} }], {base64:true})
            const prevImage = [...images]
            prevImage.push(imageResult)
            setImage(prevImage)
        }
    }

    const deleteImage = (index) => {
        const prevImage = [...images]
        prevImage.splice(index, 1)
        setImage(prevImage)
    }
    const createLead = async () => {
        if (description.length <= 0) {
            set_global_error('Please Provide Description Of the Job')
            return
        }

        setLoader(true);
        setLoaderText("Sending Job Request...")
        const lead_response = await createLeadApi({
            service_id: props.route.params.service_id,
            urgent: props.route.params.urgent ? "true" : "false",
            lng: 0,
            lat: 0,
            description: description
        }, props.access_token)
        setLoader(false);
        setHasLeadGenerated(true);
        setLoaderText("")
        if (lead_response.status == 200) {
            images.map(async image=>{
                const response=await createDocumentApi({document:image,type:"LEAD",name:image.name,lead:lead_response.data.id},props.access_token)
                console.log("====== response =======",response)
            })
        }
        else if (lead_response.status == 401) {
            props.set_state({ token_expired_error: lead_response.data })
            props.login(null, null, null)
            clearData(LOGIN_DATA_STORAGE_KEY);
        }
        else {
            set_global_error(lead_response.data)
        }
    }


    return (
        <PageContainer loader_text={loader_text} has_padding={false} withScrollView={false} pageLoading={loader} route={props.route} navigation={props.navigation}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    {/* ---------- Description ------------ */}
                    <View style={styles.padding}>
                        <ErrorField error={global_error} style={{ marginTop: 10 }} />
                        <Text style={styles.headingStyle}>Description</Text>
                        <InputField
                            placeholder="Please provide the description related to job"
                            numberOfLines={5}
                            style={styles.inputStyle}
                            value={description}
                            onChangeText={onDescriptionChange}
                        />
                        <Text style={[styles.headingStyle, { marginTop: 20 }]}>Upload Image <Text style={{ fontSize: 12, color: '#D1D1D1' }}>* max 3</Text></Text>
                        <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={pickImage} style={styles.uploadImageContainer} activeOpacity={images.length == 3 ? 1 : 0.6}>
                                <UploadImageIcon />
                            </TouchableOpacity>
                            <Text style={styles.headingStyle}>OR</Text>
                            <TouchableOpacity onPress={takePicture} style={styles.uploadImageContainer} activeOpacity={images.length == 3 ? 1 : 0.6}>
                                <CameraIcon />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* ---------- Images ---------- */}
                    <View style={[{ flex: 1, marginTop: 60 }, styles.padding]}>
                        <ScrollView>
                            <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'wrap' }}>
                                {images ? images.map((image, index) => <UploadImage key={index} image={image} onDeletePress={(index) => deleteImage(index)} />) : null}
                            </View>
                        </ScrollView>
                    </View>
                    {/* ---------- Submit ---------- */}
                    <View style={[styles.submit_button_container]}>
                        <Button onPress={createLead}>Send Quote</Button>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </PageContainer>
    )
}


const styles = StyleSheet.create({
    inputStyle: {
        borderWidth: 1,
        borderColor: '#CBCBCB',
        textAlignVertical: 'top',
        paddingTop: 10,
    },
    headingStyle: {
        color: '#312C2C',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 10
    },
    padding: {
        paddingLeft: 15,
        paddingRight: 15
    },
    submit_button_container: {
        backgroundColor: 'white',
        paddingBottom: 24,
        paddingTop: 24,
        paddingLeft: 15,
        paddingRight: 15
    },
    uploadImageContainer: {
        height: 80,
        width: 100,
        backgroundColor: 'rgb(219, 219, 219)',
        opacity: 0.8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
        marginRight: 10
    },
    imageStyle: {
        width: 100,
        height: 100
    }
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
)(CreateLead);