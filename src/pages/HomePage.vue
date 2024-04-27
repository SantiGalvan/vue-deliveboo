<script>
export default {
    name: 'HomePage'
}
</script>

<template>
    <div class="container-md pb-4">
        <div class="row">
            <div class="col-12 col-md-6 col-xl-4 mt-4">
                <div class="home-card home-categories">
                    <h3>Cerca i ristoranti per categoria</h3>
                    <!-- Da cambiare in RouterLink -->
                    <a href="">Categorie</a>
                </div>
            </div>
            <div class="col-12 col-md-6 col-xl-4 mt-4 align-self-xl-end">
                <div class="home-card home-search">
                    <h3>Cerca i ristoranti per nome</h3>
                    <!-- Da cambiare in RouterLink -->
                    <a href="">
                        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /> Cerca
                    </a>
                </div>
            </div>
            <div class="offset-md-3 offset-xl-0 col-md-6 col-xl-4 d-none d-md-flex  mt-4">
                <div class="home-card home-restaurants">
                    <h3>Visualizza tutti i ristoranti</h3>
                    <!-- Da cambiare in RouterLink -->
                    <a href="">
                        Ristoranti
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div class="slider"></div>
</template>

<style lang="scss">
.row {
    height: 400px;
}

.home-card {
    height: 150px;
    padding: 10px;
    background-color: firebrick;
    border-radius: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

    a {
        text-decoration: none;
        color: black;

        padding: 10px 15px;
        background-color: white;
        border-radius: 10px;
    }

    h3 {
        margin-bottom: 0;
        text-transform: uppercase;
        color: #fff;
        text-shadow: 3px 0px 7px rgba(46, 38, 12, 0.8), -3px 0px 7px rgba(42, 35, 11, 0.8), 0px 4px 7px rgba(45, 37, 11, 0.8);

    }
}

.home-categories {
    background: url(https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1);
    background-size: cover;
}

.home-search {
    background: url(https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1);
    background-size: cover;
}

.home-restaurants {
    background: url(https://images.pexels.com/photos/239581/pexels-photo-239581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1);
    background-size: cover;
}

.slider {
    height: 250px;
    background-color: goldenrod;
}

@media screen and (min-width: 768px) {
    .row {
        height: 450px;
    }

    .home-card {
        height: 200px;
        flex-direction: column;
        text-align: center;
    }
}

@media screen and (min-width: 1200px) {
    .row {
        height: 500px;
    }

    .home-card {
        height: 300px;
        flex-direction: column;
        text-align: center;
    }

    .col-xl-4 {
        padding-top: 30px;
        padding-bottom: 30px;
    }

    .slider {
        height: 300px;
    }
}
</style>