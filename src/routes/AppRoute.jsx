import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";

import {authRoutes, publicRoutes} from "./routes";
import {LOGIN_ROUTE} from "./routeConstants";

const AppRoute = () => {
    const {isAuth} = useSelector(state => state.authReducer)
    return (
        <Switch>
            {
                isAuth && authRoutes.map(({path, component}) => (
                    <Route
                        path={path}
                        component={component}
                        exact
                        key={component}
                    />
                ))
            }
            {
                publicRoutes.map(({path, component}) => (
                    <Route
                        path={path}
                        component={component}
                        exact
                        key={component}
                    />
                ))
            }

            <Redirect to={LOGIN_ROUTE}/>
        </Switch>
    );
};

export default AppRoute;