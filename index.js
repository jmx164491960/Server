// 1. 导入http模块
const http = require("http");

// 2. 创建一个web服务器对象
const server = http.createServer();

// 3. 监听请求事件
server.on("request", (req, res) => {
	// 设置响应头解决中文乱码的问题
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    res.end("hello world 小单");
})

// 4. 启动服务器，为了避免端口冲突，这里给一个本机端口3000
server.listen(3000, () => {
    console.log("服务器启动成功");

})