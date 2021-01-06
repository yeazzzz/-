const {mysql}=require('../../mysql')
//提交订单数据
async function submitAction(ctx){
    
    const goodsId=ctx.request.body.goodsId
    const allPrice=ctx.request.body.allPrice
//是否存在订单
const isorder  =await mysql('nideshop_order').where({
    'user_id':1
}).select()
if(isorder.length>0){
    const data =mysql('nideshop_order').where({
        'user_id':1
    }).update({
        'user_id':1,
        'goodsId':goodsId,
        'allprice':allPrice
    })
    if(data){
        ctx.body={
            data:true
        }
    }else{
        ctx.body={
            data:false
        }
    }
}
else{
    const data =mysql('nideshop_order').insert({
        'user_id':1,
        'goodsId':goodsId,
        'allprice':allPrice
    })
    if(data){
        ctx.body={
            data:true
        }
    }else{
        ctx.body={
            data:false
        }
    }


}
}
async function detailAction(ctx) {
    const addressId = ctx.query.addressId || '';
    const orderDetail = await mysql('nideshop_order').where({
        'user_id': 1,
    }).select();
    var goodsIds = orderDetail[0].goods_id.split(',')

    const list = await mysql('nideshop_cart').andWhere({
        'user_id': 1
    }).whereIn('goods_id', goodsIds).select();
        //收货地址
        var addressList;
        if (addressId) {
            addressList = await mysql("nideshop_address")
                .where({
                    'user_id': 1,
                }).orderBy('is_default', 'desc')
                .select();
        } else {
            addressList = await mysql("nideshop_address")
                .where({
                   'user_id': 1,
                }).orderBy('is_default', 'desc')
                .select();
        }
    console.log(addressList)

    ctx.body = {
        price: orderDetail[0].allprice,
        goodsList: list,
        address: addressList[0] || {}
    }

}
module.exports={
    submitAction,
    detailAction  
}