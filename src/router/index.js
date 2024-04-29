//Importo le funzioni di Vue Router
import { createRouter, createWebHistory } from 'vue-router';
//Importo le Pagine
import HomePage from '../pages/HomePage.vue';

//Definisco le rotte
const router = createRouter({
    history: createWebHistory(),

    linkActiveClass: 'partial-active',
    linkExactActiveClass: 'active',
    routes: [
        { path: '/', name: 'home', component: HomePage },
        { path: '/categories/:slug/restaurants', name: 'category-restaurants', component: HomePage },
    ]
});
export { router }