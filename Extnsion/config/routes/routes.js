module.exports = function (app, passport) {

    // normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function (req, res) {
        res.render('www/home/index.ejs');
    });




    // LOGOUT ==============================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    // Twitter Section =========================
    app.get('/profile_twitter', isLoggedIn, function (req, res) {
        res.render('dash/profiles/profile_twitter.ejs', {
            user: req.user
        });
    });

    // Facebook Section =========================
    app.get('/profile_facebook', isLoggedIn, function (req, res) {
        res.render('dash/profiles/profile_facebook.ejs', {
            user: req.user
        });
    });

    // Twitch Section =========================
    app.get('/profile_twitch', isLoggedIn, function (req, res) {
        res.render('dash/profiles/profile_twitch.ejs', {
            user: req.user
        });
    });

    // Mixer Section =========================
    app.get('/profile_mixer', isLoggedIn, function (req, res) {
        res.render('dash/profiles/profile_mixer.ejs', {
            user: req.user
        });
    });

    // =============================================================================
    // AUTHENTICATE (FIRST LOGIN) ==================================================
    // =============================================================================

    // locally --------------------------------
    // LOGIN ===============================
    // show the login form
    app.get('/login', function (req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/dash/dashboard', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // SIGNUP =================================
    // show the signup form
    app.get('/signup', function (req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dash/dashboard', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // facebook -------------------------------

    // send to facebook to do the authentication
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/profile_facebook',
            failureRedirect: '/'
        }));

    // twitter --------------------------------

    // send to twitter to do the authentication
    app.get('/auth/twitter', passport.authenticate('twitter', { scope: 'email' }));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect: '/profile_twitter',
            failureRedirect: '/'
        }));


    // google ---------------------------------

    // send to google to do the authentication
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/dashboard',
            failureRedirect: '/'
        }));

    // mixer ---------------------------------

    // send to Mixer to do the authentication
    app.get('/auth/mixer', passport.authenticate('mixer', {
        scope: ['channel:details:self', 'channel:follow:self', 'channel:update:self', 'chat:change_ban', 'chat:chat', 'channel:analytics:self', 'chat:clear_messages', 'chat:connect', 'chat:view_deleted', 'chat:whisper', 'interactive:robot:self', 'user:details:self', 'user:notification:self' ] }));

    //  the callback after Mixer has authenticated the user
    app.get('/auth/mixer/callback',
        passport.authenticate('mixer', {
            successRedirect: '/profile_mixer',
            failureRedirect: '/'
        }));

    // =============================================================================
    // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
    // =============================================================================

    // locally --------------------------------
    app.get('/connect/local', function (req, res) {
        res.render('connect-local.ejs', { message: req.flash('loginMessage') });
    });
    app.post('/connect/local', passport.authenticate('local-signup', {
        successRedirect: '/dash/dashboard', // redirect to the secure profile section
        failureRedirect: '/connect/local', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // facebook -------------------------------

    // send to facebook to do the authentication
    app.get('/connect/facebook', passport.authorize('facebook', { scope: ['public_profile', 'email'] }));

    // handle the callback after facebook has authorized the user
    app.get('/connect/facebook/callback',
        passport.authorize('facebook', {
            successRedirect: '/profile_facebook',
            failureRedirect: '/'
        }));

    // twitter --------------------------------

    // send to twitter to do the authentication
    app.get('/connect/twitter', passport.authorize('twitter', { scope: 'email' }));

    // handle the callback after twitter has authorized the user
    app.get('/connect/twitter/callback',
        passport.authorize('twitter', {
            successRedirect: '/profile_twitter',
            failureRedirect: '/'
        }));


    // google ---------------------------------

    // send to google to do the authentication
    app.get('/connect/google', passport.authorize('google', { scope: ['profile', 'email'] }));

    // the callback after google has authorized the user
    app.get('/connect/google/callback',
        passport.authorize('google', {
            successRedirect: '/dashboard',
            failureRedirect: '/'
        }));

    // mixer ---------------------------------

    // send to mixer to do the authentication
    app.get('/connect/mixer', passport.authorize('mixer', { scope: ['channel:details:self', 'channel:follow:self', 'channel:update:self', 'chat:change_ban', 'chat:chat', 'channel:analytics:self', 'chat:clear_messages', 'chat:connect', 'chat:view_deleted', 'chat:whisper', 'interactive:robot:self', 'user:details:self', 'user:notification:self'] }));

    // the callback after mixer has authorized the user
    app.get('/connect/mixer/callback',
        passport.authorize('mixer', {
            successRedirect: '/profile_mixer',
            failureRedirect: '/'
        }));

    // =============================================================================
    // UNLINK ACCOUNTS =============================================================
    // =============================================================================
    // used to unlink accounts. for social accounts, just remove the token
    // for local account, remove email and password
    // user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function (req, res) {
        var user = req.user;
        user.local.email = undefined;
        user.local.password = undefined;
        user.save(function (err) {
            res.redirect('/dashboard');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', isLoggedIn, function (req, res) {
        var user = req.user;
        user.facebook.token = undefined;
        user.save(function (err) {
            res.redirect('/dashboard');
        });
    });

    // twitter --------------------------------
    app.get('/unlink/twitter', isLoggedIn, function (req, res) {
        var user = req.user;
        user.twitter.token = undefined;
        user.save(function (err) {
            res.redirect('/dashboard');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', isLoggedIn, function (req, res) {
        var user = req.user;
        user.google.token = undefined;
        user.save(function (err) {
            res.redirect('/');
        });
    });


    // mixer ---------------------------------
    app.get('/unlink/mixer', isLoggedIn, function (req, res) {
        var user = req.user;
        user.mixer.token = undefined;
        user.save(function (err) {
            res.redirect('/');
        });
    });


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
