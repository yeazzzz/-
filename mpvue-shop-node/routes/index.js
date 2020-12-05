const router=require('koa-router')({
    prefix:'/lm'
});
const controllers=require('../controllers')

// 请求/index/index接口
router.get('/index/index', controllers.home.index)

module.exports = router


