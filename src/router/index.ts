import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Settings from "../components/Setting.vue";
import Dashboard from "../components/Dashboard.vue";

const routes = [
    { path: '/login', component: Login, name: 'ClockBox - Connexion' },
    { path: '/register', component: Register, name: 'ClockBox - Inscription' },
    { path: '/settings', component: Settings, name: 'ClockBox - AdminSettings' },
    { path: '/dashboard', component: Dashboard, name: 'ClockBox - AdminDashboard' },


];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
