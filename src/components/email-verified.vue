<template>
    <div id="email-verified">
        <h1>Email Verified!</h1>
        <h2>Please go back to sign in with your email address</h2>
        <button v-on:click="updateView">Back</button>
    </div>
</template>

<script>
    export default {
        name: 'EmailVerified',
        methods: {
            updateView() {
                this.$emit("update","none");
            }
        },
        data() {
            return {

            }
        }
    }
</script>