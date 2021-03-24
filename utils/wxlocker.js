

(function(){
        var app = getApp()
        var path_head = "../../"
        var baseUrl = "https://shengwu"
        // var obejct = require("../utils/util");
        let username = wx.getStorageSync('username')
        let password = wx.getStorageSync('password')
        let lock;
        let that = this
        let hasGesture = false //是否在服务器上设置过手势了
        let hasRelease = false //在hasGesture的情况下，是否解开了锁准备设置
        let needConsistency = false //是否是设置密码已经完成第一次，此次需要一致性
        let finishStorePass = false //是否结束存储密码
        var wxlocker = function(obj){
            this.chooseType =  3; // 3*3的圆点格子
        };

        // 基础函数
        wxlocker.prototype.init = function(page) {//初始化锁盘
                lock = page
                console.log("init")
                this.title="666"
                this.lastPoint = [];//记录手指经过的圆圈
                this.makeState(page);
                this.touchFlag = false;
                this.ctx = wx.createContext();//创建画布
                this.createCircle();//画圆圈
        }
        wxlocker.prototype.drawCle = function(x, y) { // 初始化解锁密码面板
            // obejct.HttpRequst
            this.ctx.setStrokeStyle('#10AEFF');
            this.ctx.setLineWidth(1);
            this.ctx.beginPath();
            this.ctx.arc(x, y, this.r, 0, Math.PI * 2, true);
            this.ctx.closePath();
            this.ctx.stroke();
        }
        wxlocker.prototype.drawPoint = function() { // 初始化圆心
            for (var i = 0 ; i < this.lastPoint.length ; i++) {
                this.ctx.setFillStyle('#10AEFF');
                this.ctx.beginPath();
                this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r / 2, 0, Math.PI * 2, true);
                this.ctx.closePath();
                this.ctx.fill();
            }
        }
        wxlocker.prototype.drawStatusPoint = function(type) { // 初始化状态线条
            for (var i = 0 ; i < this.lastPoint.length ; i++) {
                this.ctx.setStrokeStyle(type);
                this.ctx.beginPath();
                this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r, 0, Math.PI * 2, true);
                this.ctx.closePath();
                this.ctx.stroke();
            }
            wx.drawCanvas({
                canvasId: "locker",
                actions: this.ctx.getActions(),
                reserve:true
            });
        }
        wxlocker.prototype.drawLine = function(po, lastPoint) {// 解锁轨迹
            this.ctx.beginPath();
            this.ctx.setLineWidth(1);
            this.ctx.moveTo(this.lastPoint[0].x, this.lastPoint[0].y);
            // console.log(this.lastPoint[0].x, this.lastPoint[0].y)
            for (var i = 1 ; i < this.lastPoint.length ; i++) {
                this.ctx.lineTo(this.lastPoint[i].x, this.lastPoint[i].y);
                // console.log(this.lastPoint[i].x, this.lastPoint[i].y)
            }
            this.ctx.lineTo(po.x, po.y);
            // console.log(po.x, po.y)
            this.ctx.stroke();
            this.ctx.closePath();

        }
        wxlocker.prototype.createCircle = function() {// 创建解锁点的坐标，根据canvas的大小来平均分配半径
            var  cavW = this.setCanvasSize().w;
            var  cavH = this.setCanvasSize().h;
            var n = this.chooseType;
            var count = 0;
            this.r = cavW / (2 + 4 * n);// 公式计算
            if(this.lastPoint.length<4){
                this.lastPoint = [];
            }
            this.arr = [];
            this.restPoint = [];
            var r = this.r;
            for (var i = 0 ; i < n ; i++) {
                for (var j = 0 ; j < n ; j++) {
                    count++;
                    var obj = {
                        x: j * 4 * r + 3 * r,
                        y: i * 4 * r + 3 * r,
                        index: count
                    };
                    this.arr.push(obj);
                    this.restPoint.push(obj);
                }
            }
            // this.ctx.clearRect(0, 0, cavW, cavH);
            for (var i = 0 ; i < this.arr.length ; i++) {
                this.drawCle(this.arr[i].x, this.arr[i].y);
            }
            wx.drawCanvas({
                canvasId: "locker",
                actions: this.ctx.getActions(),
                reserve:false
            });
            //return arr;

        }
        wxlocker.prototype.getPosition = function(e) {// 获取touch点相对于canvas的坐标
            // var rect = e.target;
            var po = {
                x: e.touches[0].x,
                y: e.touches[0].y
              };
            return po;
        }
        wxlocker.prototype.update = function(po) {// 核心变换方法在touchmove时候调用
            var  cavW = this.setCanvasSize().w;
            var  cavH = this.setCanvasSize().h;
            this.ctx.clearRect(0, 0, cavW, cavH);

            for (var i = 0 ; i < this.arr.length ; i++) { // 每帧先把面板画出来
                this.drawCle(this.arr[i].x, this.arr[i].y);
            }
            this.drawPoint();//  每帧画圆心
            this.drawLine(po , this.lastPoint);// 每帧画轨迹
            for (var i = 0 ; i < this.restPoint.length ; i++) {
                if (Math.abs(po.x - this.restPoint[i].x) < this.r && Math.abs(po.y - this.restPoint[i].y) < this.r) {
                    this.drawPoint();
                    this.lastPoint.push(this.restPoint[i]);
                    this.restPoint.splice(i, 1);
                    break;
                }
            }

        }
        wxlocker.prototype.checkPass = function(psw1, psw2) {// 检测密码
            var p1 = '',
            p2 = '';
            for (var i = 0 ; i < psw1.length ; i++) {
                p1 += psw1[i].index + psw1[i].index;
            }
            for (var i = 0 ; i < psw2.length ; i++) {
                p2 += psw2[i].index + psw2[i].index;
            }
            return p1 === p2;
        }

        
        wxlocker.prototype.getGestureArray = function(psw){
            let result = []
            for (const key in psw) {
                result.push(psw[key].index)
            }
            return result
        }

        
        wxlocker.prototype.makeState = function(page) {
            console.log("makeState")
            that = this
            HttpRequst('/api/user/hasSignature',1,'',{"username":username,"password":password},"GET",this.doSuccessMakeState,this.doFailHasGesture,this.doCompleteHasGesture,page.initState)
        }
        wxlocker.prototype.updatePassword = function(){//点击重置按钮，重置密码
            console.log("updatePassword")
            wx.removeStorageSync("passwordxx");
            // wx.removeStorageSync("chooseType");
            this.pswObj = {};
            that.title="请设置手势密码";
            that.resetHidden = true;
            that.titleColor = "";
            that.reset();
        }
        
        
        wxlocker.prototype.reset = function() {
            console.log("reset")
            this.createCircle();
        }

        // 各个Http请求的处理函数
        /**是否成功明确初始化状态**/
        wxlocker.prototype.doSuccessMakeState = function(res){
            console.log("doSuccessMakeState")
            that.doSuccessHasGesture(res)
            console.log(res)
            console.log("now hasGesture is x",hasGesture)
            console.log("now hasRelease is x",hasRelease)
            console.log("now needConsistency is x",needConsistency)
            that.title = "888"
            console.log(that.title)
            if (hasGesture && !hasRelease) {
                console.log("if")
                
                that.resetHidden = false;
                that.title = "请解锁";
                that.titleColor = "";
            }  
            else {
                console.log("else")
                that.title="请设置手势密码";
                that.resetHidden = true;
                that.titleColor = "";
            }
        }
        wxlocker.prototype.doFailMakeState = function(res){
            this.doFailHasGesture()
        }
        wxlocker.prototype.doCompleteMakeState = function(res){
            this.doCompleteHasGesture()
        }


        // 核心函数
        wxlocker.prototype.storePass = function(psw,lk) {// touchend结束之后对密码和状态的处理
            new Promise(function(resolve, reject){
                lock = lk
                console.log('storePass')
                wx.setStorageSync('drawGesture', psw)
                // that = this
                console.log('storePass this',this)
                console.log('storePass that',that)
                console.log('storePass that points',that.lastPoint)
                resolve("Pass promise in storePass()")
            }).then(function(data){
                console.log(data)
                HttpRequst('/api/user/hasSignature',1,'',{"username":username,"password":password},"GET",that.doSuccessStorePass,that.doFailStorePass,that.doCompleteStorePass,other)
            })
        }
        wxlocker.prototype.doSuccessStorePass = function(res){
            console.log("1:",this)
            console.log("1that:",that)
            console.log("1that loaspoint:",that.lastPoint)
            // that=this
            that.doSuccessHasGesture(res)
            console.log("2:",that)
            if ((hasGesture && hasRelease && needConsistency) || (!hasGesture && needConsistency)) {
                if (that.checkPass(that.pswObj.fpassword, that.lastPoint)) {//两次密码一致,fp表示上一次的绘制手势
                    let array = that.getGestureArray(that.lastPoint)
                    // 设置手势密码
                    // that = this
                    HttpRequst("/api/user/signature",1,'',{"username":username,"password":password,"gesture":array},'POST',that.doSuccessSetLock,that.doFailSetLock,that.doCompleteSetLock,other)
                } else {
                    that.title = "两次绘制不一致，重新绘制";
                    that.titleColor = "error";
                    that.drawStatusPoint('#e64340');
                    // delete this.pswObj.step;
                }
            } else if (hasGesture && !hasRelease) {
                // 手势密码从服务器发回本地并存储
                console.log("3:",this)
                // that = this
                console.log("4:",this)
                console.log("4that:",that)
                self = that
                let array = self.getGestureArray(that.lastPoint)
                // that = this
                HttpRequst('/api/user/uncheckedSignature',1,'',{"username":username,"password":password,"gesture":array},"POST",that.doSuccessReleaseLock,that.doFailReleaseLock,that.doCompleteReleaseLock,other)
                // while(!finishStorePass){

                // }
                finishStorePass = false
                console.log("doSuccessReleaseLock5:",self.title)
            } else {
                if(that.lastPoint.length<4){
                    that.title="密码过于简单，请至少连接4个点";
                    that.resetHidden = true;
                    that.titleColor = "error";
                    return false;
                }else{//hasGesture && hasRelease && !needConsistency || !hasGesture && !needConsistency
                    needConsistency = true
                    that.pswObj.step = 1;
                    that.pswObj.fpassword = psw;
                    that.titleColor = "";
                    that.title = "再次输入";
                }

            }
        }
        wxlocker.prototype.doFailStorePass = function(res){
            wx.showToast({
              title: 'Store pass fail',
            })
            console.log("doFailStorePass")
        }
        wxlocker.prototype.doCompleteStorePass = function(res){
            console.log("doCompleteStorePass")
        }

         /**是否已有手势密码**/
        wxlocker.prototype.doSuccessHasGesture = function(res){
            if(res.data.hasSignature){
                hasGesture = true
            }else{
                hasGesture = false
            }
            console.log("now hasGesture is ",hasGesture)
            console.log("now hasRelease is ",hasRelease)
            console.log("now needConsistency is ",needConsistency)
        }
        wxlocker.prototype.doFailHasGesture = function(res){
            wx.showToast({
              title: '访问是否已有手势密码出错！',
            })
        }
        wxlocker.prototype.doCompleteHasGesture = function(res){
            console.log('访问是否已有手势密码结束！')
        }

        /**解锁来让修改密码**/
        wxlocker.prototype.doSuccessReleaseLock = function(res){
            console.log("doSuccessReleaseLock")
            if(res.statusCode==0){
                console.log("res",res)
                // console.log('gesture', res.data.gesture)
                // wx.setStorageSync('gesture', res.data.gesture)
                hasGesture = true
                hasRelease = true
                needConsistency = false
                console.log("doSuccessReleaseLock:",that.title)
                that.title = "解锁成功,请绘制新手势密码";
                console.log("doSuccessReleaseLock1:",that.title)
                that.titleColor = "succ";
                that.drawStatusPoint('#09bb07');
                console.log("doSuccessReleaseLock2:",that.title)
                that.updatePassword()
                console.log("doSuccessReleaseLock3:",that.title)
                lock.initState()
            }else{
                // wx.removeStorageSync('gesture')
                hasGesture = true
                hasRelease = false
                needConsistency = false
                that.title = "解锁失败,请重试！";
                that.titleColor = "error";
                that.drawStatusPoint('#e64340');
            }
            finishStorePass = true
        }
        wxlocker.prototype.doFailReleaseLock=function(res){
            console.log(res)
            wx.showToast({
              title: '请检查网络！',
            })
        }
        wxlocker.prototype.doCompleteReleaseLock=function(res){
            console.log("完成！")
        }

        /**设置手势锁**/
        wxlocker.prototype.doSuccessSetLock = function(){
            hasGesture = true
            hasRelease = false
            needConsistency = false
            that.resetHidden = false;
            that.title = "密码保存成功";
            that.titleColor = "succ";
            that.drawStatusPoint('#09bb07');
            jump2My()
            wx.showToast({
              title: '设置手势密码成功！',
            })
        }
        wxlocker.prototype.doFailSetLock=function(){
            wx.showToast({
              title: '设置手势密码失败！',
            })
        }
        wxlocker.prototype.doCompleteSetLock = function(){
            console.log("设置手势密码完成！")
        }
        
        // 触屏事件触发
        wxlocker.prototype.bindtouchstart = function(e){
            if(e.touches.length==1){
                var self = this;
                var po = self.getPosition(e);
                for (var i = 0 ; i < self.arr.length ; i++) {
                    //判断手指触摸点是否在圆圈内
                    if (Math.abs(po.x - self.arr[i].x) < self.r && Math.abs(po.y - self.arr[i].y) < self.r) {
                        self.touchFlag = true;
                        self.drawPoint();
                        self.lastPoint.push(self.arr[i]);
                        self.restPoint.splice(i,1);
                        break;
                    }
                }
            }
            wx.drawCanvas({
                canvasId: "locker",
                actions: this.ctx.getActions(),
                reserve:true
            });
        }
        wxlocker.prototype.bindtouchmove = function(e){
            // console.log(e)
            if(e.touches.length==1){
               var self = this;
               if (self.touchFlag) {
                    self.update(self.getPosition(e));
                }
            }
            wx.drawCanvas({
                canvasId: "locker",
                actions: this.ctx.getActions(),
                reserve:true
            });
        }
        wxlocker.prototype.bindtouchend = function(e,lock){
            var that = this;
            if (that.touchFlag) {//手指放开,但是touchFlag还没变false，那么就改成false
                that.touchFlag = false;
                console.log("path:",that.lastPoint)
                that.storePass(that.lastPoint);
                while(!finishStorePass){
                    console.log("!finishStorePass")
                }
    
                that.reset();
        
                finishStorePass = false
                
            }
        }

        //适配不同屏幕大小的canvas
        wxlocker.prototype.setCanvasSize = function(){
            var size={};
               try {
                   var res = wx.getSystemInfoSync();
                   var scale = 750/686;//不同屏幕下canvas的适配比例；设计稿是750宽
                   var width = res.windowWidth/scale;
                   var height = width;//canvas画布为正方形
                   size.w = width;
                   size.h = height;
               } catch (e) {
                   // Do something when catch error
                   console.log("获取设备信息失败"+e);
               } 
           return size;
       }

        // Http Request
        function HttpRequst( url, sessionChoose, sessionId, params, method, doSuccess, doFail,doComplete,other) {
            console.log("HttpRequst")
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
            wx.request({
                url: baseUrl + url,
                data: params,
                dataType: "json",
                header: paramSession[sessionChoose],
                method: method,
                success: function(res) {
                // resolve(res)
                doSuccess(res)
                other()
                },
                fail:function(res){
                doFail(res)
                },
                complete: function(res) {
                doComplete(res)
                }
            })
        }

        function other(){
            // lock.initState()
            console.log("do nothing other!")
        }

        // module
        module.exports = {
            HttpRequst,
            lock:new wxlocker(),
            
        }
})();