import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// Redux Imports
import { Provider } from 'react-redux';
import { createStore, compose, combineReducers } from 'redux';
import userReducer from './store/Reducers/userReducer'
import serviceCategoryReducer from './store/Reducers/serviceCategoryReducer'
import stateReducer from './store/Reducers/stateReducer'
// Importing Screens
import Home from './pages/Home/Home'
// Navigations
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './navigations/Navigation';
import * as actions from './store/Actions/index'
import { getData } from './Utility/HelperFunction/LocalStorage/localStorage';
import { diff_minutes } from './Utility/HelperFunction/helpers';
import { LOGIN_DATA_STORAGE_KEY, LOCATION_DATA_STORAGE_KEY } from './Utility/HelperFunction/LocalStorage/constants'
import { ACCESS_TOKEN_LIFETIME } from './config'
import Toast from 'react-native-toast-message';
import { toastConfig } from './components/components/CustomToast/CustomToast'

// Settingup Stores
const rootReducer = combineReducers({ userReducer: userReducer, stateReducer: stateReducer, serviceCategoryReducer: serviceCategoryReducer });
const store = createStore(rootReducer);

export default function App() {
  useEffect(() => {
    const asyncHandler = async () => {
      // Getting loging info
      const login_result = await getData(LOGIN_DATA_STORAGE_KEY)
      const d = new Date();
      if (login_result.isSuccess && login_result.data != null) {
        if (diff_minutes(d.getTime(), login_result.data.time_added) < ACCESS_TOKEN_LIFETIME) {
          store.dispatch(actions.login(login_result.data.access_token, login_result.data.refresh_token, login_result.data.time_added))
        }
      }
      // Getting location (if stored)
      getData(LOCATION_DATA_STORAGE_KEY).then(location_result => {
        if (location_result.isSuccess && location_result.data != null) {
          store.dispatch(actions.update_location(location_result.data))
        }
      })
    }
    asyncHandler()
  })
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
      <Toast config={toastConfig} />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
