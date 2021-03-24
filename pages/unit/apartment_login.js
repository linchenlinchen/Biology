// pages/individual/apartment_login.js
let {HttpRequst, jump2Management, direct2Management} = require("../../utils/util")
Page({
  login:function(event){

 },

  /**
   * 页面的初始数据
   */
  data: {
    unitname:"",
    password:"",
    login:"登录"
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

  inputUnit:function(e){
    console.log(e.detail.value)
    this.setData({
      unitname:e.detail.value
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
    HttpRequst('/api/unit/companyLogin',1,'',{"unitname":this.data.unitname,"password":this.data.password},"POST").then(function(result){
      switch(result.statusCode){
        case 0:
          that.doSuccessLogin(result)
          break;
        default:
          wx.showToast({
            title: '企业名或密码不正确！',
          })
      }
    })
  },

  
  doSuccessLogin(result){
    console.log("RESULT",result)
    // console.log("result.data.cookies[0].unitname",(result.data.cookies[0].unitname))
    // console.log("result.data.cookies[0].image",(result.data.cookies[0].image))
    wx.setStorageSync('cookieKey',result.data.cookies[0]);
    wx.setStorageSync('unitname', this.data.unitname)
    wx.setStorageSync('password', this.data.password)
    let that = this
    HttpRequst('/api/unit/unitProjects',1,'',{"unit":this.data.unitname},"GET").then(function(result){
      console.log("that new ",that)
      console.log("this new",this)
      that.doSuccessMyList(result)
    })
  },

  doSuccessMyList(result){
    console.log("this is ",this)
    console.log("result.data.publishedList",(result.data.publishedList))
    console.log("result.data.draftList",(result.data.draftList))
    wx.setStorageSync('publishedProjects', result.data.publishedList)
    wx.setStorageSync('draftProjects', result.data.draftList)
    getApp().globalData.isUnit=true
    direct2Management()

  },
})