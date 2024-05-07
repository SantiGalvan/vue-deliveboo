<script>
//registro lo store
import { store } from '../data/store';
export default {
    name: 'ResultPage',
    data: () => ({
        store,
        apiResponse: [],
        customer_name: '',
        customer_lastname: '',
        customer_phone: '',
        customer_address: '',
        total: '',
    }),
    methods: {
        test() {
            this.apiResponse = JSON.parse(localStorage.getItem('resultPage'));
            this.customer_name = this.apiResponse.name;
            this.customer_lastname = this.apiResponse.lastname;
            this.customer_phone = this.apiResponse.phone;
            this.customer_address = this.apiResponse.address;
            this.total = this.apiResponse.total;
            if (this.apiResponse.succes) {
                localStorage.clear();
                // localStorage.clear('resultPage');
                // localStorage.clear('cartDishes');
            }
            console.log('-----', this.apiResponse)
        }
    },
    mounted() {
        this.test()
    }
};
</script>

<template>
    <div class="container mt-5">
        <p>Nome: <strong>{{ customer_name }}</strong></p>
        <p>Cognome: <strong>{{ customer_lastname }}</strong></p>
        <p>Telefono: <strong>{{ customer_phone }}</strong></p>
        <p>Indirizzo: <strong>{{ customer_address }}</strong></p>
        <p>Totale: <strong>{{ total }}</strong></p>


        <p>{{ apiResponse.message }}</p>
        <p>Abbiamo ricevuto l'ordine!A breve ti arriverà la consegna.</p>
    </div>

</template>

<style></style>