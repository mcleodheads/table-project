import React from 'react';
import {Menu} from "semantic-ui-react";
import {useDispatch} from "react-redux";
import {logoutRequest} from "../store/reducers/userAuthReducer";
import {HOME_ROUTE} from "../routes/routeConstants";
import {useHistory} from "react-router-dom";

const Header = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSignOut = () => {
        dispatch(logoutRequest())
    }

    return (
            <Menu>
                <Menu.Item
                    position={'left'}
                    name={'Home'}
                    content={'Home'}
                    onClick={() => history.push(HOME_ROUTE)}
                />
                <Menu.Item
                    position={'right'}
                    name={'LogOut'}
                    content={'Log out'}
                    onClick={() => handleSignOut()}
                />
            </Menu>
    );
};

export default Header;