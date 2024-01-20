let http = require('http')
let fs = require('fs')
let url = "http://localhost:3000/heros_json"
function downloadPromise(url) {
    return new Promise( (resolve, reject) => {
      http.get(url, function(response){
        let full_reponse = ""
        response.on('data', (chunk)=>{full_reponse+=chunk})
        response.on('end', ()=>{resolve(full_reponse)})
      }).on('error', function(err){
        reject(err)
      })    
    })
  }


async function main(){
   fs.writeFile('results.txt',await downloadPromise(url),function(){console.log('')})
}
main()