import axios from 'axios';

const apiViaCep = axios.create({
    baseURL: 'https://viacep.com.br/ws/',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default apiViaCep;