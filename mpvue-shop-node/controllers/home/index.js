const { mysql } = require('../../mysql')
 
module.exports = async (ctx) => {
  // 获取轮播图数据
  const banner = await mysql('nideshop_ad').where({
    ad_position_id: 1
  }).select()

  //tab类型
  const channel = await mysql('nideshop_channel').select()
  //商品列表
  const brandList = await mysql('nideshop_brand').select()
  .where({
    is_new:1
  }).orderBy('new_sort_order','asc').limit(4).select()
  //新品首发
  const newgoods = await mysql('nideshop_goods').whereIn('id', [1181000, 1135002, 1134030, 1134032]).andWhere("is_new", 1).select();
  //专题列表
  const topicList = await mysql('nideshop_topic').limit(3).select();

  ctx.body={
        'banner':banner,
        'channel':channel,
        'brandList':brandList,
        'newgoods':newgoods,
        'topicList':topicList


    }

}