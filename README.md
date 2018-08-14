
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

## Notes
# Features implemented
Reative interface implimented with the Vue.JS framework

Traditional sign up and login

Social media login

Forgot password email and recovery page

Error reporting

Change password functionality

Delete account functionality

Logout from the app

## What is broken on my demo:

Facebook login returns an Invalid Scopes: user_birthday, user_location error. Changed the social settings to only get basic data and reduced scope in custom permissions, but still no luck.  I am getting the same error when logging in with facebook through the hosted app at https://lr-candidate4.hub.loginradius.com

Logging in with Twitter returns a message informing the user that an email has been sent to verify email address, but email does not get delivered.  This is the same as on the hosted app at https://lr-candidate4.hub.loginradius.com

The Edit Profile functionality is partially broken. Using the profile editor template, I had empty inputs with class content-loginradius-termsandcondition rendered.

I wasn't able to find anywhere in the docs how to set the deleteUrl when using the template for deleting users so I implemented the delete account functionality through the SDK.  Currently, it is giving me an "The account limit for email requests for this resource has been reached for this time due to too many request" error. 





