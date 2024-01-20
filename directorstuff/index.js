
const express = require('express')
const app = express();

app.set('view engine','ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req,res) => { 
  res.render('page1')
});

app.post('/fun_form_handler', (req,res) => {

  let name, something = ""
  if ('name' in req.body) {
      name = req.body.name
  }

  if ('something' in req.body) {
      something = req.body.something
  }

  const out = {
      'name' : name,
      'something' : something
  }  

  res.render('results',out)
});


// -------------- listener -------------- //
const listener = app.listen(
  process.env.PORT || 8080,
  process.env.HOST || "0.0.0.0",
  function() {
    console.log("Express server started");
  }
);