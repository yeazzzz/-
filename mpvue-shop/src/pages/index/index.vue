<template>
  <div class="index">
    <!-- 头部搜索 -->
    <div class="search">
      <div @click="toMappage">{{ cityName }}</div>
      <div @click="toSearch">
        <input type="text" placeholder="搜索商品" style="text-align: center" />
        <span class="icon"></span>
      </div>
    </div>
    <!-- 轮播图 -->
    <!-- <button @click="getData()">获得banner</button> -->
    <div class="swiper">
      <swiper
        class="swiper-container"
        indicator-dots="true"
        autoplay="true"
        interval="3000"
        circular="true"
        duration="500"
      >
        <!-- 3秒跳转，轮播图点 -->
        <!-- block无意义，单纯拿来做循坏 -->
        <block
          v-for="(item, index) in banner"
          :key="index"
          @click="categroylist(item.id)"
        >
          <!-- 每张轮播图 -->
          <swiper-item class="swiper-item">
            <image class="slide-image" :src="item.image_url" />
          </swiper-item>
        </block>
      </swiper>
    </div>
    <!-- 按钮 -->
    <div class="channel">
      <div
        v-for="(item, index) in channel"
        :key="index"
        @click="categroyList(item.id)"
      >
        <img v-bind:src="item.icon_url" alt="" />
        <p>{{ item.name }}</p>
      </div>
    </div>
    <div class="brand">
      <div @click="tobrandList" class="head">品牌制造商直供</div>
      <div class="content">
        <div
          @click="branddetail(item.id)"
          v-for="(item, index) in brandList"
          :key="index"
        >
          <div>
            <p>{{ item.name }}</p>
            <p>{{ item.floor_price }}元起</p>
          </div>
          <img :src="item.new_pic_url" alt="" />
        </div>
      </div>
    </div>
    <div class="newgoods">
      <div class="newgoods-top" @click="goodsList('new')">
        <div class="top">
          <p>新品首发</p>
          <p>查看全部</p>
        </div>
      </div>
      <div class="list">
        <ul>
          <scroll-view class="scroll-view" :scroll-x="true">
            <li
              @click="goodsDetail(item.id)"
              v-for="(item, index) in newgoods"
              :key="index"
            >
              <img :src="item.list_pic_url" alt="" />
              <p>{{ item.name }}</p>
              <p>{{ item.goods_brief }}</p>
              <p>￥{{ item.retail_price }}</p>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div>
    <div class="topicList">
      <div @click="totopic" class="topicList-top">
        专题精选
        <span class="icon"></span>
      </div>
      <div class="list">
        <ul>
          <scroll-view class="scroll-view" :scroll-x="true">
            <li
              @click="topicdetail(item.id)"
              v-for="(item, index) in topicList"
              :key="index"
            >
              <img :src="item.item_pic_url" alt="" />
              <div class="btom">
                <div>
                  <p>{{ item.title }}</p>
                  <p>{{ item.subtitle }}</p>
                </div>
                <div>{{ item.price_info }}元起</div>
              </div>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
import amapFile from "../../utils/amap-wx";
import { mapState, mapMutations } from "vuex";
//引入get方法
import { get } from "../../utils";
export default {
  data() {
    return {
      banner: [],
      channel: [],
      brandList: [],
      newgoods: [],
      topicList: [],
    };
  },
  computed: {
    ...mapState(["cityName"]),
  },
  mounted() {
    this.getData();
    this.getcityName();
  },
  methods: {
    ...mapMutations(["update"]),
    // 获取用户具体位置
    toMappage() {
      let _this = this;
      //wx.getSetting 查询用户是否授权“scoped.record ”
      wx.getSetting({
        success: (res) => {
          //如果没有同意授权，则打开设置
          // console.log(result);
          if (res.authSetting["scopee.userLocation"]) {
            wx.openSetting({
              success: (res) => {
                //获取授权地理位置
                _this.getcityName();
              },
            });
          } else {
            wx.navigateTo({
              //导航跳转到main页面
              url: "/pages/mappage/main",
            });
            // _this.getcityname();
          }
        },

        fail: (err) => {
          console.log(err);
        },
        complete: () => {},
      });
    },

    //地图接口
    getcityName() {
      let _this = this;
      var myAmapFun = new amapFile.AMapWX({
        key: "c02fdb27ca0676fc7fe24d8e76ae87e8",
      });
      myAmapFun.getRegeo({
        success: function (data) {
          //成功回调
          console.log(data);
        },
        fail: function (info) {
          console.log(info);
          // _this.cityName = "佛山";
          _this.update({ cityName: "佛山" });
        },
      });
    },
    // 异步请求获取数据库数据
    async getData() {
      //后端提供接口url自己随便定义 http://localhost:8080/lm/index/index
      const data = await get("/index/index");
      this.banner = data.banner;
      this.channel = data.channel;
      this.brandList = data.brandList;
      this.newgoods = data.newgoods;
      this.topicList = data.topicList;

      console.log(data);
    },
    toSearch() {
      wx.navigateTo({
        url: "/pages/search/main",
      });
    },
    categroyList(id) {
      //进行页面跳转
      wx.navigateTo({
        url: "/pages/categroyList/main?id=" + id,
      });
    },
    tobrandList() {
      wx.navigateTo({
        url: "/pages/brandlist/main",
      });
    },
    branddetail(id) {
      wx.navigateTo({
        url: "/pages/branddetail/main?id=" + id,
      });
    },
    goodsList(info) {
      wx.navigateTo({
        url: "/pages/newgoods/main?isNew" + 1,
      });
    },
    //专题
    totopic() {
      wx.switchTab({
        url: "/pages/topic/main",
      });
    },
    topicdetail(id) {
      wx.navigateTo({
        url: "/pages/topicdetail/main?id=" + id,
      });
    },
  },
};
</script>



<style lang="less" scoped>
@import "./style.less";
</style>
 