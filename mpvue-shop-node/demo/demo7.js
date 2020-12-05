const Koa=require('koa');
const Router=require('koa-router')
const app=new Koa();

//引入路由中间件
const router=new Router({
//配置路由前缀层级
    prefix:'/yzx'
});


//配置get路由
router
    .get('/', function(ctx,next){
    ctx.body='hello world';
    })
     .get('/todo',function(ctx,next){
         ctx.body="todo page";
    })
//配置Post路由


//注册路由
app
.use(router.routes())
.use(router.allowedMethods());

app.listen(3000,()=>{
    console.log('server is started')
})