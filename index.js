const PORT = 8080;

const Koa = require('koa');

const app = new Koa();
const koaBody = require('koa-body');

app.use(koaBody());

const session = require('koa-session');

app.keys = ['some secret hurr'];
app.use(session(app));

const router = require('./routes'); // requires router config from ./routes.js

const views = require('koa-views');

// Must be used before any router is used
let viewOpts = {
  extension: 'ejs', // Default extension for your views. If not specified it'll look for .html files
  // OR use map option to map html file to ejs engine. With this one, your html files will be treated as ejs
  // map: {
  //   html: 'ejs' 
  // }
};
// check the documentation at https://github.com/queckezz/koa-views#api
const viewsMiddleware = views(__dirname + '/views', viewOpts);
app.use(viewsMiddleware);

app
  .use(router.routes())
  .use(router.allowedMethods());

(async () => {
  await (require('./models').init)();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
