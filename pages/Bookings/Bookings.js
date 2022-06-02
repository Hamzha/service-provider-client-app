import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { clearData } from '../../Utility/HelperFunction/LocalStorage/localStorage';
import { LOGIN_DATA_STORAGE_KEY } from '../../Utility/HelperFunction/LocalStorage/constants'

// Redux
import { connect } from 'react-redux';
import PageContainer from '../../components/containers/PageContainer';


const Bookings = (props) => {
    return (
        <PageContainer route={props.route} navigation={props.navigation}>
            <Text>This is Bookings</Text>
        </PageContainer>
    )
}



const mapStateToProps = state => {
    return {

    };
};
export default connect(
    mapStateToProps
)(Bookings);