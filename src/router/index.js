//Importo le funzioni di Vue Router
import { createRouter, createWebHistory } from 'vue-router';
//Importo le Pagine
import HomePage from '../pages/HomePage.vue';
import RestaurantShow from '../pages/RestaurantShow.vue'
// import RestaurantsList from '../components/restaurants/RestaurantsList.vue';

//Definisco le rotte
const router = createRouter({
    history: createWebHistory(),

    linkActiveClass: 'partial-active',
    linkExactActiveClass: 'active',
    routes: [
        { path: '/', name: 'home', component: HomePage },
        { path: '/restaurants', name: 'restaurants', component: HomePage },
        {
            path: '/restaurants/:slug', name: 'restaurant-show', component: RestaurantShow
        },
        // { path: '/categories/:slug/restaurants', name: 'category-restaurants', component: HomePage },
    ]
});
export { router }