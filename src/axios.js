import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://whatsapp-backends.herokuapp.com/',
})

export default instance;