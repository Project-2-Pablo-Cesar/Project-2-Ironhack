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






module.exports = router;
