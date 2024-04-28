<script>
import axios from 'axios';
import RestaurantsList from '../components/restaurants/RestaurantsList.vue';
const defaultEndpoint = 'http://localhost:8000/api/restaurants/';
let endpoint = null;
export default {
    name: 'RestaurantPage',
    components: { RestaurantsList },
    data: () => ({
        restaurants: [],
        categories: [],
    }),
    methods: {
        getRestaurants(id) {
            if (id) endpoint = `http://localhost:8000/api/categories/${id}/restaurants`;
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
    <div class="container-fluid container-lg">
        <!--Questo sarà un comnponente-->
        <ul class="d-flex list-unstyled gap-3 justify-content-center flex-wrap py-5">
            <!--Categoria-->
            <RouterLink :to="{ name: 'category-restaurants', params: { id: category.id } }"
                v-for="category in categories" :key="category.id" @click="getRestaurants(category.id)">
                <li>
                    {{ category.label }}
                </li>
            </RouterLink>
        </ul>
        <!--Contenuto Principale-->
        <div class="main-content">
            <!--Sidebar-->
            <nav class="side-bar">

            </nav>
            <div>
                <h1>Ristoranti</h1>
                <RestaurantsList :restaurants="restaurants" :categories="categories" />
            </div>
        </div>
    </div>
</template>

<style>
.main-content {
    display: flex;
}

.side-bar {
    background-color: black;
    flex-shrink: 0;
    flex-basis: 220px;
    display: none;
}

/*************** SOPRA I 992 PX (lg)********************/
@media screen and (min-width:992px) {

    /* LA SIDE BAR AUMENTA DI LARGHEZZA*/
    .side-bar {
        display: block;
    }
}
</style>