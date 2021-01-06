const {
    mysql
  } = require('../../mysql');
  
  /**
   * 商品详情页数据
   * 
   */
  async function detailAction(ctx) {
    //ctx.query 获取get请求的参数对象的形式
    const goodsId = ctx.query.id;
    const openId = ctx.query.openId;
    //商品信息
    const info = await mysql('nideshop_goods').where({
      'id': goodsId
    }).select();
    //商品相关图片
    const gallery = await mysql('nideshop_goods_gallery').where({
      goods_id: goodsId
    }).limit(4).select();
    //相关属性
    //关联查询两个表  leftJoin
   
    //品牌
    let brand = [];
    if (info[0].brand_id) {
      brand = await mysql('nideshop_brand').where({
        id: info[0].brand_id
      }).select();
    }
  
    //判断是否收藏过
    const iscollect = await mysql("nideshop_collect").where({
      "user_id": openId,
      "value_id": goodsId
    }).select();
    let collected = false;
    if (iscollect.length > 0) {
      collected = true
    }
    //判断该用户是否在购物车有此商品
    const oldNumber = await mysql("nideshop_cart").where({
      "user_id": openId,
    }).column('number').select();
    let allnumber = 0;
  
    if (oldNumber.length > 0) {
      for (let i = 0; i < oldNumber.length; i++) {
        const element = oldNumber[i];
        allnumber += element.number
      }
    }
  
    ctx.body = {
      "info": info[0] || [],
      "gallery": gallery,
      "brand": brand[0] || [],
      "collected": collected,
      "allnumber": allnumber,
    }
  }
  
  
  async function goodsList(ctx) {
    const categoryId = ctx.query.categoryId;
    const isNew = ctx.query.isNew;
    const isHot = ctx.query.isHot;
    // const page = this.get('page');
    // const size = this.get('size');
    // const sort = this.get('sort');
    let order = ctx.query.order;
    let goodsList = [];
    //----------------------------------------------------------------------
    if (categoryId) {
      //获得商品列表
      goodsList = await mysql("nideshop_goods").where({
        "category_id": categoryId
      }).select();
      //获得当前分类
      const currentNav = await mysql("nideshop_category").where({
        "id": categoryId
      }).select();
  
      //如果goodsList没有可能这个分类是主分类例如:居家,厨具
      if (goodsList.length == 0) {
        //找到与之相关的子类,再找到与子类相关的商品列表
        let subIds = await mysql("nideshop_category").where({
          "parent_id": categoryId
        }).column('id').select();
        //需要变成数组形式childCategoryIds [1020000,1036002]
        if (subIds.lenght != 0) {
          subIds = subIds.map((item) => {
            return item.id;
          })
        }
        goodsList = await mysql("nideshop_goods").whereIn('category_id', subIds).limit(50).select();
      }
      ctx.body = {
        data: goodsList,
        currentNav: currentNav[0]
      }
    }
  
  
    if (!order) {
      order = '';
      orderBy = "id"
    } else {
      orderBy = "retail_price"
    }
  
  
  
  
    //----------------------------------------------------------------------
    //新品列表
    if (isNew) {
      goodsList = await mysql("nideshop_goods").where('is_new', isNew).orderBy(orderBy, order).select();
      ctx.body = {
        data: goodsList,
      }
    }
    //----------------------------------------------------------------------
    //----------------------------------------------------------------------
    //热门商品
    if (isHot) { //desc //asc
      goodsList = await mysql("nideshop_goods").where('is_hot', isHot).orderBy(orderBy, order).select();
      ctx.body = {
        data: goodsList,
      }
    }
    //----------------------------------------------------------------------
  
  }
  
  module.exports = {
    detailAction,
    goodsList
  }