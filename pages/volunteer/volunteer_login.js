const { jump2My, HttpRequst } = require("../../utils/util")

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
    HttpRequst('/api/user/userLogin',1,'',{"username":this.data.username,"password":this.data.password},"POST",this.doSuccessLogin,this.doFailLogin,this.doCompleteLogin)
  },

  doSuccessLogin(result){
    console.log("RESULT",result)
    if(result.statusCode==0){
      console.log("result.data.cookies[0].username",(result.data.cookies[0].username))
      console.log("result.data.cookies[0].image",(result.data.cookies[0].image))
      wx.setStorageSync('cookieKey',result.data.cookies[0]);
      wx.setStorageSync('username', result.data.username)
      wx.setStorageSync('password', result.data.password)
      HttpRequst('/api/user/userProjects',1,'',{"username":this.data.username},"POST",this.doSuccessMyList,this.doFailMyList,this.doCompleteMyList)
    }else if(result.statusCode==1){
      wx.showToast({
        title: '用户名或密码不正确！',
      })
    }else{
      wx.showToast({
        title: '登录出错！',
      })
    }
  },
  doFailLogin(result){
    wx.showToast({
      title: '登录失败！',
    })
  },
  doCompleteLogin(result){
    if(result.statusCode==0){
      jump2My()
    }
  },
  doSuccessMyList(result){
    console.log("result.data.ongoingList",(result.data.ongoingList))
    console.log("result.data.finishedList",(result.data.finishedList))
    wx.setStorageSync('ongoingProjects', result.data.ongoingList)
    wx.setStorageSync('finishedProjects', result.data.finishedList)
  },
  doFailMyList(result){
    wx.showToast({
      title: '获取问卷列表失败',
    })
  },
  doCompleteMyList(result){
    console.log ('获取问卷列表完成(不一定成功！)');
  }

})