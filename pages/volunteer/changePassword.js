const object = require("../../utils/util")

// pages/individual/apartment_login.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    password:"",
    confirm:"确认"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      username:options.username
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
    this.setData({
      username:null,
      password:null
    })
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

  inputPassword:function(e){
    console.log(e.detail.value)
    this.setData({
      password:e.detail.value
    })
  },

  /**
   * 确认按钮
   * @param {*} event 
   */
  login:function(event){
    let that = this
    object.HttpRequst('/api/user/userLogin',1,'',{"username":this.data.username,"password":this.data.password},"POST").then(function(res){
      switch(res.statusCode){
        case 0:
          
          object.jump2newPassword(that.data.username)
          break;
        default:
          wx.showToast({
            title: '密码不正确！',
          })
      }
    })
  }
})