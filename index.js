const Koa = require('koa');
const app = new Koa();


//cors
const cors = require('@koa/cors');
app.use(cors());

//美美的logger
const logger = require('koa-logger');
app.use(logger());

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response

// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });

const Router = require('koa-router');
const router = Router();

router.get('/', async(ctx) => {
  ctx.body = 'Hello World';
});

// Router -> /about
router.get('/about', async(ctx) => {
  ctx.body = 'About Me';
});

router.get('/user', async(ctx) => {
      let name = ctx.query.name;
      let msg = ctx.query.msg;
      ctx.body = `<p>${name}：${msg}</p>`;
});


const bodyParser = require('koa-bodyparser');

app.use(bodyParser());



router.get('/login', async(ctx) => {
  ctx.body = `
  <form method="POST" action="/login">
      <label>UserName</label>
      <input name="usr" /><br/>
      <button type="submit">submit</button>
    </form>
  `;
});

router.post('/login', async(ctx) => {
  console.log(ctx.request.body)
  let usr = ctx.request.body.usr;
  ctx.body = `<p>Welocome,${usr}!</p>`;
});


app.use(router.routes());

app.listen(3000);