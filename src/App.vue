<script>
import AppHeader from './components/AppHeader.vue'
import CartCanvas from './components/CartCanvas.vue'
import { RouterView } from 'vue-router';

export default {
  name: 'PasqEat',
  components: { AppHeader, CartCanvas},
  data: () => ({
      showCart: false,
      cartItems: [
        {
          id: 1,
          name: 'Penne',
          price: '10',
          quantity: 1,
        },
        {
          id: 2,
          name: 'Penne Arrabbiata',
          price: '19',
          quantity: 1,
        },
        {
          id: 1,
          name: 'Penne',
          price: '10',
          quantity: 1,
        },
        {
          id: 2,
          name: 'Penne Arrabbiata',
          price: '19',
          quantity: 1,
        }
      ],
      isCartEmpty: false
    }),
    methods: {
      toggleCart () {
        this.showCart = !this.showCart;
      }
    },
    created() {
       
    }
}
</script>

<template>

  <!-- Loader -->
  <!-- <AppLoader /> -->
  <!-- Header -->
  <AppHeader @toggle-cart="toggleCart" :cartItems="cartItems" :isCartEmpty="isCartEmpty"/>

  <!-- Cart Canvas -->
  <CartCanvas @toggle-cart="toggleCart" :showCart="showCart" :cartItems="cartItems" :isCartEmpty="isCartEmpty"/>

  <!-- Main -->
  <main>
    <RouterView />
  </main>

</template>

<style lang="scss">
@use './assets/scss/style.scss';
</style>