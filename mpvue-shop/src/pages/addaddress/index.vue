<template>
  <div class="addaddress">
    <div class="item">
      <input type="text" placeholder="姓名" v-model="userName" />
    </div>
    <div class="item">
      <input type="text" placeholder="手机号码" v-model="telNumber" />
    </div>
    <div class="item">
      <picker
        mode="region"
        @change="bindRegionChange"
        :value="region"
        :custom-item="customItem"
      >
        <input type="text" placeholder="身份、城市、区县" v-model="address" />
      </picker>
    </div>
    <div class="item">
      <input
        type="text"
        placeholder="详细地址，如楼道、楼盘号等"
        v-model="detailadress"
      />
    </div>
    <div class="item itemend">
      <checkbox-group @change="checkboxChange">
        <label class="checkbox">
          <checkbox
            class="box"
            value="true"
            :checked="checked"
            color="#B4282D"
          />设置为默认地址
        </label>
      </checkbox-group>
      <div @click="saveAddress" class="bottom">保存</div>
    </div>
  </div>
</template>

<script>
import { get, post, getStorageOpenid } from "../../utils";
export default {
  created() {},
  mounted() {
    this.openId = getStorageOpenid();
    if (this.$root.$mp.query.res) {
      this.res = JSON.parse(decodeURIComponent(this.$root.$mp.query.res));
      console.log(this.res);
      this.userName = this.res.userName;
      this.telNumber = this.res.telNumber;
      this.address = `${this.res.provinceName} ${this.res.cityName} ${this.res.countyName}`;
      this.detailadress = this.res.detailInfo;
    }
    if (this.$root.$mp.query.id) {
      this.id = this.$root.$mp.query.id;
      this.getDetail();
    }
  },
  data() {
    return {
      region: [],
      customItem: "全部",
      id: "",
      openId: "",
      res: {},
      userName: "",
      telNumber: "",
      address: "",
      detailadress: "",
      checked: false,
    };
  },
  methods: {
    bindRegionChange(e) {
      var value = e.mp.detail.value;
      this.address = value[0] + " " + value[1] + " " + value[2];
    },
    async getDetail() {
      const data = await get("/address/detailAction", {
        id: this.id,
      });
      var detail = data.data;
      this.userName = detail.name;
      this.telNumber = detail.mobile;
      this.address = detail.address;
      this.detailadress = detail.address_detail;
      this.checked = detail.is_default == 1 ? true : false;
    },
    checkboxChange(e) {
      this.checked = e.mp.detail.value[0];
    },
    async saveAddress() {
      var _this = this;
      const data = await post("/address/saveAction", {
        userName: _this.userName,
        telNumber: _this.telNumber,
        address: _this.address,
        detailadress: _this.detailadress,
        checked: _this.checked,
        openId: _this.openId,
        addressId: _this.id,
      });
      if (data.data) {
        wx.showToast({
          title: "添加成功", //提示的内容,
          icon: "success", //图标,
          duration: 2000, //延迟时间,
          mask: true, //显示透明蒙层，防止触摸穿透,
          success: (res) => {
            wx.navigateBack({
              delta: 1, //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
            });
          },
        });
      }
    },
  },
};
</script>

<style lang='less' scoped>
@import "./style.less";
</style>