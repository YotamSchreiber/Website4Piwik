/**
 * Ex3 - 302856026 - Yotam Schreiber.
 */


var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
app.use(bodyParser());
app.use(session({ secret: 'yotam', cookie: { maxAge: 6000000 }}));
app.use('/', express.static(__dirname + '/www'));

// session var
var sess;

// dictionary with the leagal admins details
var dic = {
    'admin': 'admin',
    '302856026': 'yotam'
};

app.get('/', function (req, res) {
    res.sendFile( __dirname + "/www/profile.html" );
});






app.get('/openNewPage', function (req, res) {
    res.sendFile( __dirname + "/www/newPage.html" );
});








app.get('/isLogin', function (req, res) {
    sess = req.session;
    if(sess.username) {
        res.json('true');
    } else {
        res.json('false');
    }
    res.end();
});


app.post('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.userPassword;

    if((username === 'admin' && password === dic.admin) || (username === '302856026' && password === dic[username])) {
        // creating an object to send back and tell if the login operation was success
        var successLoginDetails = {
            'isSuccess': 'true',
            'username': username,
            'password': password
        };
         sess = req.session;
         sess.username = username;
	     res.json(successLoginDetails);
    } else {
        // creating an object to send back and tell if the login operation was success
        var notSuccessLoginDetails = {
            'isSuccess': 'false',
            'username': username,
            'password': password
        };
        sess = req.session;
        sess.username = username;
        res.json(notSuccessLoginDetails);
    }
    
    res.end();
});

// vars contains the last value that has been clculated
var lastResultAdmin = 0;
var lastResultYotam = 0;

app.get('/calc/value/', function (req, res) {
    sess = req.session;
    if(sess.username) {
        if(sess.username === 'admin') {
            res.json(lastResultAdmin);
        } else if(sess.username === '302856026') {
            res.json(lastResultYotam);
        }
    }
    res.end();
});

app.post('/calc/value/:val', function (req, res) {
    sess = req.session;
    if(sess.username) {
        if(sess.username === 'admin') {
            lastResultAdmin = req.params.val;
        }  else if(sess.username === '302856026') {
            lastResultYotam = req.params.val;
        }
    }
    res.end();
});

var quotes = ['I believe that if life gives you lemons, you should make lemonade... And try to find somebody whose life has given them vodka, and have a party.',
    'One advantage of talking to yourself is that you know at least somebody is listening.',
    'Laugh and the world laughs with you, snore and you sleep alone.'];

app.get('/quotes/random', function (req, res) {
    sess = req.session;

    if(sess.username) {
        var randomNumber = Math.random();

        if((randomNumber >= 0) && (randomNumber < 0.33)) {
            res.send(quotes[0]);
        } else if((randomNumber >= 0.33) && (randomNumber < 0.66)) {
            res.send(quotes[1]);
        } else {
            res.send(quotes[2]);
        }
    } else {
        res.send('You are not login!');
    }

    res.end();
});


var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});