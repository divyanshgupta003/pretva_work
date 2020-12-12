const express = require('express');
const app = express();
const port = 8000;
const mongoose = require('mongoose');
const keys = require('./keys');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

app.use('/' , require('./route/index'));

mongoose.connect(keys.mongouri , {  useNewUrlParser : true,
    useUnifiedTopology : true
},
   function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log('database working');

    app.listen(port , function(err){
        if(err){
            console.log(err);
            return;
        }
        console.log('Port running fine on ' + port);
    });
});