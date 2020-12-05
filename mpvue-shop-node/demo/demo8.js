const Koa=require('koa');
const Router=require('koa-router')
const app=new Koa();


//创建两个子路由home、page
let home=new Router();
home
.get('/yzx',async(ctx)=>{
    ctx.body="this is yzx page";

}).get('/todo',async(ctx)=>{
    ctx.body="this is todo page";
})

let page=new Router();
page
.get('/yzx',async(ctx)=>{
    ctx.body="page is yzx page";

}).get('/todo',async(ctx)=>{
    ctx.body="page is todo page";
})

//父级路由 装载全部子路由
let router=new Router();
router.use('/home',home.routes(),home.allowedMethods());
router.use('/page',page.routes(),page.allowedMethods());

//加载路由中间件
app
.use(router.routes())
.use(router.allowedMethods());

app.listen(3000,()=>{
    console.log('server is started')
})