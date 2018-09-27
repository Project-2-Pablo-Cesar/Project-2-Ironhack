const express = require('express');
const router = express.Router();
const {
  ensureAuthenticated,
  hasRole
} = require('../middlewares/authentication');
const uploadCloud = require('../config/cloudinary.js');
const Service = require('../models/Service.js');
const User = require('../models/User.js');
const transport = require("../Mailing/transport");
const {
  mailTemplate
} = require("../Mailing/templates")

router.get("/home", (req, res, next) => {
  res.render("index");
});




router.get("/service-creation", ensureAuthenticated, (req, res, next) => {
  res.render("Users/service-creation");
});



router.post('/service-creation', uploadCloud.single('photo'), (req, res, next) => {
  console.log('pepe')

  const {
    title,
    serviceDescription,
    serviceExpiresDate,
    latitude,
    type,
    longitude,
  } = req.body;
  console.log(latitude, longitude)
  const user = req.user.id;

  const picPath = req.file ? req.file.url : "http://res.cloudinary.com/dz4mjhdbf/image/upload/v1537961966/folder-name/placeholder.jpg.jpg"
  const picName = req.file ? req.file.originalname : "placeholder"

  const newService = new Service({
    title,
    serviceDescription,
    user,
    serviceExpiresDate,
    picPath,
    picName,
    type,
    location: {
      type: "Point",
      coordinates: [Number(latitude), Number(longitude)]
    }
  })
  newService.save()
    .then(service => {

      res.redirect('/')
    })
    .catch(error => {
      console.log(error)
    })
});



router.get("/detail/:id", ensureAuthenticated, (req, res, next) => {
  let serviceId = req.params.id;
  Service.findById(serviceId)
    .then(services => {
      Service.find({
          destiny: serviceId
        })
        .then(offers => {
          res.render('Users/service-detail', {
            offers,
            services
          });
        }).catch(error => {
          console.log(error)
        })
    })
});



router.post('/detail/:id', uploadCloud.single('photo'), (req, res, next) => {
  let serviceId = req.params.id;
  const {
    title,
    serviceDescription,
    serviceExpiresDate,
    latitude,
    type,
    longitude,
    destiny
  } = req.body;
  const user = req.user.id;
  const picPath = req.file ? req.file.url : "http://res.cloudinary.com/dz4mjhdbf/image/upload/v1537961966/folder-name/placeholder.jpg.jpg"
  const picName = req.file ? req.file.originalname : "placeholder"
  const newService = new Service({
    title,
    serviceDescription,
    user,
    serviceExpiresDate,
    picPath,
    picName,
    type,
    destiny,
    location: {
      type: "Point",
      coordinates: [Number(latitude), Number(longitude)]
    }
  })
  newService.save()
    .then(service => {
      res.redirect(`/detail/${serviceId}`)
    })

});




router.get("/list", ensureAuthenticated, (req, res, next) => {
  Service.find({
      type: "original",
      status: "open"
    })
    .then(services => {
      res.render("Users/services-list", {
        services
      });

    })
});




router.get("/search", ensureAuthenticated, (req, res, next) => {
  res.render("Users/services-search");
});



router.get("/profile", ensureAuthenticated, (req, res, next) => {
  let userid = req.user.id
  Service.find({
      user: userid
    })
    .then(services => {
      res.render("Users/user-profile", {
        services
      });

    })


});

router.get("/finished/:id/:id2", ensureAuthenticated, (req, res, next) => {
  let serviceId = req.params.id;
  let offerId = req.params.id2;
  let serviceGlobal;
  let offerGlobal;

let mail = {
  subject:"prueba",
  text:"esto es una prueba",
} 

  const email = (user, obj,ref) => {
    return transport.sendMail({
      to: user.email,
      subject: obj.subject,
      text: obj.text,
      html: mailTemplate(user, `http://localhost:3000/review/${ref.id}`)
    })
  }

  Service.findByIdAndUpdate(serviceId, {
      status: "closed"
    }, {
      new: true
    })
    .populate("user")
    .then(service => {
      serviceGlobal = service;
      return Service.findById(offerId)
        .populate("user")
    })
    .then(offer => {
      offerGlobal = offer;
      return email(serviceGlobal.user, mail,offerGlobal.user)
    })
    .then(() => {
      return email(offerGlobal.user,mail,serviceGlobal.user)
    })
    .then(() => res.render('Users/service-completed', {
      offerGlobal,
      serviceGlobal
    }))
    .catch(error => {
      console.log(error)
    })


});


module.exports = router;