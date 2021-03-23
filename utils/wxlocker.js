

(function(){
        var app = getApp()
        var path_head = "../../"
        var baseUrl = "https://shengwu"
        // var obejct = require("../utils/util");
        let username = wx.getStorageSync('username')
        let password = wx.getStorageSync('password')
        let that = this
        let hasGesture = false //是否在服务器上设置过手势了
        let hasRelease = false //在hasGesture的情况下，是否解开了锁准备设置
        let needConsistency = false //是否是设置密码已经完成第一次，此次需要一致性
        var wxlocker = function(obj){
            this.chooseType =  3; // 3*3的圆点格子
        };
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
            this.lastPoint = [];
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
        wxlocker.prototype.storePass = function(psw) {// touchend结束之后对密码和状态的处理
            // console.log("this.pswObj",this.pswObj)
            new Promise((resolve,reject)=>{
                HttpRequst('/api/user/hasSignature',1,'',{"username":username,"password":password},"GET",this.doSuccessHasGesture,this.doFailHasGesture,this.doCompleteHasGesture)
            }).then(res=>{
                if ((hasGesture && hasRelease && needConsistency) || (!hasGesture && needConsistency)) {
                    if (this.checkPass(this.pswObj.fpassword, psw)) {//两次密码一致,fp表示上一次的绘制手势
                        let array = this.getGestureArray(psw)
                        // 设置手势密码
                        that = this
                        HttpRequst("/api/user/signature",1,'',{"username":username,"password":password,"gesture":array},'POST',doSuccessSetLock,doFailSetLock,doCompleteSetLock)
                    } else {
                        this.title = "两次绘制不一致，重新绘制";
                        this.titleColor = "error";
                        this.drawStatusPoint('#e64340');
                        // delete this.pswObj.step;
                    }
                } else if (hasGesture && !hasRelease) {
                    // 手势密码从服务器发回本地并存储
                    that = this
                    HttpRequst('/api/user/uncheckedSignature',1,'',{"username":username,"password":password,"gesture":this.getGestureArray(psw)},"POST",this.doSuccessReleaseLock,this.doFailReleaseLock,this.doCompleteReleaseLock)
                } else {
                    if(this.lastPoint.length<4){
                        this.title="密码过于简单，请至少连接4个点";
                        this.resetHidden = true;
                        this.titleColor = "error";
                        return false;
                    }else{//hasGesture && hasRelease && !needConsistency || !hasGesture && !needConsistency
                        needConsistency = true
                        this.pswObj.step = 1;
                        this.pswObj.fpassword = psw;
                        this.titleColor = "";
                        this.title = "再次输入";
                    }
                }
            })
            

        }
        wxlocker.prototype.getGestureArray = function(psw){
            let result = []
            for (const key in object) {
                result.push(psw[key].index)
            }
            return result
        }
        // 是否已有手势密码
        wxlocker.prototype.doSuccessMakeState = function(res){
            that.doSuccessHasGesture()
            console.log(res)
            console.log("now hasGesture is x",hasGesture)
            console.log("now hasRelease is x",hasRelease)
            console.log("now needConsistency is x",needConsistency)
            if (hasGesture && !hasRelease) {
                that.resetHidden = false;
                that.title = "请解锁";
                that.titleColor = "";
            }  
            else {
                that.title="请设置手势密码";
                that.resetHidden = true;
                that.titleColor = "";
            }
        }
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
        // 解锁来让修改密码
        wxlocker.prototype.doSuccessReleaseLock = function(res){
            if(res.statusCode==0){
                console.log('gesture', res.data.gesture)
                // wx.setStorageSync('gesture', res.data.gesture)
                hasGesture = true
                hasRelease = true
                needConsistency = false
                that.title = "解锁成功,请绘制新手势密码";
                that.titleColor = "succ";
                that.drawStatusPoint('#09bb07');
                that.updatePassword()
            }else{
                // wx.removeStorageSync('gesture')
                hasGesture = true
                hasRelease = false
                needConsistency = false
                that.title = "解锁失败,请重试！";
                that.titleColor = "error";
                that.drawStatusPoint('#e64340');
            }
            // wx.showToast({
            //     title: '正在努力解锁...',
            // })
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
        wxlocker.prototype.makeState = function() {
            that = this
            HttpRequst('/api/user/hasSignature',1,'',{"username":username,"password":password},"GET",this.doSuccessMakeState,this.doFailHasGesture,this.doCompleteHasGesture)
        }
        wxlocker.prototype.updatePassword = function(){//点击重置按钮，重置密码
            wx.removeStorageSync("passwordxx");
            // wx.removeStorageSync("chooseType");
            this.pswObj = {};
            this.title="请设置手势密码";
            this.resetHidden = true;
            this.titleColor = "";
            this.reset();
        }
        wxlocker.prototype.init = function() {//初始化锁盘
            // this.pswObj = wx.getStorageSync('passwordxx') ? {
            //     step: 2,
            //     spassword: JSON.parse(wx.getStorageSync('passwordxx'))
            // } : {};
            this.lastPoint = [];//记录手指经过的圆圈
            that = this
            this.makeState();
            this.touchFlag = false;
            this.ctx = wx.createContext();//创建画布
            this.createCircle();//画圆圈
        }
        
        wxlocker.prototype.reset = function() {
            this.createCircle();
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
        wxlocker.prototype.bindtouchend = function(e){
            var self = this;
            if (self.touchFlag) {//手指放开,但是touchFlag还没变false，那么就改成false
                self.touchFlag = false;
                console.log("path:",self.lastPoint)
                self.storePass(self.lastPoint);
                setTimeout(function(){
                        self.reset();
                }, 500);
            }
        }

        // Http Request
        function HttpRequst( url, sessionChoose, sessionId, params, method, doSuccess, doFail,doComplete) {
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
            new Promise((resolve,reject)=>{
            wx.request({
                url: baseUrl + url,
                data: params,
                dataType: "json",
                header: paramSession[sessionChoose],
                method: method,
                success: function(res) {
                // resolve(res)
                doSuccess(res)
                
                },
                fail:function(res){
                doFail(res)
                },
                complete: function(res) {
                doComplete(res)
                }
            })
            })
            
        }

        // module
        module.exports = {
            HttpRequst,
            lock:new wxlocker(),
            
        }
})();