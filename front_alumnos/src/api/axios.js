import axios from "axios";

const axiosInstancia = axios.create(
    {
        baseURL: "http://localhost:8080",
    },
    /* {
        headers: {
            "ngrok-skip-browser-warning": "69420",
        },
    }, */
);
axiosInstancia.interceptors.request.use(
    (config) => {
        // Obtenemos el token del localStorage
        const token = localStorage.getItem('token');

        // Si el token existe, lo añadimos a los headers
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)


export default axiosInstancia;
