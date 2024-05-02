<script>
export default {
    name: 'AppHeader',
    props: { cartDishes: Array, isCartEmpty: Boolean },
};
</script>

<template>
    <header>
        <nav class="container">

            <!-- Logo, parte sinistra -->
            <div class="logo">
                <a href="">
                    <figure>
                        <img src="/src/assets/img/pasqueat-logo.jpg" alt="PasqEat" class="img-fluid rounded-circle">
                    </figure>
                </a>
            </div>
            <!-- Carrello e registrazione, parte destra -->
            <div class="links">
                <ul>
                    <!-- Carrello -->
                    <li>
                        <!-- L'icona del carrello si deve vedere solo se c'è un elemento al suo interno -->
                        <button data-bs-toggle="offcanvas" data-bs-target="#buttonCanvas" aria-controls="buttonCanvas"
                            class="btn btn-light cart" type="button" @click="$emit('toggle-cart')">
                            <img src="/src/assets/img/carrello.png" alt="carrello" class="img-fluid">
                            <span v-if="cartDishes.length">{{ cartDishes.length }}</span>
                        </button>
                    </li>
                    <!-- Registrati -->
                    <li>
                        <a href="http://127.0.0.1:8000/" target="_blank">Registrati</a>
                    </li>

                </ul>
            </div>
        </nav>
    </header>

</template>

<style lang="scss"></style>