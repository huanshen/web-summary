//js版本
function min(a, num){
    var i, min = a[1];
    for (i = 1; i <= num; i++){
        min = min < a[i] ? min : a[i];
    }
    return min;
}
function fun(num){
    var i = 1, f=[],j;
    f[0] = 0, f[1] = 1;
    var tmp_ans=[];
    if (num>1){
        for (i = 2; i <= num; i++){
            for (j = 1; j <= i; j++)
                tmp_ans[j] = Math.max(j, f[i - j]+1);//第j碎和没碎比较
            f[i] = min(tmp_ans, i);//找出最小需要测试的次数
        }
    }
    return f;
}

console.log(fun(40));

//c++版本
#include<iostream>
using namespace std;
int max(int a, int b){
    return a > b ? a : b;
}
int min(int *a, int num){
    int i, min = a[1];
    for (i = 1; i <= num; i++){
        min = min < a[i] ? min : a[i];
    }
    return min;
}
int fun(int num){
    int i = 1, f[41] = { 0 },j;
    f[0] = 0, f[1] = 1;
    int tmp_ans[41];
    tmp_ans[0] = 100;
    if (num>1){
        for (i = 2; i <= num; i++){
            for (j = 1; j <= i; j++)
            tmp_ans[j] = max(j, f[i - j]+1);
            f[i] = min(tmp_ans, i);
        }
    }
    return f[num];
}

int main(){
    cout<<fun(40);
}