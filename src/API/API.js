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