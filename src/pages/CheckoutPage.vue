<script>
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
    data: () => ({
        store,
        cartDishes: store.cartDishes,
        restaurant: [],
        tokenApi: ''
    }),
    methods: {

        //Mando l'evento al componente padre tramite metodo
        handleDish(dish) {
            this.$emit('handle-dish', dish);
        },

        //Mando l'evento al componente padre tramite metodo
        removeFromCart(dish) {
            this.$emit('remove-from-cart', dish);
        },

        //Mando l'evento al componente padre tramite metodo
        removeRow(dish) {
            this.$emit('remove-row', dish);
        },

        //Mando l'evento al componente padre tramite metodo
        emptyCart() {
            this.$emit('empty-cart');
        },

        getRestaurant() {
            // Setto la flag del loder a true
            store.isLoading = true;
            const restaurantId = this.cartDishes[0]?.restaurant_id;
            axios.get(`${endpoint}/${restaurantId}`)
                .then(res => {
                    this.restaurant = res.data;
                    console.log(this.restaurant);
                })
                .catch(err => {
                    console.error(err.message)
                })
                .then(() => {
                    // Setto la flag del loder a false
                    store.isLoading = false;
                })
        }
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
    <div class="container">
        <h1>Checkout</h1>
        <!--Mostro il dettaglio del carrello solo 
        se c'è almeno un piatto nel carrello-->
        <div v-if="cartDishes.length">
            <!-- Inserisco le informazioni del ristorante in cui sto effettuando l'ordine -->
            <section id="checkout-restaurant-info">
                <ul>
                    <p>{{ restaurant.length }}</p>
                    <li>Il tuo ordine presso {{ restaurant.restaurant_name }}</li>
                    <li>{{ restaurant.city }}</li>
                    <li>{{ restaurant.address }}</li>
                    <li>{{ restaurant.cap }}</li>
                    <li>{{ restaurant.phone }}</li>
                    <li>{{ restaurant.image }}</li>
                </ul>
            </section>
            <!-- Di seguito trovo le informazioni dei prodotti inseriti nel carrello -->
            <section id="checkout-cart">
                <CartDetail :cartDishes="cartDishes" @remove-from-cart="removeFromCart" @handle-dish="handleDish"
                    @remove-row="removeRow" @empty-cart="emptyCart" />
            </section>
            <!-- Form in cui inserirò le informazioni del cliente -->
            <section id="checkout-info">

            </section>
            <!-- Display del pagamento -->
            <section id="checkout-payment">
                <!-- Importo il componente del pagamento -->
                <PaymentComponent :authorization="tokenApi" />
            </section>
        </div>

        <!--Altrimenti mostro il redirect ai ristoranti-->
        <div v-else>
            <span>Non ci sono articoli nel carrello </span>
            <RouterLink :to="{ name: 'home' }">
                <button class="btn btn-primary"><font-awesome-icon :icon="['fas', 'arrow-left']" /> Va ai
                    Ristoranti</button>
            </RouterLink>
        </div>
    </div>

</template>

<style lang="scss" scoped></style>