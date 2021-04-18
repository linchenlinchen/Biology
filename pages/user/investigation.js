// pages/individual/investigation.js
var object = require("../../utils/util")
let app = getApp()
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
      object.HttpRequst("/api/user/agreements",1,'',{"username":app.globalData.username,"projectId":pid},"GET").
      then(function(res){
        console.log("investigation:",res)
        let temp_pairs = []
        //如果原本的问卷填写内容是数据损坏的，或者是还未填写的，就给他初始化
        if(!that.checkValid(res.data.data.pairs,res.data.data.agreements.length)){
          for (const key in res.data.data.agreements) {
            console.log(key)
            temp_pairs.push({"aid":res.data.data.agreements[key].aid,"iid":0})
          }
        }else{
          temp_pairs = res.data.data.pairs
        }
        that.setData({
          projectId:pid,
          isFinished:((res.data.data.isFinished=="true" || res.data.data.isFinished)?true:false),
          currentAID:1,
          checkId:res.data.data.pairs[0]==undefined?0:res.data.data.pairs[0].iid,
          items:res.data.data.items,
          agreements:res.data.data.agreements,
          pairs:temp_pairs
        })
        console.log(that.data)
      })
    }
  },

  checkValid:function(pairs,len){
    if(pairs.length != len){
      return false
    }
    for (let index = 0; index < len; index++) {
      if(pairs[index].aid==undefined || pairs[index].iid==undefined){
        return false
      }
    }
    return true
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
      let can_submit = true
      for (const key in this.data.pairs) {
        if(this.data.pairs[key].iid==0){
          can_submit = false
        }
      }
      console.log("can_submit",can_submit)
      if(can_submit){
        object.direct2UserLockWithData(false,false,false,this.data.projectId,this.data.pairs)
      }else{
        wx.showToast({
          title: '请填写完整',
          image:"../../images/error.png"
        })
      }
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
  //这里要考虑原本没有选项的情况
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