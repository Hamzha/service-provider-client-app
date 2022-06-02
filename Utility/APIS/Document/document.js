import { DOCUMENT_URL } from '../Constants/constants.js';
import axios from 'axios';
import { Platform } from 'react-native';
import { object_to_string } from '../../HelperFunction/helpers'
import mime from "mime";

export const createDocumentApi = async (data, token) => {
    var bodyFormData = new FormData();    
    for (var key in data) {
        if (data.hasOwnProperty(key)) {     
            if(key === 'document'){
                const image=data[key]
                const newImageUri =  "file:///" + image.uri.split("file:/").join("");
                const type = mime.getType(newImageUri)
                const name=image.uri.split("/").pop()
                bodyFormData.append("document",image);
            }   
            else{
                bodyFormData.append(key, data[key]);
            }    
        }
    }
    console.log("====== bodyFormData =======",bodyFormData)
    try {
        const response = await axios.post(DOCUMENT_URL,bodyFormData,{
            headers: {
                Authorization: "Bearer " + token,
                'Content-Type': 'multipart/form-data'
            },
            transformRequest: (data, headers) => {
                return bodyFormData;
            },
        });
        return { data: response.data.data, status: 200 }
    }
    catch (error) {
        console.log("====== error =======",error)
        // ------ If timeout error ------
        if (error.code == 'ECONNABORTED' && error.message)
            return { data: error.message, status: null }

        // ------ If request is not reached to the server ------
        if (error.message == 'Network Error')
            return { data: "Unable to connect to server because of network error", status: null }

        const status = error.response.status;
        const response = error.response.data
        // ------ Handling request that is send from server  ------
        if ((status == 400 || status == 404) && typeof response === 'object')
            return { data: error.response.data.exceptionString[0], status: status }

        if (status == 401)
            return { data: "Session Expired please login again", status: status }

        // ------ Failed to handle any possible error sending generic error  ------
        return { data: "Something went wrong while uploading image", status: status }
    }
}
