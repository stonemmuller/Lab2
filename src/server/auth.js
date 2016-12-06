var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require("./db");
// var utils = require("./utils");
var session = require('express-session');
var Auth = {router : router};

module.exports = function(app) {
    app.use(session({
        secret: '485h954895435359n943395fkdgfdgdgdgj58tergeeter',
        resave: false,
        saveUninitialized: true,
        name: "i",
        cookie: { maxAge: 31536000000 }
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(
        function (username, password, done) {

            console.error("LocalStrategy: username=", username, password);

            db.User.findOne({where: {login: username, password: password}}).then(function (user) {

                console.log("user", user && user.get({plain: true}));

                if (user) {
                    return done(null, user);
                }
                else {
                    return done(null, false, {message: 'Неверное имя использователя или пароль.'});
                }
            });
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        db.User.findById(id).then(function (user) {
            done(null, user.toJSON());
        })
    });

    router.post('/login',
        passport.authenticate('local', {
            failureFlash: false,
            failureRedirect: '/auth/login',
            successRedirect: '/'
        })
    );

    return Auth;
};