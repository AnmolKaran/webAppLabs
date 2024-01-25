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

app.get('/aboutPage', (req,res) => { 

res.render('aboutPage')
});




function calcScore(uuid) {
  return new Promise((resolve, reject) => {
      const selectQuery = `SELECT * FROM scoretable WHERE id = ?`;

      db.all(selectQuery, [uuid], function (err, rows) {
          if (err) {
              console.error('Error fetching data from the database:', err);
              reject(err);
              return;
          }

          const itemList = rows.map(row => ({
              col1: row.col1,
              col2: row.col2,
              col3: row.col3,
              col4: row.col4,
              col5: row.col5,
              col6: row.col6,
              col7: row.col7,
              col8: row.col8,
              col9: row.col9,
              col10: row.col10,
              col11: row.col11,
              col12: row.col12,
              col13: row.col13,
              col14: row.col14,
              col15: row.col15,
          }));

          console.log('Item List:', itemList);
          const item1 = rows.map(row => row.col1)[0];
          const item2 = rows.map(row => row.col2)[0];
          const item3 = rows.map(row => row.col3)[0];
          const item4 = rows.map(row => row.col4)[0];
          const item5 = rows.map(row => row.col5)[0];
          const item6 = rows.map(row => row.col6)[0];
          const item7 = rows.map(row => row.col7)[0];
          const item8 = rows.map(row => row.col8)[0];
          const item9 = rows.map(row => row.col9)[0];
          const item10 = rows.map(row => row.col10)[0];
          const item11 = rows.map(row => row.col11)[0];
          const item12 = rows.map(row => row.col12)[0];
          const item13 = rows.map(row => row.col13)[0];
          const item14 = rows.map(row => row.col14)[0];
          const item15 = rows.map(row => row.col15)[0];

          if (item1 == 0 || item2 == 0) {
              console.log("score is 20/200");
              resolve("20/200");
          }
          if (item3 == 0 || item4 == 0 || item5 == 0) {
              resolve("20/100");
          }

          const t4 = corrCount(6, 8, rows);
          const t5 = corrCount(9, 10, rows);
          const t6 = corrCount(11, 13, rows);
          const t7 = corrCount(14, 15, rows);

          console.log("t4: ", t4);

          if (t4 >= 2) {
              if (t5 >= 2) {
                  if (t6 >= 2) {
                      resolve("20/20");
                  }
                  resolve("20/30");
              }
              resolve("20/50");
          }

          resolve("20/70");
      });
  });
}

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
        updateDB("col6",1,myCookie)
      }
      else{
        updateDB("col6",0,myCookie)
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
        updateDB("col7",1,myCookie)
      }
      else{
        updateDB("col7",0,myCookie)
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
        updateDB("col8",1,myCookie)
      }
      else{
        updateDB("col8",0,myCookie)
      }
      const randomIndex = Math.floor(Math.random() * letters.length);
  
      const randomLetter = letters[randomIndex];

      res.render("fourthPage",{randomLetter})
  });
  


  app.post('/submit3.28', (req,res) => { 

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
        updateDB("col9",1,myCookie)
      }
      else{
        updateDB("col9",0,myCookie)
      }
      const randomIndex = Math.floor(Math.random() * letters.length);
  
      const randomLetter = letters[randomIndex];

      res.render("fourthPage2",{randomLetter})

  });
  


  app.post('/submit3.28v2', (req,res) => { 

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
        updateDB("col10",1,myCookie)
      }
      else{
        updateDB("col10",0,myCookie)
      }
      const randomIndex = Math.floor(Math.random() * letters.length);
  
      const randomLetter = letters[randomIndex];

      res.render("fifthPage",{randomLetter})

  });

  app.post('/submit1.969', (req,res) => { 

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
        updateDB("col11",1,myCookie)
      }
      else{
        updateDB("col11",0,myCookie)
      }
      const randomIndex = Math.floor(Math.random() * letters.length);
  
      const randomLetter = letters[randomIndex];

      res.render("fifthPage2",{randomLetter})

  });

  app.post('/submit1.969v2', (req,res) => { 

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
        updateDB("col12",1,myCookie)
      }
      else{
        updateDB("col12",0,myCookie)
      }
      const randomIndex = Math.floor(Math.random() * letters.length);
  
      const randomLetter = letters[randomIndex];

      res.render("fifthPage3",{randomLetter})

  });


  app.post('/submit1.969v3', (req,res) => { 

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
        updateDB("col13",1,myCookie)
      }
      else{
        updateDB("col13",0,myCookie)
      }
      const randomIndex = Math.floor(Math.random() * letters.length);
  
      const randomLetter = letters[randomIndex];

      res.render("sixthPage",{randomLetter})

  });
  app.post('/submit1.3125', (req,res) => { 

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
        updateDB("col14",1,myCookie)
      }
      else{
        updateDB("col14",0,myCookie)
      }
      const randomIndex = Math.floor(Math.random() * letters.length);
  
      const randomLetter = letters[randomIndex];

      res.render("sixthPage2",{randomLetter})

  });



  app.post('/submit1.3125v2', async (req,res) => { 

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
        updateDB("col15",1,myCookie)
      }
      else{
        updateDB("col15",0,myCookie)}

      const myScore = await calcScore(myCookie);

      if (myScore) {
            console.log(myScore, "myscore");
            res.render("resultsPage", { myScore });
      } else {
            console.error("Error calculating score");
            res.status(500).send("Internal Server Error");
      }

  });



function corrCount(startind, endind,lst) {
    let ct = 0;
    for (let p = startind; p < endind - 1; p++) {

      if (lst.map(row => row["col" + toString(p)])[0] == 1 ){
          ct++;
      }
    }
    return ct;
}


  
const listener = app.listen(
    process.env.PORT || 8080,
    process.env.HOST || "0.0.0.0",
    function() {
      console.log("Express server started");
    }
);
