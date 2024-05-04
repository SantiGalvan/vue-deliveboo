<script>
import { store } from '../store';

//import CartCanvas from '../components/CartCanvas.vue';

export default {
    name: 'CheckoutPage',
    components: {},
    data: () => ({
        cartDishes : store.cartDishes,
    }),

}
</script>

<template>
    <h1>Checkout</h1>

   

</template>

<style lang="scss" scoped>

</style>