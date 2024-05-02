<script>
import axios from 'axios';
const defaultEndpoint = 'http://localhost:8000/api/restaurants/';
export default {
    name: 'RestaurantShow',
    // emits: { dishCart: this.dish },
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
    <section class="container-fluid container-lg mb-5" id="restaurant-detail">
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
                <!-- Dish Card --> <!--Questo sarà un componente Card-->
                <div class="card my-3">
                    <div class="row g-0">
                        <div class="img-card col-md-5">
                            <img v-if="dish.image" :src="`http://127.0.0.1:8000/storage/${dish.image}`"
                                class="img-fluid rounded-start" :alt="dish.name">
                        </div>
                        <div class="col-md-7">
                            <div class="card-body d-flex justify-content-between">
                                <span>{{ dish.name }}</span>
                                <div>
                                    <button type="button" @click="$emit('dish-cart', dish)"><font-awesome-icon
                                            :icon="['fas', 'plus']" /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.img-card {
    height: 200px;


    img {
        height: 100%;
        width: 100%;
    }
}
</style>