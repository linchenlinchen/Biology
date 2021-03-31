

(function(){
        let object = require("../utils/util")
        let username = wx.getStorageSync('username')
        let password = wx.getStorageSync('password')
        let lock;
        let psw;
        let lastPass;
        let that = this
        let hasGesture = false //是否在服务器上设置过手势了
        let hasRelease = false //在hasGesture的情况下，是否解开了锁准备设置
        let needConsistency = false //是否是设置密码已经完成第一次，此次需要一致性
        // let options = {}
        var wxlocker = function(obj){
            this.chooseType =  3; // 3*3的圆点格子
        };

        
        wxlocker.prototype.makeState = function() {
            console.log("makeState")
            // console.log(lock)
            // this.lock = lock
            that = this
            object.HttpRequst('/api/user/hasSignature',1,'',{"username":username,"password":password},"GET").then(function(res){
                console.log("before doSuccessMakeState")
                that.doSuccessMakeState(res)
            })
        }

        
        wxlocker.prototype.reset = function() {
            console.log("reset")
            this.createCircle();
        }

        // 各个Http请求的处理函数
        /**是否成功明确初始化状态**/
        wxlocker.prototype.doSuccessMakeState = function(res){
            console.log("aing doSuccessMakeState")
            console.log("doSuccessMakeState")
            that.doSuccessHasGesture(res)
            // console.log(res)
            console.log("now hasGesture is x",hasGesture)
            console.log("now hasRelease is x",hasRelease)
            console.log("now needConsistency is x",needConsistency)
            if (hasGesture && !hasRelease) {
                that.setType("请解锁","succ",'#09bb07')
                lock.initState()
            }  
            else {
                that.setType("请设置手势密码","succ",'#09bb07')
                lock.initState()
            }
        }



        // 核心函数
        wxlocker.prototype.storePass = function() {// touchend结束之后对密码和状态的处理
                console.log('storePass')
                let that = this
                object.HttpRequst('/api/user/hasSignature',1,'',{"username":username,"password":password},"GET").then(function(res){
                    that.doSuccessStorePass(res)
                })
        }
        wxlocker.prototype.doSuccessStorePass = function(res){
            console.log("doSuccessStorePass lock:",lock)
            if(lock.data.changePassword){
                that = this
                object.HttpRequst('/api/user/uncheckedSignature',1,'',{"username":username,"password":password,"gesture":psw},"POST").then(function(res){
                    console.log("res post gesture:",res)
                    if(res.statusCode == 0){
                        object.jump2changePassword(username)
                    }
                    // that.doSuccessReleaseLock(res)
                    // that.reset()
                    // that.setType("请输入手势密码","succ",'#09bb07')
                    // that.lastPoint=[]
                    // hasRelease = true
                })
            }
            // 修改手势
            else if(lock.data.changeGesture){
                this.doSuccessHasGesture(res)
                if ((hasGesture && hasRelease && needConsistency) || (!hasGesture && needConsistency)) {
                    console.log("enter 1")
                    if (that.checkPass(psw, lastPass)) {//两次密码一致,fp表示上一次的绘制手势
                        // 设置手势密码
                        that = this
                        object.HttpRequst("/api/user/signature",1,'',{"username":username,"password":password,"gesture":psw},'POST').then(function(res){
                            that.doSuccessSetLock(res)
                            that.reset()
                            that.lastPoint=[]
                            object.backLastPage()
                        })
                    } else {
                        that.reset()
                        that.setType("两次绘制不一致，重新绘制","error",'#e64340')
                        that.lastPoint=[]
                        needConsistency = false
                        lock.initState()
                    }
                } else if (hasGesture && !hasRelease) {
                    console.log("enter 2")
                    that = this
                    object.HttpRequst('/api/user/uncheckedSignature',1,'',{"username":username,"password":password,"gesture":psw},"POST").then(function(res){
                        that.doSuccessReleaseLock(res)
                        that.reset()
                        that.setType("请输入手势密码","succ",'#09bb07')
                        that.lastPoint=[]
                        hasRelease = true
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
                        that.setType("再次输入","succ",'#09bb07')
                        lock.initState()
                        that.lastPoint=[]
                    }

                }
            }
        }
        // wxlocker.prototype.doFailStorePass = function(res){
        //     wx.showToast({
        //       title: 'Store pass fail',
        //     })
        //     console.log("doFailStorePass")
        // }
        // wxlocker.prototype.doCompleteStorePass = function(res){
        //     console.log("doCompleteStorePass")
        // }

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
                that.setBoolean(true,true,false)
                that.setType("解锁成功,请绘制新手势密码","succ",'#09bb07')
                that.reset()
                lock.initState()
            }else{
                // wx.removeStorageSync('gesture')
                that.setBoolean(true,false,false)
                that.setType("解锁失败,请重试！","error",'#e64340')
            }
        }

        /**设置手势锁**/
        wxlocker.prototype.doSuccessSetLock = function(){
            that.setBoolean(true,false,false)
            that.setType("密码保存成功", "succ",'#09bb07')
            lock.initState()
            wx.showToast({
              title: '设置手势密码成功！',
            })
            object.jump2My()
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
        wxlocker.prototype.init = function(lk) {//初始化锁盘
            console.log("init lock:",lk)
            lock = lk
            // this.pswObj = {}
            this.lastPoint = [];//记录手指经过的圆圈
            // if(lock.data.changeGesture){
                this.title="请绘制原手势密码"
                this.makeState();
                this.touchFlag = false;
            // }else if(lock.data.changePassword){
                // this.title="请绘制手势密码验证"

            // }
            
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
        wxlocker.prototype.checkPass = function(psw1, psw2) { // 检测密码
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
        wxlocker.prototype.setBoolean = function(i_hasGesture,i_hasRelease,i_needConsistency){
            hasGesture = i_hasGesture
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
            // HttpRequst,
            lock:new wxlocker(),
            
        }
})();