import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Settings from "../components/Setting.vue";
import Dashboard from "../components/Dashboard.vue";
import Pointing from "../components/Pointing.vue";
import Employees from "../components/Employees.vue";
import Planning from "../components/Planning.vue";
import Leave from "../components/Leave.vue";

import EDashbord from "../components/Employee/E-Dashbord.vue";
import EPointing from "@/components/Employee/E-Pointing.vue";
import EPlanning from "@/components/Employee/E-Planning.vue";
import ELeave from "@/components/Employee/E-Leave.vue";


function isAuthenticated() {
    return !!localStorage.getItem('userToken');
}

const routes = [
    // Admin
    { path: '/login', component: Login, name: 'ClockBox - Connexion' },
    { path: '/register', component: Register, name: 'ClockBox - Inscription' },
    { path: '/settings', component: Settings, name: 'ClockBox - AdminSettings' },
    { path: '/dashboard', component: Dashboard, name: 'ClockBox - AdminDashboard' },
    { path: '/pointing', component: Pointing, name: 'ClockBox - Pointing' },
    { path: '/employees', component: Employees, name: 'ClockBox - Employees' },
    { path: '/planning', component: Planning, name: 'ClockBox - Planning' },
    { path: '/leave', component: Leave, name: 'ClockBox - Leave' },

    // Employee
    { path: '/edashboard', component: EDashbord, name: 'ClockBox - EDashbord' },
    { path: '/epointing', component: EPointing, name: 'ClockBox - EPointing' },
    { path: '/eplanning', component: EPlanning, name: 'ClockBox - EPlanning' },
    { path: '/eleave', component: ELeave, name: 'ClockBox - ELeave' },

    { path: '/', redirect: '/login' }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = isAuthenticated();

    if (authRequired && !loggedIn) {
        return next('/login');
    }

    if (loggedIn && publicPages.includes(to.path)) {
        return next('/dashboard');
    }
    next();
});

export default router;
