function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

// 请求的封装 前端接口前缀应该相同，后端代码放在同一个服务器 
//所有接口的前缀和host-url相同，后端定义任何一个接口之前都应该加上这个前缀
const host = "http://localhost:5757/lm"
export{ host };
//请求封装
function request(url,method,data,header ={}){
  // 显示加载提示框
  wx.showLoading({
    title: "加载中",
    mask: true, 
  
  });
  return new Promise((resolve,reject)=>{
    wx.request({
      url:host+url,
      method:method,
      data:data,
      header:{
        "content-type":"application/json"
      },
      success(res){
        wx.hideLoading();
        // result里的data
        resolve(res.data)
      },
      fail(error){
        wx.hideLoading();
        reject(false)
      },
      complete(){
        wx.hideLoading();       
      }   
    })
  })
}
//封装get接口请求
export function get(url,data){
  return request(url,"GET",data)

}
//封装post请求
export function post(url,data){
  return request(url,"POST",data)
}

//-------------------------------------------------------------------------请求的封装

//----------------------------------------------用户是否登录 未登录跳转到登录页面 -------------------------



export function getStorageOpenid() {
  const openId = wx.getStorageSync("openId");
  if (openId) {
    return openId;
  } else {
    return "";
  }
}

export default {
  formatNumber,
  formatTime
}
