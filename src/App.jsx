import React from 'react';
import {useSelector} from "react-redux";

import AppRoute from "./routes/AppRoute";
import Header from "./components/Header";

import {Grid} from "semantic-ui-react";

const App = () => {
    const {isAuth} = useSelector(state => state.authReducer)

    return (
        <Grid>
            {
                isAuth ? (
                    <Grid.Row>
                        <Grid.Column>
                            <Header/>
                        </Grid.Column>
                    </Grid.Row>
                ) : null
            }
            <Grid.Row>
                <Grid.Column>
                    <AppRoute/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default App;