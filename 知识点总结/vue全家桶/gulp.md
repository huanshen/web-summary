js          --'gulp-uglify'
css         --'gulp-minify-css'
image       --'gulp-imagemin'
less        --'gulp-less'
sass        --'gulp-ruby-sass'必须安装ruby，手动在控制面板>系统>高级>环境变量。我添加了一个名为path与ruby路径（C:\Ruby23-x64\bin）的新变量。


1、gulp.src(globs[, options])
	globs(String 或 Array)所要读取的 glob 或者包含 globs 的数组。
	options(Object)
	   options.buffer  Boolean ,为 false，那么将会以 stream 方式返回 file.contents 而不是文件 buffer 的形式。这在处理一些大文件的时候将会很有用
	   options.read    Boolean ,为 false， 那么 file.contents 会返回空值（null），也就是并不会去读取文件。
	   options.base    String,基路径
	   例如：gulp.src('client/js/**/*.js') // 匹配 'client/js/somedir/somefile.js' 并且将 `base` 解析为 `client/js/`
			  .pipe(minify())
			  .pipe(gulp.dest('build'));  // 写入 'build/somedir/somefile.js'

			gulp.src('client/js/**/*.js', { base: 'client' })
			  .pipe(minify())
			  .pipe(gulp.dest('build'));  // 写入 'build/js/somedir/somefile.js'

2、gulp.dest(path[, options])
   path（String or Function） 文件将被写入的路径
   options(Object)  
	   options.cwd（String） 默认值： process.cwd()  输出目录的 cwd 参数，只在所给的输出目录是相对路径时候有效。
	   options.mode（String） 默认值： 0777   八进制权限字符，用以定义所有在输出目录中所创建的目录的权限。

3、gulp.task(name[, deps], fn)
	name   任务的名字
	deps   一个包含任务列表的数组，这些任务会在你当前任务运行之前完成。
	fn     1）接受一个 callback  2）返回一个 stream   3）返回一个 promise

4、gulp.watch(glob [, opts], tasks) 或 gulp.watch(glob [, opts, cb])
	glob  一个 glob 字符串，或者一个包含多个 glob 字符串的数组，用来指定具体监控哪些文件的变动。
	opts  传给 gaze 的参数
	tasks  需要在文件变动后执行的一个或者多个任务
	cb(event) 回调函数  event.type  发生的变动的类型：added, changed 或者 deleted。
	                    event.path  触发了该事件的文件的路径。
	注意:有性能问题。gulp.watch 检测到 src/js/ 目录下的js文件有修改时会将所有文件全部编译。实际上我们只需要重新编译被修改的文件。
  解决方案： gulp-watch-path 配合 event 获取编译路径和输出路径。
  watchPath(event, search, replace, distExt)
	  event	gulp.watch 回调函数的 event
		search	需要被替换的起始字符串
		replace	第三个参数是新的的字符串
		distExt	扩展名(非必填)
	例子：
			var watchPath = require('gulp-watch-path')
			gulp.task('watchjs', function () {
			    gulp.watch('src/js/**/*.js', function (event) {
			        var paths = watchPath(event, 'src/', 'dist/')
			        /*paths
			            { srcPath: 'src/js/log.js',
			              srcDir: 'src/js/',
			              distPath: 'dist/js/log.js',
			              distDir: 'dist/js/',
			              srcFilename: 'log.js',
			              distFilename: 'log.js' } */
						 	gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
			        gutil.log('Dist ' + paths.distPath)
              //只编译变化的文件
			        gulp.src(paths.srcPath)
			            .pipe(uglify())
			            .pipe(gulp.dest(paths.distDir))
			    })
			})
		gulp.task('default', ['watchjs'])

5、让命令行输出的文字带颜色
	var gutil = require('gulp-util')；
	gutil.log(gutil.colors.red('error'))；

6、stream-combiner2 捕获错误信息
		var combined = combiner.obj([
        gulp.src(paths.srcPath),
        uglify(),
        gulp.dest(paths.distDir)
    ])
    combined.on('error', handleError)

7、gulp-sourcemaps：JS 压缩前和压缩后比较
		var sourcemaps = require('gulp-sourcemaps')
		var combined = combiner.obj([
		    gulp.src(paths.srcPath),
		    sourcemaps.init(),//初始化
		    uglify(),
		    sourcemaps.write('./'),//写出
		    gulp.dest(paths.distDir)
		])

8、gulp-autoprefixer：autoprefixer 解析 CSS 文件并且添加浏览器前缀到CSS规则里。
   var autoprefixer = require('autoprefixer')
   gulp.src(paths.srcPath)
      .pipe(sourcemaps.init())
      .pipe(autoprefixer({
        browsers: 'last 2 versions'//加入浏览器版本号
      }))
      .pipe(minifycss())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.distDir))
      
9、配置文件复制任务
		gulp.task('copy', function () {
		    gulp.src('src/fonts/**/*')
		        .pipe(gulp.dest('dist/fonts/'))
		})