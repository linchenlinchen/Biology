// pages/individual/square.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    projects:[
      {
      picture:"../../images/1.png",
      title:"表型组-泰州序列",
      time:"2000.2.2",
      background:"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
     },
     {
      picture:"../../images/1.png",
      title:"表型组-泰州序列",
      time:"2000.2.2",
      background:"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
     },
     {
      picture:"../../images/1.png",
      title:"表型组-泰州序列",
      time:"2000.2.2",
      background:"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
     },
     {
      picture:"../../images/1.png",
      title:"表型组-泰州序列",
      time:"2000.2.2",
      background:"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
     },
    ],
    focus:false,  //控制是否显示带取消按钮的搜索框
    inputValue:"",
    userInfo: {},
    hasUserInfo: false,


  },
  focusHandler(e){
    this.setData({focus:true});
  },
  cancelHandler(e)
  {
    this.setData({focus:false});
    this.setData({inputValue:""});
  },
  query(e){
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
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