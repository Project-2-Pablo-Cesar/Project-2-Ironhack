const express = require('express');
const router  = express.Router();
const { ensureAuthenticated, hasRole } = require('../middlewares/authentication');
const uploadCloud = require('../config/cloudinary.js');
const Service = require('../models/Service.js')

router.get("/home",ensureAuthenticated, (req, res, next) => {
  res.render("Users/index");
});




router.get("/service-creation",ensureAuthenticated, (req, res, next) => {
  res.render("Users/service-creation");
});



router.post('/service-creation', uploadCloud.single('photo'), (req, res, next) => {
  console.log('pepe')
  const { title, serviceDescription } = req.body;
  const picPath = req.file.url;
  const picName = req.file.originalname;
  const newService = new Service({title, serviceDescription, picPath, picName})
  newService.save()
  .then(service => {
    console.log(service)
    console.log('pablo')
    res.redirect('/user/list')
  })
  .catch(error => {
    console.log(error)
  })
});



router.get("/detail",ensureAuthenticated, (req, res, next) => {
  res.render("Users/service-detail");
});




router.get("/list",ensureAuthenticated, (req, res, next) => {
  Service.find()
  .then(services=>{
    res.render("Users/services-list", {services});
    
  })
});




router.get("/search",ensureAuthenticated, (req, res, next) => {
  res.render("Users/services-search");
});



router.get("/profile",ensureAuthenticated, (req, res, next) => {
  
  res.render("Users/user-profile");
});





router.get("/finished",ensureAuthenticated, (req, res, next) => {
  res.render("Users/service-completed");
});


module.exports = router;