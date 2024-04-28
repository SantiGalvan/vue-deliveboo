<script>
export default {
    name: 'HomeHero'
}
</script>

<template>
    <div class="hero">
        <div class="container">
            <div class="row align-items-center">

                <!-- Immagine -->
                <div class="col-12 col-lg-6 text-center">
                    <img src="../assets/img/8219559_delivery_express_vespa_scooter_deliver_icon_1.png"
                        alt="Immagine Hero" class="hero-img">
                </div>

                <!-- Testo -->
                <div class="hero-col col-12 col-lg-6 text-center p-3">
                    <h1>Consegna di cibo a domicilio dai tuoi ristoranti preferiti</h1>
                    <p>I migliori ristoranti li trovi solo su PasqEat</p>

                    <!-- Cambiare il buttone -->
                    <button class="btn btn-success">Ristoranti
                        <FontAwesomeIcon icon="fa-solid fa-arrow-down" class="fa-bounce" />
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>

<style lang="scss">
.hero {
    // Background da cambiare
    background-color: gray;

    .col-12 {
        height: 200px;
        margin-top: 10px;
        margin-bottom: 10px;
        overflow: hidden;
        text-align: center;
        color: rgb(233, 229, 229);

        .hero-img {
            height: 100%;
            width: auto;
        }
    }

    .hero-col {
        h1 {
            font-size: 2rem;
        }

        p {
            font-size: 1.1rem;
        }
    }
}

@media screen and (min-width: 992px) {

    .hero {
        .col-lg-6 {
            height: 300px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
    }
}

@media screen and (min-width: 1200px) {

    .hero {
        .col-lg-6 {
            height: 600px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .hero-col {
            h1 {
                font-size: 3.5rem;
            }

            p {
                font-size: 1.4rem;
                margin-bottom: 20px;
            }
        }
    }
}
</style>