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
   console.log(v);
});
console.log(graph.BFS(myVertices[0]));
//深度优先算法
graph.dfs(myVertices[0],function(v){
   console.log(v);
})