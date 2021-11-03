import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import i18next from "i18next";
import Cookies from 'js-cookie'

import {HOME_ROUTE} from "../routes/routeConstants";
import {loginRequest} from "../store/reducers/userAuthReducer";

import {Dimmer, Dropdown, Form, Grid, Header, Message, Segment} from "semantic-ui-react";

export const countryFlags = [
    {key: 'gb eng', value: 'en', flag: 'gb eng', text: 'English'},
    {key: 'ru', value: 'ru', flag: 'ru', text: 'Русский'},
]

const AuthComp = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('');
    const [isEmptyFields, setEmptyFields] = useState(false);
    const history = useHistory()
    const dispatch = useDispatch();
    const {t} = useTranslation()
    const {isLoading, error, isAuth} = useSelector(state => state.authReducer)

    useEffect(() => {
        if (isAuth) {
            history.push(HOME_ROUTE)
        }
    }, [isAuth])

    const handleFlagChange = (e, data) => {
        setCountry(data.value)
        i18next.changeLanguage(data.value)
    }

    const handleLogin = () => {
        if (login.length > 0 && password.length > 0) {
            dispatch(loginRequest({login, password, country}))
        } else {
            setEmptyFields(true)
        }
    }

    return (
        <Dimmer.Dimmable blurring dimmed={isLoading}>
            <Grid textAlign={'center'} style={{height: '100vh'}} verticalAlign={'middle'}>
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as={'h2'} color={'blue'} textAlign={'center'}>
                        {t('login')}
                    </Header>
                    <Form size={'large'}>
                        <Segment stacked>
                            <Form.Input
                                onFocus={() => setEmptyFields(false)}
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                placeholder={`${t('login')}...`}
                                iconPosition={'left'}
                                icon={'user'}
                                fluid
                                error={isEmptyFields}
                            />
                            <Form.Input
                                onFocus={() => setEmptyFields(false)}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={`${t('password')}`}
                                type={'password'}
                                iconPosition={'left'}
                                icon={'lock'}
                                fluid
                                error={isEmptyFields}
                            />
                            <Form.Group>
                                <Form.Dropdown
                                    placeholder={Cookies.get('i18next')}
                                    selection
                                    compact
                                    width={7}
                                    options={countryFlags}
                                    onChange={handleFlagChange}
                                />
                                <Form.Button
                                    width={12}
                                    style={{width: '100%'}}
                                    color={'blue'}
                                    onClick={handleLogin}
                                    content={`${t(`login_btn`)}`}
                                />
                            </Form.Group>

                        </Segment>
                    </Form>
                    {
                        error.length !== 0 ? (
                            <Message color={'red'}>
                                {
                                    error === 'login/rejected' ? (
                                        'Введенный вами логин или пароль не связан ни с одним аккаунтом'
                                    ) : error
                                }
                            </Message>
                        ) : null
                    }
                    {
                        isEmptyFields ? (
                            <Message color={'red'}>
                                {password.length === 0 ? (`${t('User.Password.ValueIsRequired')}`) :
                                    (`${t('User.UserName.ValueIsRequired')}`) }
                            </Message>
                        ) : null
                    }
                </Grid.Column>
            </Grid>
        </Dimmer.Dimmable>
    );
};

export default AuthComp;