<script>

export default {
    name: 'PaymentComponent',
    props: {
        authorization: {
            required: true,
            type: String
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