//动态规划硬币找零问题
function MinCoinChange(coins){//coins币种
   var coins=coins;
   var cache=[];

   this.makeChange=function(amount){
      var me=this;
      if (!amount) {
        return [];
      }
      if (cache[amount]) {
        return cache[amount];
      }
      var min=[],newMin,newAmount;
      for (var i = 0; i < coins.length; i++) {
        var coin=coins[i];
        newAmount=amount-coin;
        if (newAmount>=0) {
          newMin=me.makeChange(newAmount);
        }
        if (newAmount>=0&&(newMin.length<min.length-1||!min.length)&&(newMin.length||!newAmount)) {
          min=[coin].concat(newMin);
          console.log('new Min '+min+' for '+amount);
        }
      }
      return cache[amount]=min;
   }
}
var q=new MinCoinChange([1,5,10,25]);
console.log(q.makeChange(36));