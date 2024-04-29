<script>
import axios from 'axios';
import RestaurantsList from '../components/restaurants/RestaurantsList.vue';
import CategoriesList from '../components/categories/CategoriesList.vue';
import HomeHero from '../components/home/HomeHero.vue';

const defaultEndpoint = 'http://localhost:8000/api/restaurants/';
let endpoint = null;

export default {
    name: 'HomePage',
    components: { RestaurantsList, CategoriesList, HomeHero },
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
                <h2>Filtri</h2>
                <div class="side-categories-filter">
                    <!--Lista delle Categorie-->
                    <CategoriesList :categories="categories" @get-restaurants="getRestaurants" />
                </div>
            </nav>
            <div>
                <div class="d-none d-lg-flex page-path align-items-center mb-5">
                    <RouterLink :to="{ name: 'home' }" class="text-decoration-none text-dark">
                        <div class="text-decoration-underline me-1">Home </div>
                    </RouterLink>
                    <div><font-awesome-icon :icon="['fas', 'chevron-right']" :size="'xs'" /></div>
                    <div class="ms-1"><strong> Ristoranti</strong></div>
                </div>

                <h1>Ristoranti</h1>
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