<script>
import axios from 'axios';
import RestaurantsList from '../components/restaurants/RestaurantsList.vue';
import CategoriesList from '../components/categories/CategoriesList.vue';
import HomeHero from '../components/home/HomeHero.vue';
import { Logger } from 'sass';
import { faBreadSlice } from '@fortawesome/free-solid-svg-icons';

const defaultEndpoint = 'http://localhost:8000/api/restaurants/';
let endpoint = null;

export default {
    name: 'HomePage',
    components: { RestaurantsList, CategoriesList, HomeHero },
    data: () => ({
        restaurants: [],
        categories: [],
        category: null,
    }),
    methods: {

        //Chiamata axios per ricevere i ristoranti e le categorie
        getRestaurants(slug) {

            if (slug) {
                endpoint = `http://localhost:8000/api/categories/${slug}/restaurants`;
            } else {
                endpoint = defaultEndpoint;
            }
            axios.get(endpoint)
                .then(res => {
                    const { restaurants, categories } = res.data;
                    this.restaurants = restaurants;
                    this.categories = categories
                    this.category = slug
                })
                .catch(err => {
                    console.error(err.message)
                })
                .then(() => { })
        },

        //Funzione per rendere la prima lettera maiuscola
        capitalize(string) {
            if (!string) {
                return '';
            }
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    },
    created() {
        this.getRestaurants();
    }
}
</script>

<template>

    <!-- Hero -->
    <HomeHero />

    <!-- Home Page -->
    <section class="container-fluid container-lg mb-5" id="home-page">
        <div class="d-lg-none upper-categories-filter">
            <!--Lista delle Categorie-->
            <CategoriesList :categories="categories" @get-restaurants="getRestaurants" />
        </div>
        <!--Contenuto Principale-->
        <div class="main-content pt-5">
            <!--Sidebar-->
            <nav class="side-bar d-none d-lg-block">
                <h3 class="mb-0 pt-2">Filtri</h3>
                <div class="side-categories-filter">
                    <!--Lista delle Categorie-->
                    <CategoriesList :categories="categories" @get-restaurants="getRestaurants" />
                </div>
            </nav>
            <div class="w-100">
                <h1 class="d-inline">Ristoranti</h1>
                <h1 class="d-inline" v-if="category">: {{ capitalize(category) }}</h1>
                <!--Lista dei Ristoranti-->
                <RestaurantsList :restaurants="restaurants" :categories="categories" />
            </div>
        </div>
    </section>
</template>

<style>
.main-content {
    display: flex;
    gap: 20px;
}

.side-bar {
    flex-shrink: 0;
    flex-basis: 220px;
}
</style>