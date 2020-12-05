const Koa=require('koa');
const app=new Koa();
const Router=require('koa-router');

const router=new Router();

//配置get请求
router.get('/',function(ctx,next){
    ctx.body=ctx.query;
})

app
.use(router.routes())
.use(router.allowedMethods());

app.listen(3000,()=>{
    console.log('server is started')
})



