
const object= require("../../utils/util")
var app = getApp()
// pages/individual/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    volunteer_account_login:"志愿者账号登录",
    apartment_account_login:"单位账号登录",
    user_random_login:"游客登录",
    register:"注册"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  to_register:function(){
    wx.navigateTo({
      url: '../public/register',
    })
  },

  ap_login:function(){
    
    if(typeof wx.getUserProfile == 'function') {
      //新版getUserProfile代码放置此处，参考上面 一、旧版getUserInfo获取用户信息
      wx.getUserProfile({
        desc:'应用将获取您微信用户名等信息',
        success: (res) => {
            console.log('获取用户信息成功', res.userInfo)
            app.globalData.userInfo = res.userInfo
            // wx.setStorageSync('userInfo', res.userInfo)
            object.jump2UnitLogin()
            //获取用户信息的各类操作
        },
        fail: (res) =>{
            console.log('获取用户信息失败',res)
            wx.showToast({
                title: '信息授权失败~',
                duration: 1000,
                icon: 'error',
                mask: true
            })
        }
    })}
    else {
      //旧版getUserInfo代码参考放置此处，参考上面 二、新版getUserProfile获取用户信息
      wx.getSetting({ //获取授权列表
        success: res => {
          if (res.authSetting['scope.userInfo']) { //已经授权
            wx.getUserInfo({ //getUserInfo获得用户信息
              success: res => { 
                console.log(res)
                wx.setStorageSync('userInfo', res.userInfo)
                object.jump2UnitLogin()
              }
            })
          } else{
            wx.showModal({ //显示提示信息用的
              title: '提示',
              confirmText: '去设置',
              cancelText: '取消',
              content: '请授权方便您的使用噢~',
              success: function(res) {
                if (res.confirm) {//用户点击了去设置
                  object.jump2UserLogin()
                } else if(res.cancel) {
                  console.log("用户取消了去设置授权")
                  
                }
              }
            })
          } 
        }
      })
      
    }
  },

  vo_login:function(e){
    if(typeof wx.getUserProfile == 'function') {
      //新版getUserProfile代码放置此处，参考上面 一、旧版getUserInfo获取用户信息
      wx.getUserProfile({
        desc:'应用将获取您微信用户名等信息',
        success: (res) => {
            console.log('获取用户信息成功', res.userInfo)
            app.globalData.userInfo = res.userInfo
            // wx.setStorageSync('userInfo', res.userInfo)
            object.jump2UserLogin()
            //获取用户信息的各类操作
        },
        fail: (res) =>{
            console.log('获取用户信息失败',res)
            wx.showToast({
                title: '信息授权失败~',
                duration: 1000,
                icon: 'error',
                mask: true
            })
        }
    })}
    else {
      //旧版getUserInfo代码参考放置此处，参考上面 二、新版getUserProfile获取用户信息
      wx.getSetting({ //获取授权列表
        success: res => {
          if (res.authSetting['scope.userInfo']) { //已经授权
            wx.getUserInfo({ //getUserInfo获得用户信息
              success: res => { 
                console.log(res)
                wx.setStorageSync('userInfo', res.userInfo)
                object.jump2UserLogin()
              }
            })
          } else{
            wx.showModal({ //显示提示信息用的
              title: '提示',
              confirmText: '去设置',
              cancelText: '取消',
              content: '请授权方便您的使用噢~',
              success: function(res) {
                if (res.confirm) {//用户点击了去设置
                  object.jump2UserLogin()
                } else if(res.cancel) {
                  console.log("用户取消了去设置授权")
                  
                }
              }
            })
          } 
        }
      })
      
    }
    
  },


globalData: {   
  userInfo: null
}

})

