<script>
export default {
    name: 'AppHeader'
}
</script>

<template>
    <header class="container-fluid">
        <nav>

            <!-- Logo, parte sinistra -->
            <div class="logo">
                <a href="">
                    <figure>
                        <img src="/src/assets/img/pasquet-logo.jpg" alt="PasqEat" class="img-fluid rounded-circle">
                    </figure>
                </a>
            </div>

            <!-- Carrello e registrazione, parte destra -->
            <div class="links">
                <ul>

                    <!-- Carrello -->
                    <li>

                        <!-- L'icona del carrello si deve vedere solo se c'è un elemento al suo interno -->
                        <a href="" class="cart">
                            <img src="/src/assets/img/carrello.png" alt="carrello" class="img-fluid">

                            <!-- All'inserimento di un elemento nel carrello aggiungiamo il numero -->
                            <span>1</span>
                        </a>
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