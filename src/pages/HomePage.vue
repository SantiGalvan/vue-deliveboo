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
        selectedCategories: [],
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
    computed: {
        //Computed per filtrare i ristoranti in base una o più categorie
        filteredRestaurants() {
            //Controllo se non ci sono categorie selezionate
            if (this.selectedCategories.length === 0) {
                //Restituisco tutti i Ristoranti
                return this.restaurants;
            } else {
                //Faccio un filtro su restaurants
                return this.restaurants.filter(restaurant =>
                    /*Verifico se alcune delle sue categorie è contenuta
                     nell'array selectedCategories*/
                    restaurant.categories.some(category =>
                        this.selectedCategories.includes(category.id)
                    )
                );
            }
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
            <!--Lista Categorie-->
            <div>
                <div v-for="category in categories" :key="category.id">
                    <input type="checkbox" :value="category.id" v-model="selectedCategories">
                    <label>{{ category.label }}</label>
                </div>
            </div>
        </div>
        <!--Contenuto Principale-->
        <div class="main-content pt-5">
            <!--Sidebar-->
            <nav class="side-bar d-none d-lg-block">
                <h3 class="mb-0 pt-2">Filtri</h3>
                <div class="side-categories-filter">
                    <!--Lista Categorie-->
                    <div class="mt-4">
                        <div v-for="category in categories" :key="category.id">
                            <input type="checkbox" :value="category.id" v-model="selectedCategories">
                            <label class="ms-2">{{ category.label }}</label>
                        </div>
                    </div>
                </div>
            </nav>
            <div class="w-100">
                <h1 class="d-inline">Ristoranti</h1>
                <h1 class="d-inline" v-if="category">: {{ capitalize(category) }}</h1>
                <!--Lista dei Ristoranti-->
                <RestaurantsList :filteredRestaurants="filteredRestaurants" />
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