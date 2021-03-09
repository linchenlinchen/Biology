// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    investigation: '进入调查页面',
    commit:'进入提交页面',
    programs:'进入我的项目',
    square:'进入项目广场',
    contents:'进入项目内容',
    login:'登录',
    volunteer_login:'志愿者登录',
    agreement:'问卷填写知情同意页',
    agreement_type:'问卷填写同意类型页',
    apartment_login:'单位登录',
    management:'问卷管理页',
    query_result:'查询问卷结果页',
    edit:'编辑或创建问卷结果页',
    exit: '退出小程序',

    
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  jump2Investigate(){
    wx.navigateTo({
      url: '../individual/investigation',
    })
  },
  jump2Commit(){
    wx.navigateTo({
      url: '../individual/commit',
    })
  },
  jump2My(){
    wx.navigateTo({
      url: '../individual/my_program',
    })
  },
  jump2Square(){
    wx.navigateTo({
      url: '../individual/square',
    })
  },
  jump2Contents(){
    wx.navigateTo({
      url: '../individual/contents',
    })
  },
  jump2Login(){
    wx.navigateTo({
      url: '../individual/login',
    })
  },
  jump2VolunteerLogin(){
    wx.navigateTo({
      url: '../individual/volunteer_login',
    })
  },
  jump2Agreement(){
    wx.navigateTo({
      url: '../individual/agreement',
    })
  },
  jump2AgreementType(){
    wx.navigateTo({
      url: '../individual/agreement_type',
    })
  },
  jump2ApartmentLogin(){
    wx.navigateTo({
      url: '../individual/apartment_login',
    })
  },
  jump2Management(){
    wx.navigateTo({
      url: '../individual/management',
    })
  },
  jump2QueryResult(){
    wx.navigateTo({
      url: '../individual/query_result',
    })
  },
  jump2Edit(){
    wx.navigateTo({
      url: '../individual/edit',
    })
  },
  onLoad() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.jump2AgreementType()
  },
  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
