// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    unitname:null,
    username:null,
    password:null,
    ongoingProjects:null,
    onPages:1,
    finishedProjects:null,
    finishPages:1,
    publishedProjects:null,
    publishPages:1,
    draftProjects:null,
    draftPages:1,
    isUnit:false,

    // baseUrl:"https://shengwu",
    logs:"pages/logs/logs",
    // public
    register:"pages/public/register",
    login:"pages/public/login",
    // unit
    unit_login:"pages/unit/login",
    unit_forgetPassword:"pages/unit/forgetPassword",
    unit_management:"pages/unit/management",
    unit_edit:"pages/unit/edit",
    unit_square:"pages/unit/square",
    unit_introduction:"pages/unit/introduction",
    unit_result:"pages/unit/query_result",
    unit_commit:"pages/unit/commit",
    unit_changePassword:"pages/unit/changePassword",
    unit_newPassword:"pages/unit/newPassword",
    unit_forgetPassword:"pages/unit/forgetPassword",
    // user
    user_login:"pages/user/login",
    user_forgetPassword:"pages/user/forgetPassword",
    user_my_program:"pages/user/my_program",
    user_investigation:"pages/user/investigation",
    user_square:"pages/user/square",
    user_introduction:"pages/user/introduction",
    user_agreement:"pages/user/agreement",
    user_agreement_type:"pages/user/agreement_type",
    user_commit:"pages/user/commit",

    user_lock:"pages/user/lock",
    user_changePassword:"pages/user/changePassword",
    user_newPassword:"pages/user/newPassword",
    user_forgetLock:"pages/user/forgetLock",
    user_forgetPassword:"pages/user/forgetPassword",

    json:""
  },
  setGlobalData: function(data) {
    this.globalData = data;
  }
})
