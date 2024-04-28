<script>
import axios from 'axios';
import RestaurantsList from '../components/restaurants/RestaurantsList.vue';
const defaultEndpoint = 'http://localhost:8000/api/restaurants/';
const endpoint = 'http://localhost:8000/api/';
export default {
    name: 'RestaurantPage',
    components: { RestaurantsList },
    data: () => ({
        restaurants: [],
        categories: [],
    }),
    methods: {
        getRestaurants(endpoint) {
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
    <div class="container-fluid">
        <ul class="d-flex list-unstyled gap-3 justify-content-center flex-wrap">
            <!--Categoria-->
            <RouterLink :to="{ name: 'category-restaurants', params: { id: category.id } }"
                v-for="category in categories" :key="category.id" @click="getRestaurants(category.id)">
                <li>
                    {{ category.label }}
                </li>
            </RouterLink>
        </ul>
        <h1>Ristoranti</h1>
        <RestaurantsList :restaurants="restaurants" />
    </div>
</template>

<style></style>