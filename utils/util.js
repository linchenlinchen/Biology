var app = getApp()
var path_head = "../../"
var baseUrl = "https://shengwu"
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function toThousands(num) {
    return (num || "").replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
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
function direct2My(){
  wx.redirectTo({
    url:  path_head+app.globalData.my_program,
  })
}

function jump2My(){
  wx.redirectTo({
    url:  path_head+app.globalData.my_program,
  })
}

function jump2VolunteerPrelogin(){
  wx.navigateTo({
    url:  path_head+app.globalData.volunteer_prelogin,
  })
}
function jump2Lock(changeGesture,changePassword,forgetGesture){
  wx.navigateTo({
    url:  path_head+app.globalData.lock+"?changeGesture="+changeGesture+"&changePassword="+changePassword+"&forgetGesture="+forgetGesture,
  })
}
function jump2Square(){
  wx.navigateTo({
    url:  path_head+app.globalData.square,
  })
}

function jump2changePassword(username){
  wx.navigateTo({
    url:  path_head+app.globalData.changePassword+"?username="+username,
  })
}

function jump2newPassword(username){
  wx.redirectTo({
    url:  path_head+app.globalData.newPassword+"?username="+username,
  })
}

function jump2Contents(pid){
  wx.navigateTo({
    url:  path_head+app.globalData.contents+"?projectId="+pid,
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
function jump2VolunteerLoginWithPhone(telephone){
  wx.navigateTo({
    url:  path_head+app.globalData.volunteer_login+"?telephone="+telephone,
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

function direct2Management(){
  wx.redirectTo({
    url:  path_head+app.globalData.management,
  })
}
function jump2Management(){
  wx.navigateTo({
    url:  path_head+app.globalData.management,
  })
}
function jump2QueryResult(){
  wx.navigateTo({
    url:  path_head+app.globalData.query_result,
  })
}

function jump2QueryResultWithId(projectId){
  wx.navigateTo({
    url:  path_head+app.globalData.query_result+"?projectId="+projectId,
  })
}
function jump2Edit(projectId){
  wx.navigateTo({
    url:  path_head+app.globalData.edit+"?projectId="+projectId,
  })
}
function backLastPage(){
  var pages = getCurrentPages(); // 当前页面
  var beforePage = pages[pages.length - 2]; // 前一个页面
  wx.navigateBack({
      success: function() {
          beforePage.onLoad(); // 执行前一个页面的onLoad方法
      }
  });
}


function returnFirstPage(){
  var pages = getCurrentPages(); // 当前页面

  var beforePage = pages[pages.length-2]; // 前一个页面
  wx.navigateBack({
    success: function() {
      beforePage.onLoad(); // 执行前一个页面的onLoad方法
    }
  });
}

function HttpRequst( url, sessionChoose, sessionId, params, method) {
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
  console.log(baseUrl + url)
  return new Promise((resolve,reject)=>{
    wx.request({
      url: baseUrl + url,
      data: params,
      dataType: "json",
      header: paramSession[sessionChoose],
      method: method,
      success: function(res) {
        console.log("url:"+url+" 请求成功！")
        resolve(res)

      },
      fail:function(res){
        console.log("url:"+url+" 请求失败！")
        // doFail(res)
        reject(res)
      },
      complete: function(res) {
        console.log("url:"+url+" 请求完成！")
      }
    })
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
  jump2QueryResultWithId,
  jump2Edit,
  jump2Lock,
  jump2VolunteerPrelogin,
  jump2VolunteerLogin,
  jump2VolunteerLoginWithPhone,
  jump2Management,
  jump2Login,
  jump2Investigate,
  jump2Square,
  jump2My,
  jump2changePassword,
  jump2newPassword,
  direct2Management,
  direct2My,
  toThousands:toThousands,
  backLastPage,
  returnFirstPage
}

