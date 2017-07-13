网站性能优化：
1、减少Http请求
   通过图片地图（map,area标签）、CSS Sprites(background-position)、 内联图片（data:URL）、合并脚本和样式表
2、使用内容分发网络（CDN）
   CDN是分布在多个不同地理位置的Web服务器，用于更加有效地向用户发布内容
   优点：缩短响应时间；提供备份、扩展存储能力和进行缓存的服务；
   缺点：响应时间受其他网站影响；无法直接控制组件服务器；
   用途：用于发布静态内容
3、添加Expries头
   Expires  Cache-Control:max-age=315360000;
4、压缩脚本和样式表
   Accept-Econding:gzip,deflate;
   mod_gzip_minimum_file_size:控制文件压缩的最小值
   Vary：Accept-Enconding,User-Agent;Accept-Enconding代理缓存时需要；User-Agent边缘情形时需要；
5、将样式表放在顶部
6、将脚本放在底部
7、避免CSS表达式
   原因：对其求值频率比人们期望的高
   避免方式：一次性表达式：css的experession；事件处理器
8、使用外部的javascript和CSS
   会增加Http请求，但可以进行缓存；适用于浏览量大、完整缓存率高、组件重用率高的情况
9、通过使用Keep-Alive(connection:Keep-Alive)和较少的域名来减少DNS查找
10、精简Javascript
    使用JSMin和Compression
11、避免重定向
12、删除重复的脚本
    导致原因：团队大小和脚本数量
    避免方式：脚本管理模块；创建insetScript函数；
13、配置或移除Etag（Etag是用组件的某些属性构建的）
    ETag:XX;            If-None-Match:xx;
    Last-Modified:XX;   If-Modified-Since:XX;
14、使Ajax可缓存
