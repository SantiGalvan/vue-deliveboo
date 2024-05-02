<script>
export default {
    name: 'CartCanvas',
    props: { showCart: Boolean, cartDishes: Array },
    emits: ['remove-from-cart', 'handle-dish', 'toggle-cart'],
    data: () => ({
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
        }
    }
};
</script>

<template>
    <div v-if="showCart" class="offcanvas offcanvas-end" :class="{ 'show': showCart }" data-bs-scroll="true"
        data-bs-backdrop="false" tabindex="-1" id="buttonCanvas" aria-labelledby="buttonCanvasLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="buttonCanvasLabel">Carrello</h5>
            <button type="button" class="btn-close" @click="$emit('toggle-cart')"></button>
        </div>
        <div class="offcanvas-body">
            <div v-if="!cartDishes.length">
                Nessun articolo nel carrello, aggiungi un piatto!
            </div>
            <div v-else>
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
                                <!--Bottone per aumentare quantità nel carrello-->
                                <button @click="$emit('handle-dish', dish)"><font-awesome-icon
                                        :icon="['fas', 'plus']" /></button>
                                <!--Bottone per diminuire quantità nel carrello-->
                                <button @click="$emit('remove-from-cart', dish)"><font-awesome-icon
                                        :icon="['fas', 'minus']" /></button>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <strong>TOTALE:</strong><span>€ {{ calculateTotal }}</span>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>

</template>

<style></style>