// pages/individual/management.js
const app = getApp()
const { jump2QueryResult, jump2Square, HttpRequst, jump2Edit } = require("../../utils/util")
var object = require("../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    square:"项目广场",
    signOut:"退出登录",
    unitname:"单位账户名称",
    published:"已发布",
    seeResult:"查看结果",
    derive:"导出结果",
    modify:"修改内容",
    draft:"草稿箱",
    userInfo: {},
    hasUserInfo: false,
    inputValue:"",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let publishedList = wx.getStorageSync('publishedProjects')
    let draftList = wx.getStorageSync('draftProjects')
    let unitname = wx.getStorageSync('unitname')
    let password = wx.getStorageSync('password')
    let userInfo = wx.getStorageSync('userInfo')
    let header = { 'Content-Type': 'application/x-www-form-urlencoded'};
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: userInfo,
        password:password,
        unitname:unitname,
        draftList:draftList,
        publishedList:publishedList,
        hasUserInfo: true
      })
    }
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
  signOut:function(){
    wx.removeStorageSync('userInfo')
    wx.removeStorageSync('publishedProjects')
    wx.removeStorageSync('draftProjects')
    wx.removeStorageSync('unitname')
    wx.removeStorageSync('password')
    object.backLastPage()
    wx.showToast({
      title: '已退出登录',
    })
  },
  queryResult:function(e){
    console.log(e.currentTarget)
    console.log(e.currentTarget.id)
    object.jump2QueryResultWithId(e.currentTarget.id)
  },
  goSquare:function(){
    object.jump2Square()
  },
  newProject:function(){
    object.jump2Edit(null)
  },
  modifyProject:function(e){
    console.log(e.currentTarget.id)
    object.jump2Edit(e.currentTarget.id)
  }
})