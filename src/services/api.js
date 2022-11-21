import axios from 'axios';

const api = axios.create({
   // baseURL: 'http://localhost:8080/api', // local
    baseURL: 'https://uget-bank-backend-7n3oeyxokq-uc.a.run.app/api', // dev
    //baseURL: 'https://bank.cubeapps.com.br/api' //prod

    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*'
     },
});

api.interceptors.request.use(async (config) => {
   const token = localStorage.getItem('Token')

   if (token) {
     config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
 });


export default api;