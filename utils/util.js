var app = getApp()
var path_head = "../../"
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

function jump2Investigate(){
  wx.navigateTo({
    url: path_head+app.globalData.investigation,
  })
}
function jump2Commit(){
  wx.navigateTo({
    url:  path_head+app.globalData.commit,
  })
}
function jump2My(){
  wx.navigateTo({
    url:  path_head+app.globalData.my_program,
  })
}
function jump2Square(){
  wx.navigateTo({
    url:  path_head+app.globalData.square,
  })
}
function jump2Contents(){
  wx.navigateTo({
    url:  path_head+app.globalData.contents,
  })
}
function jump2Login(){
  wx.navigateTo({
    url:  path_head+app.globalData.login,
  })
}
function jump2VolunteerLogin(){
  wx.navigateTo({
    url:  path_head+app.globalData.volunteer_login,
  })
}
function jump2Agreement(){
  wx.navigateTo({
    url: path_head+app.globalData.agreement,
  })
}
function jump2AgreementType(){
  wx.navigateTo({
    url:  path_head+app.globalData.agreement_type,
  })
}
function jump2ApartmentLogin(){
  wx.navigateTo({
    url:  path_head+app.globalData.apartment_login,
  })
}
function jump2Management(){
  wx.navigateTo({
    url:  path_head+app.globalData.managemnet,
  })
}
function jump2QueryResult(){
  wx.navigateTo({
    url:  path_head+app.globalData.query_result,
  })
}
function jump2Edit(){
  wx.navigateTo({
    url:  path_head+app.globalData.edit,
  })
}


function HttpRequst(loading, url, sessionChoose, sessionId, params, method, ask, callBack) {
  if (loading == true) {
    wx.showToast({
      title: '数据加载中',
      icon: 'loading'
    })
  }
  var paramSession = [{},
    {
      'content-type': 'application/json',
      'Cookie': 'JSESSIONID=' + sessionId
    },
    {
      'content-type': 'application/json'
    },
    {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': 'JSESSIONID=' + sessionId
    },
    {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Cookie': 'JSESSIONID=' + sessionId
    }
  ]
    wx.request({
      url: baseUrl + url,
      data: params,
      dataType: "json",
      header: paramSession[sessionChoose],
      method: method,
      success: function(res) {
        console.log(res);
        console.log(res.data.statusCode);
        if (loading == true) {
          wx.hideToast(); 
        }
        if (res.data.needLogin == true) {
          wxLogin2(loading, callBack);//在此做自己的wx.login
        }
        if (res.data.needLogin != true) {
          callBack(res.data);
        }
      },
      complete: function() {
        if (loading == true) {
          wx.hideToast(); 
        }
      }
    })
}

module.exports = {
  formatTime,
  HttpRequst,
  jump2Agreement,
  jump2AgreementType,
  jump2ApartmentLogin,
  jump2Commit,
  jump2Contents,
  jump2QueryResult,
  jump2Edit,
  jump2VolunteerLogin,
  jump2Management,
  jump2Login,
  jump2Investigate,
  jump2Square,
  jump2My
}

