const Router = require('koa-router');
const router = new Router();

const Views = require('./controllers/viewControllers');
const Users = require('./controllers/userControllers');

const sessionCheck = require('./middlewares/SessionCheck');
let viewSessionCheck = sessionCheck((ctx, next) => ctx.redirect('/login'))
router
  .get('/', Views.welcome)
  .get('/about', Views.about)
  .get('/contact', Views.contact)
  .get('/login', Views.loginPage)
  .post('/login', Views.login)
  .get('/signup', Views.signupPage)
  .post('/signup', Views.signup)
  .get('/profile', viewSessionCheck, Views.profile)
  .post('/profile', viewSessionCheck, Views.updateProfile)
  .get('/signout', viewSessionCheck, Users.signout, viewSessionCheck);




module.exports = router;
