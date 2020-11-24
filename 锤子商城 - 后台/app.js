const Koa = require('koa');
const router = require('koa-router')()//引入并实例化路由
const bodyParser = require('koa-bodyparser') // 处理post请求，把 koa2 上下文的表单数据解析到

const home = require('./routes/home.js');

const app = new Koa();
app.use(bodyParser())

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    // ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    // ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // ctx.set("X-Powered-By", ' 3.2.1');
    await next();
});


//开启路由
router.use('/home', home)

app.use(router.routes()).use(router.allowedMethods())
// app.use(router.allowedMethods());

app.listen(5000,function(){
    console.log('server is running......')
});

module.exports = app