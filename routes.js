const Router = require('koa-router');
const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = "Welcome"
});

router
  .get('/about', (ctx, next) => {
    ctx.body = "We are team irisind. To know more, go to contact page"
  })
  .get('/contact', (ctx, next) => {
    ctx.body = "Contact us at info@irisind.com"
  });

  module.exports = router;