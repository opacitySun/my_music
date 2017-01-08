var express = require('express');

// 创建一个express实例
var app = express();
app.use(express.static('webapp'));

// 监听8080端口，开启服务器
app.listen(8080, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:8080');
});