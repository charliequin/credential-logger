const EXPRESS = require('express');
const HTTP = require('http');
const PATH = require('path');
const APP = EXPRESS();

let credentialArr = [];

let server = HTTP.createServer(APP);
let port = process.env.PORT | 8080;
APP.listen(port);

APP.set('views', __dirname + '/views');
APP.engine('html', require('ejs').__express);
APP.set('view engine', 'html');

APP.use(EXPRESS.static(PATH.join(__dirname, '/public')));
APP.use(EXPRESS.urlencoded());

APP.get('/', function(req, res) {
    let model = {
        credentialArr: credentialArr
    };

    res.render('index', model);
});

APP.get('/logs', function(req, res) {
    let model = {
        credentialArr: credentialArr
    };

    res.render('logs', model);
});

APP.post('/submit', function(req, res) {
    let styledFirst = nameFormat(req.body.firstname);
    let styledLast = nameFormat(req.body.lastname);

    credentialArr.push({
        firstname: styledFirst,
        lastname: styledLast,
        date: getDate()
    });

    res.render('submit');
})

function getDate() {
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + ' ' + time;

    return dateTime;
}

function nameFormat(name) {
    let firstChar = name.charAt(0);
    let styledChar = firstChar.toUpperCase();
    let removeChar = name.slice(1);
    let styledString = styledChar + removeChar;
  
    return styledString;
  }

console.log('Server initialised on localhost:%s', port);