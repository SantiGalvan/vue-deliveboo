<script>
import axios from 'axios';
const defaultEndpoint = 'http://localhost:8000/api/restaurants/';
export default {
    name: 'HomePage',
    data: () => ({
        restaurants: [],
        categories: [],
    }),
    methods: {
        getRestaurants() {
            axios.get(defaultEndpoint)
                .then(res => { this.restaurants = res.data.restaurants; this.categories = res.data.categories })
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
    <ul>
        <li v-for="category in categories" :key="category.id">{{ category.label }}</li>
    </ul>
</template>

<style></style>