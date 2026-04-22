<script setup>
import { RouterLink, RouterView } from "vue-router";
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
