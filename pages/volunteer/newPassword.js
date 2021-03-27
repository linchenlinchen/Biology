const object = require("../../utils/util")

// pages/individual/apartment_login.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    newPassword1:"",
    newPassword2:"",
    confirm:"确定"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      username:options.telephone
    })
    console.log("username",this.data.username)
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
    if(this.data.newPassword1===this.data.newPassword2){
      object.HttpRequst('/api/user/newPassword',1,'',{"username":this.data.username,"password":this.data.newPassword1},"POST").then(function(res){
        switch(res.statusCode){
          case 0:
            object.backLastPage()
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