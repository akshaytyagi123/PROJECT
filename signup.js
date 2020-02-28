const express= require('express');
const app= express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const md5 = require('md5');
const fs = require('fs');
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require('mongoose');
const mongoURI =
"mongodb+srv://root:root@democluster-zqy6y.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(
mongoURI,
{
useNewUrlParser: true,
useUnifiedTopology: true 
}, ()=>{
    console.log('database connected');
  
}
);

const conn= mongoose.connection;

app.post('/api/signup' ,(request,res)=>{
   
    let data={
        username : request.body.username,
        email : request.body.email,
        password: md5(request.body.password),
        created_at : new Date().toISOString().slice(0,10)
    }
    conn.collection('login').insertOne(data);
    
        res.json({
            message: ' Successfully inserted ' ,
            
        })
    })
    
port = 8000;
app.listen(port, ()=>{
    console.log('listening.....');
})