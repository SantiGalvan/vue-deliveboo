<script>

export default {
    name: 'PaymentComponent',
    props: {
        authorization: {
            required: true,
            type: String
        }
    },
    methods: {
   
    }
}   
</script>

<template>
   
    
    {{ authorization }}
</template>

<style></style>