<script>
import axios from 'axios';
const defaultEndpoint = 'http://localhost:8000/api/restaurants/';
export default {
    name: 'RestaurantShow',
    data: () => ({
        name: null,
        city: null,
        address: null,
        cap: null,
        phone: null,
        image: null,
        dishes: null,
    }),
    methods: {
        fetchDishes() {
            const slug = this.$route.params.slug
            console.log(slug)
            axios.get(`${defaultEndpoint}${slug}`)
                .then(res => {
                    this.name = res.data['restaurant_name'];
                    this.city = res.data['city'];
                    this.address = res.data['address'];
                    this.cap = res.data['cap'];
                    this.phone = res.data['phone'];
                    this.image = res.data['image'];
                    this.dishes = res.data['dishes']
                })
                .catch(err => {
                    console.error(err.message)
                })
                .then(() => { })
        }
    },
    created() {
        this.fetchDishes()
    }
}
</script>

<template>
    <h1>Ciao</h1>
    <ul>
        <li>{{ name }}</li>
        <li>{{ city }}</li>
        <li>{{ address }}</li>
        <li>{{ cap }}</li>
        <li>{{ phone }}</li>
        <li>{{ image }}</li>

    </ul>
    <div class="row mt-3">
        <div class="col-12 col-md-6 col-lg-4" v-for="dish in dishes" :key="dish.id">
            <!-- Dish Card -->
            <!-- <RouterLink :to="{ name: 'restaurant-show', params: { slug: restaurant.slug } }"> -->
            <div class="card my-3">
                <div class="row">
                    <div class="col-12">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <h5 class="card-title">{{ dish.name }}</h5>
                        </div>
                        <div class="card-body">
                            <img v-if="dish.image" :src="`http://127.0.0.1:8000/storage/${dish.image}`"
                                class="float-start img-fluid" :alt="dish.name">
                        </div>
                    </div>
                </div>
            </div>
            <!-- </RouterLink> -->
        </div>
    </div>
</template>

<style></style>