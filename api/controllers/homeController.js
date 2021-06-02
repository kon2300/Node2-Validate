module.exports = {
  indexView: (req, res) => {
    res.render('index', {
      signUplink: {
        href: '/users/signUp',
        text: 'signUpはこちら' 
      },
      signInlink: {
        href: '/users/signIn',
        text: 'signInはこちら' 
      }
    });
  }
};