import React from 'react';
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import i18next from "i18next";
import Cookies from 'js-cookie'
import {Dropdown, Menu} from "semantic-ui-react";

import {logoutRequest} from "../store/reducers/userAuthReducer";
import {TABLE_ROUTE} from "../routes/routeConstants";
import {countryFlags} from "./AuthComp";

const Header = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const {t} = useTranslation()

    const handleSignOut = () => {
        dispatch(logoutRequest())
    }

    const handleLangChange = (e, data) => {
        i18next.changeLanguage(data.value)
    }

    return (
        <Menu pointing className={'header-wrapper'}>
            <Menu.Menu position={'left'}>
                <Menu.Item
                    name={`${t('users')}`}
                    content={`${t('users')}`}
                    onClick={() => history.push(TABLE_ROUTE)}
                />
            </Menu.Menu>
            <Menu.Menu position={'right'}>
                <Dropdown item placeholder={Cookies.get('i18next')} options={countryFlags} onChange={handleLangChange}/>
                <Menu.Item
                    name={`${t('exit')}`}
                    content={`${t('exit')}`}
                    onClick={() => handleSignOut()}
                />
            </Menu.Menu>
        </Menu>
    );
};

export default Header;
