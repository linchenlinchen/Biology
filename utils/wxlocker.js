

(function(){
        let object = require("../utils/util")
        var app = getApp()
        let projectId ;
        let pairs;
        let code;
        let lock;
        let psw;
        let lastPass;
        let that = this
        let hasRelease = false //在hasGesture的情况下，是否解开了锁准备设置
        let needConsistency = false //是否是设置密码已经完成第一次，此次需要一致性
        // let options = {}
        var wxlocker = function(obj){
            this.chooseType =  3; // 3*3的圆点格子
        };

        
        wxlocker.prototype.makeState = function() {
            console.log("makeState")
            that = this
            hasRelease = false
            needConsistency = false
            // 注意这里一定是==“true”
            if(lock.data.forgetGesture=="true"){
                console.log("lock.data.forgetGesture")
                that.setType("请设置手势密码","succ",'#09bb07')
                lock.initState()
            }
            else if (!hasRelease) {
                console.log("!hasRelease")
                that.setType("请解锁","succ",'#09bb07')
                lock.initState()
            } 
            else {
                console.log("else")
                that.setType("请设置手势密码","succ",'#09bb07')
                lock.initState()
            }
        }

        
        wxlocker.prototype.reset = function() {
            console.log("reset")
            this.createCircle();
        }

        // 各个Http请求的处理函数

        // 核心函数
        wxlocker.prototype.storePass = function() {// touchend结束之后对密码和状态的处理
            let username = app.globalData.username
            let password = app.globalData.password
            if(lock.data.changePassword=="true"){
                that = this
                
                object.HttpRequst('/api/user/signature',1,'',{"username":username,"password":password,"gesture":psw},"POST").then(function(res){
                    console.log("res post gesture:",res)
                    if(res.statusCode == 0){
                        object.direct2UserChangePassword(username)
                        wx.showToast({
                            title: '解锁成功！',
                        })
                    }else{
                        wx.showToast({
                          title: '解锁出错！',
                        })
                    }
                })
            }
            else if(lock.data.forgetGesture=="true"){
                if(needConsistency && !this.checkPass(psw,lastPass)){
                    that.reset()
                    that.setType("两次绘制不一致，重新绘制","error",'#e64340')
                    that.lastPoint=[]
                    needConsistency = false
                    lock.initState()
                }
                else if(psw.length<4){
                    that.reset()
                    that.setType("密码过于简单，请至少连接4个点，重新绘制","error",'#e64340')
                    lock.initState()
                    that.lastPoint=[]
                }
                else if(this.checkPass(psw,lastPass) && needConsistency){
                    that = this
                    object.HttpRequst('/api/user/forgetSignature',1,'',{"username":username,"password":password,"code":code,"gesture":psw},"PUT")
                    .then(function(res){
                        if(res.statusCode==0){
                            needConsistency = false
                            object.backLastPage()
                            wx.showToast({
                                title: '修改手势密码成功！',
                            })
                            
                        }else{
                            wx.showToast({
                              title: '修改手势密码失败！',
                            })
                        }
                    })
                }else{
                    that.reset()
                    that.setType("再次绘制","succ",'#09bb07')
                    that.lastPoint=[]
                    needConsistency = true
                    lock.initState()
                }
                
            }
            // 修改手势
            else if(lock.data.changeGesture=="true"){
                if (hasRelease && needConsistency) {
                    console.log("enter 1")
                    if (this.checkPass(psw, lastPass)) {//两次密码一致,fp表示上一次的绘制手势
                        // 设置手势密码
                        that = this
                        object.HttpRequst("/api/user/signature",1,'',{"username":username,"password":password,"gesture":psw},'PUT').then(function(res){
                            if(res.statusCode==0){
                                hasRelease = false
                                needConsistency = false
                                that.reset()
                                that.lastPoint=[]
                                that.setType("密码保存成功", "succ",'#09bb07')
                                lock.initState()
                                
                                object.backLastPage()
                                wx.showToast({
                                    title: '重置手势密码成功！',
                                })
                            }
                        })
                    } else {
                        that.reset()
                        that.setType("两次绘制不一致，重新绘制","error",'#e64340')
                        that.lastPoint=[]
                        needConsistency = false
                        lock.initState()
                    }
                } else if (!hasRelease) {
                    console.log("enter 2")
                    that = this
                    object.HttpRequst('/api/user/signature',1,'',{"username":username,"password":password,"gesture":psw},"POST").then(function(res){
                        if(res.statusCode==0){
                            that.reset()
                            that.lastPoint=[]
                            that.setBoolean(true,false)
                            that.setType("解锁成功,请绘制新手势密码","succ",'#09bb07')
                            hasRelease = true
                            lock.initState()

                        }else{
                            that.reset()
                            that.lastPoint=[]
                            that.setBoolean(false,false)
                            that.setType("解锁失败,请重试！","error",'#e64340')
                            hasRelease = false
                            
                            lock.initState()
                        }
                    })
                } else {
                    console.log("enter 3")
                    if(that.lastPoint.length<4){
                        that.reset()
                        that.setType("密码过于简单，请至少连接4个点","error",'#e64340')
                        lock.initState()
                        that.lastPoint=[]
                    }else{//hasGesture && hasRelease && !needConsistency || !hasGesture && !needConsistency
                        that.reset()
                        needConsistency = true
                        that.setType("再次绘制","succ",'#09bb07')
                        lock.initState()
                        that.lastPoint=[]
                    }

                }
            }else{
                that = this
                object.HttpRequst('/api/user/signature',1,'',{"username":username,"password":password,"gesture":psw},"POST").then(function(res){
                    console.log("res post gesture:",res)
                    if(res.statusCode == 0){
                        object.HttpRequst("/api/user/agreements",1,'',{"username":username,"projectId":projectId,"data":pairs},'PUT').then(function(res){
                            if(res.statusCode ==0){
                                object.direct2UserCommit()
                                wx.showToast({
                                    title: '提交成功！',
                                })
                            }else{
                                wx.showToast({
                                  title: '提交同意失败！',
                                })
                            }
                        })
                        
                    }else{
                        that.reset()
                        that.setType("验证失败，请再次绘制","error",'#e64340')
                        lock.initState()
                        that.lastPoint=[]
                        wx.showToast({
                          title: '验证失败，请重试！',
                        })
                    }
                })
            }
        }



        /**解锁来让修改密码**/
        wxlocker.prototype.doSuccessReleaseLock = function(res){
            console.log("doSuccessReleaseLock")
            if(res.statusCode==0){
                console.log("res",res)
                that.setBoolean(true,false)
                that.setType("解锁成功,请绘制新手势密码","succ",'#09bb07')
                that.reset()
                lock.initState()
            }else{
                // wx.removeStorageSync('gesture')
                that.setBoolean(false,false)
                that.setType("解锁失败,请重试！","error",'#e64340')
            }
        }

        /**设置手势锁**/
        wxlocker.prototype.doSuccessSetLock = function(){
            that.setBoolean(false,false)
            that.setType("密码保存成功", "succ",'#09bb07')
            lock.initState()
            wx.showToast({
              title: '设置手势密码成功！',
            })
            object.jump2UserMyProgram()
        }


        // wxlocker.prototype.doFailSetLock=function(){
        //     wx.showToast({
        //       title: '设置手势密码失败！',
        //     })
        // }
        // wxlocker.prototype.doCompleteSetLock = function(){
        //     console.log("设置手势密码完成！")
        // }
        
        // 触屏事件触发
        wxlocker.prototype.bindtouchstart = function(e){
            if(e.touches.length==1){
                var self = this;
                var po = self.getPosition(e);
                // console.log("self.arr",self.arr)
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
            var that = this;
            if (that.touchFlag) {//手指放开,但是touchFlag还没变false，那么就改成false
                that.touchFlag = false;
                lastPass = psw
                psw = that.getGestureArray(that.lastPoint)
                that.storePass();
            }
        }






























        // 基础函数
        wxlocker.prototype.init = function(lk,pid,ps) {//初始化锁盘
            lock = lk
            projectId = pid
            pairs = ps

            this.lastPoint = [];//记录手指经过的圆圈
            hasRelease = false
            this.makeState();

            this.touchFlag = false;
            this.ctx = wx.createContext();//创建画布
            this.createCircle();//画圆圈
        }
        wxlocker.prototype.drawCle = function(x, y) { // 初始化解锁密码面板
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
        wxlocker.prototype.checkPass = function(psw1, psw2) { // 检测密码
            if (psw1==undefined || psw2 == undefined){
                return false
            }
            let len = psw1.length===psw2.length?psw1.length:0
            if(len ==0){
                return false
            }else{
                for(let i = 0;i<len;i++){
                    if(psw1[i]!=psw2[i]){
                        return false
                    }
                }
                return true
            }
        }
        wxlocker.prototype.getGestureArray = function(psw){
            let result = []
            for (const key in psw) {
                result.push(psw[key].index)
            }
            return result
        }
        wxlocker.prototype.setBoolean = function(i_hasRelease,i_needConsistency){
            hasRelease = i_hasRelease
            needConsistency = i_needConsistency
        }
        wxlocker.prototype.setType = function(title,titleColor,StatusPoint){
            that.title = title
            that.titleColor = titleColor
            that.drawStatusPoint = StatusPoint
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


        // module
        module.exports = {
            lock:new wxlocker(),
            
        }
})();