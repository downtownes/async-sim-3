require('dotenv').config();
const express = require('express')
    , massive = require('massive')
    , bodyParser = require('body-parser')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , userController = require('./controllers/userController')
    , friendController = require('./controllers/friendController')
    , PORT = 4000;


const app = express();
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db);
});

passport.use(new Auth0Strategy({
    domain: process.env.DOMAIN,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    scope: 'openid profile'
}, function (accessToken, refreshToken, extraParams, profile, done) {
    let { nickname, name, auth_id, picture, user_id } = profile;
    const db = app.get('db');

    db.findUser(user_id).then(function (users) {
        console.log(profile.name);
        if (!users[0]) {
            db.newUser(
                //The parameters below are in a specific order to post to the database
                //the parameters below are named as they appear on the Google user
                //profile. If you
                [nickname,
                    user_id,
                    name.givenName,
                    name.familyName,
                    'https://robohash.org/me']).then(user => {
                        console.log("user", user)
                        return done(null, user[0].id, user[0].firstname, user[0].lastname)
                    })
        } else {
            return done(null, users[0].id, users[0].firstname, users[0].lastname)
        }
    })
}))

passport.serializeUser((user, done) => {
    console.log('id', user);
    done(null, user);
})

passport.deserializeUser((id, done) => {
    app.get('db').findSessionUser([id]).then(function(user) {
        return done(null, user[0])
    })
})


//Auth Endpoints
app.get('/api/auth/login', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/home',
    failureRedirect: 'http://localhost:3000/'
}));
app.get('/api/auth/authenticated', function(req, res){
    console.log(req.session);
    if(!req.user){
        res.status(403).send();
    } else if( req.user ){
        res.status(200).send(req.user)
    }
})

app.get('/auth/logout', function(req, res){
    req.logOut();
    res.redirect(`https://downtownes.auth0.com/v2/logout?returnTo=http%3A%2F%2Flocalhost:3000&client_id=${process.env.CLIENT_ID}`);
})


//User Endpoints
app.patch('/api/user/patch/:id', userController.updateUserInfo);



//RECOMMENDED ENDPOINTS
app.get('/api/recommended', userController.getAllUsers);



//FRIEND ENPOINTS
app.get('/api/friend/list', friendController.getFriendList);
app.post('/api/friend/add', friendController.addFriends);


app.listen(PORT, () => { console.log(`Listening on port: ${PORT}`) })