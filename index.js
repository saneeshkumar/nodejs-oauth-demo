const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const clientID = '<clientId>';
const clientSecret = '<clinetSecret>';
const redirectUri = 'http://localhost:3000/oauth/redirect';

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.listen(3000, function () {
    console.log("listening on port 3000...");
});

app.get("/", (req, res)=>{
    res.render('index', {clientID:clientID, redirectUri:redirectUri});
});

app.get('/oauth/redirect', (req, res) => {
    const requestToken = req.query.code;
    axios({
        method: 'post',
        url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
        headers: {
            accept: 'application/json'
        }
    }).then((response) => {
        const accessToken = response.data.access_token;
        res.render('welcome', {accessToken:accessToken});
    });
});