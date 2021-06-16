const { check } = require('express-validator');

const validate = () => {
  return [
    check('password').isLength( { min:7 } ).withMessage('パスワードは7文字以上にしてください。')
    .custom((value, {req} ) => {
      if (req.body.password !== req.body.passwordConfirmation) {
        throw new Error('パスワード（確認）と一致しません。');
      }
      return true;
    })
  ]
};

module.exports = { validate };