const express = require('express')
const app = express();
app.set('view engine','ejs')


app.get('/numbers', (req,res) => { 

    res.render('formtemplate')
});

app.get('/numberInput', (req,res) => { 
  let {number} = req.query
  console.log("im in numberinput")
  res.redirect('/results/'+ number)
});

app.get('/results/:number', (req,res) => { 
  let {number} = req.params
  let format = req.query.format
  
  
  let myDict = {myNumber : number, cm: parseInt(number)/2.54, mm: parseInt(number) / .254, feet: parseInt(number) *12}
  if (format == "json"){
    res.json(myDict)
  }else{
    res.render("results", myDict)
  }
});




const listener = app.listen(
  process.env.PORT || 8080,
  process.env.HOST || "0.0.0.0",
  function() {
    console.log("Express server started");
  }
);