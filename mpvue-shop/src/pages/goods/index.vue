<template>
  <div class="goods">
    <div class="swiper">
      <swiper
        class="swiper-container"
        indicator-dots="true"
        autoplay="true"
        interval="3000"
        duration="1000"
      >
        <block v-for="(item, index) in gallery" :key="index">
          <swiper-item class="swiper-item">
            <image :src="item.img_url" class="slide-image" />
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="swiper-b">
      <div class="item">30天无忧退货</div>
      <div class="item">48小时快速退款</div>
      <div class="item">满88元免邮费</div>
    </div>
    <div class="goods-info">
      <div class="c">
        <p>{{ info.name }}</p>
        <p>{{ info.goods_brief }}</p>
        <p>￥{{ info.retail_price }}</p>
        <div v-if="brand.name" class="brand">
          <p>{{ brand.name }}</p>
        </div>
      </div>
    </div>
    <div @click="showType" class="section-nav">
      <div>请选择规格数量</div>
      <div></div>
    </div>
    <!-- 选择规格部分 -->
    <div v-show="showpop" @click="showType" class="pop"></div>
    <div class="attr-pop" :class="[showpop ? 'fadeup' : 'fadedown']">
      <div class="top">
        <div class="left">
          <img :src="info.primary_pic_url" alt="" />
        </div>
        <div class="right">
          <div>
            <p>价格￥{{ info.retail_price }}</p>
            <p>请选择数量</p>
          </div>
        </div>
        <div @click="showType" class="close">X</div>
      </div>
      <div class="b">
        <p>数量</p>
        <div class="count">
          <div @click="reduce" class="cut">-</div>
          <input class="number" disabled="" v-model="number" />
          <div @click="add" class="add">+</div>
        </div>
      </div>
    </div>
    <!-- 大家都在看 -->
    <div class="bottom-fixed">
      <div @click="collect">
        <div class="collect" :class="[collectFlag ? 'active' : '']"></div>
      </div>
      <div @click="toCart">
        <div class="car">
          <span>1</span>
          <img src="/static/images/ic_menu_shoping_nor.png" alt="" />
        </div>
      </div>
      <div @click="buy">立即购买</div>
    </div>

    <!-- 选择规格部分 -->
  </div>
</template>

<script>
import { get, post, getStorageOpenid } from "../../utils";

export default {
  mounted() {
    //判断是否登录获取用户信息

    this.openId = getStorageOpenid();
    if (this.$root.$mp.query.id) {
      this.id = this.$root.$mp.query.id;
      this.goodsDetail();
    }
  },

  data() {
    return {
      allnumber: 0,
      collectFlag: false,
      number: 0,
      showpop: false,
      gallery: [],
      info: {},
      brand: {},
      productList: [],
      goods_desc: "",
      id: "",
      userInfo: "",
      openId: "",
      goodsId: "",
      allPrice: "",
    };
  },

  methods: {
    togoodsDetail(id) {
      wx.redirectTo({ url: "/pages/goods/main?id=" + id });
    },
    add() {
      this.number = this.number + 1;
    },
    reduce() {
      if (this.number > 1) {
        this.number = this.number - 1;
      } else {
        return false;
      }
    },
    async buy() {
      if (this.showpop) {
        if (this.number == 0) {
          wx.showToast({
            title: "请选择商品数量", //提示的内容,
            duration: 2000, //延迟时间,
            icon: "none",
            mask: true, //显示透明蒙层，防止触摸穿透,
            success: (res) => {},
          });
          return false;
        }
        console.log(data);
        const data = await post("/order/submitAction", {
          goodsId: this.goodsId,
          openId: 1,
          allPrice: this.allPrice,
        });
        if (data) {
          wx.navigateTo({
            url: "/pages/order/main",
          });
        }
      } else {
        this.showpop = true;
      }
    },
    async collect() {
      this.collectFlag = !this.collectFlag;
      const data = await post("/collect/addcollect", {
        openId: this.userInfo.openId,
        goodsId: this.goodsId,
      });
    },
    async addCart() {
      if (toLogin()) {
        if (this.showpop) {
          if (this.number == 0) {
            wx.showToast({
              title: "请选择商品数量", //提示的内容,
              duration: 2000, //延迟时间,
              icon: "none",
              mask: true, //显示透明蒙层，防止触摸穿透,
              success: (res) => {},
            });
            return false;
          }
          const data = await post("/cart/addCart", {
            openId: this.userInfo.openId,
            goodsId: this.goodsId,
            number: this.number,
          });
          //添加成功后
          if (data) {
            this.allnumber = this.allnumber + this.number;
            wx.showToast({
              title: "添加购物车成功",
              icon: "success",
              duration: 1500,
            });
          }
        } else {
          this.showpop = true;
        }
      }
    },

    async goodsDetail() {
      const data = await get("/goods/detailaction", {
        id: this.id,
        openId: this.openId,
      });
      this.gallery = data.gallery;
      this.info = data.info;
      this.allPrice = data.info.retail_price;
      this.goodsId = data.info.id;
      this.collectFlag = data.collected;
    },
    showType() {
      this.showpop = !this.showpop;
    },
  },
  computed: {},
};
</script>
<style lang='less' scoped>
@import "./style.less";
</style>