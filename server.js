/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-28 09:49:58
 * @LastEditTime: 2019-07-26 12:30:24
 * @LastEditors: Please set LastEditors
 */
// 引入相关模块
var http = require('http');
var url = require('url');
var path = require('path');
var readStaticFile = require('./modules/readStaticFile');
const CONFIG = require('./config');
const POST = 8091;

// 搭建 HTTP 服务器
var server = http.createServer(function(req, res) {
    var urlObj = url.parse(req.url);
    var urlPathname = urlObj.pathname;
    if (urlPathname === '/') {
        urlPathname += 'index';
    }
    if (urlPathname === '/index') {
        urlPathname += '.html';
    }
    console.log('urlPathname:', urlPathname);
    var filePathname = path.join(__dirname, CONFIG.dirPath, urlPathname);
    console.log('filePathname:', filePathname);
    
    // 读取静态文件
    readStaticFile(res, filePathname);
});

// 端口监听请求
server.listen(POST, function() {
    console.log("服务器运行中.");
    console.log(`正在监听 ${POST} 端口:`)
});