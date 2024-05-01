<script>
import axios from 'axios';
const defaultEndpoint = 'http://localhost:8000/api/restaurants/';
export default {
    name: 'RestaurantShow',
    data: () => ({
        restaurant: null,
        dishes: null,
    }),
    methods: {

        fetchRestaurantAndDishes() {
            //Recupero lo slug
            const slug = this.$route.params.slug
            //Costruisco l'endpoint
            axios.get(`${defaultEndpoint}${slug}`)
                .then(res => {
                    //Faccio il destructuring
                    const { restaurant, restaurant_dishes } = res.data;
                    //Recupero i dati del ristorante
                    this.restaurant = restaurant
                    //prendo solo i piatti del ristorante
                    this.dishes = restaurant_dishes['dishes']
                })
                .catch(err => {
                    console.error(err.message)
                })
                .then(() => { })
        }
    },
    created() {
        this.fetchRestaurantAndDishes()
    }
}
</script>

<template>
    <h1>Ciao</h1>
    <!--Informazioni del Ristorante-->
    <ul>
        <li>{{ restaurant.restaurant_name }}</li>
        <li>{{ restaurant.city }}</li>
        <li>{{ restaurant.address }}</li>
        <li>{{ restaurant.cap }}</li>
        <li>{{ restaurant.phone }}</li>
        <li>{{ restaurant.image }}</li>
    </ul>

    <div class="row mt-3">
        <div class="col-12 col-md-6 col-lg-4" v-for="dish in dishes" :key="dish.id">
            <!-- Dish Card -->
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
        </div>
    </div>
</template>

<style></style>