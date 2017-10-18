给你六种面额 1、5、10、20、50、100 元的纸币，假设每种币值的数量
都足够多，编写程序求组成N元（N为0~10000的非负整数）的不同组合的
个数。 

var n=parseInt(readline());
var cache=[];
print(counts(n));
function counts(n){
    var coins=[1,5,10,20,50,100];
    if(n<=0){
        return 0;
    }
    var dp=[];
    dp[0] = 1;
    for(var i = 0; i < coins.length; i++) {
        for(var j = coins[i]; j <= n; j++) {
            if (!dp[j]) {
                dp[j]=0;
            }
            dp[j] = dp[j] + dp[j - coins[i]];
        }
    }
    return dp[n];
}