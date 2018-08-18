const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const app = new Koa();

const Router = require('koa-router');
const router = Router();

//法一
// function render(filename) {
//   let fullpath = path.join(__dirname, filename);
//   return fs.readFileSync(fullpath, 'binary');
// }
// router.get('/', async(ctx) => {
//   ctx.body = render('view.html');
// });

//法二
const views = require('koa-views');
app.use(views(__dirname, {
  extension: 'html'
}));
router.get('/', async(ctx) => {
  await ctx.render('view')
  // 由於載入需要時間讀取，因此我們使用 await 等待載入結束
  // 沒加await或錯誤
});


app.use(router.routes());



app.listen(3000);