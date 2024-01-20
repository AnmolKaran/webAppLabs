
const fs = require('fs')


function delayPromise() {
    return new Promise( (resolve) => {
        
        fs.readFile('foo.txt', (err, data) => {
            if (err) throw err;
            console.log( data.toString() );
            resolve( data)
        });

     })
    
    
}

async function main() {

    console.log('start')
    let foo = await delayPromise()
    console.log(foo.toString())
    console.log('bottom of program')
}
main()

