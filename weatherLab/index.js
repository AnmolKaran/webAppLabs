var https = require('https')
let baseUrl = 'https://api.weather.gov/points/'
var options = { 
	headers : {
		'User-Agent': '(weather app) (me@bob.com)'
	}
}


const express = require('express');
const app = express();
app.set('view engine','ejs')


app.get('/', (req,res) => { 
  res.render("homePage")

});
app.get('/inputted', (req,res) => { 
    const x = req.query.x;
    const y = req.query.y;

    url = baseUrl+x + "," + y
    https.get(url, options, (response) => {
        if (response.statusCode !==200){
          return res.render('homePage')
        
        }
        var rawData = '';
        response.on('data', function(chunk) {
          rawData += chunk;
        });
        
	      response.on('end', function() { 
          
            const jsonData = JSON.parse(rawData);
            console.log(jsonData)
            const forecast = jsonData["properties"]['forecast']
            https.get(forecast,options,(response) => {
              var rawData2 = '';
              response.on('data', function(chunk) {
                rawData2 += chunk;
              });
              response.on('end', function() { 
                const jsonData2 = JSON.parse(rawData2)
                const periods = jsonData2.properties.periods;

                // Creating a dictionary to organize information for each day
                const organizedData = {};

                // Loop through each period and organize data by day
                periods.forEach((period) => {
                  const dayNumber = period.number;
                  organizedData[dayNumber] = {
                    day: period.name,
                    startTime: period.startTime,
                    endTime: period.endTime,
                    isDaytime: period.isDaytime,
                    temperature: period.temperature,
                    temperatureUnit: period.temperatureUnit,
                    precipitationProbability: period.probabilityOfPrecipitation.value,
                    shortForecast: period.shortForecast,
                    detailedForecast: period.detailedForecast,
                    icon: period.icon,
                  };
                });

                res.render("forecastPage",{data: organizedData})
              });

            })

        });

    })
});


const listener = app.listen(
    process.env.PORT || 8080,
    process.env.HOST || "0.0.0.0",
    function() {
      console.log("Express server started");
    }
  );