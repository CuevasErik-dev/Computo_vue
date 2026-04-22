import { createRouter, createWebHistory } from 'vue-router';
import AuthView from '../views/AuthView.vue';
import AlumnosView from '../views/AlumnosView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'auth',
            component: AuthView
        },
        {
            path: '/alumnos',
            name: 'alumnos',
            component: AlumnosView
        },

    ]
})

export default router