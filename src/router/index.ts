import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Settings from "../components/Setting.vue";
import Dashboard from "../components/Dashboard.vue";
import Pointing from "../components/Pointing.vue";
import Employees from "../components/Employees.vue";
import Planning from "../components/Planning.vue";

import EDashbord from "../components/Employee/E-Dashbord.vue";
import EPointing from "@/components/Employee/E-Pointing.vue";
import EPlanning from "@/components/Employee/E-Planning.vue";


const routes = [
    //Admin
    { path: '/login', component: Login, name: 'ClockBox - Connexion' },
    { path: '/register', component: Register, name: 'ClockBox - Inscription' },
    { path: '/settings', component: Settings, name: 'ClockBox - AdminSettings' },
    { path: '/dashboard', component: Dashboard, name: 'ClockBox - AdminDashboard' },
    { path: '/pointing', component: Pointing, name: 'ClockBox - Pointing' },
    { path: '/employees', component: Employees, name: 'ClockBox - Employees' },
    { path: '/planning', component: Planning, name: 'ClockBox - Planning' },

    //Employee
    { path: '/edashboard', component: EDashbord, name: 'ClockBox - EDashbord' },
    { path: '/epointing', component: EPointing, name: 'ClockBox - EPointing' },
    { path: '/eplanning', component: EPlanning, name: 'ClockBox - EPlanning' },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
