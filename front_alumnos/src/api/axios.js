import axios from "axios";

const axiosInstancia = axios.create({
    // 1. Usa la URL de ngrok que te dio la terminal
    baseURL: "https://nicolette-tissual-lashunda.ngrok-free.dev", 
    //baseURL: "http://localhost:8081",
    // 2. Todo va dentro del mismo objeto de configuración
    headers: {
        "ngrok-skip-browser-warning": "69420",
        "Content-Type": "application/json"
    } 
});

axiosInstancia.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstancia;