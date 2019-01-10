const Router = require('koa-router');
const router = new Router();

const Views = require('./controllers/viewControllers');
const Users = require('./controllers/userControllers');

const sessionCheck = require('./middlewares/SessionCheck');
router
  .get('/', Views.welcome)
  .get('/about', Views.about)
  .get('/contact', Views.contact)
  .get('/login', Views.login)
  .post('/login', Users.login)
  .get('/signup', Views.signup)
  .post('/signup', Users.signup)
  .get('/profile',sessionCheck,Views.profile)
  .post('/profile',sessionCheck,Users.update)
  .get('/signout',sessionCheck,Users.signout);

module.exports = router;
