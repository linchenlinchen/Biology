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
