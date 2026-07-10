require('dotenv').config();
const express = require('express');
const app = express()
const path = require('path');
const homeroutes = require('./routes/homeroutes');
const foundrouter = require('./routes/foundroutes');
const lostrouter = require('./routes/lostroutes');
const claimrequestrouter = require('./routes/claimrequestroutes');
const searchrouter = require('./routes/searchroutes');
const {mongoconnect} = require('./utils/databaseutil');
const { default: mongoose } = require('mongoose');
const authrouter = require('./routes/authroutes');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const DB_PATH = process.env.DB_PATH;

app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

const store = new MongoDBStore({
  uri: DB_PATH,
  collection: 'sessions'
})

app.use(session({
  secret: process.env.SESSION_SECRET || 'Lost and Found',
  resave: false,
  saveUninitialized: true,
  store: store
}))

app.use((req, res, next) => {
  const excludedPaths = ['/', '/login','/signup','/contact','/about','/api/stats'];

  if (excludedPaths.includes(req.path)) {
    return next();
  }
  if (req.session.isloggedin) {
    next();
  } else {
    console.log('redirect');
    res.redirect('/login');
  }
});

app.use(homeroutes);
app.use(express.urlencoded());
app.use(foundrouter);
app.use(claimrequestrouter);
app.use(searchrouter);
app.use(authrouter);
app.use(lostrouter);

app.get('/contact',(req,res,next)=>{
  res.render('contact',{pagetitle:'Contact Me!',isloggedin: req.session.isloggedin});
});
app.get('/about',(req,res,next)=>{
  res.render('about',{pagetitle:'About · Lost & Found NIT Patna',isloggedin: req.session.isloggedin});
});
app.use((req,res,next)=>{
  res.render('404',{pagetitle:'Page not found!',isloggedin: req.session.isloggedin});
});

const PORT = process.env.PORT || 3000;

mongoose.connect(DB_PATH).then(()=>{
  console.log('Successfully connected to mongo');
  app.listen(PORT,console.log(`Server is running on http://localhost:${PORT}`));
}).catch(error=>console.log(error));
