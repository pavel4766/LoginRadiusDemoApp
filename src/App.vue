<template>
  <div style="text-align:center" id="app">
      <h1>LoginRadius Vue.js Demo</h1>
      <HomePage v-if="this.lr_display === 'none'" v-on:update="updatePage"></HomePage>
      <LoggedIn v-else-if="this.lr_display === 'loggedin'" v-on:update="updatePage"></LoggedIn>
      <EmailVerified v-else-if="this.lr_display === 'emailverified'" v-on:update="updatePage"></EmailVerified>
      <ResetPassword v-else-if="this.lr_display === 'resetpassword'" v-on:update="updatePage"></ResetPassword>
  </div>
</template>

<script>
    import HomePage from './components/homepage.vue'
    import LoggedIn from './components/loggedin.vue'
    import EmailVerified from './components/email-verified.vue'
    import ResetPassword from './components/resetpassword.vue'



    export default {
        name: 'app',
        data() {
            return {
                lr_display: "none"
            }
        },
        methods: {
            updatePage(newData) {
                this.lr_display = newData
            }
        },
        components: {
            HomePage,
            LoggedIn,
            EmailVerified,
            ResetPassword
        },

        mounted: function () {
            let verification = window.location.href.includes('?vtype=emailverification');
            if (!verification) {
                return;
            }

            if (verification) {
                let verifyemail_options = {};
                verifyemail_options.onSuccess = (response) => {
                    console.log('verify email success',response);
                    this.lr_display = "emailverified"
                };
                verifyemail_options.onError = function (errors) {
                    console.log('verify email error', errors);
                };
                LRObject.init('verifyEmail', verifyemail_options);
            }
        }
    }
</script>
