
const { jump2VolunteerPrelogin } = require("../../utils/util")
const object= require("../../utils/util")
var app = getApp()
// pages/individual/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    volunteer_account_login:"志愿者账号登录",
    apartment_account_login:"单位账号登录",
    user_random_login:"游客登录",
    register:"注册"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  to_register:function(){
    wx.navigateTo({
      url: '../individual/register',
    })
  },

  ap_login:function(){
    if(typeof wx.getUserProfile == 'function') {
      //新版getUserProfile代码放置此处，参考上面 一、旧版getUserInfo获取用户信息
      wx.getUserProfile({
        desc:'应用将获取您微信用户名等信息',
        success: (res) => {
            console.log('获取用户信息成功', res.userInfo)
            wx.setStorageSync('userInfo', res.userInfo)
            object.jump2ApartmentLogin()
            //获取用户信息的各类操作
        },
        fail: (res) =>{
            console.log('获取用户信息失败',res)
            wx.showToast({
                title: '信息授权失败~',
                duration: 1000,
                icon: 'error',
                mask: true
            })
        }
    })}
    else {
      //旧版getUserInfo代码参考放置此处，参考上面 二、新版getUserProfile获取用户信息
      wx.getSetting({ //获取授权列表
        success: res => {
          if (res.authSetting['scope.userInfo']) { //已经授权
            wx.getUserInfo({ //getUserInfo获得用户信息
              success: res => { 
                console.log(res)
                wx.setStorageSync('userInfo', res.userInfo)
                object.jump2ApartmentLogin()
              }
            })
          } else{
            wx.showModal({ //显示提示信息用的
              title: '提示',
              confirmText: '去设置',
              cancelText: '取消',
              content: '请授权方便您的使用噢~',
              success: function(res) {
                if (res.confirm) {//用户点击了去设置
                  jump2VolunteerLogin()
                } else if(res.cancel) {
                  console.log("用户取消了去设置授权")
                  
                }
              }
            })
          } 
        }
      })
      
    }
  },

  // vo_login:function(){
  //   object.jump2VolunteerLogin()
  // },

  vo_login:function(e){
    if(typeof wx.getUserProfile == 'function') {
      //新版getUserProfile代码放置此处，参考上面 一、旧版getUserInfo获取用户信息
      wx.getUserProfile({
        desc:'应用将获取您微信用户名等信息',
        success: (res) => {
            console.log('获取用户信息成功', res.userInfo)
            wx.setStorageSync('userInfo', res.userInfo)
            object.jump2VolunteerLogin()
            //获取用户信息的各类操作
        },
        fail: (res) =>{
            console.log('获取用户信息失败',res)
            wx.showToast({
                title: '信息授权失败~',
                duration: 1000,
                icon: 'error',
                mask: true
            })
        }
    })}
    else {
      //旧版getUserInfo代码参考放置此处，参考上面 二、新版getUserProfile获取用户信息
      wx.getSetting({ //获取授权列表
        success: res => {
          if (res.authSetting['scope.userInfo']) { //已经授权
            wx.getUserInfo({ //getUserInfo获得用户信息
              success: res => { 
                console.log(res)
                wx.setStorageSync('userInfo', res.userInfo)
                object.jump2VolunteerLogin()
              }
            })
          } else{
            wx.showModal({ //显示提示信息用的
              title: '提示',
              confirmText: '去设置',
              cancelText: '取消',
              content: '请授权方便您的使用噢~',
              success: function(res) {
                if (res.confirm) {//用户点击了去设置
                  jump2VolunteerLogin()
                } else if(res.cancel) {
                  console.log("用户取消了去设置授权")
                  
                }
              }
            })
          } 
        }
      })
      
    }
    
  },

  getUserInfo:function(e){
    // Mock.mock("https://biology/api/user/userInfo",
    // {username:"18621531701"})

    // $.ajax({
    //   url:"https://biology/api/user/userInfo",
    //   dataType:"json",
    //   success:function(data){
    //     console.log(data)
    //   }
    // })
    // wx.getSetting({ //获取授权列表
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) { //已经授权
    //       wx.getUserInfo({ //getUserInfo获得用户信息
    //         success: res => { //下面这部分大家根据自己的项目自由发挥哈~
    //           console.log("part 1:"+toString(res))
    //           wx.login({
    //             success: function(res) {
    //              console.log('loginCode', res.code)
    //             }
    //           });
               
    //           //this.setData({
    //           //  avatarUrl: res.userInfo.avatarUrl,
    //           //  userInfo: res.userInfo,
    //           //})
    //           //getApp().globalData.userInfo = res.userInfo
    //         }
    //       })
    //     } else{
    //       wx.showModal({ //显示提示信息用的
    //         title: '提示',
    //         confirmText: '去设置',
    //         cancelText: '取消',
    //         content: '请授权方便您的使用噢~',
    //         success: function(res) {
    //           if (res.confirm) {//用户点击了去设置
    //            wx.openSetting({
    //               success: (res) => {
    //                 if(res.authSetting['scope.userInfo']) {
    //                   console.log("设置成功")
    //                   console.log("part 3:"+tostring(res))
    //                   wx.login({
    //                     success: function(res) {
    //                      console.log('loginCode', res.code)
    //                     }
    //                   });
    //                 } else {
    //                   console.log("设置失败")
    //                 }
    //               }
    //             })
    //           } else if(res.cancel) { //用户点击了取消
    //     // 这里大家可以自由发挥怎么劝住用户跪求他们授权/(ㄒoㄒ)/~~
    //             console.log("用户取消了去设置授权")
    //           }
    //         }
    //       })
    //     } 
    //   }
    // })
    
    
    // //获取用户唯一标识openId
    // var openId = (wx.getStorageSync('openId'))
    // if (openId) {
    //   console.log("if (openId)")
    //   wx.getUserInfo({
    //     success: function (res) {
    //       that.setData({
    //         nickName: res.userInfo.nickName,
    //         avatarUrl: res.userInfo.avatarUrl,
    //         openId:openId
    //       })
    //     },
    //     fail: function () {
    //       // fail
    //       console.log("获取失败！")
    //     },
    //     complete: function () {
    //       // complete
    //       console.log("获取用户信息完成！")
    //     }
    //   })
    // } else {
    //   console.log("else")
    //   wx.login({
    //     success: function (res) {
    //       console.log("res.code is:")
    //       console.log(res.code)
    //       if (res.code) {
    //         wx.getUserInfo({
    //           withCredentials: true,
    //           success: function (res_user) {
    //             console.log("withCredentials:true")
    //             //下方代码不可行，可让后端获取手机号进行注册
    //             wx.request({
    //              //后台接口地址
    //               url: "https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code="+res.code+"&grant_type=authorization_code",
    //               // data: {
    //               //   code: res.code,
    //               //   encryptedData: res_user.encryptedData,
    //               //   iv: res_user.iv
    //               // },
    //               method: 'GET',
    //               header: {
    //                 'content-type': 'application/json'
    //               },
    //               success: function (res) {
    //                 console.log("openId:"+ res.data.openId)
    //                 // this.globalData.userInfo = JSON.parse(res.data);
    //                 that.setData({
    //                   nickName: res.data.nickName,
    //                   avatarUrl: res.data.avatarUrl,
    //                 })
    //                 wx.setStorageSync('openId', res.data.openId);

    //               }
    //             })
    //           }, fail: function () {
    //             wx.showModal({
    //               title: '警告通知',
    //               content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
    //               success: function (res) {
    //                 if (res.confirm) {
    //                   wx.openSetting({
    //                     success: (res) => {
    //                       if (res.authSetting["scope.userInfo"]) {如果用户重新同意了授权登录
    //                         wx.login({
    //                           success: function (res_login) {
    //                             if (res_login.code) {
    //                               wx.getUserInfo({
    //                                 withCredentials: true,
    //                                 success: function (res_user) {
    //                                   wx.request({
    //                                    url: 'https://....com/wx/login',
    //                                     data: {
    //                                       code: res_login.code,
    //                                       encryptedData: res_user.encryptedData,
    //                                       iv: res_user.iv
    //                                     },
    //                                     method: 'GET',
    //                                     header: {
    //                                       'content-type': 'application/json'
    //                                     },
    //                                     success: function (res) {
    //                                       that.setData({
    //                                         nickName: res.data.nickName,
    //                                         avatarUrl: res.data.avatarUrl,

    //                                       })
    //                                       wx.setStorageSync('openId', res.data.openId);
    //                                     }
    //                                   })
    //                                 }
    //                               })
    //                             }
    //                           }
    //                         });
    //                       }
    //                     }, fail: function (res) {

    //                     }
    //                   })

    //                 }
    //               }
    //             })
    //           }, complete: function (res) {


    //           }
    //         })
    //       }
    //     }
    //   })

    // }


},
globalData: {   
userInfo: null
}
//     var ivObj = e.detail.iv
//     var telObj = e.detail.encryptedData
//     var codeObj = "";
//     var that = this;
//     //------执行Login---------
//     wx.login({
//      success: res => {
//       console.log('code转换', res.code);
   
//  　　　　　　//用code传给服务器调换session_key
//       wx.request({
//        url: 'https://你的接口文件路径', //接口地址
//        data: {
//         appid: "你的小程序APPID",
//         secret: "你的小程序appsecret",
//         code: res.code,
//         encryptedData: telObj,
//         iv: ivObj
//        },
//        success: function (res) {
//         phoneObj = res.data.phoneNumber;
//         console.log("手机号=", phoneObj)
//         wx.setStorage({  //存储数据并准备发送给下一页使用
//          key: "phoneObj",
//          data: res.data.phoneNumber,
//         })
//        }
//       })
   
//       //-----------------是否授权，授权通过进入主页面，授权拒绝则停留在登陆界面
//       if (e.detail.errMsg == 'getPhoneNumber:user deny') { //用户点击拒绝
//        wx.navigateTo({
//         url: '../index/index',
//        })
//       } else { //允许授权执行跳转
//        wx.navigateTo({
//         url: '../test/test',
//        })
//       }
//      }
//     });
})

