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
    import LoginRadiusSDK from './assets/LoginRadiusV2SDK.1.1.0'



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
            let resetPassword = window.location.href.includes('?vtype=reset');
            if (!verification && !resetPassword) {
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

            if (resetPassword) {
                // let resetpassword_options = {
                //     container : "resetpassword-container",
                //     onError : (function(errors) {
                //         console.log('from reset password error',errors);
                //     }).bind(this),
                //     onSuccess : (function(response) {
                //         console.log('from reset password success',response);
                //         this.lr_display = "resetpassword";
                //     }).bind(this),
                // };
                //
                // var resetpassword_options = {};
                // resetpassword_options.container = "resetpassword-container";
                // resetpassword_options.onSuccess = function(response) {
                //     console.log(response);
                //     this.lr_display = "resetpassword";
                // };
                // resetpassword_options.onError = function(errors) {
                //     console.log(errors);
                // };
                // console.log('resetpassword_options.onSuccess',resetpassword_options.onSuccess);
                // LRObject.init("resetPassword", resetpassword_options);

            }

        }
    }
</script>
