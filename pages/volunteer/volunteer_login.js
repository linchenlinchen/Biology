const { jump2My, HttpRequst, direct2My } = require("../../utils/util")

// pages/individual/apartment_login.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    password:"",
    login:"登录"
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
  inputUser:function(e){
    console.log(e.detail.value)
    this.setData({
      username:e.detail.value
    })
  },
  inputPassword:function(e){
    console.log(e.detail.value)
    this.setData({
      password:e.detail.value
    })
  },

  /**
   * 登录按钮
   * @param {*} event 
   */
  login:function(event){
    let that = this
    HttpRequst('/api/user/userLogin',1,'',{"username":this.data.username,"password":this.data.password},"POST").then(function(res){
      switch(res.statusCode){
        case 0:
          that.doSuccessLogin(res);
          
          break;
        default:
          wx.showToast({
            title: '用户名或密码不正确！',
          })
      }
    })
  },

  doSuccessLogin(result){
    console.log("RESULT",result)
    // console.log("result.data.cookies[0].username",(result.data.cookies[0].username))
    // console.log("result.data.cookies[0].image",(result.data.cookies[0].image))
    wx.setStorageSync('cookieKey',result.data.cookies[0]);
    wx.setStorageSync('username', this.data.username)
    wx.setStorageSync('password', this.data.password)
    // console.log("that",that)
    // console.log("this",this)
    let that = this
    HttpRequst('/api/user/userProjects',1,'',{"username":this.data.username},"GET").then(function(result){
      console.log("that new ",that)
      console.log("this new",this)
      that.doSuccessMyList(result)
    })
    
  },

  doSuccessMyList(result){
    console.log("this is ",this)
    console.log("result.data.ongoingList",(result.data.ongoingList))
    console.log("result.data.finishedList",(result.data.finishedList))
    wx.setStorageSync('ongoingProjects', result.data.ongoingList)
    wx.setStorageSync('finishedProjects', result.data.finishedList)
    getApp().globalData.isUnit = false
    direct2My()
  },

})