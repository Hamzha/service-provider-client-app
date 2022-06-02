import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import { useEffect, useState } from 'react';
import React from 'react'
// My Components
import PageContainer from '../../components/containers/PageContainer';
import ProfileImage from '../../assets/images/profile.png'
import ErrorField from '../../components/components/ErrorField/ErrorField';
import { LOGIN_DATA_STORAGE_KEY } from '../../Utility/HelperFunction/LocalStorage/constants'
import { clearData } from '../../Utility/HelperFunction/LocalStorage/localStorage';
import { getUser } from '../../Utility/APIS/User/user'
import Location2ICon from '../../assets/icons/Location2'
import Button from '../../components/components/Button/Button'
import BagIcon from '../../assets/icons/Bag'
import Clock from '../../assets/icons/Clock'
import Clock2 from '../../assets/icons/Clock2'
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/Actions/index'
import Ratings from '../../components/components/Ratings/Ratings';

function VendorProfileDetail(props) {
  const [loader, setLoader] = useState(false);
  const [global_error, set_global_error] = useState('');
  const [user, setUSer] = useState(null);

  useEffect(() => {
    const asyncFunc = async () => {
      setLoader(true);
      const response = await getUser(props.access_token, { user_id: props.route.params.vendor_id, user_bio: '', service_id: props.route.params.service_id });
      setLoader(false);

      if (response.status == 200) {
        setUSer(response.data)
      }
      else if (response.status == 401) {
        props.set_state({ token_expired_error: response.data })
        props.login(null, null, null)
        clearData(LOGIN_DATA_STORAGE_KEY);
      }
      else {
        set_global_error(response.data)
      }
    }
    asyncFunc()
  }, [])

  return (
    <PageContainer has_padding={false} withScrollView={false} pageLoading={loader} route={props.route} navigation={props.navigation}>
      {user ?
        <View style={[{ display: 'flex', flexDirection: 'column', flex: 1 }]}>
          {/* Header Detail */}
          <View style={[styles.user_detail_container, styles.padding]}>
            <Image
              style={{ borderRadius: 30 }}
              source={ProfileImage}
            />
            <View style={styles.major_detail_container}>
              <Text style={styles.name_style}>{user.first_name} {user.last_name}</Text>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Ratings rating={user.rating} />
                <Text style={{ marginLeft: 5, color: '#4A4A4A', fontWeight: 'bold' }}>{user.rating}</Text>
              </View>
            </View>
          </View>
          {/* Overview */}
          <View style={[{ flex: 1 }, styles.padding]}>
            <View>
              <Text style={{ color: '#312C2C', fontSize: 16, fontWeight: 'bold', marginTop: 11 }}>Overview</Text>
            </View>
            <ScrollView>
              {/* Destination Detail */}
              <View style={[styles.flex_container, { marginTop: 17, justifyContent: 'space-between' }]}>
                <View style={[styles.flex_container]}>
                  <Location2ICon />
                  <Text style={[styles.textHighlightStyle, { marginLeft: 5 }]}>Not Available</Text>
                </View>
                <View style={[styles.flex_container]}>
                  <Clock />
                  <Text style={[styles.textHighlightStyle, { marginLeft: 5 }]}>Not Available</Text>
                </View>
              </View>
              {/* Yeras In Job Detail */}
              <View style={[styles.flex_container, { justifyContent: 'space-between' }]}>
                <View style={[styles.flex_container]}>
                  <BagIcon />
                  <Text style={[styles.textHighlightStyle, { marginLeft: 5 }]}>Not Available</Text>
                </View>
                <View style={[styles.flex_container]}>
                  <Clock2 />
                  <Text style={[styles.textHighlightStyle, { marginLeft: 5 }]}>Not Available</Text>
                </View>
              </View>
              {/* Description */}
              <Text style={styles.descriptionStyle}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
              {/* Verifications */}
              <View>
                <Text>Verifications</Text>
              </View>
            </ScrollView>
          </View>
          {/* Get Quoate */}
          <View style={styles.get_quoate_container}>
            <Button onPress={() => props.navigation.navigate('CreateLead', { prevScreen: props.route.name, service_id: props.route.params.service_id, vendor_id: props.route.params.vendor_id,urgent:props.route.params.urgent })}>Get Quote</Button>
          </View>
          {/* Verification */}
          <View>

          </View>
        </View>
        : <ErrorField error={global_error} />
      }
    </PageContainer>
  )
}


const styles = StyleSheet.create({
  padding: {
    paddingLeft: 15,
    paddingRight: 15
  },
  user_detail_container: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 24,
    paddingLeft: 38,
    paddingBottom: 17,
    borderBottomColor: '#ECECEC',
    borderBottomWidth: 2
  },
  major_detail_container: {
    paddingLeft: 15
  },
  name_style: {
    color: '#312C2C',
    fontSize: 20,
    textTransform: 'capitalize'
  },
  get_quoate_container: {
    backgroundColor: 'white',
    paddingBottom: 24,
    paddingTop: 24,
    paddingLeft: 15,
    paddingRight: 15
  },
  flex_container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  textHighlightStyle: {
    color: '#636262',
    fontSize: 14,
  },
  descriptionStyle: {
    color: '#393939',
    marginTop: 27,
    fontSize: 14,
    lineHeight: 20
  }
})
const mapStateToProps = state => {
  return {
    access_token: state.userReducer.access_token,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    login: (access_token, refresh_token, time_added) => dispatch(actions.login(access_token, refresh_token, time_added)),
    set_state: (data) => dispatch(actions.set_state(data)),
  };
};
export default connect(
  mapStateToProps, mapDispatchToProps
)(VendorProfileDetail);