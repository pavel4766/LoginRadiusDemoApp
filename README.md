
> A demo project as a part of my application to LoginRadius utilizing the official Vue.JS templateedit

## Getting Started
``` bash
# install dependencies
npm install

# setup credentials
goto the directory src/assets/options.js to update credentials

# serve with hot reload at localhost:8080
npm run dev
```

# Features implemented
Reactive interface implemented with the Vue.JS framework

Traditional sign up and login

Social media login works especially well with Google

Forgot password email and recovery page

Error reporting

Change password functionality

Delete account functionality

Edit Profile

Logout from the app

#Documentation

**makeAlert(response)** takes a response argument, checks its value, and sets the alertMessage property of the datamodel which in turn updates the view, displaying the response argument passed to the makeAlert function.
If the response parameter is an array, the prameter is mapped to a new array over the Message key. 
A timeout is set to remove the alert from the model in 4 seconds.

**checkIfResettingPassword()** This method checks if a user had navigated to the reset password link they received in their email, and then initializes the reset password template from the LoginRadiusV2 library

**checkIfDeletingUser()** This method is used in the second step of the account deletion process. When the user receives an email confirmation to delete the account, and naviagtes to it, this method checks if the window.location.href includes the "?vtype=deleteuser" string, extracts the delete token and sets it as a property on the datamodel to be used when deleting the account.
The model is then modified and a view where the user confirms their intent to delete is conditionally rendered. 

**checkIfResettingPassword()** Sets the deleteUser property of the model to false, which removes the Delete User view element from the DOM, and changes the window.location to the root route

**onDeleteUserConfirm()** Is triggered when the Delete Account button is clicked, passing the LoginRadius SDK deleteAccount method an object containing the delete token extracted from the confirmation email.

**initializeLogin()** Uses the LoginRadiusV2 library to initialize the login template.  The onSuccess callback sets the response.access_token  as well as response.Profile as properties on the model, while onError callback generates an alert.

**initializeSocialLogin()** Uses the LoginRadiusV2 library to initialize the social login template.  The onSuccess callback sets the response.access_token  as well as response.Profile as properties on the model, while onError callback generates an alert.

**initializeForgotPassword()** Uses the LoginRadiusV2 library to initialize the forgot password template. 
 
**initializeRegistration()** Uses the LoginRadiusV2 library to initialize the new user registration template.
  
**onDeleteAccountClick()** This is the click handler for the onclick method on the delete account button which calls the deleteAccountWithEmailConfirmation function in the SDK

**toggleOn(container)** acts as a switch to activate of the editProfile, accountSettings, and changePasswords properties of the model which are responsible for conditionally rendering menu containers.  It is called from the inline @click Vue.js directive.

**onLogoutClick()** calls accessTokeInvalidate on the SDK, removes token from the model, as well as from localStorage.  This method is called on logout click,as well as by onDeleteUserConfirm()

**closeResetPassword** click handler for the close button on the reset password view which sets the window.location.href to root, and toggles state of the model to not display the reset password container

**editProfileSubmit** make an API call via the updateData function on the LoginRadiusV2 library - see notes

**facebookOverride** identifies the facebook button, and takes over the event handing for it to attempt to use the LoginRadiusV2 library's openWindow function to open a Facebook login page with a more narrow scope limited to the default profile
## Notes:

Facebook login returns an Invalid Scopes: user_birthday, user_location error. Changed the social settings to only get basic data and reduced scope in custom permissions, but still no luck.  I am getting the same error when logging in with facebook through the hosted app at https://lr-candidate4.hub.loginradius.com. 
I tried to work around this by over riding the default way the facebook login request is handled, as well as setting up direct authentication from Facebook as opposed to going through login radius, but I had some challenges.

I wasn't able to find anywhere in the docs how to set the deleteUrl when using the template for deleting users so I implemented the delete account functionality through the SDK.  At times it gives me an "The account limit for email requests for this resource has been reached for this time due to too many request" error, but it mainly works. 

The documentation page for the LoginRadiusV2 library describes the api.updateData method as having 5 parameters, but it actually takes 6.  The Uid is missing as a parameter in the docs.
h.api.updateData=function(b,g,f,h,k,l){
    var e={};
    e.Profile=h;
    e.access_token=f;
    ia(e,null,B(g),k,l,"",b)
};
https://docs.loginradius.com/api/v2/deployment/js-libraries/js-form-library#update3

## Todo
Refactor App.vue to remove everything that is not used

Put in loading indicators

Break up the homepage vue into components

Write tests

Put a check to see if there is an access token on client storage, and make a call to get profile.


