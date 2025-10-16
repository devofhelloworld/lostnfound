const session = require("express-session");
const user = require("../models/user");
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

exports.login = (req,res,next)=>{
  res.render('login',{pagetitle:'Login',isloggedin: req.session.isloggedin});
}

exports.postlogin = 
  
   (req,res,next)=>{

    const {email,password} = req.body;
  user.find({email:email}).then(([data])=>{
     console.log(data);
     if(!data){
     res.redirect('/login'); 
    }
    else{
      const match = bcrypt.compare(password,data.password);
      if(match){
        console.log('Login Successful!');
        req.session.isloggedin = true;
        req.session.useremail = email;
        res.redirect('/');
      }
      else{
        res.redirect('/login'); 
      }
  }
      
  })
  
}

exports.logout = (req,res,next)=>{
  req.session.destroy(()=>{res.redirect('/login')});
}

exports.signup = (req,res,next)=>{
  res.render('signup',{pagetitle: 'Sign-Up',isloggedin:req.session.isloggedin,errormsg:[],oldinputs:{}});
}

exports.postsignup = [
  
  check('fname').notEmpty().withMessage('First name is required').trim().isLength({min:3}).withMessage('First name should be atleast 3 characters long').matches(/^[a-zA-Z]+$/).withMessage('First name must contain only letters!'),
  
  check('lname').notEmpty().withMessage('Last name is required').trim().isLength({min:3}).withMessage('Last name should be atleast 3 characters long').matches(/^[a-zA-Z]+$/).withMessage('Last name must contain only letters!'),
  
  check('email').isEmail().withMessage('Enter a valid Email Address').custom((email)=>{
    if(!email.endsWith('@nitp.ac.in')){
      throw new Error('You must use your college Email id');
    }
    return true;
  }),

  check('phone').notEmpty().withMessage('Phone number is required!').isLength({min:10,max:10}).withMessage('Phone number must be of 10 digits').isNumeric().withMessage('Phone must contain only digits!'),

  check('roll').notEmpty().withMessage('Roll no. is required!').isLength({min:7,max:7}).withMessage('Enter valid roll no.!').isNumeric().withMessage('Roll no. must contain only digits!'),

  check('password').notEmpty().isLength({min:8}).withMessage('Password length should be atleast 8').trim(),
  
  check('conpassword').notEmpty().withMessage('Confirm your Password').custom((conpassword,{req})=>{
    
    if(conpassword!=req.body.password){
      throw new Error('Password is mismatched');
    }
    return true;
  }),

  check('terms').notEmpty().withMessage('Accept the terms and conditions!').custom((terms)=>{
    if(!terms=='on'){
      throw new Error('Accept the terms and conditions');
    }
    return true;
  }),
  
  async (req,res,next)=>{

  const {fname,lname,email,phone,roll,password,conpassword,terms} = req.body;
    const userdata = await user.find({email:email});

    const errors = validationResult(req);
    console.log(userdata);

    if(userdata.length==0){
      if(!errors.isEmpty()){
          return res.status(422).render('signup',{
            pagetitle: 'Sign-Up',
            isloggedin: req.session.isloggedin,
            errormsg: errors.array().map(error=>error.msg),
            oldinputs: {
              fname: fname,
              lname: lname,
              email: email,
              phone: phone,
              roll: roll,
              present:''
            }
          })
        }
      else{
      console.log(req.body);
      bcrypt.hash(password,12).then(password=>{
      const userdata = new user({fname,lname,email,phone,roll,password,terms});
      userdata.save().then(()=>{
      res.redirect('/login');
      })
      })   
    } 
    }
    else{
      return res.status(422).render('signup',{
        pagetitle: 'Sign-Up',
        isloggedin: req.session.isloggedin,
        errormsg: errors.array().map(error=>error.msg),
        oldinputs: {
          fname: fname,
          lname: lname,
          email: email,
          phone: phone,
          roll: roll,
          present:`User with ${email} already exists`
        }
      })
    }
    
    
}]