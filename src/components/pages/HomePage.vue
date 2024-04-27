<script>
import axios from 'axios';
import RestaurantsList from './restaurants/RestaurantsList.vue';
const defaultEndpoint = 'http://localhost:8000/api/restaurants/';
export default {
    name: 'HomePage',
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
    <h1>PasqEat</h1>
    <RestaurantsList :restaurants="restaurants" />
</template>

<style></style>