const express = require('express');
const router  = express.Router();
const { ensureAuthenticated, hasRole } = require('../middlewares/authentication');

/* GET home page */
router.get('/admin-control',hasRole("ADMIN"), (req, res, next) => {
  res.render('admin/admin-control');
});

module.exports = router;
