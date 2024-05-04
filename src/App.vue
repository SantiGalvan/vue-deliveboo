<script>
import AppHeader from './components/AppHeader.vue'
import CartCanvas from './components/CartCanvas.vue'
import AppFooter from './components/AppFooter.vue'
import { RouterView } from 'vue-router';
import { store } from './data/store';

export default {
  name: 'PasqEat',
  components: { AppHeader, CartCanvas, AppFooter },
  data: () => ({
    showCart: false,
    cartDishes: [],
    store
  }),
  methods: {
    toggleCart() {
      this.showCart = !this.showCart;
    },

    //recupero il piatto e lo rimuovo da cartItems
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
        restaurant_id: dish.restaurant_id,
        quantity: 1,
      }
      if (this.cartDishes.length === 0 || this.cartDishes[0].restaurant_id === dish.restaurant_id) {
        this.cartDishes.push(dishInfo)
      }
      else {
        return
      }
    },

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
  },
}

</script>

<template>

  <!-- Header -->
  <AppHeader @toggle-cart="toggleCart" :cartDishes="cartDishes" />

  <!-- Loader -->
  <AppLoader v-if="store.isLoading" />

  <!-- Cart Canvas -->
  <CartCanvas @remove-from-cart="removeFromCart" @handle-dish="handleDish" @toggle-cart="toggleCart"
    :showCart="showCart" :cartDishes="cartDishes" />

  <!-- Main -->
  <main>
    <RouterView @dish-cart="handleDish" @remove-from-cart="removeFromCart" @handle-dish="handleDish" />

    <!-- Footer -->
    <AppFooter v-if="!store.isLoading" />
  </main>


</template>

<style lang="scss">
@use './assets/scss/style.scss';
</style>