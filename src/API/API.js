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