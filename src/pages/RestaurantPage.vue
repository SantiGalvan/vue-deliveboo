<script>
import axios from 'axios';
import RestaurantsList from '../components/restaurants/RestaurantsList.vue';
import CategoriesList from '../components/categories/CategoriesList.vue';
const defaultEndpoint = 'http://localhost:8000/api/restaurants/';
let endpoint = null;
export default {
    name: 'RestaurantPage',
    components: { RestaurantsList, CategoriesList },
    data: () => ({
        restaurants: [],
        categories: [],
    }),
    methods: {
        getRestaurants(id) {
            if (id) endpoint = `http://localhost:8000/api/categories/${id}/restaurants`;
            axios.get(endpoint ?? defaultEndpoint)
                .then(res => {
                    const { restaurants, categories } = res.data;
                    this.restaurants = restaurants;
                    this.categories = categories
                })
                .catch(err => {
                    console.error(err.message)
                })
                .then(() => { })
        }
    },
    created() {
        this.getRestaurants();
    }
}
</script>

<template>
    <div class="container-fluid container-lg">
        <div class="upper-categories-filter">
            <!--Lista delle Categorie-->
            <CategoriesList :categories="categories" @get-restaurants="getRestaurants" />
        </div>
        <!--Contenuto Principale-->
        <div class="main-content">
            <!--Sidebar-->
            <nav class="side-bar">
                <h2>Filtri</h2>
                <div class="side-categories-filter">
                    <!--Lista delle Categorie-->
                    <CategoriesList :categories="categories" @get-restaurants="getRestaurants" />
                </div>
            </nav>
            <div>
                <h1>Ristoranti</h1>
                <!--Lista dei Ristoranti-->
                <RestaurantsList :restaurants="restaurants" :categories="categories" />
            </div>
        </div>
    </div>
</template>

<style>
.main-content {
    display: flex;
}

.side-bar {
    flex-shrink: 0;
    border: 1px solid black;
    flex-basis: 220px;
    display: none;
}

/*************** SOPRA I 992 PX (lg)********************/
@media screen and (min-width:992px) {

    /* LA SIDE BAR AUMENTA DI LARGHEZZA*/
    .side-bar {
        display: block;
    }

    .upper-categories-filter {
        display: none;
    }
}
</style>