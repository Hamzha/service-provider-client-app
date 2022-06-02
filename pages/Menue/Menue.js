import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// Redux
import { connect } from 'react-redux';
import PageContainer from '../../components/containers/PageContainer';

const Menue = (props) => {
    return (
        <PageContainer route={props.route}  navigation={props.navigation}>
            <Text>This is Menue</Text>
        </PageContainer>
    )
}



const mapStateToProps = state => {
    return {

    };
};
export default connect(
    mapStateToProps
)(Menue);