// pages/individual/volunteer_login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remind: '加载中',
    angle: 0,
    loginInfo:{
      title:'微信授权',
      content:'获得您的公开信息(昵称、头像等)',
      logName:'小程序申请获得以下权限',
      logImage:'../../images/logo.jpg',
      
    }
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
    console.log("222")
    let userInfo = wx.getStorageSync('userInfo')
    console.log(userInfo);
    let dialogComponent = this.selectComponent('.wxc-dialog');
    // if (!userInfo) {
      dialogComponent && dialogComponent.show();
    // } else {
    //   this.setData({
    //     userInfo: userInfo
    //   })
    //   dialogComponent && dialogComponent.hide();
    // }
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