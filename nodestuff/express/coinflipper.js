#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION STUFF

var express = require('express')
var app = express();

app.set('view engine','ejs')

var pagecount = 0

app.use(
    express.static('static_files')
)

let count = 0;



app.get('/flip', function(req,res){
    count++;

    rand = Math.random()
    var obj = {'rand':rand}

    if (rand<0.5){
        res.render('lose', obj );
    }
    else{
        res.render('win',obj)
    }
});

// -------------- listener -------------- //
// The listener is what keeps node 'alive.' 

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
});