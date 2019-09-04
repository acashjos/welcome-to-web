const Router = require('koa-router');
const router = new Router();

const Views = require('./controllers/viewControllers');
const Users = require('./controllers/userControllers');
const ApiCallHandler = require('./controllers/apiControllers');

const sessionCheck = require('./middlewares/SessionCheck');
let viewSessionCheck = sessionCheck((ctx, next) => ctx.redirect('/login'))
// router
//   .get('/', console.log('sssssss') Views.welcome)
//   .get('/about', Views.about)
//   .get('/contact', Views.contact)
//   .get('/login', Views.loginPage)
//   .post('/login', Views.login)
//   .get('/signup', Views.signupPage)
//   .post('/signup', Views.signup)
//   .get('/profile', viewSessionCheck, Views.profile)
//   .post('/profile', viewSessionCheck, Views.updateProfile)
//   .get('/signout', viewSessionCheck, Users.signout, viewSessionCheck);


//Api routes 
// just to keep them seperate from all other routes
const apiRoutes = new Router();

let apiSessionCheck = sessionCheck(ctx => {
  ctx.status = 401;
  ctx.body = '';
})

apiRoutes
  .post('/login', ApiCallHandler.login)
  .post('/signup', ApiCallHandler.signup)
  .get('/profile', ApiCallHandler.profile)
  .post('/profile', apiSessionCheck, ApiCallHandler.updateProfile)
  .get('/signout', ApiCallHandler.signout);

// now all requests starting /api/{path} will be handled by apiRoutes
router.use('/api', apiRoutes.routes(), ApiCallHandler.unknownEndpoint);
router.get('(.*)', ctx => ctx.render('index'));

module.exports = router;
