<script>
// Rimuovi questo import
// import axios from axios
import axios from 'axios';
import CartDetail from '../components/cart/CartDetail.vue';
import PaymentComponent from '../components/cart/PaymentComponent.vue';

//registro lo store
import { store } from '../data/store';

// Dichiaro gli endpoint da utilizzare nelle chiamate
const endpoint = 'http://localhost:8000/api/restaurants/restaurant';
const tokenGenerateEndpoint = 'http://127.0.0.1:8000/api/orders/generate'

export default {
    name: 'CheckoutPage',
    components: { CartDetail, PaymentComponent },
    // Cambia il nome della prop qui
    props: { showCart: Boolean },
    emits: ['toggle-cart', 'remove-from-cart', 'handle-dish', 'remove-row', "empty-cart"],
    data: () => ({
        store,
        cartDishes: store.cartDishes,
        restaurant: [],
        tokenApi: ''
    }),
    methods: {
        getRestaurant() {
            // Setto la flag del loder a true
            store.isLoading = true;
            const restaurantId = this.cartDishes[0]?.restaurant_id;
            axios.get(`${endpoint}/${restaurantId}`)
                .then(res => {
                    this.restaurant = res.data;
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
    },
    computed: {
        /*Faccio un ciclo su i piatti contenuti in cartItems
        se groupedItems non contiene l'id del piatto
        viene pushato altrimenti vuiene aumentata la quantita 
        del piatto */
        groupedCartDishes() {
            const groupedDishes = {};
            this.cartDishes.forEach(dish => {
                if (!groupedDishes[dish.id]) {
                    groupedDishes[dish.id] = { ...dish };
                } else {
                    groupedDishes[dish.id].quantity += 1;
                }
            });
            return Object.values(groupedDishes);
        },
        /*Calcolo il totale dell'ordine
        sommando i prezzi dei piatti in cartItems*/
        calculateTotal() {
            let totalOrder = 0;
            this.cartDishes.forEach(dish => {
                totalOrder += parseFloat(dish.price);
            });
            return totalOrder.toFixed(2)
        },
    },

    // Watch per monitorare le modifiche di store.cartDishes
    watch: {
        'store.cartDishes': function (newCartDishes) {
            // Aggiorna cartDishes con i nuovi dati dello store
            this.cartDishes = newCartDishes;
        }
    },
    created() {
        this.getRestaurant();
    },
    mounted() {
        axios.get(tokenGenerateEndpoint)
            .then(res => {
                this.tokenApi = res.data.token
            })
    }
}
</script>

<template>
    <section id="restaurant-show">
        <div class="container py-4">

            <!-- Torna Indietro -->
            <RouterLink :to="{ name: 'home' }" class="btn rounded-5 border-0 mt-2">
                <font-awesome-icon :icon="['fas', 'arrow-left']" /> Torna indietro
            </RouterLink>

            <!-- Piatti e carrello -->
            <div class="row mt-3">
                <h1 class="text-center mb-5">{{ restaurant.restaurant_name }}</h1>

                <!-- Carrello -->
                <div class="col-12 col-sm-12 col-md-12 col-lg-5 mb-6">
                    <div class="cart-card">
                        <!-- Titolo -->
                        <div class="d-flex align-items-center justify-content-center cart-title gap-2">
                            <img src="/src/assets/img/shopping-bag.png" alt="Carrello" class="menu-img">
                            <h3 class="mb-0">Il tuo ordine</h3>
                        </div>

                        <!-- Contenuto del Carello -->
                        <div class="cart-content">
                            <div class="row align-items-center my-3" v-for="dish in groupedCartDishes" :key="dish.id">

                                <!-- Quantità - Nome prodotto - Prezzo -->
                                <div class="col-2 text-end">

                                    <!-- Quantità -->
                                    <p class="fs-5 mb-0"><strong>{{ dish.quantity }}x</strong></p>
                                </div>
                                <div class="col">

                                    <!-- Nome del prodotto -->
                                    <p class="fs-5 mb-0 lh-1 fw-medium">{{ dish.name }}</p>
                                </div>
                                <div class="col-3">

                                    <!-- Prezzo -->
                                    <p class="fs-5 mb-0"><strong>{{ formattedPrice(dish.price) }} €</strong></p>
                                </div>

                                <!-- Bottoni Carrello -->
                                <div class="col-12 d-flex justify-content-around align-items-center py-4">

                                    <!-- Bottone Rimozione -->
                                    <button @click="$emit('remove-from-cart', dish)" class="dish-btn">
                                        <FontAwesomeIcon :icon="['fas', 'minus']" />
                                    </button>

                                    <!-- Bottone rimozione riga -->
                                    <button @click="$emit('remove-row', dish)" class="btn btn-sm btn-remove rounded-5">
                                        Rimuovi
                                    </button>

                                    <!-- Bottone Aggiunta -->
                                    <button @click="$emit('dish-cart', dish)" class="dish-btn">
                                        <FontAwesomeIcon :icon="['fas', 'plus']" />
                                    </button>

                                </div>

                            </div>
                        </div>

                        <!-- Bottone CheckOut lg -->
                        <div class="d-flex align-items-center justify-content-around btn-container mb-2">
                            <p class="fs-5 mb-0 lh-1 fw-medium">Prezzo Totale: {{ calculateTotal }}€ </p>
                        </div>

                    </div>
                </div>

                <!--TODO Col per il form futuro -->
                <div class="col-12 col-sm-12 col-md-12 col-lg-6">
                </div>
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

.btn {
    color: #fff;
    font-weight: 600;
    text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.7);

    background-color: #ffb10a;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;

    &:hover {
        background-color: #ffc342;
        color: #fff;
    }
}

// Da cambiare
.btn-remove {
    background-color: #F73F34;

    &:hover {
        background-color: red;
        color: #fff;
    }
}

.cart-card {
    background-color: #fff;
    box-shadow: rgba(50, 50, 93, 0.2) 0px 13px 27px -5px, rgba(0, 0, 0, 0.2) 0px 8px 16px -8px;

    border-radius: 20px;

    position: sticky;
    left: 0;
    top: 0;
}

.cart-title {
    height: 100px;
}

.btn-container {
    height: 80px;
}

.cart-content {
    min-height: calc(400px - 180px);
    max-height: calc(700px - 180px);
    overflow: auto;
    overflow-x: hidden;
}


// Scrollbar
.cart-content::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

.cart-content::-webkit-scrollbar-thumb {
    background-color: #ffb10a;
    border-radius: 4px;
}

.cart-content::-webkit-scrollbar-thumb:hover {
    background-color: #ffc342;
}

.cart-content::-webkit-scrollbar-track {
    background-color: transparent;
}
</style>