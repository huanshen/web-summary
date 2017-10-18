var output=function(i){
  setTimeout(function(){
    console.log(i);
  },2000*i);
};
function c(arr){
  for (var i = 0; i < arr.length; i++) {
    output(i);
  }
}

//promise
const tasks=[];
const outPut=(i)=>new Promise((resolve)=>{
  setTimeout(function(){
      console.log(new Date(),i);
      resolve();//必须有，用于执行成功的回调
  },1000*i)
});
for (var i = 0; i < 5; i++) {
  tasks.push(outPut(i));
};
Promise.all(tasks).then(()=>{
  setTimeout(()=>{
    console.log(new Date(),i);
  },1000)
});

//async
const sleep = (timeountMS) => new Promise((resolve) => {
  setTimeout(resolve, timeountMS);
});

(async () => { // 声明即执行的 async 函数表达式
   for (var i = 0; i < 5; i++) {
     await sleep(1000);
     console.log(new Date, i);
   }
   await sleep(1000);
   console.log(new Date, i);
})();