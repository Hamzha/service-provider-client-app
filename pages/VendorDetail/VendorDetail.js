import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// Redux
import { connect } from 'react-redux';
import PageContainer from '../../components/containers/PageContainer';

const VendorDetail = (props) => {
    return (
        <PageContainer route={props.route}  navigation={props.navigation}>
            <Text>This is VendorDetail</Text>
        </PageContainer>
    )
}



const mapStateToProps = state => {
    return {

    };
};
export default connect(
    mapStateToProps
)(VendorDetail);