import React from 'react';
// Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Importing pages for AuthenticatedStack user
import Home from '../../pages/Home/Home';
import VendorDetail from '../../pages/VendorDetail/VendorDetail';
import VendorList from '../../pages/VendorList/VendorList';
import SearchService from '../../pages/SearchService/SearchService';
import ServiceDetail from '../../pages/ServiceDetail/ServiceDetail'
import VendorProfileDetail from '../../pages/VendorProfileDetail/VendorProfileDetail';
import CreateLead from '../../pages/CreateLead/CreateLead';

const Stack = createNativeStackNavigator();
const HomeStack = ({ navigation, route }) => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="VendorDetail" component={VendorDetail} />
            <Stack.Screen name="VendorList" component={VendorList} />
            <Stack.Screen name="SearchService" component={SearchService} />
            <Stack.Screen name="ServiceDetail" component={ServiceDetail} />
            <Stack.Screen name="VendorProfileDetail" component={VendorProfileDetail} />
            <Stack.Screen name="CreateLead" component={CreateLead} />
        </Stack.Navigator>
    )
}
export default HomeStack;
