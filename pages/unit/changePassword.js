const object = require("../../utils/util")

// pages/individual/apartment_login.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    unitname:"",
    password:"",
    confirm:"确认"
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
    object.HttpRequst('/api/unit/login',1,'',{"unitname":this.data.unitname,"password":this.data.password},"POST").then(function(res){
      switch(res.data.statusCode){
        case 0:
          object.direct2UnitNewPassword(that.data.unitname)
          break;
        default:
          wx.showToast({
            title: '密码不正确！',
          })
      }
    })
  }
})