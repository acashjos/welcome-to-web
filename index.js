const PORT = 8080;

const Koa = require('koa');
var Router = require('koa-router');

const app = new Koa();
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

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
