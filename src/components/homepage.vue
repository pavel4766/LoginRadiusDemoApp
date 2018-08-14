<template>
    <div class="lr-app-main" :class="{ forgotpassword: forgotpassword}">
        <div v-if="alertMessage" class="lr-alert-container">
            <ul id="v-for-object" class="demo">
                <li v-for="value in alertMessage">
                    {{ value }}
                </li>
            </ul>
        </div>

        <div v-if="resetPassword" class="lr-reset-password-wrapper">
            <div  id="resetpassword-container"></div>
            <div class="reset-password-close regular-button" @click="closeResetPassword()">Close</div>
        </div>

        <div class="lr-authentication-wrapper" v-if="!accessToken && !resetPassword" >
            <div id="sociallogin-container"></div>
            <div class="forgotpassword-wrapper">
                <div id="forgotpassword-container">
                </div>
                <div class ="regular-button" @click="forgotpassword = false">Cancel</div>
            </div>

            <div class="login-register">
                <span class="container-tab login" :class="{ active: loggingIn }" @click="loggingIn = true">Login</span>
                <span class="container-tab register" :class="{ active: !loggingIn }" @click="loggingIn = false">Register</span>
            </div>

            <div class="lr-login-wrapper " :class="{ active: loggingIn }">
                <div id="login-container" class="lr-login-container" > </div>
                <div class="lr-forgot-password" @click="forgotPassword=true">
                    <a href="#" @click="forgotpassword = true">Forgot Password?</a>
                </div>
                <div :class="{ active: loggingIn }" id="lr-social-login" class="lr-social-login-frame lr-frames lr-sample-background-enabled cf">
                        <h2 class="lr-social-login-message">Login with your social account</h2>
                        <div id="interfacecontainerdiv" class="lr-sl-shaded-brick-frame cf lr-widget-container">
                        <script type="text/html" id="loginradiuscustom_tmpl">
                            <span class="lr-provider-label lr-sl-shaded-brick-button lr-flat-<#=Name.toLowerCase()#>"
                                  onclick=" return LRObject.util.openWindow('<#= Endpoint #>'); "
                                 title="Sign up with <#= Name #>" alt="Sign in with <#= Name#>">
                                <span class="lr-sl-icon lr-sl-icon-<#= Name.toLowerCase()#>"></span>
                                Login with <#= Name#>
                            </span>
                        </script>
                    </div>
                </div>
            </div>

            <div :class="{ active: !loggingIn }" id="registration-container" class="lr-registration-container"></div>
        </div>

        <div class="lr-account-wrapper" v-if="accessToken">

            <div class="lr-frame lr-profile-left">

                <div class="lr-profile-image">
                    <img :src="profile.ImageUrl">
                </div>

                <h1 class="lr-profile-name">{{profile.FullName}}</h1>
                <div class="lr-profile-info">
                    <p></p>
                </div>


                <!--<div class="lr-link-social-container">-->
                    <!--<div id="interfacecontainerdiv" class="interfacecontainerdiv"></div>-->
                <!--</div>-->

            </div>

            <div class="lr-frame lr-profile-right">

                <div class="lr-profile-info-container">

                    <div class="lr-profile-heading">
                        <h2>My Profile</h2>
                    </div>
                    <div class="lr-content-section cf" id="profile-viewer">
                        <div v-if="profile.FirstName" class="lr-content-group">
                            <h6 class="lr-label">First Name</h6>
                            <div class="lr-data">{{profile.FirstName}}</div>
                        </div>
                        <div v-if="profile.LastName" class="lr-content-group">
                            <h6 class="lr-label">Last Name</h6>
                            <div class="lr-data">{{profile.LastName}}</div>
                        </div>
                        <div v-if="profile.Email" class="lr-content-group">
                            <h6 class="lr-label">Email Id</h6>
                            <div class="lr-data">{{profile.Email[0].Value}}</div>
                        </div>
                    </div>
                </div>


                <div class="lr-menu lr-account-menu">
                    <div class="lr-menu-button"></div>
                    <div class="lr-menu-list-frame">
                        <a class="lr-settings lr-menu-list lr-show-settings" @click="onEditProfileClick()" >Edit Profile</a>

                        <a class="lr-settings lr-menu-list lr-show-settings"  @click="onChangePasswordClick()">Change Password</a>

                        <a class="lr-settings lr-menu-list lr-show-settings" @click="onAccountSettingsClick()" >Account Settings</a>

                        <a class="lr-logout lr-menu-list" @click="onLogoutClick()">Logout</a>
                    </div>
                </div>
            </div>

            <div class="lr-more-menu-contents">

                <div  :class="{ active: editProfile, inactive: !editProfile }" id="lr-edit-profile" class="lr-more-menu-frame lr-edit-profile lr-account-settings" >

                    <div class="lr-more-info-heading">
                        <h2>Edit My Profile</h2>
                        <a class="lr-close" @click="editProfile = false">X</a>
                    </div>

                    <div id="profileeditor-container"></div>
                </div>

                <div :class="{ active: accountSettings, inactive: !accountSettings }" id="lr-account-settings" class="lr-more-menu-frame lr-account-settings">

                    <div class="lr-more-info-heading">
                        <h2>Account Settings</h2>
                        <a  class="lr-close" @click="accountSettings = false">X</a>
                    </div>

                    <div class="lr-account-settings-frame">
                        <h5 class="lr-setting-label">Delete Account</h5>
                        <!--<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta architecto aliquid sit aspernatur officia, quam.</p>-->
                        <div class="lr-action-box">
                            <a class="lr-button regular-button" @click="onDeleteAccountClick()">Delete my account</a>
                        </div>
                    </div>

                </div>

                <div :class="{ active: changePassword, inactive: !changePassword }"   id="lr-change-password" class="lr-more-menu-frame lr-field-editor lr-change-password lr-account-settings">
                    <div class="lr-more-info-heading">
                        <h2>Change Password</h2>
                        <a id="lr-close" class="lr-close" @click="changePassword = false">X</a>
                    </div>
                    <div id="changepassword-container"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script >

    export default {
        data(){
            return {
                loggingIn: true,
                resetPassword:false,
                forgotpassword: false,
                accessToken: window.localStorage.getItem('access_token'),
                alertMessage: null,
                accountSettings: false,
                editProfile: false,
                changePassword: false,
                deleteUser: false,
                Profile: null,
                profile: {
                    ImageUrl: null,
                    FullName: null
                }
            }
        },

        mounted() {
            this.socialLogin();
            this.registration();
            this.login();
            this.forgotPassword();
            this.checkIfResettingPassword()
        },

        updated: function() {

            // onError : (function(response) {
            //     this.alertMessage = response.map((value,index)=>{
            //         return value.Message;
            //     },{})}

            // (function makeSocialLinkingContainer() {
            //     var la_options = {};
            //     la_options.container = "interfacecontainerdiv";
            //     la_options.templateName = 'loginradiuscustom_tmpl_link';
            //     la_options.onSuccess = function(response) {
            //         console.log('linking success',response);
            //     };
            //     la_options.onError = (function(errors) {
            //         this.alertMessage = errors.map((value,index)=>{
            //             return value.Message;
            //         },{});
            //     });
            //
            //     LRObject.util.ready(function() {
            //         LRObject.init("linkAccount", la_options);
            //     });
            // }).bind(this);

            // (function makeSocialUnlinkingContainer(){
            //     var unlink_options = {};
            //     unlink_options.onSuccess = function(response) {
            //         console.log('unlink success',response);
            //     };
            //     unlink_options.onError = (function(errors) {
            //         this.alertMessage = errors.map((value,index)=>{
            //             return value.Message;
            //         },{});
            //     }).bind(this);
            //
            //     LRObject.util.ready(function() {
            //         LRObject.init("unLinkAccount", unlink_options);
            //     });
            // }).bind(this);


            this.socialLogin();
            this.registration();
            this.login();
            this.forgotPassword();
            this.checkIfResettingPassword()
        },

        methods: {
            makeAlert : (function(response) {
                console.log('response',errors);
                this.alertMessage = response.map((value)=>{
                    return value.Message;
                },{});
            }).bind(this),

            checkIfResettingPassword : (function () {
                if (window.location.href.includes('?vtype=reset')) {
                    this.resetPassword = true;
                    let resetpassword_options = {
                        container : "resetpassword-container",
                        onError : makeAlert,
                        onSuccess : (function(response) {
                            console.log('from reset password success',response);
                            this.alertMessage = "You have successfully reset your password";
                        }).bind(this),
                    };
                    LRObject.init("resetPassword", resetpassword_options);
                }
            }).bind(this),

            checkIfDeletingUser : (function () {
                if (window.location.href.includes('?vtype=deleteuser')) {
                    this.deleteUser = true;
                    let resetpassword_options = {
                        container : "resetpassword-container",
                        onError : makeAlert,
                        onSuccess : (function(response) {
                            console.log('from reset password success',response);
                            this.alertMessage = "You have successfully reset your password";
                        }).bind(this),
                    };
                    LRObject.init("resetPassword", resetpassword_options);
                }
            }).bind(this),

            login : (function () {
                let login_options = {
                    container : "login-container",
                    onSuccess : (function(response) {
                        console.log('login success',response);
                        this.accessToken = response.access_token;
                        window.localStorage.setItem('access_token', response.access_token);
                        this.profile = response.Profile;
                        this.alertMessage = null;
                    }).bind(this),
                    onError : this.makeAlert,
                };

                LRObject.util.ready(function() {
                    LRObject.init("login",login_options);
                });
            }).bind(this),

            socialLogin : (function socialLogin() {
                let sociallogin_options = {
                    templateName : 'loginradiuscustom_tmpl',
                    container : 'sociallogin-container',
                    onSuccess : (function(response) {
                        console.log('social login response',response);
                        this.accessToken = response.access_token;
                        window.localStorage.setItem('access_token', response.access_token);
                        this.profile = response.Profile;
                        console.log("this.accessToken",this.accessToken);
                    }).bind(this),
                    onError : this.makeAlert,
                };

                LRObject.util.ready(function() {
                    LRObject.customInterface("interfacecontainerdiv", {templateName : 'loginradiuscustom_tmpl'});
                    LRObject.init('socialLogin', sociallogin_options);
                });
            }).bind(this),

            forgotPassword : (function () {
                let forgotpassword_options = {
                    container : "forgotpassword-container",
                    onSuccess : function(response) {console.log('from password recovery',response)},
                    onError : this.makeAlert,
                    resetPasswordUrl : "http://localhost:8080",
                    verificationUrl : window.location.origin,
                };
                console.log('forgotpassword_options',forgotpassword_options);
                LRObject.util.ready(function() {
                    LRObject.init("forgotPassword", forgotpassword_options);
                });
            }).bind(this),


            registration : (function () {
                let registration_options = {
                    container : "registration-container",
                    onSuccess : (function(response) {
                        console.log('success response',response);
                        this.alertMessage = (response.IsPosted && !response.Data) ? {1:"A verification email has been sent to the email address provided."} : null;
                    }).bind(this),
                    onError : this.makeAlert,
                };

                LRObject.util.ready(function() {
                    LRObject.init("registration",registration_options);
                });
            }).bind(this),

            onDeleteAccountClick() {

                // let deleteuser_options = {};
                // deleteuser_options.onSuccess = function(response) {
                //     this.alertMessage = "An confirmation email has been sent to your email account."
                // };
                // deleteuser_options.onError = function(errors) {
                //     console.log('deleteuser_options',errors);
                // };
                // deleteuser_options.deleteUrl = "localhost:8080";
                //
                // LRObject.util.ready(function() {
                //     LRObject.init("deleteUser", deleteuser_options);
                // });

                LoginRadiusSDK.deleteAccountWithEmailConfirmation('localhost:8080',null, function (data) {
                    console.log('data',data);
                });
            },

            toggleOn(container) {
               this.editProfile = (container === "editProfile");
               this.accountSettings = (container === "accountSettings");
               this.changePassword = (container === "changePassword");
            },

            onLogoutClick() {
                this.accessToken = null;
                window.localStorage.removeItem('access_token');
            },

            closeResetPassword() {
                this.resetPassword = false;
                window.location.href = "";
            },

            onChangePasswordClick() {
                this.toggleOn("changePassword");
                let changepassword_options = {
                    container : "changepassword-container",
                    onSuccess : (function(response) {
                        this.alertMessage = "Password changed successfully.";
                        console.log('change password success',response);
                    }).bind(this),
                    onError : this.makeAlert,
                };

                LRObject.util.ready(function() {
                    LRObject.init("changePassword",changepassword_options);
                });
            },

            onEditProfileClick(){
                this.toggleOn("editProfile");
                let profileeditor_options = {
                    container : "profileeditor-container",
                    onSuccess : this.makeAlert,
                    onError : this.makeAlert

                };
                LRObject.util.ready(function() {
                    LRObject.init("profileEditor",profileeditor_options);
                });
            },
            onAccountSettingsClick(){
                this.toggleOn("accountSettings");
            }
        },
        components: {
            // Login,
            // ResendEmail,
            // SocialLogin,
            // Register
        }
    }
</script>


<style src="./SASS/homepage.sass" lang="sass">
</style>