// pages/individual/contents.js
const object= require("../../utils/util")
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    projectInfo:{},
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000,
    hidden:false
  },
  
  changeIndicatorDots: function(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.projectId)
    
    let that = this
    object.HttpRequst("/api/projectInfo",1,'',{"projectId":options.projectId},'GET').then(function(result){
        var projectInfo=result.data.data;
        var article=projectInfo.description;
          
        WxParse.wxParse('article','html',article,that,5);
    })
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
    this.setData({
      projectInfo:{},
      indicatorDots: true,
      autoplay: true,
      circular: true,
      interval: 5000,
      duration: 1000,
      hidden:false
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

  goInvestigate:function(){
    console.log("this.data.projectInfo.projectId:",this.data.projectInfo.projectId)
    object.direct2UserAgreementWithId(this.data.projectInfo.projectId)
  }
})