// Redux
import { connect } from 'react-redux';
import * as actions from '../store/Actions/index';
// Navigation
import TabBottom from './TabNavigation/TabNavigator';
import UnauthenticatedStack from './Stacks/UnAuthenticated';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { diff_minutes } from '../Utility/HelperFunction/helpers';
import { ACCESS_TOKEN_LIFETIME } from '../config'
const d = new Date();


const Drawer = createDrawerNavigator();
const Navigation = (props) => {
    const isLoggedIn = () => {
        if (props.access_token) {
            if (diff_minutes(d.getTime(), props.time_added) < ACCESS_TOKEN_LIFETIME) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    return (
        <Drawer.Navigator screenOptions={{ headerShown: false }}>
            {isLoggedIn() ? <Drawer.Screen name="Home" component={TabBottom} /> :
                <Drawer.Screen name="Unauthenticated" component={UnauthenticatedStack} />}
        </Drawer.Navigator>
    )
}


const mapStateToProps = state => {
    return {
        access_token: state.userReducer.access_token,
        time_added: state.userReducer.time_added
    };
};
const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navigation) 