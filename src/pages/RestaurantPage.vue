<script>
import axios from 'axios';
import RestaurantsList from '../components/restaurants/RestaurantsList.vue';
const defaultEndpoint = 'http://localhost:8000/api/restaurants/';
export default {
    name: 'RestaurantPage',
    components: { RestaurantsList },
    data: () => ({
        restaurants: [],
        categories: [],
    }),
    methods: {
        getRestaurants() {
            axios.get(defaultEndpoint)
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
        <h1>Restaurant page</h1>
        <RestaurantsList :restaurants="restaurants" />
    </div>
</template>

<style></style>