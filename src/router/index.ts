import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';

const routes = [
    { path: '/login', component: Login, name: 'ClockBox - Connexion' },
    { path: '/register', component: Register, name: 'ClockBox - Inscription' },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
