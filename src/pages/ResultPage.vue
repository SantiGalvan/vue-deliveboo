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
            }
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
        <p>Abbiamo ricevuto l'ordine! A breve ti arriverà la consegna.</p>

        <div class="d-flex align-items-center gap-1 mb-2">
            <img :src="apiResponse.success ? '/src/assets/img/check.png' : '/src/assets/img/cross.png'" alt="#">
            <span>{{ apiResponse.message }}</span>
        </div>
        <p v-if="apiResponse.success">Abbiamo ricevuto l'ordine!A breve ti arriverà la consegna.</p>

        <RouterLink :to="{ name: 'home' }">
            <button class="btn btn-primary">
                Torna alla Home
            </button>
        </RouterLink>
    </div>

</template>

<style lang="scss" scoped>
img {
    width: 30px;
    height: 30px;
}
</style>