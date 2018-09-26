const express = require('express');
const router  = express.Router();
const { ensureAuthenticated, hasRole } = require('../middlewares/authentication');
const uploadCloud = require('../config/cloudinary.js');
const Service = require('../models/Service.js')
const User = require('../models/User.js')

router.get("/home", (req, res, next) => {
  res.render("index");
});




router.get("/service-creation",ensureAuthenticated, (req, res, next) => {
  res.render("Users/service-creation");
});



router.post('/service-creation', uploadCloud.single('photo'), (req, res, next) => {
  console.log('pepe')
  
  const { title, serviceDescription, serviceExpiresDate, latitude, type, longitude } = req.body;
  console.log(latitude, longitude)
  const user = req.user.id;
 
  const picPath = req.file.url;
  const picName = req.file.originalname;
  const newService = new Service({title, serviceDescription, user, serviceExpiresDate, picPath, picName, type, location : {type: "Point",coordinates: [Number(latitude), Number(longitude)]}})
  newService.save()
  .then(service => {
    console.log(service)
    console.log('pablo')
    
    res.redirect('/')
  })
  .catch(error => {
    console.log(error)
  })
});



router.get("/detail/:id",ensureAuthenticated, (req, res, next) => {
  let serviceId = req.params.id;
  Service.findById(serviceId)
  .then(services => {
    console.log(services.location.coordinates)
    res.render('Users/service-detail',{services,serviceStr: JSON.stringify(services)});
  }).catch(err => {
    next(err)
  })
});



router.post('/detail/:id', uploadCloud.single('photo'), (req, res, next) => {
  console.log('pepe')
  const { title, serviceDescription, serviceExpiresDate, latitude, type, longitude} = req.body;
  const user = req.user.id;
  const picPath = req.file.url;
  const picName = req.file.originalname;

  const newService = new Service({title, serviceDescription, user, type, serviceExpiresDate, picPath, picName, location : {type: "Point",coordinates: [Number(latitude), Number(longitude)]}})
  newService.save()
  .then(service => {
    console.log(service)
    console.log('pablo')
    
    res.redirect('/detail/:id')
  })
  .catch(error => {
    console.log(error)
  })
});




router.get("/list",ensureAuthenticated, (req, res, next) => {
  Service.find( {type : "original"})
  .then(services=>{
    res.render("Users/services-list", {services});
    
  })
});




router.get("/search",ensureAuthenticated, (req, res, next) => {
  res.render("Users/services-search");
});



router.get("/profile",ensureAuthenticated, (req, res, next) => {
  let userid = req.user.id
  Service.find({user: userid})
  .then(services=>{
    res.render("Users/user-profile", {services});
    
  })
   

});

router.get("/finished",ensureAuthenticated, (req, res, next) => {
  res.render("Users/service-completed");
});


module.exports = router;