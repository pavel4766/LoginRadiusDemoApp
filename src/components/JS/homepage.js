export default {
    data(){
        return {
            loggingIn: true,
            forgotpassword: false,
            accessToken: null,
            profile: null
        }
    },

    mounted() {
        (function socialLogin() {
            let sociallogin_options = {
                templateName : 'loginradiuscustom_tmpl',
                container : 'sociallogin-container',
                onSuccess : (function(response) {
                    console.log(response);
                    this.accessToken = response.access_token;
                    this.profile = response.Profile;
                    console.log("this.accessToken",this.accessToken);
                }).bind(this),
                onError : function(errors) {console.log(errors)}
            };

            LRObject.util.ready(function() {
                LRObject.customInterface("interfacecontainerdiv", {templateName : 'loginradiuscustom_tmpl'});
                LRObject.init('socialLogin', sociallogin_options);
            });
            // window.LRObject.customInterface('.interfacecontainerdiv', sociallogin_options);
        }).call(this);


        let registration_options = {};
        registration_options.onSuccess = function(response) {
            console.log(response);
        };
        registration_options.onError = function(errors) {
            console.log(errors);
        };
        registration_options.container = "registration-container";
        LRObject.init("registration",registration_options);


        let login_options = {};
        login_options.onSuccess = function(response) {
            console.log(response);
        };
        login_options.onError = function(errors) {
            console.log(errors);
        };
        login_options.container = "login-container";

        LRObject.util.ready(function() {
            LRObject.init("login",login_options);
        });

        (function forgotPassword() {
            let forgotpassword_options = {
                container : "forgotpassword-container",
                onSuccess : function(response) {console.log(response)},
                onError : function(errors) {console.log(errors)}
            };

            LRObject.util.ready(function() {
                LRObject.init("forgotPassword", forgotpassword_options);
            });
        }).call(this);


    },

    methods: {
        onLoggedIn() {
            this.$emit('update',"loggedin")
        },
        unLinkAccount() {
            // window[&quot;loginradiusv1&quot;]? unLinkAccount(&quot;google&quot;,&quot;116283883752455810150&quot;) : LRObject.util.unLinkAccount(&quot;google&quot;,&quot;116283883752455810150&quot;)
        },

        login () {

        },

        // register() {
        //     let registration_options = {};
        //     registration_options.onSuccess = function(response) {
        //         console.log(response);
        //     };
        //     registration_options.onError = function(errors) {
        //         console.log(errors);
        //     };
        //     registration_options.container = "registration-container";
        //     LRObject.init("registration",registration_options);
        // }
    },
    components: {
        Login,
        ResendEmail,
        SocialLogin,
        Register
    }
}