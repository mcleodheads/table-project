import React, {useEffect, useState} from 'react';
import {Button, Dimmer, Form, Grid, Header, Message, Segment} from "semantic-ui-react";
import {loginRequest} from "../store/reducers/userAuthReducer";
import {useDispatch, useSelector} from "react-redux";
import {HOME_ROUTE} from "../routes/routeConstants";
import {useHistory} from "react-router-dom";

const AuthComp = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory()
    const dispatch = useDispatch();
    const {isLoading, error, isAuth} = useSelector(state => state.authReducer)

    useEffect(() => {
        if (isAuth) {
            history.push(HOME_ROUTE)
        }
    }, [isAuth])

    const handleLogin = () => {
        dispatch(loginRequest({login, password}))
    }

    return (
        <Dimmer.Dimmable blurring dimmed={isLoading}>
            <Grid textAlign={'center'} style={{height: '100vh'}} verticalAlign={'middle'}>
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as={'h2'} color={'blue'} textAlign={'center'}>
                        Войти в аккаунт
                    </Header>
                    <Form size={'large'}>
                        <Segment stacked>
                            <Form.Input
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                placeholder={'E-mail / Login...'}
                                iconPosition={'left'}
                                icon={'user'}
                                fluid/>
                            <Form.Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={'Пароль...'}
                                type={'password'}
                                iconPosition={'left'}
                                icon={'lock'}
                                fluid/>
                            <Button
                                color={'blue'}
                                fluid
                                size={'large'}
                                onClick={handleLogin}>
                                Войти
                            </Button>
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
                </Grid.Column>
            </Grid>
        </Dimmer.Dimmable>
    );
};

export default AuthComp;