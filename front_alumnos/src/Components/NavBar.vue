<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Sistema Alumnos</a>

            <div class="d-flex">
                <button @click="handleLogout" class="btn btn-danger btn-sm">
                    <i class="bi bi-box-arrow-right"></i> Cerrar Sesión
                </button>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
};
</script>