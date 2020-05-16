// config/auth.js

// This file contains the Oauth/Oauth2 and Auth methods for passport

module.exports = {

    'facebookAuth': {
        'clientID': '', 
        'clientSecret': '',
        'callbackURL': '',
        'profileURL': '',
        'profileFields': ['id', 'email', 'name'] 

    },

    'twitterAuth': {
        'consumerKey': '',
        'consumerSecret': '',
        'callbackURL': ''
    },

    'googleAuth': {
        'clientID': '',
        'clientSecret': '',
        'callbackURL': ''
    },

    'mixerAuth': {
        'clientID': '',
        'clientSecret': '',
        'callbackURL': ''
    }

};
