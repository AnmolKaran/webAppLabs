const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');


const express = require('express');
const app = express();
app.set('view engine','ejs')

function getRow(query,params) {
    return new Promise( (resolve,reject) => {
        console.log("query: " +query)
        console.log("params: "+params)
        db.all(query, params, (err, rows) => {
            console.log(sql)

            // console.log(err)
            // console.log(rows);
            try{
              resolve(rows)
            }catch{
              reject("failed")
            }
        });
    })
  }


  
function getCharacters(query) {
    return new Promise((resolve, reject) => {
  
      db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }




async function testFunc(arg){
  console.log("arg " + arg)
  console.log(sql)
  let rows = await getRow(sql,arg)
  console.log(rows)
    

}

app.get('/viewTablePage', async (req,res) => { 
  const query = 'SELECT * FROM characters';

  const charactersData = await getCharacters(query); 

  res.render("viewTablePage",{charactersData})
  
});

app.get('/equipPage', async (req,res) => { 
    res.render("equipPage")
  });

  app.get('/assignQuestsPage', async (req,res) => { 
    res.render("assignQuestsPage")

    
  });


app.get('/inputted', async (req, res) => { 
    const hero = req.query.firstInp;
    const weapon = req.query.secondInp;
    
    const updateQuery = `UPDATE characters SET c_name = ?, Weapon = ? WHERE c_name = ?`;
    db.run(updateQuery, [hero, weapon, hero], (err) => {
        if (err) {
            console.error('Error updating character:', err.message);
        } else {
            console.log('Character updated successfully');
            res.render('homePage');
        }
    });
});


app.get('/inputtedQuest', async (req, res) => { 
  const hero = req.query.firstInp;
  const quest = req.query.secondInp;
  
  const updateQuery = `UPDATE characters SET c_name = ?, quest_id = ? WHERE c_name = ?`;
  db.run(updateQuery, [hero, quest, hero], (err) => {
      if (err) {
          console.error('Error updating character:', err.message);
      } else {
        console.log(quest)
          console.log('Character updated successfully');
          const sqlQuery = `SELECT characters.c_name, quests.id, quests.quest_name FROM characters INNER JOIN quests WHERE quests.id = characters.quest_id AND quests.id = ` + String(quest);

          db.all(sqlQuery, (error, rows) => {
              if (error) {
                  throw error;
              }
              res.render('displayCommonQuestPage',{rows,quest});


          });
      }
  }); 
});




app.get('/', async (req,res) => { 
    //onsole.log("in home page")
    //await testFunc(['Henrik'])

    res.render("homePage")
    
  });





const listener = app.listen(
    process.env.PORT || 8080,
    process.env.HOST || "0.0.0.0",
    function() {
      console.log("Express server started");
    }
  );