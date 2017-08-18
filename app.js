const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

app.use(session({
  secret: 'keyboard gunther',
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

// app.get('/', function(req, res){
//   res.send('Hey there good lookin');
// });

let data = {
  users: [
    {username: "swkane", password: "sam"},
    {username: "zwschneid", password: "zach"},
    {username: "npkane", password: "nick"},
    {username: "blehman", password: "ben"},
    {username: "dpsnyder", password: "donnie"}
  ]
};

// TODO: upon landing, check to see if someone has signed in

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/login', function(req, res) {
  res.render('login');
});

app.post('/login/auth', function(req, res) {
  console.log(req.body.username);
  console.log(req.body.password);
  res.redirect('/');
});

// TODO: compare credentials against a data structure
// TODO: if a credentials match a key value pair for a given object, redirect user back to landing page


app.listen(3000, function(){
  console.log('You got this!');
});
