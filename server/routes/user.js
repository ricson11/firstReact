const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const crypto = require('crypto');
const nodemailer = require('nodemailer')
const async = require('async');
require('../models/User');


router.post('/register', async(req, res)=>{

    let setPassword = await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(req.body.password, setPassword);
     let newUser = {
         username: req.body.username,
         email:req.body.email,
         password: securePassword,
     }
       
     console.log(newUser)
     await User.create(newUser)
     .then(user=>res.json(user))
     .catch(err=>res.status(400).json('Error' + err))

})

router.get('/users', async(req, res)=>{
      await User.find({}).sort({createdAt:-1})
      .then(users=>res.json(users))
      .catch(err=>res.status(400).json('Error:' + err))

})



router.post('/login', (req, res, next)=>{
    console.log(req.body)
    passport.authenticate('local', function(err, user, info){
        console.log(user)
        if(err) return res.send(err)
       
        if(!user){
       
      return res.send('Incorrect password')
        }
        req.logIn(user, function(err){
            if(err) return res.status(400).send(err);
            res.send(user)
           
            
        })
    })(req, res, next);
})






router.post('/forgot', function(req, res, next) {
    console.log(req.body)
    async.waterfall([
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      function(token, done) {
        User.findOne({ email: req.body.email }, function(err, user) {
          if (!user) {
            return res.send('No account with that email address exists.');
            
          }
  
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
          console.log(user)
          user.save(function(err) {
            done(err, token, user);
          });
        });
      },
      function(token, user, done) {
        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: 'mattdamon1134@gmail.com',
            pass: 'wonder5555',
             
          },
          tls:{
            rejectUnauthorized:false,
          }
      });
        var mailOptions = {
          to: user.email,
          from: 'Vicky interior designs <noreply.mattdamon1134@gmail.com>',
          subject: 'Vicky interior designs Password Reset',
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.hostname + '/admin/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        transporter.sendMail(mailOptions, function(err) {
        //  res.send('An e-mail has been sent to ' + user.email + ' with further instructions.');
          done(err, 'done');
        });
      }
    ], function(err) {
      if (err) return res.status(400).send('Error:' + err);
      res.status(200).json('Forgot email sent')
    });
  });

  //end of forget post

//Gettin the reset token


router.get('/reset/:token', function(req, res) {
User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
  if (!user) {
    return res.send( 'Password reset token is invalid or has expired');
     
  }
  let token = req.params.token;
  console.log(token)
 // res.render('users/reset',{token: req.params.token});
 res.send(token)
});
});









router.post('/reset/:token', function(req, res) {
async.waterfall([
  function(done) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
      if (!user) {
        return res.send('Password reset token is invalid or has expired.');
        
      }
        

      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
            
       bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(user.password, salt, (err,hash)=>{
         if(err) throw err;
        user.password = hash;
        console.log(user.password)
      user.save(function(err) {
        req.logIn(user, function(err) {
          done(err, user);
        });
      });
    });
    });
 
  })
  },
  function(user, done) {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'mattdamon1134@gmail.com',
            pass: 'wonder5555',
         
      },
      tls:{
        rejectUnauthorized:false,
      }
  });
    var mailOptions = {
      to: user.email,
      from: 'Vicky interior designs admin password reset<noreply.mattdamon1134@gmail.com>',
      subject: 'Your password has been changed',
      text: 'Hello,\n\n' +
        'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
    };
    transporter.sendMail(mailOptions, function(err) {
     
     // res.send( 'Success! Your password has been changed.');
      done(err);
    });
  }
], function(err) {
    if (err) return res.status(400).send('Error:' + err);
    res.status(200).json('Password reset successfully')
});
});




module.exports = router;