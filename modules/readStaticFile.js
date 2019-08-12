// readStaticFile.js

// 引入依赖的模块
var path = require('path');
var fs = require('fs');
var mime = require('mime');
const etag = require('etag');
const CONFIG = require('../config');

function readStaticFile(req, res, resourcePath) {

    var ext = path.parse(resourcePath).ext;
    var mimeType = mime.getType(ext);
    
    // 判断路径是否有后缀, 有的话则说明客户端要请求的是一个文件 
    if (ext) {
        if (fs.existsSync(resourcePath)) {
            // 根据传入的目标文件路径来读取对应文件
            fs.readFile(resourcePath, (err, data) => {
                // 错误处理fs
                if (err) {
                    res.writeHead(500, { "Content-Type": "text/plain" });
                    res.end();
                } else {

                    fs.stat(resourcePath,function(err,stat) {
                        const lastModified = stat.mtime.toUTCString();
                        const ifModifiedSince = "If-Modified-Since".toLowerCase();
                        res.setHeader("Last-Modified", lastModified);
                        const expires = new Date();
                        expires.setTime(expires.getTime() + CONFIG.maxAge * 1000);
                        const ifNoneMatch = req.headers['if-none-match'];

                        if (req.headers[ifModifiedSince] && lastModified == req.headers[ifModifiedSince] || ifNoneMatch === etag(data)) {//实现304逻辑
                            res.writeHead(304, "Not Modified");
                            res.end();
                        } else {
                            res.writeHead(200, {
                                "Content-Type": mimeType,
                                // 'Cache-Control': 'max-age=' + CONFIG.maxAge,
                                'ETag': etag(resourcePath)
                            });
                            res.write(data);
                            res.end();
                        }
                    });
                }
            });
        } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.write("404 - NOT FOUND");
            res.end();
        }
        // 返回 false 表示, 客户端想要的 是 静态文件
        return true;
    } else {
        // 返回 false 表示, 客户端想要的 不是 静态文件
        return false;
    }
}

// 导出函数
module.exports = readStaticFile;