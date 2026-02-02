const express = require('express');
const app = express();
require('dotenv').config();


const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body

app.get('/', (req,res)=>{
    res.send('hello');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT , ()=>{
    console.log(`Server running on port ${PORT}`);
})