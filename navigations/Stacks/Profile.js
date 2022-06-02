import React from 'react';
// Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Importing pages for AuthenticatedStack user
import Profile from '../../pages/Profile/Profile';
import EditProfile from '../../pages/ProfileEdit/ProfileEdit'

const Stack = createNativeStackNavigator();
const MessageStack = ({ navigation, route }) => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="ProfileEdit" component={EditProfile} />
        </Stack.Navigator>
    )
}
export default MessageStack;
