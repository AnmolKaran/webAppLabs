const express = require('express')
const app = express()

let heros = {
  heros : [
      {
        id : 0,
        name : "Archibald",
        wit : 0,
        strength : 7,
        attack : 5,
        defense : 1,
        magic : 0
      }, {
        id : 1,
        name : "Henrik",
        wit : 4,
        strength : 3,
        attack : 3,
        defense : 1,
        magic : 2
      }, {
        id : 2,
        name : "Isadore",
        wit : 2,
        strength : 6,
        attack : 4,
        defense : 0,
        magic : 4
      }, {
        id : 3,
        name : "Lucinda",
        wit : 4,
        strength : 3,
        attack : 1,
        defense : 8,
        magic : 1
      }, {
        id : 4,
        name : "Harold",
        wit : 5,
        strength : 2,
        attack : 3,
        defense : 3,
        magic : 2
      }
  ]
}

app.get('/update_attack', (req,res) => {
  const {id, attack}  = req.query

  console.log(id)
  console.log(attack)
  try {
      heros.heros[id].attack = Number(attack)
      const response = { 'ok' : true }
      res.json(response)
  } catch {
    const response = { 'ok' : false }
    res.json(response)
  }

})

app.get('/heros_json', (req,res) => {
  res.json(heros)
})

app.listen(3000,
  function() {
    console.log("Express server started");
});