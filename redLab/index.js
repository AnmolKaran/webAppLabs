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

    let myCookie = req.cookies.id

    if (myCookie){
        myNewCookieValue = myCookie;
        let cookieName = 'id'
        const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        res.cookie(cookieName, myNewCookieValue, {
            expires: expirationDate,
        });
    }else{
        let cookieName = "id"
        let cookieData = uuidv4();
        console.log('first time')
        const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        res.cookie(cookieName, cookieData, {
            expires: expirationDate,
        });
    }
    res.render('homePage')
});

app.get('/biggestPage', (req,res) => { 

    let myCookie = req.cookies.id
    console.log(myCookie)

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
          const updateQuery = `UPDATE scoretable SET ${col} = ${correct} WHERE id = ?`;
              
              db.run(updateQuery, [identifier], function (err) {
                  if (err) {
                      console.error('Error updating the database:', err);
                      return res.status(500).send('Internal Server Error');
                  }
              });
            console.log("updated")
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

  

  let myCookie = req.cookies.id

    console.log(myCookie)
    if (myCookie){
        myNewCookieValue = myCookie;
        let cookieName = 'id'
        const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        res.cookie(cookieName, myNewCookieValue, {
            expires: expirationDate,
        });
    }else{
        let cookieName = "id"
        myCookie = uuidv4();
        
        const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        res.cookie(cookieName, myCookie, {
            expires: expirationDate,
        });
    }
    if (userLetter == imageName){
      updateDB("col1",1,myCookie)
    }
    else{
      updateDB("col1",0,myCookie)
    }
    const randomIndex = Math.floor(Math.random() * letters.length);

    const randomLetter = letters[randomIndex];
    res.render("biggestPage2",{randomLetter})
});




app.post('/submit13.125v2', (req,res) => { 
    let userLetter = req.body.userLetter;
    userLetter = userLetter.toUpperCase()
    const imageName = req.body.imageName;
  
    
  
    let myCookie = req.cookies.id
    if (myCookie){
          myNewCookieValue = myCookie;
          let cookieName = 'id'
          const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        res.cookie(cookieName, myNewCookieValue, {
            expires: expirationDate,
        });
    }else{
          let cookieName = "id"
          myCookie = uuidv4();
          
          const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        res.cookie(cookieName, myCookie, {
            expires: expirationDate,
    });
    }
    if (userLetter == imageName){
        updateDB("col2",1,myCookie)
    }
    else{
        updateDB("col2",0,myCookie)
    }

    const randomIndex = Math.floor(Math.random() * letters.length);

    const randomLetter = letters[randomIndex];

    res.render("secondPage",{randomLetter})


      
  });




  app.post('/submit6.562', (req,res) => { 

    let userLetter = req.body.userLetter;
    userLetter = userLetter.toUpperCase()
    const imageName = req.body.imageName;
  
    
  
    let myCookie = req.cookies.id
  
      console.log(myCookie)
      if (myCookie){
          myNewCookieValue = myCookie;
          let cookieName = 'id'
          const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
          res.cookie(cookieName, myNewCookieValue, {
              expires: expirationDate,
          });
      }else{
          let cookieName = "id"
          myCookie = uuidv4();
          
          const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
          res.cookie(cookieName, myCookie, {
              expires: expirationDate,
          });
      }
      if (userLetter == imageName){
        updateDB("col3",1,myCookie)
      }
      else{
        updateDB("col3",0,myCookie)
      }
      const randomIndex = Math.floor(Math.random() * letters.length);
  
      const randomLetter = letters[randomIndex];
      res.render("secondPage2",{randomLetter})
  });
  


  app.post('/submit6.562v2', (req,res) => { 

    let userLetter = req.body.userLetter;
    userLetter = userLetter.toUpperCase()
    const imageName = req.body.imageName;
  
    
  
    let myCookie = req.cookies.id
  
      console.log(myCookie)
      if (myCookie){
          myNewCookieValue = myCookie;
          let cookieName = 'id'
          const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
          res.cookie(cookieName, myNewCookieValue, {
              expires: expirationDate,
          });
      }else{
          let cookieName = "id"
          myCookie = uuidv4();
          
          const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
          res.cookie(cookieName, myCookie, {
              expires: expirationDate,
          });
      }
      if (userLetter == imageName){
        updateDB("col4",1,myCookie)
      }
      else{
        updateDB("col4",0,myCookie)
      }
      const randomIndex = Math.floor(Math.random() * letters.length);
  
      const randomLetter = letters[randomIndex];
      res.render("secondPage3",{randomLetter})

  });



  app.post('/submit6.562v3', (req,res) => { 

    let userLetter = req.body.userLetter;
    userLetter = userLetter.toUpperCase()
    const imageName = req.body.imageName;
  
    
  
    let myCookie = req.cookies.id
  
      console.log(myCookie)
      if (myCookie){
          myNewCookieValue = myCookie;
          let cookieName = 'id'
          const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
          res.cookie(cookieName, myNewCookieValue, {
              expires: expirationDate,
          });
      }else{
          let cookieName = "id"
          myCookie = uuidv4();
          
          const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
          res.cookie(cookieName, myCookie, {
              expires: expirationDate,
          });
      }
      if (userLetter == imageName){
        updateDB("col5",1,myCookie)
      }
      else{
        updateDB("col5",0,myCookie)
      }
      const randomIndex = Math.floor(Math.random() * letters.length);
  
      const randomLetter = letters[randomIndex];
      res.render("thirdPage",{randomLetter})

  });



  app.post('/submit4.594', (req,res) => { 

    let userLetter = req.body.userLetter;
    userLetter = userLetter.toUpperCase()
    const imageName = req.body.imageName;
  
    
  
    let myCookie = req.cookies.id
  
      console.log(myCookie)
      if (myCookie){
          myNewCookieValue = myCookie;
          let cookieName = 'id'
          const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
          res.cookie(cookieName, myNewCookieValue, {
              expires: expirationDate,
          });
      }else{
          let cookieName = "id"
          myCookie = uuidv4();
          
          const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
          res.cookie(cookieName, myCookie, {
              expires: expirationDate,
          });
      }
      if (userLetter == imageName){
        updateDB("col5",1,myCookie)
      }
      else{
        updateDB("col5",0,myCookie)
      }
      const randomIndex = Math.floor(Math.random() * letters.length);
  
      const randomLetter = letters[randomIndex];
      res.render("thirdPage2",{randomLetter})

  });
  



  app.post('/submit4.594v2', (req,res) => { 

    let userLetter = req.body.userLetter;
    userLetter = userLetter.toUpperCase()
    const imageName = req.body.imageName;
  
    
  
    let myCookie = req.cookies.id
  
      console.log(myCookie)
      if (myCookie){
          myNewCookieValue = myCookie;
          let cookieName = 'id'
          const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
          res.cookie(cookieName, myNewCookieValue, {
              expires: expirationDate,
          });
      }else{
          let cookieName = "id"
          myCookie = uuidv4();
          
          const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
          res.cookie(cookieName, myCookie, {
              expires: expirationDate,
          });
      }
      if (userLetter == imageName){
        updateDB("col6",1,myCookie)
      }
      else{
        updateDB("col6",0,myCookie)
      }
      const randomIndex = Math.floor(Math.random() * letters.length);
  
      const randomLetter = letters[randomIndex];
      res.render("thirdPage3",{randomLetter})

  });
  

  app.post('/submit4.594v3', (req,res) => { 

    let userLetter = req.body.userLetter;
    userLetter = userLetter.toUpperCase()
    const imageName = req.body.imageName;
  
    
  
    let myCookie = req.cookies.id
  
      console.log(myCookie)
      if (myCookie){
          myNewCookieValue = myCookie;
          let cookieName = 'id'
          const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
          res.cookie(cookieName, myNewCookieValue, {
              expires: expirationDate,
          });
      }else{
          let cookieName = "id"
          myCookie = uuidv4();
          
          const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
          res.cookie(cookieName, myCookie, {
              expires: expirationDate,
          });
      }
      if (userLetter == imageName){
        updateDB("col7",1,myCookie)
      }
      else{
        updateDB("col7",0,myCookie)
      }
      const randomIndex = Math.floor(Math.random() * letters.length);
  
      const randomLetter = letters[randomIndex];

  });
  







const listener = app.listen(
    process.env.PORT || 8080,
    process.env.HOST || "0.0.0.0",
    function() {
      console.log("Express server started");
    }
);
