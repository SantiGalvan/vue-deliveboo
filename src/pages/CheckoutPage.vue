<script>
// import axios from axios
import axios from 'axios';
import CartDetail from '../components/cart/CartDetail.vue';
import PaymentComponent from '../components/cart/PaymentComponent.vue';

//registro lo store
import { store } from '../data/store';

// Dichiaro gli endpoint da utilizzare nelle chiamate
const endpoint = 'http://localhost:8000/api/restaurants/restaurant';
const tokenGenerateEndpoint = 'http://127.0.0.1:8000/api/orders/'

export default {
    name: 'CheckoutPage',
    components: { CartDetail, PaymentComponent },
    data: () => ({
        store,
        cartDishes: store.cartDishes,
        restaurant: [],
        token: '',
        isValid: false,
        paymentDetails: {
            name: '',
            lastname: '',
            address: '',
            phone: '',
            email: '',
            card_number: '',
            card_expire_date: '',
            cvv_code: '',
            restaurant_id: store.cartDishes[0]?.restaurant_id,
            dishes: store.cartDishes,
            payment_method_nonce: 'fake-valid-nonce',
        },

        messages: {
            name_message: '',
            lastname_message: '',
            address_message: '',
            phone_message: '',
            email_message: '',
            card_number_message: '',
            card_expire_date_message: '',
            cvv_code_message: '',
        }
    }),
    methods: {

        //Mando l'evento al componente padre tramite metodo
        handleDish(dish) {
            this.$emit('handle-dish', dish);
        },

        //Mando l'evento al componente padre tramite metodo
        removeFromCart(dish) {
            this.$emit('remove-from-cart', dish);
        },

        //Mando l'evento al componente padre tramite metodo
        removeRow(dish) {
            this.$emit('remove-row', dish);
        },

        //Mando l'evento al componente padre tramite metodo
        emptyCart() {
            this.$emit('empty-cart');
        },

        //Recupero il ristorante del piatto contenuto nel carrello
        getRestaurant() {
            // Setto la flag del loder a true
            store.isLoading = true;
            const restaurantId = this.cartDishes[0]?.restaurant_id;
            axios.get(`${endpoint}/${restaurantId}`)
                .then(res => {
                    this.restaurant = res.data;
                    console.log(this.restaurant);
                })
                .catch(err => {
                    console.error(err.message)
                })
                .then(() => {
                    // Setto la flag del loder a false
                    store.isLoading = false;
                })
        },
        //Validazione lato client del Nome
        isNameValid() {
            if (!this.paymentDetails.name || this.paymentDetails.name.length < 3) {
                this.messages.name_message = 'Inserisci il nome.';
                this.isValid = false;
            } else {
                this.messages.name_message = 'Campo valido.';
                this.isValid = true
            }
            return this.isValid;
        },
        //Validazione lato client del Cognome
        isLstanameValid() {
            if (!this.paymentDetails.lastname || this.paymentDetails.lastname.length < 3) {
                this.messages.lastname_message = 'Inserisci il cognome.';
                this.isValid = false;
            } else {
                this.messages.lastname_message = 'Campo valido.';
                this.isValid = true
            }
            return this.isValid;
        },
        //Validazione lato client dell'indirizzo
        isAddressValid() {
            if (!this.paymentDetails.address || this.paymentDetails.address.length < 3) {
                this.messages.address_message = 'Inserisci l\'indirizzo di spedizione.';
                this.isValid = false;
            } else {
                this.messages.address_message = 'Campo valido.';
                this.isValid = true
            }
            return this.isValid;
        },
        //Validazione lato client del numero di telefono
        isPhoneValid() {
            if (!this.paymentDetails.phone || this.paymentDetails.phone.length < 3) {
                this.messages.phone_message = 'Inserisci il numero di telefono.';
                this.isValid = false;
            } else {
                this.messages.phone_message = 'Campo valido.';
                this.isValid = true
            }
            return this.isValid;
        },
        //Validazione lato client dell'email
        isEmailValid() {
            if (!this.paymentDetails.email || !this.paymentDetails.email.includes('@') || !this.paymentDetails.email.includes('.it') && !this.paymentDetails.email.includes('.com')) {
                this.messages.email_message = 'Inserisci un indirizzo email valido.';
                this.isValid = false;
            }
            else {
                this.messages.email_message = 'Campo valido.';
                this.isValid = true
            }
            return this.Valid;
        },
        //Validazione lato client del numero della carta di credito
        isCardNumberValid() {
            if (!this.paymentDetails.card_number || this.paymentDetails.card_number.length != 16) {
                this.messages.card_number_message = 'Il numero di carta è composto da 16 numeri.';
                this.Valid = false;
            } else {
                this.messages.card_number_message = 'Campo valido.';
                this.Valid = true;
            }
            return this.Valid;
        },
        //Validazione lato client della data di scadenza della carta di credito
        isExpireCardValid() {
            if (!this.paymentDetails.card_expire_date || this.paymentDetails.card_expire_date.length != 5) {
                this.messages.card_expire_date_message = 'Inserisci una data di scadenza valida.';
                this.Valid = false;
            } else {
                this.messages.card_expire_date_message = 'Campo valido.';
                this.Valid = true;

            }
            return this.Valid;
        },
        //Validazione lato client codice segreto della carta di credito
        isCvvValid() {
            if (!this.paymentDetails.cvv_code || this.paymentDetails.cvv_code.length != 3) {
                this.messages.cvv_code_message = 'Inserisci un cvv valido.';
                this.isValid = false;
            } else {
                this.messages.cvv_code_message = 'Campo valido.';
                this.isValid = true;
            }
            return this.isValid;
        },

        generateToken() {
            if (!this.isValid) return;
            //Chiamata per generare il token
            axios.get(`${tokenGenerateEndpoint}generate`).
                then(res => {
                    this.token = res.data.token;
                }).
                catch(err => {
                    console.log(err)
                }).
                then(() => {
                    if (this.token) this.makePayment()
                })
        },

        makePayment() {
            //Chiamata per effettuare il pagamento
            axios.post(`${tokenGenerateEndpoint}make/payment`,
                { ...this.paymentDetails },
                { headers: { 'Content-type': 'multipart/form-data' } }).
                then(response => {
                    localStorage.setItem('resultPage', JSON.stringify(response.data));
                    console.log(response.data)
                }).
                catch(({ error, response }) => {
                    localStorage.setItem('resultPage', JSON.stringify(response.data));
                    console.error(error);
                    console.log(response.data.errors);
                    this.$router.push({ name: 'result-page' })
                }).
                then(() => {
                    store.cartDishes = [];
                    this.$router.push({ name: 'result-page' })
                })
        }
    },
    // Watch per monitorare le modifiche di store.cartDishes
    watch: {
        'store.cartDishes': function (newCartDishes) {
            // Aggiorna cartDishes con i nuovi dati dello store
            this.cartDishes = newCartDishes;
        }
    },
    created() {
        this.getRestaurant();
    },
}
</script>

<template>
    <div class="container">
        <h1>Checkout</h1>
        <!--Mostro il dettaglio del carrello solo 
        se c'è almeno un piatto nel carrello-->
        <div v-if="cartDishes.length">
            <!-- Inserisco le informazioni del ristorante in cui sto effettuando l'ordine -->
            <section id="checkout-restaurant-info">
                <ul>
                    <p>{{ restaurant.length }}</p>
                    <li>Il tuo ordine presso {{ restaurant.restaurant_name }}</li>
                    <li>{{ restaurant.city }}</li>
                    <li>{{ restaurant.address }}</li>
                    <li>{{ restaurant.cap }}</li>
                    <li>{{ restaurant.phone }}</li>
                    <li>{{ restaurant.image }}</li>
                </ul>
            </section>
            <!-- Di seguito trovo le informazioni dei prodotti inseriti nel carrello -->
            <section id="checkout-cart">
                <CartDetail :cartDishes="cartDishes" @remove-from-cart="removeFromCart" @handle-dish="handleDish"
                    @remove-row="removeRow" @empty-cart="emptyCart" />
            </section>
            <!-- Form in cui inserirò le informazioni del cliente -->
            <section id="checkout-info">
                <h3>Procedi al pagamento</h3>
                <!--Form-->
                <form class="form" @submit.prevent>
                    <!--Nome del cliente-->
                    <div class="col-12 mb-3">
                        <label for="name" class="input_label">Nome*</label>
                        <input type="text" id="name" name="name" class="input_field form-control" placeholder="Nome"
                            v-model="paymentDetails.name"
                            :class="!this.paymentDetails.name || this.paymentDetails.name.length < 3 ? 'is-invalid' : 'is-valid'"
                            @keyup="isNameValid">
                        <div class="form-message" v-if="this.messages.name_message.length"
                            :class="!this.paymentDetails.name || this.paymentDetails.name.length < 3 ? 'invalid-feedback' : 'valid-feedback'">
                            <p>{{ this.messages.name_message }}</p>
                        </div>
                    </div>
                    <!--Cognome-->
                    <div class="col-12 mb-3">
                        <label for="lastname" class="input_label">Cognome*</label>
                        <input type="text" id="lastname" name="lastname" class="input_field form-control"
                            placeholder="Cognome" v-model="paymentDetails.lastname"
                            :class="!this.paymentDetails.lastname || this.paymentDetails.lastname.length < 3 ? 'is-invalid' : 'is-valid'"
                            @keyup="isLastnameValid">
                        <div class="form-message" v-if="this.messages.lastname_message.length"
                            :class="!this.paymentDetails.lastname || this.paymentDetails.lastname.length < 3 ? 'invalid-feedback' : 'valid-feedback'">
                            <p>{{ this.messages.lastname_message }}</p>
                        </div>
                    </div>
                    <!--Indirizzo-->
                    <div class="col-12 mb-3">
                        <label for="address" class="input_label">Indirizzo*</label>
                        <input type="text" id="address" name="address" class="input_field form-control"
                            placeholder="Indirizzo" v-model="paymentDetails.address"
                            :class="!this.paymentDetails.lastname || this.paymentDetails.lastname.length < 3 ? 'is-invalid' : 'is-valid'"
                            @keyup="isAddressValid">
                    </div>
                    <!-- Numero di Telefono-->
                    <div class="col-12 mb-3">
                        <label for="phone" class="input_label">Numero di Telefono*</label>
                        <input type="text" id="phone" name="phone" class="input_field form-control"
                            placeholder="Numero di Telefono" v-model="paymentDetails.phone"
                            :class="!this.paymentDetails.phone || this.paymentDetails.phone.length < 3 ? 'is-invalid' : 'is-valid'"
                            @keyup="isPhoneValid">
                        <div class="form-message" v-if="this.messages.phone_message.length"
                            :class="!this.paymentDetails.phone || this.paymentDetails.phone.length < 3 ? 'invalid-feedback' : 'valid-feedback'">
                            <p>{{ this.messages.phone_message }}</p>
                        </div>
                    </div>
                    <!--Email-->
                    <div class="col-12 mb-3">
                        <label for="email" class="input_label">Email*</label>
                        <input type="text" id="email" name="email" class="input_field form-control" placeholder="E-mail"
                            v-model="paymentDetails.email"
                            :class="!this.paymentDetails.email || this.paymentDetails.email.length < 3 ? 'is-invalid' : 'is-valid'"
                            @keyup="isEmailValid">
                        <div class="form-message" v-if="this.messages.email_message.length"
                            :class="!this.paymentDetails.email || this.paymentDetails.email.length < 3 ? 'invalid-feedback' : 'valid-feedback'">
                            <p>{{ this.messages.email_message }}</p>
                        </div>
                    </div>
                    <hr>
                    <h4>Inserisci i dati della tua carta</h4>
                    <!--Numero della Carta-->
                    <div class="col-12 mb-3">
                        <label for="card_number" class="input_label">Numero Carta*</label>
                        <input type="text" id="card_number" name="card_number" class="input_field form-control"
                            placeholder="4356 0000 2222 4567" v-model="paymentDetails.card_number"
                            :class="!this.paymentDetails.card_number || this.paymentDetails.card_number.length < 16 ? 'is-invalid' : 'is-valid'"
                            @keyup="isCardNumberValid" value="11111111111111111">
                        <div class="form-message" v-if="this.messages.card_number_message.length"
                            :class="!this.paymentDetails.card_number || this.paymentDetails.card_number.length < 3 ? 'invalid-feedback' : 'valid-feedback'">
                            <p>{{ this.messages.card_number_message }}</p>
                        </div>
                    </div>
                    <!--Scadenza della Carta-->
                    <div class="col-12 mb-3">
                        <label for="card_expire_date" class="input_label">Data Scadenza *</label>
                        <input type="text" id="card_expire_date" name="card_expire_date"
                            class="input_field form-control" placeholder="01/27"
                            v-model="paymentDetails.card_expire_date"
                            :class="!this.paymentDetails.card_expire_date || this.paymentDetails.card_expire_date.length != 5 ? 'is-invalid' : 'is-valid'"
                            @keyup="isCardExpireValid" value="01/27">
                        <div class="form-message" v-if="this.messages.card_expire_date_message.length"
                            :class="!this.paymentDetails.card_expire_date || this.paymentDetails.card_expire_date.length < 3 ? 'invalid-feedback' : 'valid-feedback'">
                            <p>{{ this.messages.card_expire_date_message }}</p>
                        </div>
                    </div>
                    <!--Codice di Sicurezza-->
                    <div class="col-12 mb-3">
                        <label for="cvv_code" class="input_label">CVV*</label>
                        <input type="text" id="cvv_code" name="cvv_code" class="input_field form-control"
                            placeholder="CVV" v-model="paymentDetails.cvv_code"
                            :class="!this.paymentDetails.cvv_code || this.paymentDetails.cvv_code.length != 3 ? 'is-invalid' : 'is-valid'"
                            @keyup="isCvvValid" value="123">
                        <div class="form-message" v-if="this.messages.cvv_code_message.length"
                            :class="!this.paymentDetails.cvv_code || this.paymentDetails.cvv_code.length < 3 ? 'invalid-feedback' : 'valid-feedback'">
                            <p>{{ this.messages.cvv_code_message }}</p>
                        </div>
                    </div>
                    <input type="hidden" id="nonce" name="payment_method_nonce"
                        v-model="paymentDetails.payment_method_nonce" />

                    <button @click="generateToken()">Paga</button>
                </form>
            </section>

            <!-- Display del pagamento -->
            <section id="checkout-payment">
                <!-- Importo il componente del pagamento -->
            </section>
        </div>

        <!--Altrimenti mostro il redirect ai ristoranti-->
        <div v-else>
            <span>Non ci sono articoli nel carrello </span>
            <RouterLink :to="{ name: 'home' }">
                <button class="btn btn-primary"><font-awesome-icon :icon="['fas', 'arrow-left']" /> Va ai
                    Ristoranti</button>
            </RouterLink>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>