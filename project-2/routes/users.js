const express = require('express');
const router  = express.Router();

router.get("/home", (req, res, next) => {
  res.render("Users/index");
});

router.get("/service-creation", (req, res, next) => {
  res.render("Users/service-creation");
});

router.get("/detail", (req, res, next) => {
  res.render("Users/service-detail");
});

router.get("/list", (req, res, next) => {
  res.render("Users/services-list");
});

router.get("/search", (req, res, next) => {
  res.render("Users/services-search");
});

router.get("/profile", (req, res, next) => {
  res.render("Users/user-profile");
});

router.get("/finished", (req, res, next) => {
  res.render("Users/service-completed");
});


module.exports = router;