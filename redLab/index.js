const express = require('express')
const app = express();

app.set('view engine','ejs')

const cookieParser = require('cookie-parser')
// Use the cookie-parser middleware
app.use(cookieParser());


const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');



const { v4: uuidv4 } = require('uuid');

const sizes = [13.125,6.562,4.594,3.28,1.9688,1.3125]
const letters = ['C', 'D', 'E', 'F', 'G', 'H', 'J', 'L', 'O', 'P', 'R', 'S', 'T'];

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req,res) => { 

    let {myCookie} = req.cookies

    if (myCookie){
        myNewCookieValue = myCookie;
        let cookieName = 'id'
        res.cookie(cookieName, myNewCookieValue, {
        });
    }else{
        let cookieName = "id"
        let cookieData = uuidv4();
    
        res.cookie(cookieName, cookieData, {
        });
    }
    res.render('homePage')
});

app.get('/biggestPage', (req,res) => { 
  const randomIndex = Math.floor(Math.random() * letters.length);

  const randomLetter = letters[randomIndex];
  res.render('biggestPage', {randomLetter})
});


function updateDB(col,correct,identifier){   // col is column, correct is 1 or 0 whether the answer was right or not, identifier is the uuid
  const checkExistenceQuery = `SELECT COUNT(*) AS count FROM scoretable WHERE id = ?`;

  db.get(checkExistenceQuery, [identifier], function (err, result) {
      if (err) {
          console.error('Error checking existence in the database:', err);
          return res.status(500).send('Internal Server Error');
      }
  
      if (result.count > 0) {
          console.log('ID exists in the table.');
      } else {
          const insertQuery = `INSERT INTO scoretable (id) VALUES (?)`;
  
          db.run(insertQuery, [identifier], function (err) {
              if (err) {
                  console.error('Error inserting into the database:', err);
                  return res.status(500).send('Internal Server Error');
              }
  
              console.log('Inserted into the database!');
  
              // Now, execute the update operation
              const updateQuery = `UPDATE scoretable SET ${col} = ${correct} WHERE id = ?`;
              
              db.run(updateQuery, [identifier], function (err) {
                  if (err) {
                      console.error('Error updating the database:', err);
                      return res.status(500).send('Internal Server Error');
                  }
              });
          });
      }
  });
  


  

    
}



app.post('/submit13.125', (req,res) => { 
  let userLetter = req.body.userLetter;
  userLetter = userLetter.toUpperCase()
  const imageName = req.body.imageName;

  

  let {myCookie} = req.cookies

    if (myCookie){
        myNewCookieValue = myCookie;
        let cookieName = 'id'
        res.cookie(cookieName, myNewCookieValue, {
        });
    }else{
        let cookieName = "id"
        myCookie = uuidv4();
        
        res.cookie(cookieName, myCookie, {
        });
    }
    if (userLetter == imageName){
      updateDB("col1",1,myCookie)
    }
    else{
      updateDB("col1",0,myCookie)
    }
    
    
    
});




const listener = app.listen(
    process.env.PORT || 8080,
    process.env.HOST || "0.0.0.0",
    function() {
      console.log("Express server started");
    }
);