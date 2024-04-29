<script>
export default {
    name: 'CartCanvas',
    props: { showCart: Boolean, cartItems: Array, isCartEmpty: Boolean },
    data: () => ({
    }),
    methods: {
    },
    created() {
       
    }
};
</script>

<template>

    <div v-if="showCart"
    class="offcanvas offcanvas-end" :class="{'show' : showCart}" 
    data-bs-scroll="true" 
    data-bs-backdrop="false" tabindex="-1" id="buttonCanvas" 
    aria-labelledby="buttonCanvasLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="buttonCanvasLabel">Carrello</h5>
            <button type="button" class="btn-close" @click="$emit('toggle-cart')"></button>
        </div>
        <div class="offcanvas-body">
            <div v-if="isCartEmpty">
                Nessun articolo nel carrello, aggiungi un piatto! 
            </div>
            <div v-else>
                <ul>
                    <li v-for="cart in cartItems">
                        <div>{{ cart.name }}</div>
                        <div>{{ cart.price }}</div>
                        <div>{{ cart.quantity }}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</template>

<style></style>