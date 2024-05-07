<script>

export default {
    name: 'PaymentComponent',
    props: {
        authorization: {
            required: true,
            type: String
        }
    },
}
</script>

<template>
    <form id="payment-form" action="http://127.0.0.1:8000/api/orders/make/payment" method="post">
        <div id="dropin-container"></div>
        <input type="submit" />
        <input type="hidden" id="nonce" name="payment_method_nonce" />
    </form>

</template>

<style></style>