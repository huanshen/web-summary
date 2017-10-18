while(line=readline()){
    var lines = line+line;
    var arr=lines.split('');
    var s=0,e=0;
    var types={A:0,B:0,C:0,D:0,E:0};//总共需要哪几种颜色
    var count=0;
    var minStr;
    for (var i = 0; i < arr.length; i++) {
        while(count===5){
            minStr=minStr<(e-s+1)?minStr:(e-s+1);
            types[arr[s]]--;
            if(types[arr[s]]===0){
               count--;
            }
            s++;
        }
        if(types[arr[i]]!==undefined){
            if (types[arr[i]]===0) {
              count++;
            }
            types[arr[i]]++;
        }
        e=i;
    }
    print(line.length-minStr);
}

