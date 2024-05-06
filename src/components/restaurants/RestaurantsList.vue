<script>
import { RouterLink } from 'vue-router';

export default {
    name: 'RestaurantsList',
    props: { restaurants: Array },
    data: () => ({
    }),
    methods: {
    },
}
</script>

<template>
    <div class="row mt-3">
        <div class="col-12 col-sm-6 col-md-6 col-lg-4 my-3" v-if="restaurants?.length" v-for="restaurant in restaurants"
            :key="restaurant.id">

            <!-- RestaurantctCard -->
            <RouterLink class="text-decoration-none"
                :to="{ name: 'restaurant-show', params: { slug: restaurant.slug } }">
                <div class="card rounded-4">
                    <img v-if="restaurant.image" :src="restaurant.image" class="img-fluid"
                        :alt="restaurant.restaurant_name">
                </div>
                <h5 class="mt-3 ms-2 text-black">{{ restaurant.restaurant_name }}</h5>
            </RouterLink>
        </div>
        <h4 v-else>Non ci sono Ristoranti</h4>
    </div>


</template>

<style></style>