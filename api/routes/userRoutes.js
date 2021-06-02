const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const usersController = require('../controllers/usersController');
const validate = () => {
  return [
    check('password').isLength({ min:7 }).withMessage('パスワードは7文字以上にしてください。')
    .custom((value, {req} ) => {
      if (req.body.password !== req.body.passwordConfirmation) {
        throw new Error('パスワード（確認）と一致しません。');
      }
      return true;
    })
  ]
};


router.get('/signIn', usersController.signInView);
router.get('/signUp', usersController.signUpView); 
router.post('/create', validate(), (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    req.skip = false;
    console.log(req.skip);
    next();
  } else {
    let messages = errors.array().map(e => e.msg);
    req.skip = true;
    req.flash('errors', messages.join(''));
    res.locals.redirect = 'users/signUp';
    console.log(req.skip);
    next();
  }
}, usersController.checkCreate, usersController.create, usersController.redirectView);

module.exports = router;