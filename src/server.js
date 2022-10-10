// use the express library
const express = require('express');

//use to parse the cookie
const cookieParser = require('cookie-parser');

// create a new server application
const app = express();
app.use(cookieParser());

// Define the port we will listen on
// (it will attempt to read an environment global
// first, that is for when this is used on the real
// world wide web).
const port = process.env.PORT || 3000;

// The main page of our website
//const {encode} = require('html-entities');
// ... snipped out code ...
let nextVisitorId = 1;
var lastVisitSeconds = -1;
var vistedText;

// the main page
app.get('/', (req, res) => {
  let newdate = new Date();
  if(req.cookies != undefined && req.cookies['visited'] != undefined){
    let olddate = new Date(req.cookies['visited']);
    lastVisitSeconds = Math.floor((newdate.getTime() - olddate.getTime()) / 1000);
    vistedText = `It has been ${lastVisitSeconds} seconds since your last visit`;
  } else {
    vistedText = 'you have never visited';
  }
  res.cookie('visitorId', nextVisitorId++);
  res.cookie('visited', newdate);

  // clearing cookies manually
  //res.clearCookie('visited');

  res.render('welcome', {
    name: req.query.name || "World",
    localDateTime: new Date(req.cookies['visited']).toLocaleString('en-US')|| new Date().toLocaleString(),
    visitorIdValue: req.cookies['visitorId'] || nextVisitorId,
    lastVisitSeconds: vistedText || 'you have never visited',
  });
   
  console.log("Cookies: ",req.cookies);
});

// Start listening for network connections
app.listen(port);

//To Tell your server code about the public folder
app.use(express.static('public'));

// set the view engine to ejs
app.set('view engine', 'ejs');

// Printout for readability
console.log("Server Started!");

