// pages/individual/contents.js
const object= require("../../utils/util");
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    projectInfo:{},
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000,
    hidden:false
  },
  
  changeIndicatorDots: function(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.projectId)
    this.setData({
      projectInfo:{
        "projectId":options.projectId
      }
    })
    //console.log("xxx")
    let that = this
    
    
    object.HttpRequst("/api/projectInfo",1,'',{"projectId":options.projectId},'GET').then(function(result){
      console.log("instruduction:",result)
        
          var projectInfo=result.data.data;
          var article=projectInfo.description;
          //var article='<p><img src="https://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=图片&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=undefined&hd=undefined&latest=undefined&copyright=undefined&cs=2496571732,442429806&os=1196735030,3074154647&simid=4138296572,513061360&pn=0&rn=1&di=169180&ln=1828&fr=&fmq=1621168732995_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%253A%252F%252F1812.img.pp.sohu.com.cn%252Fimages%252Fblog%252F2009%252F11%252F18%252F18%252F8%252F125b6560a6ag214.jpg%26refer%3Dhttp%253A%252F%252F1812.img.pp.sohu.com.cn%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Djpeg%3Fsec%3D1623760732%26t%3D4027802e056a68292590cf20de894101&rpstart=0&rpnum=0&adpicid=0&force=undefined" width="100%" data-custom="id=abcd&amp;role=god"><img src="fsdsfdsf" width="100%" data-custom="id=abcd&amp;role=god"></p><p><br></p><p><br>l</p>'
          WxParse.wxParse('article','html',article,that,5);
          //hidden:getApp().globalData.isUnit
        //})
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
    this.setData({
      projectInfo:{},
      indicatorDots: true,
      autoplay: true,
      circular: true,
      interval: 5000,
      duration: 1000,
      hidden:false
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

  goInvestigate:function(){
    console.log("this.data.projectInfo:",this.data.projectInfo)
    object.direct2UserAgreementWithId(this.data.projectInfo.projectId)
  }
})