import React from 'react';
// Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Importing pages for AuthenticatedStack user
import Bookings from '../../pages/Bookings/Bookings';
import Message from '../../pages/Message/Message';

const Stack = createNativeStackNavigator();
const MessageStack = ({ navigation, route }) => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Message" component={Message} />
        </Stack.Navigator>
    )
}
export default MessageStack;
