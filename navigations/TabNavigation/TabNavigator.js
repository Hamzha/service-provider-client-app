import React from 'react';
// Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Importing Stacks
import Home from '../../pages/Home/Home';
import HomeStack from '../Stacks/Home';
import MessageStack from '../Stacks/Message';
import ProfileStack from '../Stacks/Profile'
import BookingStack from '../Stacks/Booking';


const BottomNavigator = createBottomTabNavigator();

const TabBottom = (props) => {
    return (
        <BottomNavigator.Navigator
            screenOptions={{ headerShown: false }}
        >
            <BottomNavigator.Screen name="HomeStack" component={HomeStack} />
            <BottomNavigator.Screen name="MessageStack" component={MessageStack} />
            <BottomNavigator.Screen name="BookingStack" component={BookingStack} />
            <BottomNavigator.Screen name="ProfileStack" component={ProfileStack} />
        </BottomNavigator.Navigator>
    )
}
export default TabBottom
