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
        getRestaurants(slug) {
            if (slug) endpoint = `http://localhost:8000/api/categories/${slug}/restaurants`;
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
        <div class="main-content pt-5">
            <!--Sidebar-->
            <nav class="side-bar">
                <h2>Filtri</h2>
                <div class="side-categories-filter">
                    <!--Lista delle Categorie-->
                    <CategoriesList :categories="categories" @get-restaurants="getRestaurants" />
                </div>
            </nav>
            <div>
                <div class="page-path align-items-center mb-5">
                    <div class="text-decoration-underline text-center">Roma </div>
                    <div><font-awesome-icon :icon="['fas', 'chevron-right']" :size="'xs'" /></div>
                    <div><strong> Ristoranti</strong></div>
                </div>

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
    gap: 20px;
}

.side-bar {
    flex-shrink: 0;
    flex-basis: 220px;
    display: none;
}

.page-path {
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

    .page-path {
        display: flex;
    }
}
</style>