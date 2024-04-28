//Importo le funzioni di Vue Router
import { createRouter, createWebHistory } from 'vue-router';
//Importo le Pagine
import HomePage from '../pages/HomePage.vue';
import RestaurantPage from '../pages/RestaurantPage.vue';

//Definisco le rotte
const router = createRouter({
    history: createWebHistory(),

    linkActiveClass: 'partial-active',
    linkExactActiveClass: 'active',
    routes: [
        { path: '/', name: 'home', component: HomePage },
        // { path: '/restaurants-categories', name: 'restaurants-categories-page', component: RestaurantPage },
        { path: '/categories/:id/restaurants', name: 'category-restaurants', component: RestaurantPage },



    ]
});
export { router }