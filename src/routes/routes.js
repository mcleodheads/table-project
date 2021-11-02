import {HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "./routeConstants";
import Home from "../pages/Home";
import Authorization from "../pages/Authorization";

export const publicRoutes = [
    {
        path: REGISTRATION_ROUTE,
        component: Authorization,
    },
    {
        path: LOGIN_ROUTE,
        component: Authorization,
    },
]

export const authRoutes = [
    {
        path: HOME_ROUTE,
        component: Home,
    },
]