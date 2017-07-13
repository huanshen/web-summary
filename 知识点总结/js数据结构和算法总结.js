 

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

   //动态规划计算做对题数不少于60%概率
    var n = parseInt(read_line());
    var a = read_line().split(" ");
    var correct = Math.ceil(n * 0.6);
    var b = a.map(function(x) {
      return x / 100;
    });
    var dp = [];
    var p;
    dp.push([1]);

    for (var i = 1; i <= b.length; i++) {
      var arr = [];
      //计算i道题全部错误概率
      p = dp[i - 1][0] * (1 - b[i - 1]);
      arr.push(p);
      //计算i道题j道正确概率
      for (var j = 1; j < i; j++) {
        p = dp[i - 1][j] * (1 - b[i - 1]) + dp[i - 1][j - 1] * b[i - 1];
        arr.push(p);
      }
      //计算i道题全部正确概率
      p = dp[i - 1][j - 1] * b[i - 1];
      arr.push(p);
      dp.push(arr);
    }
    //计算概率
    var p1 = 0;
    for (var i = correct; i <= n; i++) {
      p1 += dp[n][i];
    }

    print(p1.toFixed(5));


        //图的遍历算法
    var Graph=function(){
      var vertices=[];
      var adjList=new Map();
      var initalColor=function(vertices){
        var color=[];
        for (var i = 0; i < vertices.length; i++) {
          color[vertices[i]]='white';
        }
        return color;
      }
      var dfsVisit=function(v,color,callback){
         color[v]='grey';
         if (callback) {
            callback(v);
         }
         var neighbors=adjList.get(v);
         for (var i = 0; i < neighbors.length; i++) {
            var w=neighbors[i];
            if (color[w]==='white') {
              dfsVisit(w,color,callback);
            }
         }
         color[v]='black';
      }
      this.addVertex=function(v){
           vertices.push(v);
           adjList.set(v,[]);
      }
      this.addEdge=function(v,w){
           adjList.get(v).push(w);
           adjList.get(w).push(v);
      }
      this.bfs = function(v,callback) {//广度优先搜索
         var color=initalColor(vertices);//白灰黑三个颜色
         var arr=[];
         arr.push(v);
         while(arr.length!=0){
              var u=arr.shift(),
                  neighbors=adjList.get(u);
              color[u]='grey';
              for (var i = 0; i < neighbors.length; i++) {
                var w = neighbors[i];
                if (color[w]==='white') {
                  color[w]='grey';
                  arr.push(w);
                }
              }
             color[u]='black';
             if (callback) {
              callback(u);
             }
         }
        };
        this.BFS= function(v) {//广度优先搜索，适用于非加权的最短路径
         var color=initalColor(vertices);//白灰黑三个颜色
         var arr=[],
           d=[],
           pred=[];
         arr.push(v);
         for (var i = 0; i < vertices.length; i++) {
            d[vertices[i]]=0;
            pred[vertices[i]]=null;
         }
         while(arr.length!=0){
              var u=arr.shift(),
                  neighbors=adjList.get(u);
              color[u]='grey';
              for (var i = 0; i < neighbors.length; i++) {
                var w = neighbors[i];
                if (color[w]==='white') {
                  color[w]='grey';
                  d[w]=d[u]+1;
                  pred[w]=u;
                  arr.push(w);
                }
              }
             color[u]='black';
         }
         return {
            distances:d,
            predecessors:pred
         }
        };
        this.dfs= function(v,callback) {//深度优先搜索
         var color=initalColor(vertices);//白灰黑三个颜色
         if (color[v]==='white') {
              dfsVisit(v,color,callback);
         }
        };
    }
    
     
    var graph=new Graph();
    var myVertices=['A','B','C','D','E','F','G','H','I']
    var myEdge=[['A','B'],['A','C'],['A','D'],['C','D'],['C','G'],['D','G'],['D','H'],['B','E'],['B','F'],['E','I']]
    for (let i = 0; i < myVertices.length; i++) {
        graph.addVertex(myVertices[i]);
    }
    for (let i = 0; i < myEdge.length; i++) {
        graph.addEdge.apply(this,myEdge[i]);
    }
    //广度优先算法
    graph.bfs(myVertices[0],function(v){
       // console.log(v);
    });
    console.log(graph.BFS(myVertices[0]));
    //深度优先算法
    graph.dfs(myVertices[0],function(v){
       console.log(v);
    })