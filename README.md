# NodeJS Oauth2 App

This was one of the first applications that I built, using NodeJS for both the **Frontend** & **Backend**

This was a base project, for testing and using **PassportJS** for authentication, into various other applications such as **Mixer, Twitch, Twitter & Facebook**. This is where [ENUAME](https://enua.me) first began and where my love for programming started and now continues to grow.

Though this project is no longer maintained(It's become part of the functioning Api system backend for **[ENUAME](https://enua.me)**, it is a great starter app to get you going and learning, just like I did.

## Project Code Structure:
    - App Folder
      - Config
      - data
      - templates
      - www
      - app.js
      - package.json

## Project Design:

[EJS](https://ejs.co) // EJS uses template variables, so that you can modulate your design

`<% include ./directory/src/header/header_template %>`

[Passport.js](http://www.passportjs.org) // Passport is used for the authentication into the dashboard

     - Strategies
        - "passport-facebook": "^2.1.1",
        - "passport-google-oauth": "^1.0.0",
        - "passport-google-oauth1": "^1.0.0",
        - "passport-local": "^1.0.0",
        - "passport-mixer": "^1.0.1",
        - "passport-oauth1": "^1.1.0",
        - "passport-steam": "^1.0.10",
        - "passport-twitter": "^1.0.4",
        - "passport-twitter-token": "^1.3.0",
        - "passport-windowslive": "^1.0.2",

[Express.js](https://expressjs.com) // This is the functional and basic web server that drives the app.

You can find all the included packages, in [packages.json[()
