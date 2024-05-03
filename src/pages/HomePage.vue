<script>
import axios from 'axios';
import RestaurantsList from '../components/restaurants/RestaurantsList.vue';
import HomeHero from '../components/home/HomeHero.vue';

const defaultEndpoint = 'http://localhost:8000/api/restaurants/';
let endpoint = null;

export default {
    name: 'HomePage',
    components: { RestaurantsList, HomeHero },
    data: () => ({
        restaurants: [],
        categories: [],
        selectedCategoriesLabel: [],
    }),
    methods: {
        //Chiamata axios per ricevere i ristoranti e le categorie
        getRestaurants() {
            //Se ci sono categorie selezionate
            if (this.selectedCategoriesLabel.length > 0) {
                // Converto le etichette di categoria selezionate in una stringa di query
                const queryParams = this.selectedCategoriesLabel.join(',');
                endpoint = defaultEndpoint;
                //Aggiungo all'endpoint la chiave e la categoria
                endpoint += `?categories=${queryParams}`;
            }
            axios.get(endpoint ?? defaultEndpoint)
                .then(res => {
                    const { restaurants, categories } = res.data;
                    this.restaurants = restaurants;
                    this.categories = categories
                })
                .catch(err => {
                    console.error(err.message)
                })
                //Riporto l'endpoint al valore di default
                .then(() => { endpoint = defaultEndpoint })
        },

        //Funzione per rimuovere una categoria da quelle selezionate
        closeBadge(label) {
            this.selectedCategoriesLabel = this.selectedCategoriesLabel.filter(category => {
                return category != label
            })
            this.getRestaurants();
        },

        //Funzione per aggiungere la categoria selezionata
        getSelectedCategories(label) {
            if (!this.selectedCategoriesLabel.includes(label))
                this.selectedCategoriesLabel.push(label);
            // Rieffettuo la chiamata con i nuovi filtri
            this.getRestaurants();
        }
    },

    created() {
        this.getRestaurants();
    }
}
</script>

<template>
    <!-- Hero -->
    <HomeHero />
    <!-- Home Page -->
    <section class="container-fluid container-lg mb-5" id="home-page">
        <div class="d-lg-none upper-categories-filter">
            <!--Lista Categorie-->
            <div class="d-flex flex-wrap gap-3 mt-4 justify-content-center">
                <div v-for="category in categories" :key="category.id">
                    <input type="checkbox" :value="category.label" v-model="selectedCategoriesLabel">
                    <label class="ms-2">{{ category.label }}</label>
                </div>
            </div>
        </div>
        <!--Contenuto Principale-->
        <div class="main-content pt-5">
            <!--Sidebar-->
            <nav class="side-bar d-none d-lg-block">
                <h3 class="mb-0 pt-2">Filtri</h3>
                <div class="side-categories-filter">
                    <!--Lista Categorie-->
                    <div class="mt-4">
                        <div class="category-card" v-for="category in categories" :key="category.id">
                            <div @click="getSelectedCategories(category.label)">
                                <p>
                                    <img src="/src/assets/img/caprese.png" :alt="category.label"
                                        class="category-image-sm me-2">{{ category.label }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div class="w-100 text-center text-lg-start">
                <h1 class="d-inline">Ristoranti</h1>
                <div class="d-flex gap-2 button-dismissable justify-content-center justify-content-lg-start"
                    v-if="selectedCategoriesLabel.length">
                    <!--Badge-->
                    <div class="btn btn-primary default-cursor mt-2 d-flex align-items-center"
                        v-for="category in selectedCategoriesLabel" :key="category">
                        {{ category }}
                        <button type="button" class="btn btn-sm btn-close" data-bs-dismiss="button" aria-label="Close"
                            @click="closeBadge(category)"></button>
                    </div>
                </div>
                <!--Lista dei Ristoranti-->
                <RestaurantsList :restaurants="restaurants" />
            </div>
        </div>
    </section>
</template>

<style>
.main-content {
    display: flex;
    gap: 20px;
}

.category-card {
    cursor: pointer;
}

.category-image-sm {
    width: 20px;
    height: 20px;
}

.default-cursor {
    cursor: default;
}

.side-bar {
    flex-shrink: 0;
    flex-basis: 220px;
}
</style>