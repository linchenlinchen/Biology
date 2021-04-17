// pages/individual/my_program.js
var object = require("../../utils/util")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    nickname:"昵称",
    username:"用户名",
    userInfo:[],
    changeInfo:"",
    changeData:"更改信息",
    changeGesture:'修改手势密码',
    changePassword: '修改账户密码', 
    forgetGesture:'忘记手势密码',
    square:"项目广场",
    signOut:"退出账号",

    current_on:1,
    current_finish:1,

    last:"<   ",
    next:"    >",

    ongoing:"正在进行的问卷",
    finished:"已完成的问卷",
    changeAgree:"修改同意类型",
    seeAgree:"查看同意类型",
    ongoingList:[],
    finishedList:[],
    src:"../../images/1.png",
    isShowSideslip: false,
    sideslipMenuArr: [
      '修改手势密码', 
      '修改账户密码', 
      '忘记手势密码',
      "退出账号","","","","","",""]
    // programamu:[{number:'项目1',message1:'加入项目时间',message2:'项目发布时间'},{number:'项目2',message1:'加入项目时间',message2:'项目发布时间'},{number:'项目3',message1:'加入项目时间',message2:'项目发布时间'}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let that = this
    let username = app.globalData.username
    object.HttpRequst('/api/user/projects',1,'',{"username":username,"onpage":1,"finishpage":1},"GET").then(function(result){
      that.doSuccessMyList(result)
      // let cookie = wx.getStorageSync('cookieKey');//取出Cookie
      let ongoingList = app.globalData.ongoingProjects
      let finishedList = app.globalData.finishedProjects
      let username = app.globalData.username
      let password = app.globalData.password
      let userInfo = app.globalData.userInfo
      let header = { 'Content-Type': 'application/x-www-form-urlencoded'};
      console.log("src",userInfo.avatarUrl)
      that.setData({
        nickname:userInfo.nickName,
        username:username,
        src:userInfo.avatarUrl,
        ongoingList:ongoingList,
        finishedList:finishedList,
        userInfo:userInfo
      })
    })
    
  },
  doSuccessMyList(result){
    if(result.data.statusCode == 0){
      app.globalData.ongoingProjects = result.data.data.ongoingList
      app.globalData.onPages = result.data.data.onPages
      app.globalData.finishedProjects = result.data.data.finishedList
      app.globalData.finishPages = result.data.data.finishPages
      app.globalData.isUnit = false
    }else{
      wx.showToast({
        title: '获取同意类别出错！',
        image:"../../images/error.png"
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




// 修改同意类型
  visit_details:function(e){
    //获取pid

    console.log("visit_details e:",e.currentTarget.id)
    let id = e.currentTarget.id
    object.jump2UserInvestigateWithId(id)
  },



// 以下为侧边栏
  changeLock:function(){
    object.jump2UserLock(true,false,false)
  },

  changePassword:function(){
    object.jump2UserLock(false,true,false)
  },

  forgetGesture:function(){
    object.jump2UserForgetLock()
  },

  goSquare:function(){
    object.jump2UserSquare()
  },

  signOut:function(){
    app.globalData.userInfo = null
    app.globalData.ongoingProjects = null
    app.globalData.ongoingProjects = null
    app.globalData.username = null
    app.globalData.password = null
    app.globalData.onPages = null
    app.globalData.finishPages = null
    object.backLastPage()
    wx.showToast({
      title: '已退出登录',
    })
  },

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
    let functionList = [this.changeLock,this.changePassword,this.forgetGesture,this.signOut,,,,,]
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
  },

  last_on:function(){
    if(this.data.current_on>1){
      let that = this
      object.HttpRequst('/api/user/projects',1,'',{"username":this.data.username,"onpage":this.data.current_on-1,"finishpage":this.data.current_finish},"GET").then(function(result){
        if(result.data.statusCode == 0){
          that.setData({
            ongoingList:result.data.data.ongoingList,
            current_on:that.data.current_on-1
          })
        }else{
          wx.showToast({
            title: '出错了！',
          })
        }
      })
    }else{
      wx.showToast({
        title: '已经是第一页！',
      })
    }
  },

  next_on:function(){
    if(this.data.current_on<app.globalData.onPages){
      let that = this
      object.HttpRequst('/api/user/projects',1,'',{"username":this.data.username,"onpage":this.data.current_on+1,"finishpage":this.data.current_finish},"GET").then(function(result){
        if(result.data.statusCode == 0){
          that.setData({
            ongoingList:result.data.data.ongoingList,
            current_on:that.data.current_on+1
          })
        }else{
          wx.showToast({
            title: '出错了！',
          })
        }
      })
    }else{
      wx.showToast({
        title: '已经是最后一页！',
      })
    }
  },

  last_finish:function(){
    if(this.data.current_finish>1){
      let that = this
      object.HttpRequst('/api/user/projects',1,'',{"username":this.data.username,"onpage":this.data.current_on,"finishpage":this.data.current_finish-1},"GET").then(function(result){
        if(result.data.statusCode == 0){
          that.setData({
            finishedList:result.data.data.finishedList,
            current_finish:that.data.current_finish-1
          })
        }else{
          wx.showToast({
            title: '出错了！',
          })
        }
      })
    }else{
      wx.showToast({
        title: '已经是第一页！',
      })
    }
  },

  next_finish:function(){
    if(this.data.current_finish<app.globalData.finishPages){
      let that = this
      object.HttpRequst('/api/user/projects',1,'',{"username":this.data.username,"onpage":this.data.current_on,"finishpage":this.data.current_finish+1},"GET").then(function(result){
        if(result.data.statusCode == 0){
          that.setData({
            finishedList:result.data.data.finishedList,
            current_finish:that.data.current_finish+1
          })
        }else{
          wx.showToast({
            title: '出错了！',
          })
        }
      })
    }else{
      wx.showToast({
        title: '已经是第一页！',
      })
    }
  }
})