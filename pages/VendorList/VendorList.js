import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
// Redux
import { connect } from 'react-redux';
import PageContainer from '../../components/containers/PageContainer';
// Components
import Button2 from '../../components/components/Button/Button2';
import SearchIcon from '../../assets/icons/Search'
import VendorCard from '../../components/components/VendorCard/VendorCard';

const HeaderComponent = (props) => {
    return (
        <View style={{ flex: 1, marginLeft: 23 }}>
            <Button2 searchContainer={{ marginTop: 0 }} direction="left" icon={<SearchIcon />}>
                {props.route.params.service_category.subCategory} . {props.location && props.location.detail ? props.location.detail.district : "Address not Available"}
            </Button2>
        </View>
    )
}
const VendorList = (props) => {
    return (
        <PageContainer withScrollView={false} sideComponent={<HeaderComponent {...props} />} route={props.route} navigation={props.navigation}>
            <Text style={styles.textStyle}>Top 10 Handy Man services available near you</Text>
            <FlatList
                data={props.route.params.vendors}
                nestedScrollEnabled
                scrollEnabled={true}
                renderItem={({ item }) => <VendorCard
                    onViewProfilePress={() => props.navigation.navigate("VendorProfileDetail", { prevScreen: props.route.name, service_id: item.id, vendor_id: item.vendor.id,urgent:props.route.params.urgent })}
                    onChatNowPress={() => props.navigation.navigate('CreateLead', { prevScreen: props.route.name, service_id: item.id, vendor_id: item.vendor.id,urgent:props.route.params.urgent})}
                    detail={item}
                    key={item.id} />}
                ListFooterComponent={<View />}
                ListFooterComponentStyle={{ height: 20 }}
            />
        </PageContainer>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 18,
        color: '#312C2C',
        marginTop: 17,
        marginBottom: 10
    }
})

const mapStateToProps = state => {
    return {
        location: state.userReducer.location,
    };
};
export default connect(
    mapStateToProps
)(VendorList);