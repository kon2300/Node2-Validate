const bcrypt = require('bcrypt');
const User = require('../models').User;

module.exports = {
  signInView: (req, res) => {
    res.render('users/signIn');
  },
  signUpView: (req, res) => {
    res.render('users/signUp', {
      flashMessages: ''
    });
  },
  checkCreate: (req, res, next) => {
    if (req.skip) {
      const flashMessages = req.flash();
      const user = res.locals.user;
      req.skip = '';
      res.render(res.locals.redirect, {
        flashMessages,
        user
      });
      } else {
        next();
    }
  },
  create: async (req, res, next) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
     await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
     })
      .then(user => {
        req.flash('success', `登録されました！${user.name}`);
        res.locals.redirect = 'users/index';
        res.locals.user = user;
        next();
      }).catch((error) => {
        res.locals.redirect = 'users/signUp';
        req.flash('errors', `NO.${error.message}`);
        next();
      });
  },
  redirectView: (req, res) => {
    const flashMessages = req.flash();
    const user = res.locals.user;
    res.render(res.locals.redirect, {
      flashMessages,
      user
    });
  }
};