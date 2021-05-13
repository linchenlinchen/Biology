let object = require("../../utils/util")
var app = getApp()
// pages/individual/apartment_login.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    password:"",
    login:"登录",
    loadingHidden:true
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
    this.setData({
      loadingHidden:false
    })
    let that = this
    object.HttpRequst('/api/user/login',1,'',{"username":this.data.username,"password":this.data.password},"POST").then(function(res){
      console.log(res)
      that.setData({
        loadingHidden:true
      })
      switch(res.data.statusCode){
        case 0:
          that.doSuccessLogin(res);
        
          break;
        default:
          that.doSuccessLogin(res);
          wx.showToast({
            title: '用户名或密码不正确！',
          })
          this.setData({
            loadingHidden:true
          })
      }
    })
  },

  doSuccessLogin(result){
    
    console.log("RESULT",result)
    app.globalData.username = this.data.username
    app.globalData.password = this.data.password
    console.log("app.globalData.username",app.globalData.username)
    object.direct2UserMyProgram(this.data.username)
    // let that = this
    // object.HttpRequst('/api/user/projects',1,'',{"username":this.data.username,"onpage":1,"finishpage":1},"GET").then(function(result){
    //   that.doSuccessMyList(result)
    // })
    
  },

  // doSuccessMyList(result){
  //   if(result.data.statusCode == 0){
  //     app.globalData.ongoingProjects = result.data.data.ongoingList
  //     app.globalData.onPages = result.data.data.onPages
  //     app.globalData.finishedProjects = result.data.data.finishedList
  //     app.globalData.finishPages = result.data.data.finishPages
  //     app.globalData.isUnit = false
  //     object.direct2UserMyProgram(this.data.username)
  //   }
  // },

  goForget(){
    object.jump2UserForgetPassword()
  }

})