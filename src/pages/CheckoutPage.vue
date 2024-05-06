<script>
import CartDetail from '../components/cart/CartDetail.vue';
import { store } from '../data/store';
export default {
    name: 'CheckoutPage',
    components: { CartDetail },
    data: () => ({
        store,
        cartDishes: store.cartDishes,
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
    },
}
</script>

<template>
    <h1>Checkout</h1>
    <!-- Inserisco le informazioni del ristorante in cui sto effettuando l'ordine -->
    <section id="checkout-restaurant-info"> 
        <!-- <ul>
            <li>Il tuo ordine presso {{ cartRestaurant.restaurant_name }}</li>
            <li>{{ cartRestaurant.city }}</li>
            <li>{{ cartRestaurant.address }}</li>
            <li>{{ cartRestaurant.cap }}</li>
            <li>{{ cartRestaurant.phone }}</li>
            <li>{{ cartRestaurant.image }}</li>
        </ul> -->
    </section>
    <!-- Di seguito trovo le informazioni dei prodotti inseriti nel carrello -->
    <section id="checkout-cart">
        <CartDetail :cartDishes="cartDishes" @remove-from-cart="removeFromCart" @handle-dish="handleDish" @remove-row="removeRow"  @empty-cart="emptyCart" />
    </section>
    <!-- Form in cui inserirò le informazioni del cliente -->
    <section id="checkout-info">

    </section>
    <!-- Display del pagamento -->
    <section id="checkout-payment">

    </section>

</template>

<style lang="scss" scoped></style>