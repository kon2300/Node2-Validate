const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { validationResult } = require('express-validator');
const v = require('../utils/validate');

router.get('/signIn', usersController.signInView);
router.get('/signUp', usersController.signUpView); 
router.post('/create', v.validate(), (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    req.skip = false;
    next();
  } else {
    let messages = errors.array().map(e => e.msg);
    req.skip = true;
    req.flash('errors', messages.join(''));
    res.locals.redirect = 'users/signUp';
    next();
  }
}, usersController.checkCreate, usersController.create, usersController.redirectView);

module.exports = router;