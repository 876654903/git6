var gulp = require('gulp');
var url = require('url');
var qs = require('qs');
var webserver = require('gulp-webserver');
var mincss = require('gulp-clean-css');
var minjs = require('gulp-uglify');
var minhtml = require('gulp-htmlmin');

option = {
    removeComments: true, //清除HTML注释
    collapseWhitespace: true, //压缩HTML
    collapseBooleanAttributes: true, //省略布尔属性的值 <input checked='true'/> ==> <input />
    removeEmptyAttributes: true, //删除所有空格作属性值 <input id='' /> ==> <input />
    removeScriptTypeAttributes: true, //删除<script>的type='text/javascript'
    removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type='text/css'
    minifyJS: true, //压缩页面JS
    minifyCSS: true //压缩页面CSS
}
var list = [{
        name: "百度",
        address: "北京市海淀区西北旺",
        info: "互联网|已上市|1000人",
        ps: "热招:前端工程师等23个职位",
        id: "1",
        img: "1.png"

    },
    {
        name: "百度",
        address: "北京市海淀区西北旺",
        info: "互联网|已上市|1000人",
        ps: "热招:前端工程师等23个职位",
        id: "1",
        img: "2.png"

    },
    {
        name: "百度",
        address: "北京市海淀区西北旺",
        info: "互联网|已上市|1000人",
        ps: "热招:前端工程师等23个职位",
        id: "1",
        img: "3.png"

    }, {
        name: "百度",
        address: "北京市海淀区西北旺",
        info: "互联网|已上市|1000人",
        ps: "热招:前端工程师等23个职位",
        id: "1",
        img: "4.png"

    }

]
gulp.task('webserver', function() {
    gulp.src('.')
        .pipe(webserver({
            port: '3000',
            middleware: function(req, res, next) {
                var method = req.method;
                var pathname = url.parse(req.url).pathname;
                var params = null;
                res.setHeader("Access-Control-Allow-Origin", "*");
                if (method === "GET") {
                    params = qs.parse(url.parse(req.url).query)
                    repeatFn(pathname, res)
                } else if (method === "POST") {
                    var str = '';
                    req.on('data', function(chunk) {
                        str += chunk;
                    })
                    req.on('end', function() {
                        if (str.indexOf('{') !== -1 && str.indexOf('}') !== -1) {
                            params = JSON.parse(str)
                        } else {
                            params = qs.parse(str)
                        }
                        repeatFn(pathname, res)
                    })

                } else if (method === "OPTION") {
                    res.writeHead(200, {
                        "content-type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-methods": "GET,POST,PUT,DELET",
                        "Access-Control-Allow-headers": "Accept,Origin,X-request-with,Content-type"
                    })
                }
            }
        }))
})

function repeatFn(pathname, res) {
    if (pathname === '/list') {
        res.setHeader('content-type', "application/json");
        res.end(JSON.stringify(list))
    } else {
        res.setHeader('content-type', "text/plain");
        res.end('not font')
    }
}

gulp.task('mincss', function() {
    gulp.src('style.css')
        .pipe(mincss())
        .pipe(gulp.dest('./mincss/'))
})
gulp.task('minjs', function() {
    gulp.src('*.js')
        .pipe(minjs())
        .pipe(gulp.dest('./minjs/'))
})
gulp.task('minhtml', function() {
    gulp.src('*.html')
        .pipe(minhtml(option))
        .pipe(gulp.dest('./minhtml/'))
})

gulp.task('default', ['webserver', 'mincss', 'minhtml', 'minjs'])