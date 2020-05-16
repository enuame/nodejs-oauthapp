// config/auth.js

// This file contains the Oauth/Oauth2 and Auth methods for passport

module.exports = {

    'facebookAuth': {
        'clientID': '2168529783370929', 
        'clientSecret': '3490a96475954a6cb824a54866608b4a',
        'callbackURL': 'https://extnsion.co.uk/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields': ['id', 'email', 'name'] 

    },

    'twitterAuth': {
        'consumerKey': 'tyToaGRgF2ofdKuVyJWc8Nd7p',
        'consumerSecret': 'gXAW1XV1D2afpaurXU7ZLEBXqNLy1EmSzVKVcghMArKBeYwhhS',
        'callbackURL': 'https://extnsion.co.uk/auth/twitter/callback'
    },

    'googleAuth': {
        'clientID': 'your-secret-clientID-here',
        'clientSecret': 'your-client-secret-here',
        'callbackURL': 'https://localhost/auth/google/callback'
    },

    'mixerAuth': {
        'clientID': 'de4d6dccadb98a1d1b2f7d30c940148ccfbaf70df0c2fb39',
        'clientSecret': 'eed112990b4b7a6e2344174b79d94398a70dfecaa2f3d9c414528e5eb47d2b1c',
        'callbackURL': 'https://localhost/auth/mixer/callback'
    }

};