import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {checkAuth} from "./store/reducers/userAuthReducer";
import AppRoute from "./routes/AppRoute";
import Header from "./components/Header";

import {Grid} from "semantic-ui-react";

const App = () => {
    const dispatch = useDispatch()
    const {isAuth} = useSelector(state => state.authReducer)

    useEffect(() => {
        if(localStorage.getItem('token')) {
            dispatch(checkAuth())
        }
    }, [localStorage.getItem('token')])


    return (
        <Grid>
            {
                isAuth ? (
                    <Grid.Row>
                        <Grid.Column>
                            <Header />
                        </Grid.Column>
                    </Grid.Row>
                ) : null
            }
            <Grid.Row>
                <Grid.Column>
                    <AppRoute />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default App;