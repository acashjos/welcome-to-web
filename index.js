const PORT = 8080;

const Koa = require('koa');

const app = new Koa();
const router = require('./routes'); // requires router config from ./routes.js

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
