"use strict";

require("dotenv").config();

let express = require("express");
let passport = require("passport");
let FitbitStrategy = require("passport-fitbit-oauth2").FitbitOAuth2Strategy;

passport.use(new FitbitStrategy(
    {
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
        callbackURL: process.env.domain + "/auth/fitbit/callback"
    },
    function (accessToken, refreshToken, profile, done) {
        console.log(accessToken, refreshToken, profile);
        done(null, {});
    }
));

let app = express();

app.use(passport.initialize());

app.get("/auth/fitbit", passport.authenticate("fitbit", {scope: ["activity", "heartrate", "location", "profile"]}));

app.get("/auth/fitbit/callback", passport.authenticate("fitbit", {
    successRedirect: "/auth/fitbit/success",
    failureRedirect: "/auth/fitbit/failure"
}));


app.listen(8080, function () {
    console.log("fitbit app listening on port 3000");
});