const { mysql } = require('../../mysql')


//添加收藏
async function addCollect(ctx) {
    const {
      goodsId,
      openId
    } = ctx.request.body
    
    //判断是否收藏过
    const iscollect = await mysql("nideshop_collect").where({
      "user_id": 1,
      "value_id": goodsId
    }).select()
    if (iscollect.length == 0) {
     const iscollect = await mysql('nideshop_collect').insert({
        "user_id": 1,
        "value_id": goodsId
      })
     
    } else {
      const iscollect = await mysql("nideshop_collect").where({
        "user_id": 1,
        "value_id": goodsId
      }).del()
    }
    ctx.body = {
      data: "success"
    }
  }


module.exports={
    addCollect
}