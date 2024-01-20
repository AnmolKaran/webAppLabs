const express = require('express');
const app = express();

app.set('view engine','ejs')
// Route to set a cookie
app.get('/setcookie', (req, res) => {

    // Set the 'username' cookie to expire in 7 days (in ms)
    const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); 

    let cookieName = "myNumCookie"
    let cookieData = 1
    
    res.cookie(cookieName, cookieData, {
        expires: expirationDate,
    });

    res.render('homepage')
});



const listener = app.listen(
    process.env.PORT || 8080,
    process.env.HOST || "0.0.0.0",
    function() {
      console.log("Express server started");
    }
);