<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
        <div class="card p-4 shadow" style="width: 400px;">
            <h2 class="text-center mb-4">Login Alumnos</h2>
            
            <form @submit.prevent="handleLogin" class="row g-3">
                <div class="col-12">
                    <label for="username" class="form-label">Username</label>
                    <div class="input-group">
                        
                        <input 
                            v-model="username" 
                            type="text" 
                            class="form-control" 
                            id="username" 
                            placeholder="usuario"
                            required
                        >
                    </div>
                </div>

                <div class="col-12">
                    <label for="password" class="form-label">Password</label>
                    <input 
                        v-model="password" 
                        type="password" 
                        class="form-control" 
                        id="password" 
                        required
                    >
                </div>

                <div class="col-12 mt-4">
                    <button class="btn btn-primary w-100" type="submit">
                        Ingresar al Sistema
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Swal from "sweetalert2";
import axiosInstancia from '../api/axios';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = async () => {
    try {
        const response = await axiosInstancia.post('/auth/login', {
            username: username.value,
            password: password.value
        });
        
        const data = response.data;
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data)); // Guardamos todo el objeto (nombre, rol, etc.)

        Swal.fire({
            icon: 'success',
            title: `¡Bienvenido ${data.firstname}!`,
            showConfirmButton: false,
            timer: 1500
        });

        router.push('/alumnos')

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error de autenticación',
            text: 'Usuario o contraseña incorrectos',
        });
    }
};
</script>

<style scoped>
.card {
    border-radius: 15px;
}
</style>