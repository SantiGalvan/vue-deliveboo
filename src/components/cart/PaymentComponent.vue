<script>
import VueBraintree from 'vue-braintree';

export default {
    name: 'PaymentComponent',
    components: {VueBraintree},
    props: {
        authorization: {
            required: true,
            type: String
        }
    },
    methods: {
        onSuccess (payload) {
            let nonce = payload.nonce;
         // Do something great with the nonce...
        },
        onError (error) {
            let message = error.message;
            // Whoops, an error has occured while trying to get the nonce
        }
    }
}   
</script>

<template>
   
    <v-braintree
    :authorization= "authorization"
    @success="onSuccess"
    locale="it_IT"
    @error="onError" 
    />
    
    {{ authorization }}
</template>

<style></style>