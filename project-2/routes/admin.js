const express = require('express');
const router  = express.Router();
const { ensureAuthenticated, hasRole } = require('../middlewares/authentication');
const User = require("../models/User");
const Service = require("../models/Service.js")

/* GET home page */


router.get('/admin-control',hasRole("ADMIN"), (req, res, next) => {
  User.find()
  //Service.find()
  .then( users =>{
    Service.find()
    .then(services => {
  
    res.render('admin/admin-control', {users, services} );
    //console.log(services)
    })
  })
})
  router.post("/users/:id/delete", (req, res, next) => {
    const { userId } = req.body;
    User.findByIdAndRemove(userId)
      .then(deleted => {
        res.redirect("/admin/admin-control");
      })
      .catch(next);
  });

  router.post("/services/:id/delete", (req, res, next) => {
    const { serviceId } = req.body;
    console.log(serviceId)
    Service.findByIdAndRemove(serviceId)
      .then(deleted => {
        console.log('borra')
        res.redirect("/admin/admin-control");
      })
      .catch(next);
  });

  router.post('/users/:id/edit', (req, res, next) => {
    const { name, email, username} = req.body;
    User.findOneAndUpdate ({'_id': req.params.id}, { $set: { name, email, username }})
    .then(() => {
      res.redirect("/admin/admin-control")
    })
   
    .catch(next)
  });

  router.post('/service/:id/edit', (req, res, next) => {
    const { title,serviceDescription, serviceExpiresDate} = req.body;
console.log(req.body)
    User.findOneAndUpdate ({'_id': req.params.id}, { $set: { title, serviceDescription, serviceExpiresDate}})
    //console.log(req.body)
    .then(() => {
      res.redirect("/admin/admin-control")
    })
   
    .catch(next)
  });


  // router.get('/edit/:id', (req, res, next) => {
  //   let userId = req.params.id;
  //   User.findById(userId)
  //   .then(user => {
  //     res.render('edit',{user});
  //   }).catch(err => {
  //     next(err)
  //   })}else {res.render("list",{
  //     errorMessage: "You dont have permission to do that"
  //   })}
    
  // });
  
  // router.post('/edit/:id', (req, res, next) => {
  //   let userId = req.params.id;
  //   const{username,role} = req.body
  //   User.findByIdAndUpdate(userId, {username,role})
  //   .then(user => {
  //     res.redirect("/list");
      
  //   })
  //   .catch(err => {
  //     next(err)
  //   })
  // });







module.exports = router;
