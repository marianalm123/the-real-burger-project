import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burguer-mariana.firebaseio.com/'
});

export default instance;
