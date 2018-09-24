const express = require('express');
const router  = express.Router();
const { ensureAuthenticated, hasRole } = require('../middlewares/authentication');

router.get("/home",ensureAuthenticated, (req, res, next) => {
  res.render("Users/index");
});

router.get("/service-creation",ensureAuthenticated, (req, res, next) => {
  res.render("Users/service-creation");
});

router.get("/detail",ensureAuthenticated, (req, res, next) => {
  res.render("Users/service-detail");
});

router.get("/list",ensureAuthenticated, (req, res, next) => {
  res.render("Users/services-list");
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