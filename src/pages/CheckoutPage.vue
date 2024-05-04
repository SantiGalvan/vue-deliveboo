<script>
export default {
    name: 'CheckoutPage',
    components: {},
    data: () => ({
        cartDishes: [],
    }),
    methods: {
        getCartDishes() {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                this.cartDishes = JSON.parse(savedCart);
            }
            console.log(this.cartDishes);
        }
    },
    computed: {
        /*Faccio un ciclo su i piatti contenuti in cartItems
       se groupedItems non contiene l'id del piatto
       viene pushato altrimenti vuiene aumentata la quantita 
       del piatto */
        // groupedCartDishes() {
        //     const groupedDishes = {};
        //     this.cartDishes.forEach(dish => {
        //         if (!groupedDishes[dish.id]) {
        //             groupedDishes[dish.id] = { ...dish };
        //         } else {
        //             groupedDishes[dish.id].quantity += 1;
        //         }
        //     });
        //     return Object.values(groupedDishes);
        // },
        /*Calcolo il totale dell'ordine
        sommando i prezzi dei piatti in cartItems*/
        // calculateTotal() {
        //     let totalOrder = 0;
        //     this.cartDishes.forEach(dish => {
        //         totalOrder += parseFloat(dish.price);
        //     });
        //     return totalOrder.toFixed(2)
        // },
    },
    created() {
        this.getCartDishes();
    }

}
</script>

<template>
    <h1>Checkout</h1>



</template>

<style lang="scss" scoped></style>