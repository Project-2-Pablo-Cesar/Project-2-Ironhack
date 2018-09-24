const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/admin-control', (req, res, next) => {
  res.render('admin/admin-control');
});

module.exports = router;
