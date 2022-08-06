const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

const testdb = [
    { id: 1, name: 'member001'},
    { id: 2, name: 'member002'},
    { id: 3, name: 'member003'},
    { id: 4, name: 'member004'},
]

app.get('/', (req, res) => {
    if(req.url == "/"){
        res.send('Not Found Date');
    }else{
        
    }
    
});

// サーバーのポートを指定して待機状態に
app.listen(port, () => console.log(`Listening on port ${port}...`));