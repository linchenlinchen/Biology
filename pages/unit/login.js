// pages/individual/apartment_login.js
let object = require("../../utils/util")
var app = getApp()
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
    object.HttpRequst('/api/unit/login',1,'',{"unitname":this.data.unitname,"password":this.data.password},"POST").then(function(result){
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
    app.globalData.unitname = this.data.unitname
    app.globalData.password = this.data.password
    let that = this
    object.HttpRequst('/api/unit/projects',1,'',{"unitname":this.data.unitname},"GET").then(function(result){
      that.doSuccessMyList(result)
    })
  },

  doSuccessMyList(result){
    if(result.statusCode == 0){
      app.globalData.publishedProjects = result.data.publishedList
      app.globalData.draftProjects = result.data.draftList
      app.globalData.isUnit=true
      object.direct2UnitManagement()
    }
  },

  goForget(){
    object.jump2UnitForgetPassword()
  }
})