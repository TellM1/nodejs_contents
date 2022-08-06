//没
const express = require("express");
var path = require('path');
const fs = require("fs");
const ejs = require('ejs');

const app = express();
const PORT = 3000;

const testac = {
    'user': 'admin',  
    'pass' : '7Vussa' ,
  };
// ミドルウェアの定義

app.use(function(req, res, next){
    var inName = String(req.query.user);
    var inPass = String(req.query.pass); 
    console.log(inName,inPass);
    
    if((testac.user == inName) && (testac.pass == inPass)){
        res.redirect('./');
        console.log("BasicAuth完了")
    }
    
    if((testac.user == inName) != (testac.pass == inPass)){
        fs.readFile('./authErro.html', function(error, content) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
        });
    }
});

// 下記の部分でサーバー自体の処理を書いてる
//ミドルウェアの関数においてはここに追記することが可能
app.get('/', (req, res) => {
    console.log(filePath)
    if(filePath == './'){
        filePath = 'index.html'
        console.log(filePath)
    }
    
    var extname = String(path.extname(filePath)).toLowerCase();
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    var contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT' || error.code == 'ERR_HTTP_HEADERS_SENT') {
                fs.readFile('./404.html', function(error, content) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            }
            else {
                res.writeHead(500);
                res.end('Sorry,ERRCODE this ->'+error.code+' ..\n');
            }
        }
        else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
})

app.listen(PORT)

console.log(PORT +"のサーバーを起動しました。");