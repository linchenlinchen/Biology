// pages/individual/management.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
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

  }
})