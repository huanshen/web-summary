var n=parseInt(read_line());
for(var p=0;p<n;p++){
    var str = read_line();
    var countd=0;
    var countdj=0;
    var countdji=0;
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i)==='d') {
            countd++;
        }
        else if(str.charAt(i)==='j'){
            countdj+=countd;
        }
        else if(str.charAt(i)==='i'){
            countdji+= countdj;
        }
    }
    print(countdji);
}