<script>
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
        <div class="col-12 col-md-6 col-lg-4" v-if="restaurants?.length" v-for="restaurant in restaurants"
            :key="restaurant.id">
            <!-- ProjectCard -->
            <div class="card my-3">
                <div class="row">
                    <div class="col-12">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <h5 class="card-title">{{ restaurant.restaurant_name }}</h5>
                        </div>
                        <div class="card-body">
                            <img v-if="restaurant.image" :src="restaurant.image" class="float-start img-fluid"
                                :alt="restaurant.restaurant_name">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <h4 v-else>Non ci sono Ristoranti</h4>
    </div>


</template>

<style></style>