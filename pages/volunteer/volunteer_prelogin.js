// pages/individual/volunteer_login.js
var object = require("../../utils/util")
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    remind: '加载中',
    angle: 0,
    loginInfo:{
      title:'微信授权',
      content:'获得您的公开信息(昵称、头像,手机号等)',
      logName:'小程序申请获得以下权限',
      logImage:'../../images/logo.jpg',
      
    }
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
    console.log("222")
    let userInfo = wx.getStorageSync('userInfo')
    console.log(userInfo);
    let dialogComponent = this.selectComponent('.wxc-dialog');
    // if (!userInfo) {
      dialogComponent && dialogComponent.show();
    // } else {
    //   this.setData({
    //     userInfo: userInfo
    //   })
    //   dialogComponent && dialogComponent.hide();
    // }
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

  onConfirm:function(){
    wx.request({
      url: 'https://shengwu/api/user/userPhone',
      data: {'a':''},
      dataType: "json",
      enableCache: true,
      enableHttp2: true,
      enableQuic: true,
      header: {"content-type":"application/json; charset=utf-8"},
      method: "GET",
      responseType: "json",
      timeout: 0,
      success: (result) => {
        var that = this;
        that.data.telephone = result.data.telephone
        console.log(result)
        console.log("telephone",that.data.telephone)
        console.log(that.data.telephone);
        object.jump2VolunteerLoginWithPhone(that.data.telephone)
      },
      fail: (res) => {
        alert("error")
      },
      complete: (res) => {},
    })
    
  }
})