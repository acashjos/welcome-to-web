const Router = require('koa-router');
const router = new Router();

const Views = require('./controllers/viewControllers');

router
  .get('/', Views.welcome)
  .get('/about', Views.about)
  .get('/contact', Views.contact);

module.exports = router;
