var express = require("express");
var app = express();

app.get('/', function(req,res){
  res.send('Hello World!')
})


var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");

    console.log()
});