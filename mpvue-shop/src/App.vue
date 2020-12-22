<script>
export default {
  created() {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);
    var userInfo = {
      openId: "ovjXH5CQckPYFQsSitOPebeFEHjM",
      nickName: "YZX",
      gender: 1,
      language: "zh_CN",
      city: "Foshan",
      province: "Guangdong",
      country: "China",
      avatarUrl:
        "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIbWFEIJj8IpGeHM7dGic1aTFZALjWcMm9ltWfFiaQfVRYticWBfgGfzXWMt2EkJWiaicPtftHAlWxUibxQ/132",
      watermark: { timestamp: 1535513485, appid: "wxd7df7c1fbebe2b26" },
    };
    var openId = userInfo.openId;
    wx.setStorageSync("userInfo", userInfo);
    wx.setStorageSync("openId", openId);
    //获取openid
    console.log(openId);
  },
};
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}

page {
  background: #f4f4f4;
  height: 100%;
}
button {
  background: none;
  padding: 0;
  font-weight: normal;
  font-size: 32rpx;
  box-sizing: content-box;
}
button::after {
  border: 0;
}
view,
text {
  font-size: 28rpx;
  color: #333333;
}
.wxParse.p {
  margin: 0 !important;
}
.wxParse.img {
  display: block !important;
}
</style>
