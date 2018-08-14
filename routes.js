const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx, next) => {

  const payload = {
    title: 'Welcome',
    user: 'John',
    serverName: "Akash's computer"
  };

  await ctx.render('welcome', payload);
});

router
  .get('/about', async (ctx, next) => {

    const payload = {
      companyName: "Irisind"
    };
    await ctx.render('about', payload);
  })
  .get('/contact', async (ctx, next) => {

    const payload = {
      companyName: "Irisind"
    };
    await ctx.render('contact', payload);
  })

module.exports = router;