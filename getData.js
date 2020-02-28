const express= require('express');
const app= express();
const bodyParser = require('body-parser');
const jwt= require('jsonwebtoken');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 let data= require('./login.js');
 const jwt_decode= require('jwt-decode');
 

 const mongoose = require('mongoose');
const conn= mongoose.connection;

app.get('/api/getuser' ,verifyuser,(req,res)=>{
    jwt.verify(req.token,'secretkey',()=>{
        let decoded = jwt_decode(req.token);
        console.log(decoded.users.id);
        conn.collection('login').find({id:decoded.users.id}).toArray((error, result) => {
            if(error) {
                return res.status(500).send(error);
            }
            res.send(result);
        });

    })
});
function verifyuser(req,res,next){
    const header= req.headers['authorization'];
    if(typeof header!=='undefined'){
        const getheader=header.split(' ');
        const header_token= getheader[1];
        req.token=header_token;
        next();
    }else{
        //forbidden
        res.sendStatus(403);
    }
}


port = 8000;
app.listen(port, ()=>{
    console.log('listening.....');
})


