import axios from 'axios';

axios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

export async function userLogin(login, password, country) {
    return axios.post('/api/identity/login', {login, password, language: country}, {withCredentials: true})
}

export async function fetchAppConfiguration() {
    return axios.get('/api/appConfiguration', {withCredentials: true})
}

export async function fetchSearchResults(name) {
    const data = {
        filter: {},
        sort: {},
    }
    return axios.post(`/api/${name}/search`, data, {withCredentials: true})
}

export async function fetchModalData(name, id) {
    return axios.get(`/api/${name}/getById/${id}`, {withCredentials: true})
}

export async function fetchPopupData(name, config) {
    return axios.post(`/api/${name}/ids`, config, {withCredentials: true})
}

export async function fetchSelectorData(name, field) {
    const config = {
        filter: {},
        skip: 0,
        take: 0,
        sort: {}
    }
    return axios.post(`/api/${name}/forSelect/${field}`, config,{withCredentials: true})
}