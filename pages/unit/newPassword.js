const object = require("../../utils/util")
var app = getApp()
// pages/individual/apartment_login.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    unitname:"",
    newPassword1:"",
    newPassword2:"",
    confirm:"确定"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      unitname:options.unitname
    })
    console.log("unitname",this.data.unitname)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {

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
  inputPassword1:function(e){
    console.log(e.detail.value)
    this.setData({
      newPassword1:e.detail.value
    })
  },
  inputPassword2:function(e){
    console.log(e.detail.value)
    this.setData({
      newPassword2:e.detail.value
    })
  },

  /**
   * 确认按钮
   * @param {*} event 
   */
  login:function(event){
    if(this.data.newPassword1.length<8){
      wx.showToast({
        title: '密码太短！',
      })
    }
    else if(this.data.newPassword1===this.data.newPassword2){
      let that = this
      object.HttpRequst('/api/unit/newPassword',1,'',{"unitname":this.data.unitname,"password":this.data.newPassword1},"POST").then(function(res){
        switch(res.statusCode){
          case 0:
            app.globalData.password = that.data.newPassword1
            // object.backLastPage()
            object.returnFirstPage()
            wx.showToast({
              title: '修改密码成功！请重新登录！',
            })
            break;
          default:
            wx.showToast({
              title: '设置新密码出错！',
            })
        }
      })
    }else{
      wx.showToast({
        title: '两次输入密码不一致！',
      })
    }
  },
})