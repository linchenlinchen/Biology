// pages/individual/query_result.js
const object= require("../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"志愿者手机号",
    recognition :"面部、声纹、掌纹、指纹、基因序列等生物识别数据",
    shape:"形态特征数据",
    record:"电子医疗记录",
    brain:"脑影像资料",
    other:"剩余样本与样本中提取的其他数据",
    result:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that = this
    object.HttpRequst("/api/unit/projectResults",1,'',{"projectId":options.projectId},"GET").then(function(res){
      console.log(res)
      console.log(res.data.list)
      if(res.statusCode == 0){
        that.setData({
          result:res.data.list
        })
      }
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
  backManage:function(){
    object.backLastPage()
  }
})