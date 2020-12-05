const Koa=require('koa');
const Router=require('koa-router');
const app=new Koa();
const router= new Router();

router
    .get('/', function(ctx,next){
    ctx.body='hello world';
})
     .get('/todo',function(ctx,next){
         ctx.body="todo page";
     })

//使用routes 启用router.get
//allowedMethods说明遵循get方法，若返回post请求 则直接返回错误
app
.use(router.routes())
.use(router.allowedMethods());

app.listen(3000,()=>{
    console.log('server is started')
})