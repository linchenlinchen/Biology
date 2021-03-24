// pages/individual/edit.js
const object= require("../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    my:'my',
    projectId:null,
    projectName:"",
    projectGoal:"",
    projectDuration:"",
  
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.projectId)
    if(options.projectId!="null" && options.projectId!=null){
      console.log("is here")
      let that = this
      object.HttpRequst("/api/unit/projectInfo",1,'',{"projectId":options.projectId},'GET').then(function(result){
        console.log(result)
        that.setData({
          projectId:result.data.projectId,
          projectName:result.data.projectName,
          projectGoal:result.data.projectGoal,
          projectDuration:result.data.projectDuration,

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
    this.setData({
      my:'my',
      projectId:null,
      projectName:"",
      projectGoal:"",
      projectDuration:"",
    })
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
  saveDraft:function(){
    object.HttpRequst("/api/unit/projectDraft",1,'',{
      "projectId":this.data.projectId,
      "projectName":this.data.projectName,
      "projectGoal":this.data.projectGoal,
      "projectDuration":this.data.projectDuration,
      "isPublished":false
    },'POST').then(function(result){
      if(result.statusCode == 0){
        object.backLastPage()
        wx.showToast({
          title: '成功保存到草稿箱！',
        })
      }else{
        wx.showToast({
          title: '出错了，请检查网络！',
        })
      }
    })
  },
  publish:function(){
    object.HttpRequst("/api/unit/projectPublish",1,'',{
      "projectId":this.data.projectId,
      "projectName":this.data.projectName,
      "projectGoal":this.data.projectGoal,
      "projectDuration":this.data.projectDuration,
      "isPublished":true
    },'POST').then(function(result){
      if(result.statusCode == 0){
        object.backLastPage()
        wx.showToast({
          title: '成功发布！',
        })
      }else{
        wx.showToast({
          title: '出错了，请检查网络！',
        })
      }
    })
  },

  inputName:function(e){
    console.log(this.data)
    this.data.projectName=e.detail.value
    console.log(this.data)
    // this.setData({
    //   project:
    // })
  },
  inputGoal:function(e){
    this.data.projectGoal=e.detail.value
    console.log(this.data)
  },
  inputDuration:function(e){
    this.data.projectDuration=e.detail.value
    console.log(this.data)
  }
})