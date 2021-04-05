// pages/individual/square.js
const app = getApp()
const { jump2Contents } = require("../../utils/util");
var object = require("../../utils/util")
var startX, endX;
var moveFlag = true;// 判断执行滑动事件

//触屏开始点坐标

Page({
  /**
   * 页面的初始数据
   */
  data: {
    publishedTime:"项目发布时间",
    discription:"项目简介",
    projects:[{
      "projectId":1,
      "projectName":"xxx",
      "rleasedTime":"2017.12.12",
      "organization":"xxx"
    }],
    focus:false,  //控制是否显示带取消按钮的搜索框
    inputValue:"",
    userInfo: {},
    hasUserInfo: false,
    enter:false,
    currentpage:"1",
    number:"10",
    method:"hot",
    background:["#fcc877","#a681e6","#acc354","#75cc82","#f063a0","#d6bb99","#f16266"]
    
    
    


  },
  

/**
   * 触屏开始计时和获取坐标
   */
  

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
  onLoad: function (options) {
    this.getAllProjects(options.method)
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

  },

  touchStart: function (e) {
    
    startX = e.touches[0].pageX; // 获取触摸时的原点
    moveFlag = true;
    this.setData({enter:true})
  },
  // 触摸移动事件
  touchMove: function (e) {
    endX = e.touches[0].pageX; // 获取触摸时的原点
    if (moveFlag) {
      if (endX - startX > 50) {
        console.log("move right");
        
       
        e.touches[0].pageX = startX
        moveFlag = false;
      }
      if (startX - endX > 50) {
        console.log("move left");
        moveFlag = false;
         jump2Contents(e.currentTarget.id)
      }
    }

  },
  // 触摸结束事件
  touchEnd: function (e) {
    moveFlag = true; // 回复滑动事件
    this.setData({enter:false});
  },

  move2left() {
    var that = this;
    
    that.setData({
      content: "move2left"
    });
  },

  seeProject:function(e){
    jump2Contents(e.currentTarget.id)
  },

  getAllProjects:function(){
    if(this.data.method == undefined){
      this.data.method = "hot"
    }
    let that = this
    object.HttpRequst("/api/allProjects",1,'',{"method":this.data.method,"begin":"0","number":this.data.number},'GET').then(function(result){
      that.setData({
        projects:result.data.content,
        currentpage:"1"
      })
    })
  },

  getAllProjectsByHot:function(){
    this.data.method="hot";
    this.getAllProjects()
  },

  getAllProjectsByTime:function(){
    this.data.method="time";
    this.getAllProjects()
  },
  jump2NextPage:function(){
    var next=parseInt(this.data.currentpage)+1;
    var begin=this.data.currentpage*this.data.number;
    var that=this;
    console.log(begin);
    object.HttpRequst("/api/allProjects",1,'',{"method":this.data.method,"begin":begin,"number":this.data.number},'GET').then(function(result){
      that.setData({
        projects:result.data.content,
        currentpage:next
      })
    })
  },
  jump2PrePage:function(){
    var next=parseInt(this.data.currentpage)-1;
    if(this.data.currentpage=="1"){
      return;
    }

    var begin=(this.data.currentpage-2)*this.data.number;
    
    var that=this;
    object.HttpRequst("/api/allProjects",1,'',{"method":this.data.method,"begin":begin,"number":this.data.number},'GET').then(function(result){
      that.setData({
        projects:result.data.content,
        currentpage:next
      })
    })
  }
})