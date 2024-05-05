<script>
import CartDetail from '../components/cart/CartDetail.vue';
import { store } from '../data/store';
export default {
    name: 'CheckoutPage',
    components: { CartDetail },
    data: () => ({
        store,
        cartDishes: store.cartDishes
    }),
    methods: {

        //Mando l'evento al componente padre tramite metodo
        handleDish(dish) {
            this.$emit('handle-dish', dish);
        },

        //Mando l'evento al componente padre tramite metodo
        removeFromCart(dish) {
            this.$emit('remove-from-cart', dish);
        }
    },
}
</script>

<template>
    <h1>Checkout</h1>
    <CartDetail :cartDishes="cartDishes" @remove-from-cart="removeFromCart" @handle-dish="handleDish" />



</template>

<style lang="scss" scoped></style>