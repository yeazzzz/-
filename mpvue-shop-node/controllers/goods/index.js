const { mysql } = require('../../mysql')

//商品详情页
async function detailAction(ctx){
    const goodsId=ctx.query.id
    const openId=ctx.query.openId
    // 获取商品信息
    const info = await mysql('nideshop_goods').where({
       'id': goodsId 
    }).select()
    //获取商品图片
    const gallery = await mysql('nideshop_goods_gallery').where({
        // 两张数据表中id、goods_id相同
        'goods_id':goodsId

    })
    ctx.body={
        'info':info,
        'gallery':gallery
    }
}


module.exports={
    detailAction
}