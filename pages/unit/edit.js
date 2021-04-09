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
    projectItems:[],
    agreeItems:[],
    dataNumber:0,
    agreeNumber:0,
    tempDataName:"",
    tempDataDesc:"",
    tempagreeName:"",
    tempagreeDesc:""
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
          projectItems:result.data.projectItems,
          agreeItems:result.data.agreeItems,
          dataNumber:result.data.projectItems.length,
          agreeNumber:result.data.agreeItems.length
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
  saveDraft:function(){
    let that = this
    object.HttpRequst("/api/unit/projectDraft",1,'',{
      "projectId":this.data.projectId,
      "projectName":this.data.projectName,
      "projectGoal":this.data.projectGoal,
      "projectDuration":this.data.projectDuration,
      "projectItems":this.data.projectItems,
      "agreeItems":this.data.agreeItems,
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
      "projectItems":this.data.projectItems,
      "agreeItems":this.data.agreeItems,
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
  },
  inputDataName:function(e){
    console.log("e.currentTarget.itemId",e.currentTarget.id)
    if(e.currentTarget.id<=this.data.dataNumber){
      this.data.projectItems[e.currentTarget.id].name = e.detail.value
    }else{
      this.data.tempDataName = e.detail.value
    }
  },
  inputDataDescription:function(e){
    console.log("e.currentTarget.itemId",e.currentTarget.id)
    if(e.currentTarget.id<=this.data.dataNumber){
      this.data.projectItems[e.currentTarget.id].description = e.detail.value
    }else{
      this.data.tempDataDesc = e.detail.value
    }
  },
  inputAgreeName:function(e){
    console.log("e.currentTarget.itemId",e.currentTarget.id)
    if(e.currentTarget.id<=this.data.agreeNumber){
      this.data.agreeItems[e.currentTarget.id].value = e.detail.value
    }else{
      this.data.tempagreeName = e.detail.value
    }
  },
  inputAgreeDescription:function(e){
    console.log("e.currentTarget.itemId",e.currentTarget.id)
    if(e.currentTarget.id<=this.data.agreeNumber){
      this.data.agreeItems[e.currentTarget.id].description = e.detail.value
    }else{
      this.data.tempagreeDesc = e.detail.value
    }
    // console.log( this.data.agreeItems[e.currentTarget.id].description)
  },
  addData:function(e){
    if(this.data.tempDataName.length>0 && this.data.tempDataDesc.length>0){
      let tmp = this.data.projectItems
      tmp.push({"aid":parseInt(e.currentTarget.id),"name":this.data.tempDataName,"description":this.data.tempDataDesc})
      wx.showToast({
        title: '添加字段：'+this.data.tempDataName,
      })
      this.setData({
        projectItems:tmp,
        dataNumber:this.data.dataNumber+1,
        tempDataName:"",
        tempDataDesc:""
      })
      // console.log("data:",this.data)
      
    }else{
      wx.showToast({
        title: '请填写完整信息！',
      })
    }
  },
  addAgree:function(e){
    if(this.data.tempagreeName.length>0 && this.data.tempagreeDesc.length>0){
      let tmp = this.data.agreeItems
      tmp.push({"iid":parseInt(e.currentTarget.id),"name":"","value":this.data.tempagreeName,"description":this.data.tempagreeDesc})
      wx.showToast({
        title: '添加字段：'+this.data.tempagreeName,
      })
      this.setData({
        agreeItems:tmp,
        agreeNumber:this.data.agreeNumber+1,
        tempagreeName:"",
        tempagreeDesc:""
      })
      // console.log("data:",this.data)
    }else{
      wx.showToast({
        title: '请填写完整信息！',
      })
    }
  },
  deleteData:function(e){
    let currentId = e.currentTarget.id
    let tmp = this.data.projectItems
    tmp.splice(currentId-1,1)
    let i = 0
    console.log("tmp:",tmp)
    for(;i<tmp.length;i++){
      tmp[i].aid=i+1
    }
    this.setData({
      projectItems:tmp,
      dataNumber:this.data.dataNumber-1
    })
    wx.showToast({
      title: '删除成功',
    })
    console.log("data:",this.data)
  },
  deleteAgree:function(e){
    let currentId = e.currentTarget.id
    let tmp = this.data.agreeItems
    tmp.splice(currentId-1,1)
    let i = 0
    console.log("tmp:",tmp)
    for(;i<tmp.length;i++){
      tmp[i].iid=i+1
    }
    this.setData({
      agreeItems:tmp,
      agreeNumber:this.data.agreeNumber-1
    })
    wx.showToast({
      title: '删除成功',
    })
    console.log("data:",this.data)
  }
})