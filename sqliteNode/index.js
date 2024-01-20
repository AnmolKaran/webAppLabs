const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');


let sql = `SELECT * FROM characters WHERE c_name = ?`
let p = ['Henrik']


function sqlPromise(query,params) {
    return new Promise( (resolve,reject) => {
        db.all(query, params, (err, rows) => {
            // console.log(err)
            // console.log(rows);
            resolve(rows)
        });
    })
  }


async function main(arg){

    let rows = await sqlPromise(sql,arg)
    console.log(rows)
    

}


main(p)
main(['Lucinda'])

db.close();

