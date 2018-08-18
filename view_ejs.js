const Koa = require('koa');
const app = new Koa();

const Router = require('koa-router');
const router = Router();
const views = require('koa-views');



app.use(views(__dirname + '/view', {
  extension: 'ejs'
}));

// Router -> /
router.get('/', async(ctx) => {
  await ctx.render('view_ejs', {
      title: 'Koa2',
      name: 'Robby',
      engine: 'ejs'
  })
});

app.use(router.routes());



app.listen(3000);