import React from 'react';
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import i18next from "i18next";
import Cookies from 'js-cookie'

import {logoutRequest} from "../store/reducers/userAuthReducer";
import {HOME_ROUTE} from "../routes/routeConstants";
import {countryFlags} from "./AuthComp";

import {Dropdown, Menu} from "semantic-ui-react";

const Header = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const {t} = useTranslation()

    const handleSignOut = () => {
        dispatch(logoutRequest())
    }

    const handleLangChange = (e, data) => {
        console.log(data.value)
        i18next.changeLanguage(data.value)
    }

    return (
        <Menu pointing>
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