<script>
import CartDetail from '../components/cart/CartDetail.vue';
export default {
    name: 'CheckoutPage',
    components: { CartDetail },
    data: () => ({
        cartDishes: [],
    }),
    methods: {
        getCartDishes() {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                this.cartDishes = JSON.parse(savedCart);
            }
            console.log(this.cartDishes);
        },

        //Mando l'evento al componente padre tramite metodo
        handleDish(dish) {
            this.$emit('handle-dish', dish);
        },

        //Mando l'evento al componente padre tramite metodo
        removeFromCart(dish) {
            this.$emit('remove-from-cart', dish);
        }
    },
    created() {
        this.getCartDishes();
    }

}
</script>

<template>
    <h1>Checkout</h1>
    <CartDetail :cartDishes="cartDishes" @remove-from-cart="removeFromCart" @handle-dish="handleDish" />



</template>

<style lang="scss" scoped></style>