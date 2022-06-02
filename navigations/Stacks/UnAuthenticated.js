import React from 'react';
// Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Importing pages for unauthenticated user
import CreateAccount from '../../pages/CreateAccount/CreateAccount';
import SelectLocation from '../../pages/SelectLocation/SelectLocation';
import Signin from '../../pages/Signin/Signin';
import Signup from '../../pages/Signup/Signup';
import SignupOtp from '../../pages/SignupOtp/SignupOtp';
import SignupProfile from '../../pages/SignupProfile/SignupProfile';
import ResetPasswordEmail from '../../pages/ResetPasswordEmail/ResetPasswordEmail';
import ResetPasswordNewPassword from '../../pages/ResetPasswordNewPassword/ResetPasswordNewPassword';

const Stack = createNativeStackNavigator();
const UnauthenticatedStack = ({ navigation, route }) => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
            <Stack.Screen name="SelectLocation" component={SelectLocation} />
            <Stack.Screen name="Signin" component={Signin} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="SignupOtp" component={SignupOtp} />
            <Stack.Screen name="SignupProfile" component={SignupProfile} />
            <Stack.Screen name="ResetPasswordEmail" component={ResetPasswordEmail} />
            <Stack.Screen name="ResetPasswordNewPassword" component={ResetPasswordNewPassword} />
        </Stack.Navigator>
    )
}
export default UnauthenticatedStack;
