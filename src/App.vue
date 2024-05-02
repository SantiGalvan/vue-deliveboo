<script>
import AppHeader from './components/AppHeader.vue'

import CartCanvas from './components/CartCanvas.vue'
import AppFooter from './components/AppFooter.vue'

import { RouterView } from 'vue-router';

export default {
  name: 'PasqEat',
  components: { AppHeader, CartCanvas, AppFooter },
  data: () => ({
    showCart: false,
    cartItems: [],
    isCartEmpty: false
  }),
  methods: {
    toggleCart() {
      this.showCart = !this.showCart;
    },
    addToCart() {

    },
    removeFromCart(item) {

      console.log(item)
    },

    //recupero il piatto e lo pusho in cartItems
    handleDish(dish) {
      const dishInfo = {
        id: dish.id,
        name: dish.name,
        price: dish.price,
        quantity: 1,
      }
      this.cartItems.push(dishInfo)

    }

  },
  created() {
    // Recupero i dati del carrello dalla sessione
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      this.cartItems = JSON.parse(savedCartItems);
      this.isCartEmpty = false;
    }

    // Salvataggio i dati prima della chiusura
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    });
  }
}
</script>

<template>

  <!-- Loader -->
  <!-- <AppLoader /> -->
  <!-- Header -->
  <AppHeader @toggle-cart="toggleCart" :cartItems="cartItems" :isCartEmpty="isCartEmpty" />

  <!-- Cart Canvas -->
  <CartCanvas @removeFromCart="removeFromCart" @toggle-cart="toggleCart" :showCart="showCart" :cartItems="cartItems"
    :isCartEmpty="isCartEmpty" />

  <!-- Main -->
  <main>
    <RouterView @dish-cart="handleDish" />

    <!-- Footer -->
    <AppFooter />
  </main>


</template>

<style lang="scss">
@use './assets/scss/style.scss';
</style>