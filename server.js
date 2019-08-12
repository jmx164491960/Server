// 引入相关模块
var http = require('http');
var url = require('url');
var path = require('path');
var readStaticFile = require('./modules/readStaticFile');
const CONFIG = require('./config');
const POST = 9526;

// 搭建 HTTP 服务器
function begin(port) {
    var server = http.createServer(function(req, res) {
        var urlObj = url.parse(req.url);
        var urlPathname = urlObj.pathname;
    
        console.log('!');
        if (urlPathname === '/') {
            urlPathname += 'index';
        }
        if (urlPathname === '/index') {
            urlPathname += '.html';
        }
        var filePathname = path.join(__dirname, CONFIG.dirPath, urlPathname);
        
        // 读取静态文件
        readStaticFile(req, res, filePathname);
    });
    
    // 端口监听请求
    server.listen(port, function() {
        console.log("服务器运行中.");
        console.log(`正在监听 ${port} 端口:`)
    });
}

begin(9526)
// begin(9527)
// begin(9528)