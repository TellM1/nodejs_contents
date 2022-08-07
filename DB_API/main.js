var path =require("path");
const express = require('express')
const app = express()

var { absolutePath } = require("swagger-ui-dist");

app.use("/spec", express.static(path.join(__dirname, "./spec")));
app.use(express.static(absolutePath()));

const port = process.env.PORT || 3000;

const crudRouter = require("./routes/crud")
const testdb = [
    { id: 1, name: 'member001'},
    { id: 2, name: 'member002'},
    { id: 3, name: 'member003'},
    { id: 4, name: 'member004'},
]
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    if(req.url == "/"){
        res.send('Not Found Date');
    }else{
        res.redirect('/')
    }
    
});

app.get('/database', crudRouter);

// サーバーのポートを指定して待機状態に
app.listen(port, () => console.log(`Listening on port ${port}...`));