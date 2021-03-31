const { HttpRequst, jump2VolunteerLoginWithPhone } = require("../../utils/util")

// pages/individual/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    telephone:"手机",
    code:"验证码",
    getCodeNumber:"获取验证码",
    password:"密码",
    submit:"提交",
    username:"",
    confirmCode:"",
    pw:""
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
  inputValue:function(e){
    console.log(e.detail.value)
    this.setData({
      username:e.detail.value
    })
  },
  codeValue:function(e){
    this.setData({
      confirmCode:e.detail.value
    })
  },
  pswValue:function(e){
    this.setData({
      pw:e.detail.value
    })
  },

  getCode:function(){
    // url, sessionChoose, sessionId, params, method, doSuccess, doFail
    HttpRequst('/api/user/code',1,'',{username:this.username},"GET",this.doSuccessOfCode,this.doFailOfCode,this.doCompleteOfCode)
  },
  signUp:function(){
    HttpRequst("/api/user/register",1,'',{username:this.username,code:this.confirmCode,password:this.pw},"POST",this.doSuccessOfSignUp,this.doFailOfSignUp,this.doCompleteOfSignUp)
  },
  doSuccessOfCode(result){
    if(result.statusCode==0){
      console.log("验证码发送成功！")
      wx.showToast({
        title: '验证码发送成功！',
      })
    }else if(result.statusCode==1){
      console.log("该手机号已注册！")
      wx.showToast({
        title: '该手机号已注册！',
      })
    }else{
      console.log("获取验证码出错！")
      wx.showToast({
        title: '获取验证码出错！',
      })
    }
  },
  doFailOfCode(result){
    console.log("验证码发送失败！")
    wx.showToast({
      title: '验证码发送失败！',
    })
  },
  doCompleteOfCode(result){
    console.log("验证码发送结束！")
    // wx.showToast({
    //   title: '验证码发送结束！',
    // })
  },
  doSuccessOfSignUp(result){
    if(result.statusCode==0){
      console.log("注册成功！")
      wx.showToast({
        title: '注册成功！',
      })
      jump2VolunteerLoginWithPhone(this.data.username)
    }else if(result.statusCode==1){
      console.log("该手机号已注册！")
      wx.showToast({
        title: '该手机号已注册！',
      })
    }else{
      console.log("注册出错！")
      wx.showToast({
        title: '注册出错！',
      })
    }
  },
  doFailOfSignUp(result){
    console.log("注册失败！")
    wx.showToast({
      title: '注册失败！',
    })
  },
  doCompleteOfSignUp(result){
    console.log("注册结束（不一定成功）！")
    // wx.showToast({
    //   title: '注册完成！',
    // })
  }
})


