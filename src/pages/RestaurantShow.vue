<script>
import axios from 'axios';
import { store } from '../data/store';

const defaultEndpoint = 'http://localhost:8000/api/restaurants/';

export default {
    name: 'RestaurantShow',
    emits: ['dish-cart', 'remove-dish'],
    props: { cartDishes: Array },
    data: () => ({
        restaurant: {},
        dishes: {},
        store
    }),
    methods: {

        fetchRestaurantAndDishes() {
            // Setto la flag del loder a true
            store.isLoading = true;

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
                .then(() => {
                    // Setto la flag del loder a false
                    store.isLoading = false;
                })
        },
        formattedPrice(price) {
            return price.replace('.', ',')
        },
        showMinus(id) {
            if (!this.cartDishes.length) return false;

            const minus = this.cartDishes.find(dish => dish.id === id)
            return minus;
        },
        calculateTotal() {
            let totalOrder = 0;
            this.cartDishes.forEach(dish => {
                totalOrder += parseFloat(dish.price);
            });
            return totalOrder.toFixed(2)
        }
    },
    created() {
        this.fetchRestaurantAndDishes()
    }
}
</script>

<template>
    <section id="restaurant-show">
        <div class="container py-4">

            <!-- Titolo e categorie -->
            <div class="d-flex align-items-center">
                <h1>{{ restaurant.restaurant_name }}</h1>
                <ul class="d-flex gap-3 align-items-center mb-0 list-filter">
                    <li v-for="category in restaurant.categories">
                        <div class="icon-bg selected">
                            <img :src="category.img" :alt="category.label" class="category-image-sm">
                        </div>
                    </li>
                </ul>
            </div>

            <!-- Piatti e carrello -->
            <div class="row mt-3">

                <!-- Piatti -->
                <div class="col">

                    <!-- Titolo -->
                    <div class="d-flex align-items-center">
                        <img src="/src/assets/img/menu.png" alt="Menu" class="menu-img">
                        <h3 class="mb-0">Menu</h3>
                    </div>

                    <!-- Card dei piatti -->
                    <div v-for="dish in dishes" class="dish-card border-1 border-bottom border-secondary-subtle">
                        <div class="row">
                            <div class="col-3">
                                <img :src="dish.image" :alt="dish.name" class="dish-img">
                            </div>
                            <div class="col">
                                <h6>{{ dish.name }}</h6>
                                <p>{{ dish.ingredients }}</p>
                            </div>
                            <div class="col-2">
                                <h6 class="mb-5 text-center">{{ formattedPrice(dish.price) }}€</h6>
                                <div class="d-flex">

                                    <!-- Bottone Rimozione -->
                                    <button v-if="showMinus(dish.id)" @click="$emit('remove-dish', dish)"
                                        class="dish-btn">
                                        <FontAwesomeIcon :icon="['fas', 'minus']" />
                                    </button>

                                    <!-- Bottone Aggiunta -->
                                    <button @click="$emit('dish-cart', dish)" class="dish-btn ms-auto">
                                        <FontAwesomeIcon :icon="['fas', 'plus']" />
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Bottone CheckOut -->
                <button v-if="cartDishes.length" class="btn btn-success w-75 m-auto rounded-5 price-btn d-md-none">
                    Ordinane {{ cartDishes.length }} a {{ calculateTotal() }}
                </button>

                <!-- Carrello -->
                <div class="d-none col"></div>
            </div>

        </div>
    </section>
</template>

<style lang="scss" scoped>
#restaurant-show {
    ul {
        list-style: none;
    }
}

.list-filter {
    .icon-bg {
        border-radius: 39% 61% 45% 55% / 62% 56% 44% 38%;
        background-color: #27cabc56;
        padding: 12px;

        &.selected {
            background-color: #2CCCBC;
        }

        img {
            width: 30px;
            height: auto;
            margin: auto;
        }
    }


    span {
        font-size: 16px;
        font-weight: 500;
    }
}

.menu-img {
    width: 40px;
    height: auto;
}

.dish-card {

    padding: 30px 0;

    .dish-img {
        height: 120px;
        margin: 0;
        width: 120px;
        border-radius: 20px;
    }

    transition: transform 0.3s ease;
    cursor: pointer;

    &:hover {
        transform: scale(1.03);

    }

}

.dish-btn {
    border-radius: 50%;
    border: 0;
    color: #2CCCBC;
    background-color: #00a08323;
}

.price-btn {
    position: fixed;
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
}
</style>