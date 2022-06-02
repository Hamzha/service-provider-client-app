import React from 'react';
// Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Importing pages for AuthenticatedStack user
import Bookings from '../../pages/Bookings/Bookings';

const Stack = createNativeStackNavigator();
const MessageStack = ({ navigation, route }) => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Bookings" component={Bookings} />
        </Stack.Navigator>
    )
}
export default MessageStack;
