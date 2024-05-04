<script>
import CartDetail from './cart/CartDetail.vue';
export default {
    name: 'CartCanvas',
    components: { CartDetail },
    props: { showCart: Boolean, cartDishes: Array },
    emits: ['toggle-cart'],
    data: () => ({
    }),
    methods: {
        //Salvo i dati del carrello nel local storage
        saveCartToLocalStorage() {
            // Converto l'array del carrello in una stringa JSON
            localStorage.setItem('cart', JSON.stringify(this.cartDishes));
        }
    },
};
</script>

<template>
    <div v-if="showCart" class="offcanvas offcanvas-end" :class="{ 'show': showCart }" data-bs-scroll="true"
        data-bs-backdrop="false" tabindex="-1" id="buttonCanvas" aria-labelledby="buttonCanvasLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="buttonCanvasLabel">Carrello</h5>
            <button type="button" class="btn-close" @click="$emit('toggle-cart')"></button>
        </div>
        <div class="offcanvas-body">
            <div v-if="!cartDishes.length">
                Nessun articolo nel carrello, aggiungi un piatto!
            </div>
            <div v-else>
                <CartDetail :cartDishes="cartDishes" @removeFromCart="removeFromCart" @handleDish="handleDish" />
            </div>

            <!-- routerlink per la pagina di checkout -->
            <RouterLink :to="{ name: 'checkout-page' }" @click="saveCartToLocalStorage">Procedi al Checkout
            </RouterLink>

        </div>
    </div>

</template>

<style></style>