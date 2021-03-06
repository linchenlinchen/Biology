// pages/individual/edit.js
const object= require("../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formats: {},
    img_src:"",
    bottom: 0,
    readOnly: false,
    placeholder: '介绍一下你的详情吧，支持文字和图片...',
    _focus: false,
    my:'my',
    projectId:null,
    projectName:"",
    projectGoal:"",
    projectDuration:"",
    beginDate:"",
    endDate:"",
    projectItems:[],
    agreeItems:[],
    dataNumber:0,
    agreeNumber:0,
    tempDataName:"",
    tempDataDesc:"",
    tempagreeName:"",
    tempagreeDesc:"",
    isPublished:false,
    notCheckList : ["tempDataName","tempDataDesc","tempagreeName","tempagreeDesc","projectId","isPublished","img_src" ,"bottom","readOnly","_focus"]
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
        console.log(result.data)
        // console.log(result.data.data.projectDuration.split("-")[0])
        that.setData({
          projectId:result.data.data.projectId,
          projectName:result.data.data.projectName,
          projectGoal:result.data.data.projectGoal,
          projectDuration:result.data.data.projectDuration,
          beginDate:result.data.data.projectDuration.split("-")[0].replace(/\./g,"-"),
          endDate:result.data.data.projectDuration.split("-")[1].replace(/\./g,"-"),
          projectItems:result.data.data.projectItems,
          agreeItems:result.data.data.agreeItems,
          dataNumber:result.data.data.projectItems.length,
          agreeNumber:result.data.data.agreeItems.length,
          isPublished:result.data.data.isPublished
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
  checkNull:function(){

    for (const element in this.data) {
      console.log(element)
      console.log(this.data[element]==null || this.data[element]=="")
      if(this.data.notCheckList.indexOf(element)!=-1){
        continue
        // console.log(element)
      }
      else if(this.data[element]==null || this.data[element]==""){
        console.log(this.data[element]==null)
        console.log(this.data[element]=="")
        return true
      }
    }
    if(this.data.projectItems.length<1 || this.data.agreeItems.length<1){
      return true
    }
    for (const element in this.data.projectItems) {
      for (const key in element) {
        if(element[key]==null || element[key]==""){
          console.log("3")
          return true
        }
      }
      
    }
    for (const element in this.data.agreeItems) {
      for (const key in element) {
        if(element[key]==null || element[key]==""){
          console.log("4")
          return true
        }
      }
    }
    
    return false
  },
  saveDraft:function(){
    this.editorCtx.getContents({
      success: (res) => {
        console.log(res.html)
        var description = res.html
        //console.log(description)
      if(!this.checkNull()){
      let that = this
      object.HttpRequst("/api/unit/projectDraft",1,'',{
        "unitname":getApp().globalData.unitname,
        "projectId":this.data.projectId,
        "projectName":this.data.projectName,
        "projectGoal":this.data.projectGoal,
        "projectDuration":this.data.projectDuration,
        "projectItems":this.data.projectItems,
        "agreeItems":this.data.agreeItems,
        "isPublished":false,
        "description":description,
      },'POST').then(function(result){
        console.log(result)
        if(result.data.statusCode == 0){
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
    }else{
      wx.showToast({
        title: '请填写完整信息！',
        icon:'loading',
        image:'../../images/error.png'
      })
    }
        
     
      },
      fail: (res) => {
        console.log("fail：" , res);
      }
    });
    
  },

  publish:function(){
    this.editorCtx.getContents({
      success: (res) => {
        console.log(res.html)
        var description = res.html
        console.log("this.checkTime():",this.checkTime())
    if(!this.checkNull() && this.checkTime()){
      object.HttpRequst("/api/unit/projectPublish",1,'',{
        "unitname":getApp().globalData.unitname,
        "projectId":this.data.projectId,
        "projectName":this.data.projectName,
        "projectGoal":this.data.projectGoal,
        "projectDuration":this.data.projectDuration,
        "projectItems":this.data.projectItems,
        "agreeItems":this.data.agreeItems,
        "isPublished":true,
        "description":description
      },'POST').then(function(result){
        if(result.data.statusCode == 0){
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
    }else if(this.checkNull()){
      wx.showToast({
        title: '请填写完整信息！',
        image:'../../images/error.png'
      })
    }else{
      wx.showToast({
        title: '结束时间早于今日！',
        image:'../../images/error.png'
      })
    }
        
     
      },
      fail: (res) => {
        console.log("fail：" , res);
      }
    });
    
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

  changeBeginDate(e) {
    this.setData({
        'beginDate': e.detail.value
    });
    this.changeDuration()
  },
  changeEndDate(e) {
    this.setData({
        'endDate': e.detail.value
    });
    this.changeDuration()
    
  },
  changeDuration(){
    if(this.getDurationDay(this.data.beginDate,this.data.endDate)>=0){
      console.log(this.data.beginDate.replace(/-/g,".")+"-"+this.data.endDate.replace(/-/g,"."))
      this.setData({
        'projectDuration':this.data.beginDate.replace(/-/g,".")+"-"+this.data.endDate.replace(/-/g,".")
      })
    }else{
      this.setData({
        'endDate': ""
      });
      wx.showToast({
        title: '结束需晚于开始！',
      })
    }
  },
  getDurationDay: function(startTime,endTime) {
      //日期格式化
      var start_date = new Date(startTime.replace(/-/g, "/"));
      var end_date = new Date(endTime.replace(/-/g, "/"));
      //转成毫秒数，两个日期相减
      var ms = end_date.getTime() - start_date.getTime();
      //转换成天数
      var day = parseInt(ms / (1000 * 60 * 60 * 24));
      //do something
      console.log("day = ", day);
      return day
  },

  inputDataName:function(e){
    console.log("e.currentTarget.itemId",e.currentTarget.id)
    if(e.currentTarget.id<=this.data.dataNumber){
      this.data.projectItems[e.currentTarget.id-1].name = e.detail.value
    }else{
      this.data.tempDataName = e.detail.value
    }
  },
  inputDataDescription:function(e){
    console.log("e.currentTarget.itemId",e.currentTarget.id)
    if(e.currentTarget.id<=this.data.dataNumber){
      this.data.projectItems[e.currentTarget.id-1].description = e.detail.value
    }else{
      this.data.tempDataDesc = e.detail.value
    }
  },
  inputAgreeName:function(e){
    console.log("e.currentTarget.itemId",e.currentTarget.id)
    if(e.currentTarget.id<=this.data.agreeNumber){
      this.data.agreeItems[e.currentTarget.id-1].value = e.detail.value
    }else{
      this.data.tempagreeName = e.detail.value
    }
  },
  inputAgreeDescription:function(e){
    console.log("e.currentTarget.itemId",e.currentTarget.id)
    if(e.currentTarget.id<=this.data.agreeNumber){
      this.data.agreeItems[e.currentTarget.id-1].description = e.detail.value
    }else{
      this.data.tempagreeDesc = e.detail.value
    }
    // console.log( this.data.agreeItems[e.currentTarget.id].description)
  },
  inputSrc:function(e){
    this.data.img_src=e.detail.value
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
        image:"../../images/error.png"
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
        image:"../../images/error.png"
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
  },
  checkTime:function(){
		var check = false;		
		var nowDate = new Date();	
		// var date = nowDate.getFullYear()+"年"+(nowDate.getMonth()+1)+"月"+nowDate.getDate()+"日";
		var input_time =this.data.endDate
		var time_split = new Array();
		time_split = input_time.split("-");
		if(nowDate.getFullYear() < time_split[0]){
			check = true;
		}
		else if(nowDate.getFullYear()==time_split[0] ){
			if(nowDate.getMonth()+1 < time_split[1]){
				check = true;
			}
			else if(nowDate.getMonth()+1 == time_split[1]){
				if(nowDate.getDate() <= time_split[2]){
					check = true;
				}
				else{	
					check = false;
				}
			}
			else{
				check = false;
			}
		}
		else
		{
			check = false;
		}		
		return check;
  },
  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },
  
  // 编辑器初始化完成时触发
  onEditorReady() {
    const that = this;
    wx.createSelectorQuery().select('#editor').context(function(res) {
      that.editorCtx = res.context;
    }).exec();
  },
  undo() {
    this.editorCtx.undo();
  },
  redo() {
    this.editorCtx.redo();
  },
  format(e) {
    let {
      name,
      value
    } = e.target.dataset;
    if (!name) return;
    // console.log('format', name, value)
    this.editorCtx.format(name, value);
  },
  // 通过 Context 方法改变编辑器内样式时触发，返回选区已设置的样式
  onStatusChange(e) {
    const formats = e.detail;
    this.setData({
      formats
    });
  },
  // 插入分割线
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function() {
        console.log('insert divider success')
      }
    });
  },
  // 清除
  clear() {
    this.editorCtx.clear({
      success: function(res) {
        console.log("clear success")
      }
    });
  },
  // 移除样式
  removeFormat() {
    this.editorCtx.removeFormat();
  },
  // 插入当前日期
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    });
  },
  // 插入图片
  insertImage() {
    console.log(this.data.img_src)
        this.editorCtx.insertImage({
          src: this.data.img_src,
          width:'100%',
          data: {
            id: 'abcd',
            role: 'god'
          },
          success: () => {
            console.log('insert image success')
          }
        })
        
     
  },
  //选择图片
  chooseImage(e) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths);
        this.data.images = images.length <= 3 ? images : images.slice(0, 3);
      }
    })
  },
  //查看详细页面
  toDeatil() {
    this.editorCtx.getContents({
      success: (res) => {
        console.log(res.html)
        app.globalData.html = res.html
        wx.navigateTo({
          url: '../details/details'
        })
     
      },
      fail: (res) => {
        console.log("fail：" , res);
      }
    });
  },
  clearSrc(){
    this.data.img_src="";
  }
})