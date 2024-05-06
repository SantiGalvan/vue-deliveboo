<script>
import { store } from '../../data/store';

export default {
    name: 'CartDetail',
    emits: ['remove-from-cart', 'handle-dish', 'remove-row', 'empty-cart'],
    data: () => ({
        //importo lo store e sincronizzo i prodotti del carrello
        store,
        cartDishes: store.cartDishes
    }),
    methods: {
       
    },
    computed: {
        /*Faccio un ciclo su i piatti contenuti in cartItems
        se groupedItems non contiene l'id del piatto
        viene pushato altrimenti vuiene aumentata la quantita 
        del piatto */
        groupedCartDishes() {
            const groupedDishes = {};
            this.cartDishes.forEach(dish => {
                if (!groupedDishes[dish.id]) {
                    groupedDishes[dish.id] = { ...dish };
                } else {
                    groupedDishes[dish.id].quantity += 1;
                }
            });
            return Object.values(groupedDishes);
        },
        /*Calcolo il totale dell'ordine
        sommando i prezzi dei piatti in cartItems*/
        calculateTotal() {
            let totalOrder = 0;
            this.cartDishes.forEach(dish => {
                totalOrder += parseFloat(dish.price);
            });
            return totalOrder.toFixed(2)
        },
    },
     // Watch per monitorare le modifiche di store.cartDishes
    watch: {
        'store.cartDishes': function(newCartDishes) {
            // Aggiorna cartDishes con i nuovi dati dello store
            this.cartDishes = newCartDishes;
        }
    }
};
</script>

<template>
    <!--Dettaglio del Carrello-->
    <table>
        <thead>
            <tr>
                <th>Nome Piatto</th>
                <th>Prezzo</th>
                <th>Quantità</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="dish in groupedCartDishes" :key="dish.id">
                <td>{{ dish.name }}</td>
                <td>{{ dish.price }}</td>
                <td>{{ dish.quantity }}</td>
                <td class="d-flex gap-3">
                    
                    <!--Bottone per diminuire quantità nel carrello-->
                    <button @click="$emit('remove-from-cart', dish)"><font-awesome-icon
                            :icon="['fas', 'minus']" /></button>
                    
                    <!--Bottone per aumentare quantità nel carrello-->
                    <button @click="$emit('handle-dish', dish)"><font-awesome-icon :icon="['fas', 'plus']" /></button>
                    
                    <!-- Bottone di eliminazione di una riga intera (ovvero di un prodotto e le sue quantità) -->
                    <button class="rounded px-2 py-1 btn-outline-index red text-white fw-semibold"
                    @click="$emit('remove-row', dish)">
                        <font-awesome-icon :icon="['fas', 'trash-can']" />
                    </button>
                    
                </td>
            </tr>
            <tr v-show="cartDishes.length">
                <!-- Bottone di eliminazione di una riga intera (ovvero di un prodotto e le sue quantità) -->
                <button class="rounded px-2 py-1 btn-outline-index red text-white fw-semibold"
                @click="$emit('empty-cart')">
                    <font-awesome-icon :icon="['fas', 'trash-can']" />
                    <span><strong>Svuota il carrello</strong></span>
                </button>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <strong>TOTALE:</strong><span>€ {{ calculateTotal }}</span>
            </tr>
        </tfoot>
    </table>

</template>

<style></style>