export default {

    socialLogin: function () {
        let sociallogin_options = {
            templateName: 'loginradiuscustom_tmpl',
            container: 'sociallogin-container',
            onSuccess: (function (response) {
                console.log(response);
                this.accessToken = response.access_token;
                this.profile = response.Profile;
                console.log("this.accessToken", this.accessToken);
            }).bind(this),
            onError: function (errors) {
                console.log(errors)
            }
        };

        LRObject.util.ready(function () {
            LRObject.customInterface("interfacecontainerdiv", {templateName: 'loginradiuscustom_tmpl'});
            LRObject.init('socialLogin', sociallogin_options);
        });
    },

}