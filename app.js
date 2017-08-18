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
    {username: "abentson", password: "abby"},
    {username: "zwschneid", password: "zach"},
    {username: "npkane", password: "nick"},
    {username: "blehman", password: "ben"},
    {username: "dpsnyder", password: "donnie"}
  ]
};

// HARD MODE
// TODO: add a logout button on landing page
// TODO: add a signup page that allows a user to make new credentials and push them to [credentials]

app.get('/', function(req, res) {
  let myUser = {};
  myUser.username = req.session.username;
  myUser.password = req.session.password;
  if (typeof req.session.username === 'undefined') {
    console.log("REDIRECTING TO LOGIN PAGE");
    res.redirect('/login');
  } else {
    console.log(req.session.username); // undefined
    res.render("index", myUser);
  }
});

app.get('/login', function(req, res) {
  res.render('login');
});

app.post('/login/auth', function(req, res, next) {
  let credentials = data.users;
  let authenticated = false;
  function userAuth(element) {
    if (element.username === req.body.username && element.password === req.body.password) {
      authenticated = true;
    }
  }
  credentials.find(userAuth);
  if (authenticated) {
    req.session.username = req.body.username;
	  req.session.password = req.body.password;
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
  console.log(req.session.username); // undefined
  console.log(req.body.username);
  console.log(req.body.password);
});



app.listen(3000, function(){
  console.log('You got this!');
});
