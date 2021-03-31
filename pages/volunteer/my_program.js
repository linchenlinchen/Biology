// pages/individual/my_program.js
var object = require("../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    nickname:"昵称",
    username:"用户名",

    changeInfo:"",
    changeGesture:'修改手势密码',
    changePassword: '修改账户密码', 
    forgetGesture:'忘记手势密码',
    square:"项目广场",
    signOut:"退出账号",

    ongoing:"正在进行的问卷",
    finished:"已完成的问卷",
    changeAgree:"修改同意类型",
    ongoingList:[],
    finishedList:[],
    src:"../../images/1.png",
    isShowSideslip: false,
    sideslipMenuArr: [
      '修改手势密码', 
      '修改账户密码', 
      '忘记手势密码',
      "项目广场",
      "退出账号",]
    // programamu:[{number:'项目1',message1:'加入项目时间',message2:'项目发布时间'},{number:'项目2',message1:'加入项目时间',message2:'项目发布时间'},{number:'项目3',message1:'加入项目时间',message2:'项目发布时间'}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let cookie = wx.getStorageSync('cookieKey');//取出Cookie
    let ongoingList = wx.getStorageSync('ongoingProjects')
    let finishedList = wx.getStorageSync('finishedProjects')
    let username = wx.getStorageSync('username')
    let password = wx.getStorageSync('password')
    let userInfo = wx.getStorageSync('userInfo')
    let header = { 'Content-Type': 'application/x-www-form-urlencoded'};
    // if (cookie) {
    //     header.Cookie = cookie;
    // }
    console.log(userInfo)
    // console.log("cookie username",cookie.username)
    // console.log("cookie image",cookie.image)
    console.log("ongoingList",ongoingList)
    console.log("finishedList",finishedList)
    console.log("src",userInfo.avatarUrl)
    this.setData({
      nickname:userInfo.nickName,
      username:username,
      src:userInfo.avatarUrl,
      ongoingList:ongoingList,
      finishedList:finishedList
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

  changeLock:function(){
    object.jump2Lock(true,false,false)
  },

  changePassword:function(){
    object.jump2Lock(false,true,false)
    // object.jump2newPassword(false,true,false)
    // object.jump2changePassword(this.data.username)
  },

  goSquare:function(){
    object.jump2Square()
  },

  signOut:function(){
    wx.removeStorageSync('userInfo')
    wx.removeStorageSync('ongoingProjects')
    wx.removeStorageSync('finishedProjects')
    wx.removeStorageSync('username')
    wx.removeStorageSync('password')
    object.backLastPage()
    wx.showToast({
      title: '已退出登录',
    })
  },

// 以下为侧边栏
  show: function() {
    this.setData({
      isShowSideslip: true
    })
  },

  offSideslipMen: function(){
    this.setData({
      isShowSideslip: false
    })
  }
  ,
  itemClick: function(e) {
    let functionList = [this.changeLock,this.changePassword,,this.goSquare,this.signOut]
    var tapId = e.currentTarget.id;
    var index = this;
    for (var i = 0; i < index.data.sideslipMenuArr.length;i++){
      if (tapId == i){
        (functionList[i])()
        // wx.showToast({
        //   title: index.data.sideslipMenuArr[i],
        //   icon: 'none',
        //   image: '',
        //   duration: 1000,
        //   mask: true,
        //   success: function(res) {},
        //   fail: function(res) {},
        //   complete: function(res) {},
        // })
      }
    }
  }


})