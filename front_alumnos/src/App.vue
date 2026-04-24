<script setup>
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./Components/NavBar.vue";
</script>

<template>
    <header>
        <div class="wrapper">
            <!-- <nav>
                <RouterLink to="/">login </RouterLink>
                <RouterLink to="/alumnos">formulario</RouterLink>
            </nav> -->
        </div>
    </header>

    <RouterView />
</template>
