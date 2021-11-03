import React, { Suspense } from "react";
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import i18n from 'i18next'
import HttpApi from 'i18next-http-backend'
import LanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from 'react-i18next'

import App from "./App";
import {store} from "./store/indexStore";

import 'semantic-ui-css/semantic.min.css'
import {Dimmer, Loader, Segment} from "semantic-ui-react";

i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ['en', 'ru'],
        fallbackLng: 'en',
        detection: {
            order: ['path', 'cookie', 'htmlTag', 'localStorage', 'subdomain'],
            caches: ['cookie']
        },
        backend: {
            loadPath: '/api/translation/GetForLangType/{{lng}}'
        }
    })

ReactDOM.render(
    <Suspense fallback={
        <Segment>
            <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
            </Dimmer>
        </Segment>
    }>
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
    </Suspense>,
    document.getElementById('root')
)