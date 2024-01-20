const express = require('express');
const app = express();
app.set('view engine','ejs')

const cookieParser = require('cookie-parser')
// Use the cookie-parser middleware
app.use(cookieParser());

// ... do some normal init stuff

// Route to set a cookie
app.get('/readcookie', (req, res) => {
    const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); 

    let {myNumCookie} = req.cookies

    if (myNumCookie){
        myNewCookieValue = Number(myNumCookie);
        myNewCookieValue += 1;
        let cookieName = 'myNumCookie'
        res.cookie(cookieName, myNewCookieValue, {
            expires: expirationDate,
        });
    }else{
        let cookieName = "myNumCookie"
        let cookieData = 1
    
        res.cookie(cookieName, cookieData, {
        expires: expirationDate,
        });
    }
    


    
   

    res.render('homePage')
});


const listener = app.listen(
    process.env.PORT || 8080,
    process.env.HOST || "0.0.0.0",
    function() {
      console.log("Express server started");
    }
);