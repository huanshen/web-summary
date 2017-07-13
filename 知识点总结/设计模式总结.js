设计模式三个原则：
1）职责与原则(SRP)：就一个类而言，应该仅有一个因其他变化的原因。用于单例模式、迭代器模式、代理模式、装饰者模式
2）最小知识原则(迪米特法则)：设计程序时，应尽量减少对象之间的交互。用于中介者模式和外观模式
3）开放-封闭原则(OSP)：当需要改变一个新程序的功能或给这个程序增加新功能时，可以使用增加代码的方式而不允许修改程序的源代码。
  用于发布-订阅模式、模板方法模式、策略模式、代理模式、职责链模式


1、单例模式：保证只有一个实例，并提供全局访问;惰性单例：指在需要的时候才创建对象实例
var getSingle=function(createFn){
   var _instance；
   return _instance||(_instance=createFn.apply(this,arguments));
}

2、策略模式：定义一系列算法，把他们一个个封装起来，并且使它们可以相互替换
var strategies={
	'S'：function(salary){
		return salary*4;
	},	
	'A'：function(salary){
		return salary*3;
	},
	'B'：function(salary){
		return salary*2;
	}
}
var conculateBonus=function(level,salary){
	return strategies[level](salary);
}
优点：1）可以有效避免多充条件的选择语句
      2）支持开放-封闭原则，将算法封装在独立的strategy中，是它们易于切换、易于理解、易于扩展
      3）算法可以复用在系统的其他地方，从而避免很多的复制粘贴工作
      4）利用组合和委托使Contex拥有执行算法能力，这也是继承的一种更轻便的替代方案。
缺点：1）会增加许多策略类和策略对象  2）要使用策略模式，必须了解所有的strategy以它们之间的异同点

3、代理模式：为一个对象提供一个代用品或占位符，以便控制对它的访问。分为保护代理、虚拟代理、缓存代理等
//代理实现图片预加载：
var MyImage=(function(){
	var imgNode=document.createElement('img');
	document.body.appendChild(imgNode);
	return {
		setSrc:function(src){
			imgNode.src=src;
		}
	}
})();
var proxyImg=(function(){
	var img=new Image();
	img.onload=function(){
		MyImage.setSrc(this.src);
	}
	return {
		setSrc:function(src){
      MyImage.setSrc("xx.jpg");
          img.src=src;
		}
	}
})();

4、迭代器模式：提供一种方法顺序访问一个聚合对象的各个元素
//内部迭代器
var each=function(arr,fn){
	for (var i = arr.length - 1; i >= 0; i--) {
	    fn.apply(arr[i],args);
	}
}
//外部迭代器
var Iterator=function(obj){
  var current=0;
  var next=function(){
  	current++;
  }
  var isDone=function(){
  	return current>=obj.length;
  }
  var getCurrentItems=function(){
  	return obj[current];
  }
  return{
  	next:next,//必须显示调用next方法
  	isDone:isDone,
  	getCurrentItems:getCurrentItems
  }
}

5、发布-订阅模式（观察者模式）：定义对象间一对多的关系，当对象状态发生变化时，所有依赖它的对象都得到通知
var event={
	clientList:[],
    listen:function(key,fn){
       if (!this.clientList[key]) {	
          this.clientList[key]=[];
       }
       this.clientList[key].push(fn);
    },
    trigger:function(){
    	var key = Array.prototype.shift.call(arguments);
    	var fns=this.lientList[key];
        for (var i = 0; i <fns.length; i++) {
        	fns[i].apply(this,arguments);
        }
    },
    remove:function(key,fn){
        var fns=this.lientList[key];
        if (!fns) {	
        	return false
        }
        if (!fn) {
             fns&&(fns.length=0);
        }else{
        	for (var i = 0; i < fns.length; i++) {
        	    var _fn=fns[i];
        	    if(fn===_fn){
                    fns.splice(i,1);
        	    }
        	}
        }
    }
}
先订阅再发布实现方式  增加一个offlineStack处理栈,设计模式p121页
优点：1）时间上的解耦 2）对象之间的解耦
缺点：1）创建订阅者本身要消耗一定的时间和内存，例如订阅不发布情况  
      2）如果过度使用，对象和对象之间的必要联系被深埋背后，程序难以跟踪和理解

6、命令模式
var setCommand=function(btn,command){
  btn.onClick=function(){
    command.execute();
  }
}

7、组合模式：用小的子对象来构建更大的对象，而这些小的子对象本身也是由更小的孙对象组成。
var MicroCommand=function(){
  return {
    commandList:[],
    add:function(command){
      this.commandList.push(command);
    },
    execute:function(){
      for (var i = 0; i < commandList.length; i++) {
        var command=commandList[i];
        command.execute();
      }
    }
  }
}
适用场景：1）表示对象的部分-整体层次结构  2）客户希望统一对待树中的所有对象
扫描文件夹例子p145

8、模板方法模式：基于继承实现，子类将相同部分上交到父类，不同部分留待子类来实现
var Beverage=function(){};
Beverage.prototype.boilWater=function(){
  console.log("把水煮沸");
}
Beverage.prototype.brew=function(){
  throw new Error("子类必须重写brew方法");
}
Beverage.prototype.addCondiments=function(){
  throw new Error("子类必须重写addCondiments方法");
}
//钩子函数，可由子类重写;用于判断是否执行addCondiments
Beverage.prototype.customerWantsCondiments=function(){
  return true;
}
Beverage.prototype.init=function(){
  this.boilWater();
  if (this.customerWantsCondiments()) {
    this.addCondiments();
  }
  this.brew();
}

9、享元模式：运用共享技术来有效支持大量细粒度的对象。为解决性能优化而生
var Upload=function(uploadType){
   this.uploadType=uploadType;
}
upload.delete=function(){}
//工厂进行对象实例化
var UploadFactory=(function(){
  var createFlyObjs={};
  return {
    create:function(uploadType){
      if (UploadFactory[uploadType]) {
        return UploadFactory[uploadType];
      }
      return UploadFactory[uploadType]=new Upload(uploadType);
    }
  }
})()
var uploadManager=(function(){
  return{
    add:function(id,uploadType,fileName,fileSize){
      var flyObj=UploadFactory.create(uploadType);
      ...
    }
  }
})
//触发上传动作
window.startUpload=function(uploadType,files){
  for (var i = 0,file; file=files[i++];) {
    var uploadObj=uploadManager.add(++id,uploadType,file.fileName,file.fileSize)//将new Upload(uploadType)改为add方法，相同uploadType仅创建一个Upload
  }
}

10、职责链模式：使每个对象都有机会处理请求，从而避免请求者和接收者之间的耦合关系，将对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。
var order500=function(orderType,pay,stock){
  if (oederTypr=1&&pay=true) {
    console.log("500元定金预售，得到100元优惠券");
  }
  else{
    return "nextSuccessor";
  }
}
var order200=function(orderType,pay,stock){
  if (oederTypr=2&&pay=true) {
    console.log("200元定金预售，得到20元优惠券");
  }
  else{
    return "nextSuccessor";
  }
}
var orderNormal=function(orderType,pay,stock){
  if (oederTypr=2&&pay=true) {
    console.log("200元定金预售，得到20元优惠券");
  }
  else{
    return "nextSuccessor";
  }
}
//职责链节点包装进chain函数
var chain=function(fn){
   this.fn=fn;
   this.successor=null;//chain类
}
chain.prototype.setNextSuccessor=function(successor){
  return this.successor=successor;
}
chain.prototype.passRequest=function(){
  var ret=this.fn.apply(this,arguments);
  if (ret='nextSuccessor') {
     return this.successor&&this.successor.passRequest.apply(this.successor,arguments);
  }
  return ret;
}
//调用
var chainOrder500=new chain(order500);
var chain200=new chain(order200);
var chainNormal=new chain(orderNormal);
chainOrder500.setNextSuccessor(chain200).setNextSuccessor(chainNormal);
优点：1）解耦了发送者与N个接收者之间的复杂关系
      2）可以手动指定起始节点
缺点：1）不能保证某个请求一定能被链中节点处理
      2）使用了多个节点，在一次传递过程中，可能大部分的节点都没有作用

11、中介者模式：解除对象与对象之间的紧耦合关系
泡泡堂游戏中用playerDirector函数处理两队之间的增加、移除、死亡、换队等操作。p196

12、装饰者模式:可以动态地给某个对象添加一些额外的职责，而不会影响从这个类中派生的其他对象
Function.prototype.before=function(beforeFn){
	var _self=this;
	return function(){
		var ret=_self.apply(this,arguments);
	  return ret;//原函数返回值，没有则返回undefined
	}
}
Function.prototype.after=function(afterFn){
	var _self=this;
	return function(){
		var ret=_self.apply(this,arguments);
		afterFn.apply(this,arguments);
	  return ret;//原函数返回值，没有则返回undefined
	}
}
function f1(){
	console.log(1);
}
function f2(){
	console.log(2);
}
f1.after(f2)();//1,2
f1.before(f2)();//2,1

13、状态模式：将状态封装成独立的类；将请求委托给当前的状态对象
var light=function(){
  this.offLightState=new offLightState();//将状态封装成独立的类
  this.weakLightState=new weakLightState();
  this.strongLightState=new strongLightState();
  this.botton=null;
}
light.prototype.init=function(){
  var button=document.createElement('button'),
      _self=this;
  this.button.document.appendChild('button');
  this.button.innerHTML='开关'；

  this.currState=this.offLightState;//当前状态
  this.button.onClick=function(){
    _self.current.buttonPressed()；//将请求委托给当前的状态对象
  }
}
有文件上传状态、状态机等利用状态模式的实现p237

14、适配器模式：解决两个软件实体间的接口不兼容问题
var goolMap={
  show:function(){}
}
var baiduMap={
  display:function(){}
}
var baiduMapAdapter={
  show:function(){
    baiduMap.display();
  }
}
15、外观模式:对用户屏蔽一组子系统的复杂性
var A=function(){
  a1();
  a2();
}
var B=function(){
  b1();
  b2();
}
var facade=function(){
  A();
  B();
}
facade();