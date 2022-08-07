const mysql = require("mysql");
const express = require("express");
const app = express();
const router = express.Router();
const fs = require('fs');
const path = require('path');

const conn = mysql.createConnection(
    {
        host:"hal-th22-ih31-a06-db00.mysql.database.azure.com",
        user:"AdminA06",
        password:"U22-HAL-ROOT",
        database:"test",
        port:3306,
        ssl: {ca: fs.readFileSync("C:/Azure_key/DigiCertGlobalRootCA.crt.pem")}
        // SSL証明書を参照するためにここにパスを明記　自分のローカル環境用なので実行できないと思います。
    }
);
app.use(express.static(path.join(__dirname, 'public/db')));
app.get("/ins", (req, res) => {//未完成
    console.log("ins処理")
    console.log(db_ins());//success patarn
});

app.get("/select/all", (req, res) => {//完成(仮)
    console.log("SELECTALL処理")
    // result = db_slt_all();
    var url = "./public/selsect_all.html"
    res.render("public/db/");
});

app.get("/select", (req, res) => {//未完成
    console.log("SELEC処理")
    console.log(db_slt(req.query.sql));
});

app.get("/delete", (req, res) => {//未完成
    console.log("del処理")
    console.log(db_dlt(req.query.sql));
});


//ミドルウェア
function mylogger(req, res, next){
    console.log(req.orginalURL);
    next();
}

function db_ins(...tag) {
    conn.query(
        "INSERT INTO user",
        {name:tag[0], age:tag[1]},

        function(error, response) {
 
            if(error) throw error;
            //error処理の画面に遷移させたい
            console.log(response);
        }
    )
}
function db_slt(sqls) {//sqlsは文字列でwhere部分を入れるてい
    var result = conn.query((
        "SELECT * FROM user" + sqls,
        function(error, response) {
            if(error) throw error;
            //error処理の画面に遷移させたい
            console.log(response);
        }
    ))
    return result;
}

function db_slt_all() {
    var result = conn.query(
            "SELECT * FROM user",
            function(error, response) {
                if(error) throw error;
                    //error処理の画面に遷移させたい
                console.log(response);
            }
        )
    res.writeHead(200, {'Content-Type':'text/html'});
    res.render(result);
    response.end();
}
function db_dlt(...words) {
    conn.query()
}
function db_upd(...words) {
    conn.query()
}
function db_action(st){
    var result = null;
    conn.query(
        st,
        function(error, response) {
 
            if(error) throw error;
            //error処理の画面に遷移させたい
            console.log(response);
        })
        if(result == null){//結果を返さない系の場合
            return 
        }else{//結果を返す系のSQLの場合
            return result;
        }
}
module.exports = router;

