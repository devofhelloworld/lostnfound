const express = require('express');
const app = express()
const path = require('path');
const homeroutes = require('./routes/homeroutes');
const foundrouter = require('./routes/foundroutes');
const lostrouter = require('./routes/lostroutes');
const claimrequestrouter = require('./routes/claimrequestroutes');
const searchrouter = require('./routes/searchroutes');
const {mongoconnect} = require('./utils/databaseutil');

app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


app.use(homeroutes);
app.use(express.urlencoded());
app.use(foundrouter);
app.use(lostrouter);
app.use(claimrequestrouter);
app.use(searchrouter);

app.get('/contact',(req,res,next)=>{
  res.render('contact',{pagetitle:'Contact Me!'});
})
app.use((req,res,next)=>{
  res.render('404',{pagetitle:'Page not found!'});
})


mongoconnect(()=>{
  console.log('MongoDB Connection Succesfull!');
});

module.exports = app;
