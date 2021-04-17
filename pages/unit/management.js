// pages/individual/management.js
const app = getApp()

var object = require("../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    square:"项目广场",
    changeData:"更改信息",
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


    isShowSideslip: false,
    sideslipMenuArr: [
      '修改账户密码', 
      '忘记手势密码',"","","","","","","",""]
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.load()
  },
  load:function(){
    let that = this
    let unitname= app.globalData.unitname
    object.HttpRequst('/api/unit/projects',1,'',{"unitname":unitname},"GET").then(function(result){
      that.doSuccessMyList(result)
      let publishedList = app.globalData.publishedProjects
      let draftList =  app.globalData.draftProjects
      let unitname =  app.globalData.unitname
      let password =  app.globalData.password
      let userInfo =  app.globalData.userInfo
      let header = { 'Content-Type': 'application/x-www-form-urlencoded'};
      if (app.globalData.userInfo) {
        that.setData({
          userInfo: userInfo,
          password:password,
          unitname:unitname,
          draftList:draftList,
          publishedList:publishedList,
          hasUserInfo: true
        })
      }
    })
    
  },
  doSuccessMyList(result){
    if(result.data.statusCode == 0){
      app.globalData.publishedProjects = result.data.data.publishedList
      app.globalData.draftProjects = result.data.data.draftList
      app.globalData.isUnit=true
    }else{
      wx.showToast({
        title: '获取问卷列表出错',
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
  signOut:function(){
    app.globalData.userInfo = null
    app.globalData.publishedProjects = null
    app.globalData.draftProjects = null
    app.globalData.unitname = null
    app.globalData.password = null
    app.globalData.publishPages = 0
    app.globalData.draftPages = 0

    object.backLastPage()
    wx.showToast({
      title: '已退出登录',
    })
  },
  queryResult:function(e){
    object.jump2UnitQueryResultWithId(e.currentTarget.id)
  },
  goSquare:function(){
    object.jump2UnitSquare()
  },
  newProject:function(){

    object.jump2UnitEdit(null)
  },
  modifyProject:function(e){
    console.log("id:",e.detail.id)
    console.log("id:",e.currentTarget.id)
    object.jump2UnitEdit(e.currentTarget.id)
  },
  changeData:function(){
    object.direct2UnitChangePassword(app.globalData.unitname)
  },
})