<script>
export default {
    name: 'CartCanvas',
    props: { showCart: Boolean, cartItems: Array, isCartEmpty: Boolean },
    data: () => ({
    }),
    methods: {
    },
    computed: {
    
        groupedCartItems() {
            const groupedItems = {};
            this.cartItems.forEach(item => {
                if (!groupedItems[item.id]) {
                    groupedItems[item.id] = { ...item };
                } else {
                    groupedItems[item.id].quantity += 1;
                }
            });
            return Object.values(groupedItems);
        },

        calculateTotal(){
            let totalOrder = 0;
            this.cartItems.forEach(item => { 
                totalOrder += parseFloat(item.price);
            });
            return totalOrder.toFixed(2)
        }
    }
};
</script>

<template>

    <div v-if="showCart"
    class="offcanvas offcanvas-end" :class="{'show' : showCart}" 
    data-bs-scroll="true" 
    data-bs-backdrop="false" tabindex="-1" id="buttonCanvas" 
    aria-labelledby="buttonCanvasLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="buttonCanvasLabel">Carrello</h5>
            <button type="button" class="btn-close" @click="$emit('toggle-cart')"></button>
        </div>
        <div class="offcanvas-body">
            <div v-if="isCartEmpty">
                Nessun articolo nel carrello, aggiungi un piatto! 
            </div>
            <div v-else>
                <table>
                    <thead>
                        <tr>
                            <th>Nome Piatto</th>
                            <th>Prezzo</th>
                            <th>Quantità</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in groupedCartItems" :key="item.id">
                            <td>{{ item.name }}</td>
                            <td>{{ item.price }}</td>
                            <td>{{ item.quantity }}</td>
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