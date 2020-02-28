const express= require('express');
const app= express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const jwt= require('jsonwebtoken');
const md5 = require('md5');
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

//GENERATE TOKEN
app.post('/api/login' ,(request,res)=>{
    
 let users={
        username: request.body.username,
        email: request.body.email,
        password: md5(request.body.password),
        created_at : new Date().toISOString().slice(0,10)
    }
    conn.collection('login').insertOne(users);
    
    jwt.sign({users:users},'secretkey', (err,token)=>{
        res.json({
        token:token,
        id: users['id'],
        username: users['username'],
        email: users['email']


});
    });
    
    
});
port = 3001;
app.listen(port, ()=>{
    console.log('listening.....');
})