<script>
import AppHeader from './components/AppHeader.vue'
import { RouterView } from 'vue-router';

export default {
  name: 'PasqEat',
  components: { AppHeader }
}
</script>

<template>

  <!-- Header -->
  <AppHeader />

  <!-- Main -->
  <main>
    <RouterView />
  </main>

</template>

<style lang="scss">
@use './assets/scss/style.scss';
</style>