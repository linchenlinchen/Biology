const { jump2My } = require("../../utils/util")

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

  /**
   * 登录按钮
   * @param {*} event 
   */
  login:function(event){
    console.log("111")
    wx.request({
      url: 'https://shwngwu/api/user/userLogin',
      data: {
        "username":this.data.username,
        "password":this.data.password
      },
      dataType: "json",
      enableCache: true,
      enableHttp2: true,
      enableQuic: true,
      header: {
        "content-type":"application/json; charset=utf-8"
      },
      method: "POST",
      responseType: "json",
      timeout: 0,
      success: (result) => {
        console.log(result)
        if(result.statusCode==0){
          console.log("result.data.cookies[0].username",(result.data.cookies[0].username))
          console.log("result.data.cookies[0].image",(result.data.cookies[0].image))
          wx.setStorageSync('cookieKey',result.data.cookies[0]);
          wx.request({
            url: 'https://shengwu/api/user/userProjects',
            data: {
              "username":this.data.username
            },
            dataType: "json",
            enableCache: true,
            enableHttp2: true,
            enableQuic: true,
            header: {
              "content-type":"application/json; charset=utf-8"
            },
            method: "POST",
            responseType: "json",
            timeout: 0,
            success: (result) => {
              console.log("result.data.ongoingList",(result.data.ongoingList))
              console.log("result.data.finishedList",(result.data.finishedList))
              wx.setStorageSync('ongoingProjects', result.data.ongoingList)
              wx.setStorageSync('finishedProjects', result.data.finishedList)
            },
            fail: (res) => {},
            complete: (res) => {},
          })
          
          // if (result && result.header && result.header['Set-Cookie']) {
          //   console.log("32",result.header['cookie'])
          //   wx.setStorageSync('cookieKey', res.header['cookie']);   //保存Cookie到Storage
          // }
        }
      },
      fail: (res) => {
        console.log("error")
        console.log(res)
      },
      complete: (res) => {
        if(res.statusCode==0){
          jump2My()
        }
      },
    })
  },
})