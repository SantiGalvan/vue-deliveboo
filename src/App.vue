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
    cartDishes: [],
  }),
  methods: {
    toggleCart() {
      this.showCart = !this.showCart;
    },
    addToCart() {

    },
    removeFromCart(dish) {
      const dishToDelete = this.cartDishes.findIndex(item => {
        return item.id === dish.id
      })
      if (dishToDelete !== -1) {
        this.cartDishes.splice(dishToDelete, 1)
      }

    },

    //recupero il piatto e lo pusho in cartItems
    handleDish(dish) {
      const dishInfo = {
        id: dish.id,
        name: dish.name,
        price: dish.price,
        quantity: 1,
      }
      this.cartDishes.push(dishInfo)
    }

  },
  created() {
    // Recupero i dati del carrello dalla sessione
    const savedCartDishes = localStorage.getItem('cartDishes');
    if (savedCartDishes) {
      this.cartDishes = JSON.parse(savedCartDishes);
    }

    // Salvataggio i dati prima della chiusura
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('cartDishes', JSON.stringify(this.cartDishes));
    });
  }
}
</script>

<template>

  <!-- Loader -->
  <!-- <AppLoader /> -->
  <!-- Header -->
  <AppHeader @toggle-cart="toggleCart" :cartDishes="cartDishes" :isCartEmpty="isCartEmpty" />

  <!-- Cart Canvas -->
  <CartCanvas @removeFromCart="removeFromCart" @handleDish="handleDish" @toggle-cart="toggleCart" :showCart="showCart"
    :cartDishes="cartDishes" :isCartEmpty="isCartEmpty" />

  <!-- Main -->
  <main>
    <RouterView @dishCart="handleDish" />

    <!-- Footer -->
    <AppFooter />
  </main>


</template>

<style lang="scss">
@use './assets/scss/style.scss';
</style>