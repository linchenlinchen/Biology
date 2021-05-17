var app = getApp()
var path_head = "../../"
var baseUrl = "https://zqty.fudanchenxi.cn"
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

// public
function jump2Login(){
  wx.navigateTo({
    url:  path_head+app.globalData.login,
  })
}


// unit
function jump2UnitLogin(){
  wx.navigateTo({
    url:  path_head+app.globalData.unit_login,
  })
}

function jump2UnitForgetPassword(){
  wx.navigateTo({
    url:  path_head+app.globalData.unit_forgetPassword,
  })
}

function direct2UnitManagement(unitname){
  wx.redirectTo({
    url:  path_head+app.globalData.unit_management+"?unitname="+unitname,
  })
}
function jump2UnitManagement(){
  wx.navigateTo({
    url:  path_head+app.globalData.unit_management,
  })
}

function jump2UnitEdit(projectId){
  wx.navigateTo({
    url:  path_head+app.globalData.unit_edit+"?projectId="+projectId,
  })
}

function direct2UnitSquare(){
  wx.redirectTo({
    url:  path_head+app.globalData.unit_square,
  })
}
function jump2UnitSquare(){
  wx.navigateTo({
    url:  path_head+app.globalData.unit_square,
  })
}

function jump2UnitIntroduction(pid){
  wx.navigateTo({
    url:  path_head+app.globalData.unit_introduction+"?projectId="+pid,
  })
}

function jump2UnitQueryResult(){
  wx.navigateTo({
    url:  path_head+app.globalData.unit_result,
  })
}

function jump2UnitQueryResultWithId(projectId){
  wx.navigateTo({
    url:  path_head+app.globalData.unit_result+"?projectId="+projectId,
  })
}

function direct2UnitCommit(){
  wx.redirectTo({
    url:  path_head+app.globalData.unit_commit,
  })
}

function direct2UnitChangePassword(unitname){
  wx.redirectTo({
    url:  path_head+app.globalData.unit_changePassword+"?unitname="+unitname,
  })
}



function direct2UnitNewPassword(unitname){
  wx.redirectTo({
    url:  path_head+app.globalData.unit_newPassword+"?unitname="+unitname,
  })
}

// user
function jump2UserLogin(){
  wx.navigateTo({
    url:  path_head+app.globalData.user_login,
  })
}

function jump2UserForgetPassword(){
  wx.navigateTo({
    url:  path_head+app.globalData.user_forgetPassword,
  })
}
function jump2UserLoginWithPhone(telephone){
  wx.navigateTo({
    url:  path_head+app.globalData.user_login+"?telephone="+telephone,
  })
}
function direct2UserMyProgram(username){
  wx.redirectTo({
    url:  path_head+app.globalData.user_my_program+"?username="+username,
  })
}

function jump2UserMyProgram(){
  wx.navigateTo({
    url:  path_head+app.globalData.user_my_program,
  })
}

function direct2UserInvestigate(){
  wx.redirectTo({
    url: path_head+app.globalData.user_investigation,
  })
}



function jump2UserInvestigateWithId(pid){
  wx.navigateTo({
    url: path_head+app.globalData.user_investigation+"?projectId="+pid,
  })
}
function direct2UserInvestigateWithId(pid){
  wx.redirectTo({
    url: path_head+app.globalData.user_investigation+"?projectId="+pid,
  })
}

function direct2UserSquare(){
  wx.redirectTo({
    url:  path_head+app.globalData.user_square,
  })
}
function jump2UserSquare(){
  wx.navigateTo({
    url:  path_head+app.globalData.user_square,
  })
}

function jump2UserSquareWithMethod(method){
  wx.navigateTo({
    url:  path_head+app.globalData.user_square+"?method="+method,
  })
}

function jump2UserIntroduction(pid){
  wx.navigateTo({
    url:  path_head+app.globalData.user_introduction+"?projectId="+pid,
  })
}


function direct2UserAgreementWithId(pid){
  wx.redirectTo({
    url:  path_head+app.globalData.user_agreement+"?projectId="+pid,
  })
}

function direct2UserAgreementTypeWithId(pid){
  wx.redirectTo({
    url:  path_head+app.globalData.user_agreement_type+"?projectId="+pid,
  })
}

function direct2UserCommit(){
  wx.redirectTo({
    url:  path_head+app.globalData.user_commit,
  })
}

function jump2UserLock(changeGesture,changePassword,forgetGesture){
  wx.navigateTo({
    url:  path_head+app.globalData.user_lock+"?changeGesture="+changeGesture+"&changePassword="+changePassword+"&forgetGesture="+forgetGesture,
  })
}
function direct2UserLockWithData(changeGesture,changePassword,forgetGesture,pid,pairs){
  let p = JSON.stringify(pairs)
  wx.redirectTo({
    url:  path_head+app.globalData.user_lock+"?changeGesture="+changeGesture+"&changePassword="+changePassword+"&forgetGesture="+forgetGesture+"&projectId="+pid+"&pairs="+p,
  })
}

function direct2UserLock(changeGesture,changePassword,forgetGesture){
  wx.redirectTo({
    url:  path_head+app.globalData.user_lock+"?changeGesture="+changeGesture+"&changePassword="+changePassword+"&forgetGesture="+forgetGesture,
  })
}

function direct2UserChangePassword(username){
  wx.redirectTo({
    url:  path_head+app.globalData.user_changePassword+"?username="+username,
  })
}
function direct2UserNewPassword(username){
  wx.redirectTo({
    url:  path_head+app.globalData.user_newPassword+"?username="+username,
  })
}


function jump2UserForgetLock(){
  wx.navigateTo({
    url:  path_head+app.globalData.user_forgetLock,
  })
}








function backLastPage(){
    // 1.获取页面栈(返回一个数组,包含了所有曾经去过的页面)
  var pages = getCurrentPages(); //可以log看看是什么(里面什么都有--)
    // 2. 拿到上一页(数组长度-2就是上一页)
  var beforePage = pages[pages.length - 2]; // 前一个页面
    // 3. 执行上一页 onLoad 函数(刷新数据)
      // 假设请求后端数据并渲染页面的函数是: load()
  wx.navigateBack({
      success: function() {
          beforePage.onLoad(); // 执行前一个页面的onLoad方法
      }
  });
}

function returnFirstPage(){
  wx.reLaunch({
    url: path_head+app.globalData.login,
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
        console.log(res)
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
  toThousands:toThousands,
  backLastPage,
  returnFirstPage,
// unit
  jump2Login,
  jump2UnitLogin,
  jump2UnitForgetPassword,
  direct2UnitManagement,
  jump2UnitManagement,
  jump2UnitEdit,
  direct2UnitSquare,
  jump2UnitSquare,
  jump2UnitIntroduction,
  jump2UnitQueryResult,
  jump2UnitQueryResultWithId,
  direct2UnitCommit,
  direct2UnitChangePassword,
  direct2UnitNewPassword,

// user
  jump2UserLogin,
  jump2UserForgetPassword,
  jump2UserLoginWithPhone,
  direct2UserMyProgram,
  jump2UserMyProgram,
  direct2UserInvestigate,
  jump2UserInvestigateWithId,
  direct2UserInvestigateWithId,
  direct2UserSquare,
  jump2UserSquare,
  jump2UserSquareWithMethod,
  jump2UserIntroduction,
  direct2UserAgreementWithId,
  direct2UserAgreementTypeWithId,
  direct2UserCommit,
  jump2UserLock,
  direct2UserLockWithData,
  direct2UserLock,
  direct2UserChangePassword,
  direct2UserNewPassword,
  jump2UserForgetLock
}

