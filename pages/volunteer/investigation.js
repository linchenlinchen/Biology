// pages/individual/investigation.js
var object = require("../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectId:"",
    currentAID:0,
    checkId:0,
    items:[],
    agreements:[],
    pairs:[],
    isShow:true,
    isFinished:false,
    colorList:["#fcc877","#a681e6","#acc354","#d6bb99","#f660a3"] 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pid = options.projectId
    console.log("investigate onload pid:",pid)
    if(pid!=undefined && pid!=null){
      let that = this
      object.HttpRequst("/api/user/completedAgreements",1,'',{username:this.data.username,projectId:pid},"GET").
      then(function(res){
        that.setData({
          projectId:pid,
          isFinished:(res.data.isFinished=="true"?true:false),
          currentAID:1,
          checkId:res.data.pairs[0].iid,
          items:res.data.items,
          agreements:res.data.agreements,
          pairs:res.data.pairs
        })
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

  submit:function(){
      object.jump2LockWithData(false,false,false,this.data.projectId,this.data.pairs)
  },
  onClick:function(e){
    console.log("onClick:",e)
    console.log("this.data.pairs[e.currentTarget.id-1]:",this.data.pairs[e.currentTarget.id-1])
    this.setData({
      currentAID:e.currentTarget.id,
      checkId:this.data.pairs[e.currentTarget.id-1]==undefined?0:this.data.pairs[e.currentTarget.id-1].iid
    })
    console.log("agreements[currentAID-1].items:",this.data.agreements[this.data.currentAID-1].items)
  },
  radioChange:function(e){
    console.log("radioChange e:",e.detail)
    let value = e.detail.value
    let currentAID = this.data.currentAID
    var v = "pairs["+(currentAID-1)+"].iid";
    this.setData({
      [v]:parseInt(value)
    })
    console.log(this.data.pairs)
  },
  hide:function(){
    console.log("hidden")
    this.setData({
      isShow: false
    })
  }
})