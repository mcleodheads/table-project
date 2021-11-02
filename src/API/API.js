import axios from 'axios';

axios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

export async function userLogin(login, password, language) {
    return axios.post('/api/identity/login', {login, password, language}, {withCredentials: true})
}