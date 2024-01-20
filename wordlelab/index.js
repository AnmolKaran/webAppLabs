const express = require("express");
const app = express();

const fs = require('fs');		// fs is built-in. no npm install
const path = require('path');	// path is built-in. no npm install
app.set('view engine','ejs')

// generate a file path (as a string) for the words file
const wordsFilePath = path.join(__dirname,'enable1.txt')

// use fs to read the file; convert bytes to string split on newlines
const words = fs.readFileSync(wordsFilePath).toString().split('\n')

// (words is now an array of the entire enable1.txt file)

app.get('/', (req,res) => {
  res.render('home')
})

app.get('/wordfinder', (req,res) => {
  letter1 = req.query.letter1.toLowerCase()
  letter2 = req.query.letter2.toLowerCase()
  letter3 = req.query.letter3.toLowerCase()
  letter4 = req.query.letter4.toLowerCase()
  letter5 = req.query.letter5.toLowerCase()

  type1 = req.query.type1
  type2 = req.query.type2
  type3 = req.query.type3
  type4 = req.query.type4
  type5 = req.query.type5
  console.log(type4)
  possWords = []
  
  words.forEach(function(elem){
    if (elem.length != 5){
      return
    }
    if (type1 == "gray"){
      if (elem.indexOf(letter1)>-1){
        return;
      }
    }
    if (type2 == "gray"){
      if (elem.indexOf(letter2)>-1){
        return;
      }
    }
    if (type3 == "gray"){
      if (elem.indexOf(letter3)>-1){
        return;
      }
    }
    if (type4 == "gray"){
      if (elem.indexOf(letter4)>-1){
        return;
      }
    }
    if (type5 == "gray"){
      if (elem.indexOf(letter5)>-1){
        return;
      }
    }




    if (type1 == "yellow"){
      if (elem.indexOf(letter1) == -1){
        return;
      }
    }
    if (type2 == "yellow"){
      if (elem.indexOf(letter2) == -1){
        return;
      }
    }
    if (type3 == "yellow"){
      if (elem.indexOf(letter3) == -1){
        return;
      }
    }
    if (type4 == "yellow"){
      if (elem.indexOf(letter4) == -1){
        return;
      }
    }
    if (type5 == "yellow"){
      if (elem.indexOf(letter5) == -1){
        return;
      }
    }




    if (type1 == "green"){
      if (elem[0] != letter1){
        return;
      }
    }
    if (type2 == "green"){
      if (elem[1] != letter2){
        return;
      }
    }
    if (type3 == "green"){
      if (elem[2] != letter3){
        return;
      }
    }
    if (type4 == "green"){




      if (elem[3] != letter4){
        return;
      }
    }
    if (type5 == "green"){
      if (elem[4] != letter5){
        return;
      }
    }
    possWords.push(elem)



  })
  console.log(possWords)
  
	// do dictionary type stuff
	let newDictionary

	res.json(newDictionary)
})

const listener = app.listen(
	process.env.PORT || 8080, 
	process.env.HOST || "0.0.0.0", 
	function() {
    	console.log("Express server started");
	}
);