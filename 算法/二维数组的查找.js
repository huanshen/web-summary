题目描述:
在一个二维数组中，每一行都按照从左到右递增的顺序排序，
每一列都按照从上到下递增的顺序排序。请完成一个函数，
输入这样的一个二维数组和一个整数，判断数组中是否含有
该整数。

function Find(target, array)
{
    // write code here
    var ilen=array.length,jlen=array[0].length;
    var i=ilen-1,j=0;
    while(i>=0&&j<jlen){
        if (target===array[i][j]) {
            return true;
        }
        else if (target>array[i][j]) {
            j++;
        }
        else{
            i--;
        }
    }
    return false;
}