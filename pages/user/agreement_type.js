// pages/individual/agreement_type.js
var object = require("../../utils/util")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectId:"",
    agreements:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    object.HttpRequst("/api/user/agreements",1,'',{"username":app.globalData.username,"projectId":this.data.projectId},"GET").then(function(res){
      console.log("rrrrrrrrrrrrrrrrrrrr:",res)
      that.setData({
        projectId:options.projectId,
        agreements:res.data.items
      })
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
  investigate:function(){
      object.direct2UserInvestigateWithId(this.data.projectId)
  }
})