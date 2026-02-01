const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body

app.get('/', (req,res)=>{
    res.send('hello');
})

//const PORT = process.env.PORT || 3000;
app.listen(3000 , ()=>{
    console.log('listening on port 3000');
})