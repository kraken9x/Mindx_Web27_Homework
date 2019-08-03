const express = require('express');
const app = express();
const path = require('path');


app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/home.html'));
})

app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/about.html'));
})

app.use(express.static('public'))

app.listen(3500, (err) => {
    if (err) {
        console.log(err);
    }else{
        console.log('server listen on port 3000 ...');
    }
});

