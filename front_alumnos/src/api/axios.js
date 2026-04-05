import axios from "axios";

const axiosInstancia = axios.create(
    {
        baseURL: "http://localhost:8080",
    },
    {
        headers: {
            "ngrok-skip-browser-warning": "69420",
        },
    },
);

export default axiosInstancia;
