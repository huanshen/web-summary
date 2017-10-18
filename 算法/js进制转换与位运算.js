var a = 1010;
alert(a.toString(2)); //转成二进制
alert(parseInt( "101110100 ",2)) ;//转成十进制

//js中&（与）、|（或）以及^（异或）的二进制使用（计算）
var a=1;
var b=2;
console.log(countOne(a^b));
//输出数字中1的个数
var count=0;
var num=6;
function countOne(num){
    var count=0;
    while(num){
       num=num&(num-1);
       count++;
    }
    return count;
} 
function countOne(num,count){
    var count=0;
    while(num){
        if(num&1){
           count++;
        }
        num=num>>1;
    }
    return count;
} 