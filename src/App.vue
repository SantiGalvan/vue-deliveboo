<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import { RouterView } from 'vue-router';

export default {
  name: 'PasqEat',
  components: { AppHeader, AppFooter }
}
</script>

<template>

  <!-- Loader -->
  <!-- <AppLoader /> -->

  <!-- Header -->
  <AppHeader />

  <!-- Main -->
  <main>
    <RouterView />

    <!-- Footer -->
    <AppFooter />
  </main>


</template>

<style lang="scss">
@use './assets/scss/style.scss';
</style>