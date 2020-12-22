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
        <blok v-for="(item, index) in gallery" :key="index">
          <swiper-item class="swiper-item">
            <img :src="item.img_url" alt="" class="slide-image" />
          </swiper-item>
        </blok>
      </swiper>
    </div>
    <div class="swiper-b">
      <div class="item">30天内包退货</div>
      <div class="item">48小时快速退款</div>
      <div class="item">满100元包邮</div>
    </div>
    <div class="goods-info">
      <li v-for="(item, index) in info" :key="index">
        <div class="c">
          <p>{{ item.name }}</p>
          <p>{{ item.goods_brief }}</p>
          <p>￥{{ item.retail_price }}</p>
        </div>
      </li>
    </div>
  </div>
</template>

<script>
import { get } from "../../utils";
export default {
  data() {
    return {
      gallery: [],
      id: "",
      openId: "",
      info: {},
    };
  },
  mounted() {
    this.goodsDetail();
  },
  methods: {
    async goodsDetail() {
      const data = await get("/goods/detailaction", {
        id: 1009024,
      });
      console.log(data);
      this.info = data.info;
      this.gallery = data.gallery;
    },
  },
};
</script>

<style lang="less" scoped>
@import "./style.less";
</style>